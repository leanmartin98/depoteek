import express from 'express';
import axios from 'axios';
import { verifyToken } from '../middleware/auth.js';
import pool from '../config/database.js';
import { MercadoPagoConfig, Preference } from 'mercadopago';


const router = express.Router();

const client = new MercadoPagoConfig({ 
    accessToken: process.env.MERCADO_PAGO_ACCESS_TOKEN,
    options: { timeout: 5000 } 
});

// Crear preferencia de pago para Wallet
router.post('/create-preference', verifyToken, async (req, res) => {

    const FRONTEND_BASE_URL = process.env.BASE_URL || 'http://localhost:5173';

    try {
        const userId = req.user.id;
        const { amount, email, cartItems } = req.body;

        console.log('📝 Creando preferencia de pago:', {
            userId,
            amount,
            itemsCount: cartItems?.length
        });

        //Verificar stock disponible
        for (const item of cartItems) {
            const result = await pool.query(
                'SELECT stock FROM products WHERE id = $1',
                [item.id]
            );

            if (result.rows.length === 0) {
                return res.status(404).json({ error: `Producto ${item.id} no encontrado` });
            }

            if (result.rows[0].stock < item.quantity) {
                return res.status(400).json({
                    error: `Stock insuficiente para el producto ${item.id}`
                });
            }
        }

        // Obtener detalles de los productos
        const productIds = cartItems.map(item => item.id);
        const productsResult = await pool.query(
            `SELECT id, name, price FROM products WHERE id = ANY($1)`,
            [productIds]
        );

        const products = productsResult.rows;

        // Construir items para la preferencia
        const items = cartItems.map(cartItems => {
            const product = products.find(p => p.id === cartItems.id);
            return {
                id: product.id,
                title: product.name,
                quantity: cartItems.quantity,
                unit_price: parseFloat(product.price)
            };
        });

        // Crear preferencia en Mercado Pago
        const preferenceBody = {
            items: items,
            payer: {
                email: email
            },
            back_urls: {
                success: `${FRONTEND_BASE_URL}/profile`,
                failure: `${FRONTEND_BASE_URL}/checkout`,
                pending: `${FRONTEND_BASE_URL}/profile`
            },
            external_reference: `ORDER_USER_${userId}_${Date.now()}`,
            metadata: {
                userId: userId,
                cartItems: JSON.stringify(cartItems)
            },
            notification_url: `${process.env.BASE_URL || 'http://localhost:5000'}/api/payments/webhook`
        };

        console.log('URL de éxito enviada a MP:', preferenceBody.back_urls.success);
        const preferenceClient = new Preference(client);
        const response = await preferenceClient.create({ body: preferenceBody });
        const preferenceId = response.id;
        
        console.log('✅ Preferencia creada:', preferenceId);

        res.json({
            preferenceId: preferenceId,
            message: 'Preferencia creada correctamente'
        });
    } catch (error) {
          console.error('❌ Error creando preferencia (Mercado Pago API):', error.message);
          console.error(' Tipo de error:', error.constructor.name);
          console.error(' Mensaje:', error.message);
          console.error(' Stack:', error.stack);

        return res.status(500).json({ 
            error: 'Error al procesar los datos de pago en Mercado Pago.', 
            message: error.message 
        });
    }
});

// Webhook para Mercado Pago
router.post('/webhook', async (req, res) => {
    try {
        const { type, data } = req.query;
        
        console.log('📢 Webhook recibido:', type, data);

        if (type === 'payment') {
           // Obtener detalles del pago desde Mercado Pago
           const paymentRes = await axios.get(
            `https://api.mercadopago.com/v1/payments/${data.id}`,
            {
                headers: {
                    'Authorization': `Bearer ${process.env.MERCADO_PAGO_ACCESS_TOKEN}`
                }
            }
           );

           const paymentData = paymentRes.data;

            console.log('Detalle del pago:', {
                id: paymentData.id,
                status: paymentData.status,
                externalReference: paymentData.external_reference
            });

            // Si el pago fue aprobado
            if (paymentData.status === 'approved') {
                // Extraer userId del external_reference
                const externalRef = paymentData.external_reference;
                const userIdMatch = externalRef.match(/ORDER_USER_(\d+)/)

                if (userIdMatch) {
                    const userId = parseInt(userIdMatch[1]);
                    const metadata = paymentData.metadata;

                    // Crear orden en la DB
                    const orderResult = await pool.query(
                        `INSERT INTO orders (user_id, total_amount, status, mercadopago_id, payment_status)
                        VALUES ($1, $2, $3, $4, $5)
                        RETURNING id`,
                        [userId, paymentData.transaction_amount, 'completed', paymentData.id, 'approved']
                    );

                    const orderId = orderResult.rows[0].id;

                    //Procesar items del carrito
                    if (metadata && metadata.cartItems) {
                         const cartItems = JSON.parse(metadata.cartItems);

                         for (const item of cartItems) {
                            //Restar del stock
                            await pool.query(
                                'UPDATE products SET stock = stock - $1 WHERE id = $2',
                                [item.quantity, item.id]
                            );

                            //Crear item de la orden
                            await pool.query(
                                `INSERT INTO order_items (order_id, product_id, quantity)
                                VALUES ($1, $2, $3)`,
                                [orderId, item.id, item.quantity]
                            );
                        }
                    }

                    console.log('✅ Orden creada en DB:', orderId);
                }
            }
        }

        res.sendStatus(200);
    } catch (error) {
        console.log('❌ Error en Webhook:', error.message);
        res.sendStatus(500);
    }
});

// Endpoint de prueba
router.get('/test', (req, res) => {
  res.json({
    message: '✅ Mercado Pago Wallet integrado',
    environment: process.env.NODE_ENV,
    hasAccessToken: !!process.env.MERCADO_PAGO_ACCESS_TOKEN
  });
});

export default router;