import { initializeDatabase, insertFormData } from '@/lib/database';
import {
    sendConfirmationEmail,
    sendNotificationEmail,
    verifyEmailConnection,
} from '@/lib/email';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

// Form validation schema
const FormSchema = z.object({
    nome: z.string().min(1, 'Nome é obrigatório'),
    email: z.string().email('E-mail inválido'),
    telefone: z.string().optional(),
    endereco: z.string().optional(),
    bairro: z.string().optional(),
    numero: z.string().optional(),
    area_tematica: z.string().optional(),
    pergunta: z.string().optional(),
    // recaptcha: z.string().min(1, 'reCAPTCHA obrigatório'), // adicionando recaptcha no schema
});

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        // Validate form data
        const validationResult = FormSchema.safeParse(body);
        if (!validationResult.success) {
            return NextResponse.json(
                {
                    success: false,
                    error: 'Dados inválidos',
                    details: validationResult.error.issues,
                },
                { status: 400 },
            );
        }

        const formData = validationResult.data;

        // Initialize database
        await initializeDatabase();

        // Insert data into database
        try {
            const dbResult = await insertFormData(formData);
            console.log('Data inserted into database:', dbResult);
        } catch (dbError) {
            console.error('Database error:', dbError);
            return NextResponse.json(
                {
                    success: false,
                    error: 'Erro ao salvar dados no banco de dados',
                },
                { status: 500 },
            );
        }

        // Send emails
        const emailPromises = [];
        try {
            const emailConnectionOk = await verifyEmailConnection();

            if (emailConnectionOk) {
                emailPromises.push(
                    sendConfirmationEmail(formData).catch((error) => {
                        console.error(
                            'Error sending confirmation email:',
                            error,
                        );
                        return null;
                    }),
                );
                emailPromises.push(
                    sendNotificationEmail(formData).catch((error) => {
                        console.error(
                            'Error sending notification email:',
                            error,
                        );
                        return null;
                    }),
                );
            } else {
                console.warn('Email connection failed, skipping email sending');
            }
        } catch (emailError) {
            console.error('Email setup error:', emailError);
        }

        if (emailPromises.length > 0) {
            await Promise.allSettled(emailPromises);
        }

        return NextResponse.json(
            {
                success: true,
                message:
                    'Consulta enviada com sucesso! Verifique seu e-mail para confirmação.',
                data: formData,
            },
            { status: 200 },
        );
    } catch (error) {
        console.error('API Error:', error);
        return NextResponse.json(
            {
                success: false,
                error: 'Erro interno do servidor',
            },
            { status: 500 },
        );
    }
}
