import pg from 'pg';


const { Pool } = pg;

const pool = new Pool({
    host: 'localhost',
    user:'postgres',
    password: '12345',
    database: 'my_new_database',
    port: 5000
});


const testConnection = async () => {
    try {
        const results = await pool.query('SELECT 1 + 1 AS solution');
        console.log('Successfully connected to the PostgreSQL database! ');
        console.log('The solution is:', results.rows[0].solution);
    } catch (err) {
        console.error('Error connecting to the database:', err);
    }
};


testConnection();

export default pool;