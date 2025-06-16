-- Database initialization script for MariaDB
-- This script is automatically executed when the MariaDB container starts

-- Set charset and collation
SET NAMES utf8mb4;

-- Create the consulta_sociedade table
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
    
    -- Indexes for better performance
    INDEX idx_email (email),
    INDEX idx_created_at (created_at),
    INDEX idx_area_tematica (area_tematica)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Insert some sample data for testing (optional)
-- Uncomment the lines below if you want sample data
/*
INSERT INTO consulta_sociedade (nome, email, telefone, endereco, bairro, numero, area_tematica, pergunta) VALUES
('João Silva', 'joao@email.com', '(92) 9 1234-5678', 'Rua das Flores', 'Centro', '123', 'Obras', 'Quando começará a obra da Av. Principal?'),
('Maria Santos', 'maria@email.com', '(92) 9 8765-4321', 'Av. Brasil', 'Cidade Nova', '456', 'Áreas de intervenção', 'Gostaria de saber sobre as áreas que serão beneficiadas.');
*/

-- Show table structure for verification
DESCRIBE consulta_sociedade;

-- Show confirmation message
SELECT 'Database initialization completed successfully!' as message; 