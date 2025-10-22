import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import pool from './config/database.js';
import { registerSchema, loginSchema } from './schemas/authSchemas.js';
import { validate } from './middleware/validate.js';

dotenv.config();

const app = express()
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// RUTAS DE AUTENTICACIÓN CON ZOD
// REGISTER - Registrar usuario con validación Zod
app.post('/api/auth/register', validate(registerSchema), async (req, res) => {
    try {
        const { email, password, first_name, last_name } = req.body;

        //Verificamos si el usuario ya existe
        const userExists = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        if(userExists.rows.length > 0) {
            return res.status(400).json({ error: 'El email ya está registrado' });
        }

        // Encriptar contraseña
        const hashedPassword = await bcrypt.hash(password, 10)

        // Crear usuario
        const result = await pool.query(
            'INSERT INTO users (email, password, first_name, last_name) VALUES ($1, $2, $3, $4) RETURNING id, email, first_name, last_name',
            [email, hashedPassword, first_name, last_name]
        );

        const user = result.rows[0];

        //Crear token
        const token = jwt.sign(
            { id: user.id, email: user.email },
            process.env.JWT_SECRET || 'secreto',
            { expiresIn: '7d' }
        );

        res.status(201).json({
            message: 'Usuario registrado con exito',
            token,
            user
        });
        
    } catch (error) {
        console.error('Error en register:', error);
        res.status(500).json({ error: 'Error al registrar usuario' })
    }
});

// LOGIN - Iniciar sesión con validación Zod
app.post('/api/auth/login', validate(loginSchema), async (req, res) => {
    try {
        const { email, password } = req.body;

        //Buscar usuario
        const result = await pool.query('SELECT * FROM users WHERE email = $1', [email])
        if (result.rows.length === 0) {
            return res.status(400).json({ error: 'Email o contraseña incorrectos'})
        }

        const user = result.rows[0];

        //Verificar contraseña
        const validatePassword = await bcrypt.compare(password, user.password);
        if(!validatePassword) {
            return res.status(400).json({ error: 'Email o contraseña incorrecta'})
        }

        //Crear token
        const token = jwt.sign(
            { id: user.id, email: user.email },
            process.env.JWT_SECRET || 'secreto',
            { expiresIn: '7d' }
        );

        res.json({
            message: 'Login exitoso',
            token,
            user: {
                id: user.id,
                email: user.email,
                first_name: user.first_name,
                last_name: user.last_name
            }
        })
    } catch (error) {
        console.error('Error en login:', error);
        res.status(500).json({ error: 'Error al iniciar sesión' });
    }
});
// Ruta de prueba
app.get('/api/test', (req, res) => {
    res.json({message: '¡Servidor funcionando!'})
})

// Ruta de prueba para la base de datos
app.get('/api/test-db', async (req, res) => {
    try {
        const result = await pool.query('SELECT NOW()');
        res.json({
            message: '¡Conexión exitosa a PostgreSQL!',
            timestamp: result.rows[0].now
        });
    } catch (error) {
        res.status(500).json({ error: 'Error conectado a la base de datos: ' + error.message });
    }
})

// Ruta para obtener productos de la DB
app.get('/api/products', async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT p.*, c.name as category_name
            FROM products p
            LEFT JOIN categories c ON p.category_id = c.id
            ORDER BY p.id
            `);
            res.json(result.rows)
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/api/products/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const result = await pool.query(`
            SELECT p.*, c.name as category_name
            FROM products p
            LEFT JOIN categories c ON p.category_id = c.id
            WHERE p.id = $1
            `, [id]);

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Producto no encontrado' });
        }

        res.json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
})

