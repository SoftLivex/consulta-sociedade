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
});

export async function POST(request: NextRequest) {
    try {
        // Parse request body
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

        // Initialize database (create table if it doesn't exist)
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

        // Send emails (don't fail the request if email fails)
        const emailPromises = [];

        try {
            // Verify email connection first
            const emailConnectionOk = await verifyEmailConnection();

            if (emailConnectionOk) {
                // Send confirmation email to user
                emailPromises.push(
                    sendConfirmationEmail(formData).catch((error) => {
                        console.error(
                            'Error sending confirmation email:',
                            error,
                        );
                        return null;
                    }),
                );

                // Send notification email to admin
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

        // Wait for all email promises to complete (but don't fail if they don't)
        if (emailPromises.length > 0) {
            await Promise.allSettled(emailPromises);
        }

        // Return success response
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

// Optional: GET method to retrieve form submissions (for admin use)
export async function GET() {
    try {
        const { getFormSubmissions } = await import('@/lib/database');
        const submissions = await getFormSubmissions();

        return NextResponse.json(
            {
                success: true,
                data: submissions,
            },
            { status: 200 },
        );
    } catch (error) {
        console.error('Error fetching submissions:', error);
        return NextResponse.json(
            {
                success: false,
                error: 'Erro ao buscar submissões',
            },
            { status: 500 },
        );
    }
}
