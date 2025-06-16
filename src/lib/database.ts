import mysql from 'mysql2/promise';

// Database configuration
const dbConfig = {
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '3306'),
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'consulta_sociedade',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
};

// Create connection pool
const pool = mysql.createPool(dbConfig);

// Test connection
export const testConnection = async () => {
    try {
        const connection = await pool.getConnection();
        console.log('Database connected successfully');
        connection.release();
        return true;
    } catch (error) {
        console.error('Database connection failed:', error);
        return false;
    }
};

// Initialize database and create table if it doesn't exist
export const initializeDatabase = async () => {
    try {
        const createTableQuery = `
            CREATE TABLE IF NOT EXISTS consulta_sociedade (
                id INT AUTO_INCREMENT PRIMARY KEY,
                nome VARCHAR(255) NOT NULL,
                email VARCHAR(255) NOT NULL,
                telefone VARCHAR(20),
                endereco TEXT,
                bairro VARCHAR(100),
                numero VARCHAR(10),
                area_tematica VARCHAR(255),
                pergunta TEXT,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
        `;

        await pool.execute(createTableQuery);
        console.log('Database table created or already exists');
        return true;
    } catch (error) {
        console.error('Error creating database table:', error);
        return false;
    }
};

// Insert form data into database
export const insertFormData = async (data: {
    nome: string;
    email: string;
    telefone?: string;
    endereco?: string;
    bairro?: string;
    numero?: string;
    area_tematica?: string;
    pergunta?: string;
}) => {
    try {
        const query = `
            INSERT INTO consulta_sociedade 
            (nome, email, telefone, endereco, bairro, numero, area_tematica, pergunta)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        `;

        const values = [
            data.nome,
            data.email,
            data.telefone || null,
            data.endereco || null,
            data.bairro || null,
            data.numero || null,
            data.area_tematica || null,
            data.pergunta || null,
        ];

        const [result] = await pool.execute(query, values);
        return result;
    } catch (error) {
        console.error('Error inserting form data:', error);
        throw error;
    }
};

// Get all form submissions
export const getFormSubmissions = async () => {
    try {
        const query =
            'SELECT * FROM consulta_sociedade ORDER BY created_at DESC';
        const [rows] = await pool.execute(query);
        return rows;
    } catch (error) {
        console.error('Error fetching form submissions:', error);
        throw error;
    }
};

// Get form submission by ID
export const getFormSubmissionById = async (id: number) => {
    try {
        const query = 'SELECT * FROM consulta_sociedade WHERE id = ?';
        const [rows] = await pool.execute(query, [id]);
        return rows;
    } catch (error) {
        console.error('Error fetching form submission:', error);
        throw error;
    }
};

export default pool;
