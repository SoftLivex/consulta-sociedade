import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { consultaSchema } from './schema';
export default function useFormConsultaSociedades() {
    const form = useForm({
        resolver: zodResolver(consultaSchema),
    });

    const onSubmit = async (data: any) => {
        return toast.promise(
            fetch('/api/email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            }),
            {
                loading: '',
                success: {
                    message:
                        'Consulta enviada com sucesso! Verifique seu e-mail para confirmação.',
                    onAutoClose: () => form.reset(),
                },
                error: 'Erro ao enviar consulta',
            },
        );
        // try {

        //     const response = await ;

        //     const result = await response.json();
        //     toast.dismiss(loadingToast);

        //     if (response.ok && result.success) {
        //         toast.success(
        //             result.message ||
        //                 'Consulta enviada com sucesso! Verifique seu e-mail para confirmação.',
        //         );
        //         form.reset();
        //         return result;
        //     } else {
        //         const errorMessage = result.error || 'Erro ao enviar consulta';
        //         toast.error(errorMessage);
        //         if (result.details) {
        //             console.error('Form validation errors:', result.details);
        //         }
        //         throw new Error(errorMessage);
        //     }
        // } catch (error) {
        //     console.error('Error submitting form:', error);
        //     let errorMessage = 'Erro ao enviar consulta. Tente novamente.';
        //     if (error instanceof Error) {
        //         if (error.message.includes('fetch')) {
        //             errorMessage =
        //                 'Erro de conexão. Verifique sua internet e tente novamente.';
        //         } else if (!error.message.includes('Erro ao')) {
        //             errorMessage =
        //                 'Erro inesperado. Tente novamente em alguns instantes.';
        //         }
        //     }
        //     toast.error(errorMessage);
        //     throw error;
        // }
    };

    return {
        form,
        onSubmit,
        isPending: form.formState.isSubmitting,
    };
}
