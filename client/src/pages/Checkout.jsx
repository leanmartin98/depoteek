import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { initMercadoPago, Wallet } from '@mercadopago/sdk-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

export default function Checkout() {
    const navigate = useNavigate();
    const { items, total } = useCart();
    const { user, token } = useAuth();

    const cart = items || [];
    const totalAmount = total || 0;
    const [loading, setLoading] = useState(false);
    const [paymentStatus, setPaymentStatus] = useState(null);
    const [preferenceId, setPreferenceId] = useState(null);
    const [email] = useState(user?.email || '');

    // Inicializar Mercado Pago
    useEffect(() => {
        const publicKey = import.meta.env.VITE_MERCADO_PAGO_PUBLIC_KEY;

        if(publicKey) {
            initMercadoPago(publicKey);
        } else {
            console.error('VITE_MERCADO_PAGO_PUBLIC_KEY no está configurado')
        }

        // Validaciones
        if (cart.length === 0) {
            navigate('/cart');
        }

        if (!user) {
            navigate('/login');
        }
    }, [cart, user, navigate]);

    // Crear preferencia de pago en el backend
    const createPreference = async () => {
        setLoading(true);

        try {
            const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

            // Preparar datos del carrito
            const cartItems = cart.map(item => ({
                id: item.id,
                quantity: item.quantity
            }));

            //Enviar al backend
            const res = await fetch(`${API_BASE_URL}/payments/create-preference`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({
                    amount: totalAmount,
                    email: email,
                    cartItems: cartItems
                })
            });

            const result = await res.json();

            if(result.preferenceId) {
                setPreferenceId(result.preferenceId);
                setPaymentStatus(null);
            } else {
                setPaymentStatus({
                    type: 'error',
                    message: 'Error al crear la preferencia de pago',
                    details: result
                });
            }
        } catch (error) {
            console.error('Error:', error);
            setPaymentStatus({
                type: 'error',
                message: `Error: ${error.message}`,
                details: null
            });
        } finally {
            setLoading(false);
        }
    };

    // Si no está autenticado
    if (!user) {
        return (
            <div className="container mx-auto py-8">
                <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                    <p className="text-red-700">You must be logged in to continue.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mx-auto">

                {/* {Header} */}
                <div className="mb-8">
                    <h1 className="text-4xl font-black text-black tracking-tight">Checkout</h1>
                    <p className="text-gray-600 mt-2">Completa tu compra de forma segura</p>
                </div>

                {/* {Resumen de la orden} */}
                <div className="space-y-3 mb-4 max-h-48 overflow-y-auto border-b border-gray-200 pb-4">
                    <h2 className="text-xl font-bold text-black mb-4">Resumen de la orden</h2>

                    <div className="space-y-3 mb-4 max-h-48 overflow-y-auto border-b border-gray-200 pb-4">
                        {cart.map(item => (
                            <div key={item.id} className="flex justify-between items.start gap-4">
                                <div className="flex-1">
                                    <p className="font-semibold text-gray-900">{item.name}</p>
                                    <p className="text-sm text-gray-500">Cantidad: {item.quantity}</p>
                                </div>
                                <p className="font-bold text-black whitespace-nowrap">
                                    ${(item.price * item.quantity).toFixed(2)}
                                </p>
                            </div>
                        ))}
                    </div>

                    <div className="flex justify-between items-center">
                        <span className="text-lg font-black text-black">Total:</span>
                        <span className="text-3xl font-black text-black">${totalAmount.toFixed(2)}</span>
                    </div>
                </div>

                {/* {Formulario de pago con wallet} */}
                <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                    <h2 className="text-xl font-bold text-black mb-4">Información de pago</h2>

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Email
                        </label>
                        <input
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-600 cursor-not-allowed focus:outline-none"
                        type="text"
                        value={email}
                        disabled
                        />
                    </div>

                    {/* {Si hay preferenceId, mostrar Wallet} */}
                    {preferenceId  ? (
                        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                            <Wallet 
                            initialization={{ preferenceId: preferenceId }}
                            customization={{ texts: {valueProp: 'security_detail'} }}
                            />
                        </div>
                    ) : (
                        <button
                        className="w-full bg-black text-white font-bold py-3 px-4 rounded-lg hover:bg-gray-900 transition disabled:bg-gray-500 disabled:cursor-not-allowed"
                        onClick={createPreference}
                        disabled={loading}>
                            {loading ? 'Preparando pago...' : 'Continuar el pago'}
                        </button>
                    )}
                </div>

                {/* {Estado del pago} */}
                {paymentStatus && (
                    <div 
                    className={`p-4 rounded-lg border-l-4 mb-6 ${
                        paymentStatus.type === 'success'
                        ? 'bg-green-50 border-green-500 text-green-700'
                        : paymentStatus.type === 'warning'
                        ? 'bg-yellow-50 border-yellow-500 text-yellow-700'
                        : 'bg-red-50 border-red-500 text-red-700'
                    }`}>
                        <p className="font-bold text-lg">{paymentStatus.message}</p>
                    </div>
                )}

                {/* {Info de prueba} */}
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <p className="text-xs font-semibold text-yellow-800 mb-3">🧪 MODO PRUEBA - MERCADO PAGO</p>
                    <div className="space-y-2 text-xs text-yellow-700">
                        <p><strong>Usuario de prueba (vendedor):</strong></p>
                        <p>Email: <code className="bg-yellow-100 px-2 py-1 rounded">test_user_1234567890@testuser.com</code></p>
                        <p>Contraseña: <code className="bg-yellow-100 px-2 py-1 rounded">qa333666</code></p>
                        <br />
                        <p><strong>Tarjetas de prueba:</strong></p>
                        <p>✅ Aprobado: <code className="bg-yellow-100 px-2 py-1 rounded">4111 1111 1111 1111</code> | 11/25 | 123</p>
                        <p>❌ Rechazado: <code className="bg-yellow-100 px-2 py-1 rounded">5105 1051 0510 5100</code> | 11/25 | 123</p>
                    </div>
                </div>
            </div>
        </div>
    );
}