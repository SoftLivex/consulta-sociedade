# Email and Database Integration Guide

This document explains how to set up and use the email and database functionality for the Consulta à Sociedade form.

## Features

- ✅ **Form Data Storage**: Automatically stores all form submissions in MariaDB database
- ✅ **Email Notifications**: Sends confirmation emails to users and notification emails to admins
- ✅ **Data Validation**: Uses Zod schema validation for form data
- ✅ **Error Handling**: Comprehensive error handling for both database and email operations
- ✅ **Environment Configuration**: Easy configuration through environment variables
- ✅ **Toast Notifications**: User-friendly feedback with loading states and success/error messages
- ✅ **Form Reset**: Automatic form reset after successful submission

## Prerequisites

Before setting up the email and database functionality, make sure you have:

1. **MariaDB or MySQL** installed and running
2. **SMTP email account** (Gmail, Outlook, or any SMTP provider)
3. **Node.js** and **npm/yarn** installed

## Installation

### Option 1: Docker Development (Recommended)

1. **Copy the environment file:**

```bash
cp env.example .env
```

2. **Update `.env` for Docker:**

```env
# Use 'mariadb' as DB_HOST for Docker
DB_HOST=mariadb
DB_PORT=3306
DB_USER=consulta_user
DB_PASSWORD=your_secure_database_password
DB_NAME=consulta_sociedade

# Add your email configuration
SMTP_USER=your_email@gmail.com
SMTP_PASSWORD=your_app_password
ADMIN_EMAIL=admin@prefeitura.gov.br
```

3. **Start the services:**

```bash
npm run docker:up
```

4. **Check the services:**

```bash
docker-compose ps
```

That's it! The application will be available at:

- **App**: http://localhost:3000
- **Database Admin (Adminer)**: http://localhost:8080

### Option 2: Local Development

1. **Install required dependencies:**

```bash
npm install mysql2 nodemailer @types/nodemailer
# or
yarn add mysql2 nodemailer @types/nodemailer
```

2. **Set up environment variables:**

Create a `.env` file in your project root and add the following variables:

```env
# Database Configuration
# For local development
DB_HOST=localhost
# For Docker development, use: DB_HOST=mariadb
DB_PORT=3306
DB_USER=consulta_user
DB_PASSWORD=your_secure_database_password
DB_NAME=consulta_sociedade

# Email Configuration (SMTP)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASSWORD=your_app_password

# Email Settings
FROM_NAME=Prefeitura de Manaus
FROM_EMAIL=noreply@prefeitura.gov.br
ADMIN_EMAIL=admin@prefeitura.gov.br

# Next.js Configuration
NEXTAUTH_SECRET=your_nextauth_secret_here
NEXTAUTH_URL=http://localhost:3000
```

## Database Setup

### Option 1: Automatic Setup (Recommended)

The application will automatically create the database table when the first form is submitted. No manual setup required!

### Option 2: Manual Setup

If you prefer to create the table manually, use this SQL:

```sql
CREATE DATABASE IF NOT EXISTS consulta_sociedade;
USE consulta_sociedade;

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
```

## Email Configuration

### Gmail Setup

1. **Enable 2-Factor Authentication** on your Gmail account
2. **Generate an App Password**:
    - Go to Google Account settings
    - Security > 2-Step Verification > App passwords
    - Generate a password for "Mail"
    - Use this password in `SMTP_PASSWORD`

### Other Email Providers

| Provider | SMTP Host             | Port    | Security     |
| -------- | --------------------- | ------- | ------------ |
| Gmail    | smtp.gmail.com        | 587     | STARTTLS     |
| Outlook  | smtp-mail.outlook.com | 587     | STARTTLS     |
| Yahoo    | smtp.mail.yahoo.com   | 587     | STARTTLS     |
| Custom   | your.smtp.server      | 587/465 | STARTTLS/SSL |

## Testing the Form

### 1. Form Submission Test

1. **Navigate to the form**: http://localhost:3000/consulta-a-sociedade
2. **Fill out the form** with test data:

    - **Nome**: João Silva (required)
    - **E-mail**: your-test-email@gmail.com (required)
    - **Telefone**: (92) 9 1234-5678 (optional)
    - **Endereço**: Rua das Flores, 123 (optional)
    - **Bairro**: Centro (optional)
    - **Número**: 456 (optional)
    - **Área Temática**: Obras (optional)
    - **Pergunta**: Quando começará a obra da Av. Principal? (optional)

3. **Submit the form** and watch for:
    - Loading toast: "Enviando sua consulta..."
    - Success toast: "Consulta enviada com sucesso! Verifique seu e-mail para confirmação."
    - Form reset after successful submission

### 2. Database Verification

Check if the data was stored:

**Using Adminer (Docker):**

1. Go to http://localhost:8080
2. Login with your database credentials
3. Browse the `consulta_sociedade` table

**Using API endpoint:**

```bash
curl http://localhost:3000/api/email
```

### 3. Email Verification

1. **Check confirmation email** in the user's inbox
2. **Check notification email** in the admin inbox
3. **Check server logs** for email sending status

### 4. Error Testing

Test error scenarios:

- Submit form without required fields
- Use invalid email format
- Test with wrong database credentials
- Test with wrong email credentials

## API Endpoints

