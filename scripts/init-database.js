const mysql = require('mysql2/promise');
require('dotenv').config({ path: '.env.local' });

const dbConfig = {
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '3306'),
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    multipleStatements: true
};

const databaseName = process.env.DB_NAME || 'consulta_sociedade';

async function initializeDatabase() {
    let connection;
    
    try {
        console.log('🔌 Connecting to MySQL server...');
        connection = await mysql.createConnection(dbConfig);
        console.log('✅ Connected to MySQL server successfully');

        // Create database if it doesn't exist
        console.log(`📋 Creating database '${databaseName}' if it doesn't exist...`);
        await connection.execute(`CREATE DATABASE IF NOT EXISTS \`${databaseName}\` 
            DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci`);
        console.log(`✅ Database '${databaseName}' created or already exists`);

        // Switch to the database
        await connection.execute(`USE \`${databaseName}\``);
        console.log(`🔄 Switched to database '${databaseName}'`);

        // Create the table
        console.log('📋 Creating table consulta_sociedade...');
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
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                INDEX idx_email (email),
                INDEX idx_created_at (created_at),
                INDEX idx_area_tematica (area_tematica)
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
        `;
        
        await connection.execute(createTableQuery);
        console.log('✅ Table consulta_sociedade created or already exists');

        // Check if table was created successfully
        const [rows] = await connection.execute('SHOW TABLES LIKE "consulta_sociedade"');
        if (rows.length > 0) {
            console.log('✅ Table verification successful');
            
            // Show table structure
            console.log('📋 Table structure:');
            const [columns] = await connection.execute('DESCRIBE consulta_sociedade');
            console.table(columns);
        } else {
            console.error('❌ Table creation failed - table not found');
            process.exit(1);
        }

        console.log('\n🎉 Database initialization completed successfully!');
        console.log('\n📝 Next steps:');
        console.log('1. Update your .env.local file with the correct database credentials');
        console.log('2. Install dependencies: npm install mysql2 nodemailer @types/nodemailer');
        console.log('3. Test your application by submitting the form');
        console.log('\n🔗 Database connection string:');
        console.log(`   mysql://${dbConfig.user}:***@${dbConfig.host}:${dbConfig.port}/${databaseName}`);

    } catch (error) {
        console.error('❌ Database initialization failed:', error.message);
        
        if (error.code === 'ECONNREFUSED') {
            console.error('\n💡 Troubleshooting tips:');
            console.error('- Make sure MariaDB/MySQL is running');
            console.error('- Check if the port is correct (default: 3306)');
            console.error('- Verify the host address');
        } else if (error.code === 'ER_ACCESS_DENIED_ERROR') {
            console.error('\n💡 Troubleshooting tips:');
            console.error('- Check your database username and password');
            console.error('- Make sure the user has CREATE DATABASE privileges');
        } else if (error.code === 'ER_BAD_DB_ERROR') {
            console.error('\n💡 Troubleshooting tips:');
            console.error('- The database name might contain invalid characters');
            console.error('- Check if the database already exists with different charset');
        }
        
        process.exit(1);
    } finally {
        if (connection) {
            await connection.end();
            console.log('🔌 Database connection closed');
        }
    }
}

// Run the initialization
console.log('🚀 Starting database initialization...\n');
initializeDatabase(); 