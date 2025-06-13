import z from '@/shared/schemas/zod';

export const consultaSchema = z.object({
    nome: z.string().min(1, { message: 'Nome é obrigatório' }),
    email: z.string().email({ message: 'Email inválido' }),
    telefone: z.string().min(1, { message: 'Telefone é obrigatório' }),
    endereco: z.string().min(1, { message: 'Endereço é obrigatório' }),
    bairro: z.string().min(1, { message: 'Bairro é obrigatório' }),
    numero: z.string().min(1, { message: 'Número é obrigatório' }),
    pergunta: z.string().min(1, { message: 'Pergunta é obrigatório' }),
    area_tematica: z
        .string()
        .min(1, { message: 'Área temática é obrigatória' }),
});