### POST /api/email

Handles form submission with database storage and email sending.

**Request Body:**

```json
{
    "nome": "João Silva",
    "email": "joao@email.com",
    "telefone": "(92) 9 1234-5678",
    "endereco": "Rua das Flores, 123",
    "bairro": "Centro",
    "numero": "123",
    "area_tematica": "Obras",
    "pergunta": "Quando começará a obra da Av. Principal?"
}
```

**Success Response:**

```json
{
  "success": true,
  "message": "Consulta enviada com sucesso! Verifique seu e-mail para confirmação.",
  "data": { ... }
}
```

**Error Response:**

```json
{
  "success": false,
  "error": "Dados inválidos",
  "details": [ ... ]
}
```

### GET /api/email

Retrieves all form submissions (for admin use).

**Response:**

```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "nome": "João Silva",
      "email": "joao@email.com",
      "created_at": "2024-01-15T10:30:00.000Z",
      ...
    }
  ]
}
```

## File Structure

```
src/
├── lib/
│   ├── database.ts          # Database connection and operations
│   └── email.ts             # Email configuration and sending
├── app/
│   ├── api/
│   │   └── email/
│   │       └── route.ts     # API route handler
│   ├── consulta-a-sociedade/
│   │   ├── hooks.ts         # Form submission logic
│   │   ├── schema.tsx       # Form validation schema
│   │   └── page.tsx         # Form UI component
│   └── layout.tsx           # App layout with Toaster
└── scripts/
    ├── init-database.js     # Database initialization script
    └── init-db.sql          # SQL initialization for Docker
```

## Database Functions

### `insertFormData(data)`

Inserts form submission data into the database.

### `getFormSubmissions()`

Retrieves all form submissions (for admin dashboard).

### `getFormSubmissionById(id)`

Retrieves a specific form submission by ID.

### `initializeDatabase()`

Creates the database table if it doesn't exist.

### `testConnection()`

Tests the database connection.

## Email Functions

### `sendConfirmationEmail(userData)`

Sends a confirmation email to the user who submitted the form.

### `sendNotificationEmail(userData)`

Sends a notification email to the admin about a new form submission.

### `verifyEmailConnection()`

Tests the email server connection.

## Error Handling

The system handles various error scenarios:

- **Database Connection Errors**: Logs error and returns appropriate HTTP status
- **Email Sending Errors**: Logs error but doesn't fail the request (form data is still saved)
- **Validation Errors**: Returns detailed validation errors using Zod
- **Network Errors**: Comprehensive error logging and user-friendly error messages
- **Form Validation**: Client-side validation with user-friendly messages
- **Toast Notifications**: Visual feedback for all user actions

## Security Considerations

1. **Environment Variables**: Never commit `.env` files to version control
2. **Database Security**: Use strong passwords and limit database user permissions
3. **Email Security**: Use app passwords instead of account passwords
4. **Input Validation**: All form data is validated using Zod schemas
5. **SQL Injection Protection**: Uses parameterized queries with mysql2

## Monitoring and Logging

All operations are logged to the console for debugging:

- Database connection status
- Email sending status
- Error messages with context
- Form submission confirmations

## Docker Development

### Services Included

The `docker-compose.yml` includes:

1. **App Service**: Next.js application
2. **MariaDB Service**: Database with automatic initialization
3. **Adminer Service**: Web-based database administration tool

### Docker Commands

```bash
# Start all services in background
npm run docker:up

# View logs
npm run docker:logs

# Stop all services
npm run docker:down

# Rebuild and start
npm run docker:build

# Remove everything including volumes
npm run docker:clean
```

### Database Management

Access the database through:

1. **Adminer Web Interface**: http://localhost:8080

    - Server: `mariadb`
    - Username: Your `DB_USER`
    - Password: Your `DB_PASSWORD`
    - Database: Your `DB_NAME`

2. **Direct Connection**:

```bash
docker-compose exec mariadb mysql -u consulta_user -p consulta_sociedade
```

### Volume Management

- **Database data**: Persisted in `mariadb_data` volume
- **Initialization**: SQL scripts in `./scripts/init-db.sql` auto-execute on first run

## Troubleshooting

### Common Issues

1. **Database Connection Failed**

    - Check database credentials in `.env`
    - Ensure MariaDB/MySQL is running
    - Verify network connectivity

2. **Email Not Sending**

    - Verify SMTP credentials
    - Check if 2FA is enabled (for Gmail)
    - Confirm SMTP server settings

3. **Form Validation Errors**

    - Check that required fields (nome, email) are provided
    - Verify email format is valid

4. **Toast Notifications Not Showing**
    - Ensure Toaster component is added to layout
    - Check browser console for JavaScript errors

### Debug Mode

Enable detailed logging by checking the browser console and server logs when testing the form.

## Performance Considerations

- **Connection Pooling**: Uses mysql2 connection pooling for efficient database connections
- **Async Operations**: All database and email operations are asynchronous
- **Error Isolation**: Email failures don't prevent database storage
- **Graceful Degradation**: System continues to work even if email service is unavailable

## Contributing

When adding new features:

1. Update environment variable documentation
2. Add proper error handling
3. Include logging for debugging
4. Test both success and failure scenarios
5. Update this README with new functionality
6. Test with both local and Docker development setups
