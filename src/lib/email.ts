import nodemailer from 'nodemailer';

// Email configuration
const emailConfig = {
    service: 'gmail',
    auth: {
        user: process.env.SMTP_USER || '',
        pass: process.env.SMTP_PASSWORD || '',
    },
};

// Create reusable transporter object using the default SMTP transport
const transporter = nodemailer.createTransport(emailConfig);

// Verify connection configuration
export const verifyEmailConnection = async () => {
    try {
        await transporter.verify();
        console.log('Email server is ready to take our messages');
        return true;
    } catch (error) {
        console.error('Email server connection failed:', error);
        return false;
    }
};

// Send confirmation email to user
export const sendConfirmationEmail = async (userData: {
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
        const mailOptions = {
            from: `"${process.env.FROM_NAME || 'Prefeitura de Manaus'}" <${process.env.FROM_EMAIL || emailConfig.auth.user}>`,
            to: userData.email,
            subject: 'Confirmação de Recebimento - Consulta à Sociedade',
            html: `
                <!DOCTYPE html>
                <html>
                <head>
                    <meta charset="utf-8">
                    <title>Confirmação de Recebimento</title>
                    <style>
                        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                        .header { background-color: #0066cc; color: white; padding: 20px; text-align: center; }
                        .content { background-color: #f9f9f9; padding: 20px; }
                        .footer { background-color: #333; color: white; padding: 10px; text-align: center; }
                        .data-row { margin: 10px 0; }
                        .label { font-weight: bold; }
                    </style>
                </head>
                <body>
                    <div class="container">
                        <div class="header">
                            <h1>Prefeitura de Manaus</h1>
                            <h2>Confirmação de Recebimento</h2>
                        </div>
                        <div class="content">
                            <p>Olá <strong>${userData.nome}</strong>,</p>
                            <p>Recebemos sua consulta e agradecemos sua participação! Seus dados foram registrados com sucesso.</p>
                            
                            <h3>Resumo dos dados enviados:</h3>
                            <div class="data-row">
                                <span class="label">Nome:</span> ${userData.nome}
                            </div>
                            <div class="data-row">
                                <span class="label">E-mail:</span> ${userData.email}
                            </div>
                            ${userData.telefone ? `<div class="data-row"><span class="label">Telefone:</span> ${userData.telefone}</div>` : ''}
                            ${userData.endereco ? `<div class="data-row"><span class="label">Endereço:</span> ${userData.endereco}</div>` : ''}
                            ${userData.bairro ? `<div class="data-row"><span class="label">Bairro:</span> ${userData.bairro}</div>` : ''}
                            ${userData.numero ? `<div class="data-row"><span class="label">Número:</span> ${userData.numero}</div>` : ''}
                            ${userData.area_tematica ? `<div class="data-row"><span class="label">Área Temática:</span> ${userData.area_tematica}</div>` : ''}
                            ${userData.pergunta ? `<div class="data-row"><span class="label">Pergunta:</span> ${userData.pergunta}</div>` : ''}
                            
                            <p>Em breve entraremos em contato com você. Obrigado por contribuir para uma cidade melhor!</p>
                        </div>
                        <div class="footer">
                            <p>&copy; 2024 Prefeitura de Manaus. Todos os direitos reservados.</p>
                        </div>
                    </div>
                </body>
                </html>
            `,
        };

        const info = await transporter.sendMail(mailOptions);
        console.log('Confirmation email sent:', info.messageId);
        return info;
    } catch (error) {
        console.error('Error sending confirmation email:', error);
        throw error;
    }
};

// Send notification email to admin
export const sendNotificationEmail = async (userData: {
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
        const adminEmail = process.env.ADMIN_EMAIL || 'admin@prefeitura.gov.br';

        const mailOptions = {
            from: `"${process.env.FROM_NAME || 'Prefeitura de Manaus'}" <${process.env.FROM_EMAIL || emailConfig.auth.user}>`,
            to: adminEmail,
            subject: `Nova Consulta à Sociedade - ${userData.area_tematica || 'Sem categoria'}`,
            html: `
                <!DOCTYPE html>
                <html>
                <head>
                    <meta charset="utf-8">
                    <title>Nova Consulta Recebida</title>
                    <style>
                        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                        .header { background-color: #cc6600; color: white; padding: 20px; text-align: center; }
                        .content { background-color: #f9f9f9; padding: 20px; }
                        .data-row { margin: 10px 0; }
                        .label { font-weight: bold; }
                        .priority { background-color: #ffebcd; padding: 15px; border-left: 4px solid #ff8c00; margin: 20px 0; }
                    </style>
                </head>
                <body>
                    <div class="container">
                        <div class="header">
                            <h1>Nova Consulta à Sociedade</h1>
                        </div>
                        <div class="content">
                            <div class="priority">
                                <strong>⚠️ Atenção:</strong> Nova consulta recebida e necessita de atenção!
                            </div>
                            
                            <h3>Dados do Cidadão:</h3>
                            <div class="data-row">
                                <span class="label">Nome:</span> ${userData.nome}
                            </div>
                            <div class="data-row">
                                <span class="label">E-mail:</span> ${userData.email}
                            </div>
                            ${userData.telefone ? `<div class="data-row"><span class="label">Telefone:</span> ${userData.telefone}</div>` : ''}
                            ${userData.endereco ? `<div class="data-row"><span class="label">Endereço:</span> ${userData.endereco}</div>` : ''}
                            ${userData.bairro ? `<div class="data-row"><span class="label">Bairro:</span> ${userData.bairro}</div>` : ''}
                            ${userData.numero ? `<div class="data-row"><span class="label">Número:</span> ${userData.numero}</div>` : ''}
                            ${userData.area_tematica ? `<div class="data-row"><span class="label">Área Temática:</span> ${userData.area_tematica}</div>` : ''}
                            
                            <h3>Pergunta/Consulta:</h3>
                            <div style="background-color: white; padding: 15px; border: 1px solid #ddd; border-radius: 5px;">
                                ${userData.pergunta || 'Nenhuma pergunta especificada'}
                            </div>
                            
                            <p><strong>Data de recebimento:</strong> ${new Date().toLocaleString('pt-BR')}</p>
                        </div>
                    </div>
                </body>
                </html>
            `,
        };

        const info = await transporter.sendMail(mailOptions);
        console.log('Notification email sent to admin:', info.messageId);
        return info;
    } catch (error) {
        console.error('Error sending notification email:', error);
        throw error;
    }
};

export default transporter;
