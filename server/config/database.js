import pkg from 'pg';
import dontenv from 'dotenv';

// Configurar conexión a PostgreSQL
if (process.env.NODE_ENV !== 'production') {
    dontenv.config();
}

const { Pool } = pkg;

const pool = new Pool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
});

export default pool;