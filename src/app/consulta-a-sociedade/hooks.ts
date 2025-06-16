import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { consultaSchema } from './schema';

export default function useFormConsultaSociedades() {
    const signInForm = useForm({
        resolver: zodResolver(consultaSchema),
    });

    const form = signInForm;

    const onSubmit = async (data: any) => {
        try {
            // Show loading toast
            const loadingToast = toast.loading('Enviando sua consulta...');

            // Call the API endpoint
            const response = await fetch('/api/email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            const result = await response.json();

            // Dismiss loading toast
            toast.dismiss(loadingToast);

            if (response.ok && result.success) {
                // Success - show success message
                toast.success(
                    result.message ||
                        'Consulta enviada com sucesso! Verifique seu e-mail para confirmação.',
                );

                // Reset form after successful submission
                form.reset();

                return result;
            } else {
                // Handle API errors
                const errorMessage = result.error || 'Erro ao enviar consulta';
                toast.error(errorMessage);

                // Log detailed errors for debugging
                if (result.details) {
                    console.error('Form validation errors:', result.details);
                }

                throw new Error(errorMessage);
            }
        } catch (error) {
            // Handle network or other errors
            console.error('Error submitting form:', error);

            let errorMessage = 'Erro ao enviar consulta. Tente novamente.';

            if (error instanceof Error) {
                // Don't show technical error messages to users
                if (error.message.includes('fetch')) {
                    errorMessage =
                        'Erro de conexão. Verifique sua internet e tente novamente.';
                } else if (!error.message.includes('Erro ao')) {
                    // Only show user-friendly error messages
                    errorMessage =
                        'Erro inesperado. Tente novamente em alguns instantes.';
                }
            }

            toast.error(errorMessage);
            throw error;
        }
    };

    return {
        form,
        onSubmit,
        isPending: signInForm.formState.isSubmitting,
    };
}
