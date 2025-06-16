import z from '@/shared/schemas/zod';

export const consultaSchema = z.object({
    nome: z.string().min(1, { message: 'Nome é obrigatório' }),
    email: z.string().email({ message: 'Email inválido' }),
    telefone: z.string().optional(),
    endereco: z.string().optional(),
    bairro: z.string().optional(),
    numero: z.string().optional(),
    pergunta: z.string().optional(),
    area_tematica: z.string().optional(),
});
