import mercadopago from 'mercadopago';

// Configuarar Mercado Pago
mercadopago.configure({
    access_token: process.env.MERCADO_PAGO_ACCESS_TOKEN
});

export default mercadopago;