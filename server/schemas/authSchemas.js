import { z } from 'zod';

// Schema para registro
export const registerSchema = z.object({
    email: z
    .string({ required_error: 'El email es requerido' })
    .email('Formato de email inválido')
    .toLowerCase()
    .trim(),

    password: z
    .string({ required_error: 'El email es requerido' })
    .min(6, 'La contraseña debe tener al menos 6 caracteres')
    .regex(/[a-zA-Z]/, 'La contraseña debe contener al menos una letra')
    .regex(/[0-9]/, 'La contraseña debe contener al menos un número'),

    first_name: z
    .string({ required_error: 'El nombre es requerido' })
    .min(2, 'El nombre debe tener al menos 2 caracteres')
    .max(50, 'El nombre no puede tener más de 50 caracteres')
    .trim(),

    last_name: z
    .string({ required_error: 'El apellido es requerido' })
    .min(2, 'El apellido debe tener al menos 2 caracteres')
    .max(50, 'El apellido no puede tener más de 50 caracteres')
    .trim()
});

// Schema para login
export const loginSchema = z.object({
    email: z
    .string({ required_error: 'El email es requerido' })
    .email('Formato de email invalido')
    .toLowerCase()
    .trim(),

    password: z
    .string({ required_error: 'La contraseña es requerida' })
    .min(1, 'La contraseña no puede estar vacia')
});

// Schema de pagos - Mercado Pago
export const paymentSchema = z.object({
    token: z.string().min(1, 'Token required'),
    installments: z.number().min(1).max(36),
    paymentMethodId: z.string(),
    issuerId: z.string().nullable().optional(),
    amount: z.number().positive('Amount must be greater than 0'),
    cartItems: z.array(z.object({
        id: z.number(),
        quantity: z.number()
    }))
});