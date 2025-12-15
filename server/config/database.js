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
    ssl: {
        rejectUnauthorized: false
    }
});

// Verificar si se conecta
pool.query('SELECT NOW()', (err, res) => {
    if (err) {
        console.log('❌ Error connecting to database:', err.message);
    } else {
        console.log('✅ Database connected at:', res.rows[0].now);
    }
})

export default pool;