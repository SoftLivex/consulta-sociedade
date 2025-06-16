import { zodResolver } from '@hookform/resolvers/zod';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { consultaSchema } from './schema';
export default function useFormConsultaSociedades() {
    const { executeRecaptcha } = useGoogleReCaptcha();
    const form = useForm({
        resolver: zodResolver(consultaSchema),
        defaultValues: {
            recaptcha: '',
        },
    });

    const onSubmit = async (data: any) => {
        try {
            if (!executeRecaptcha) {
                toast.error(
                    'reCAPTCHA não carregado. Tente novamente em instantes.',
                );
                throw new Error('reCAPTCHA não disponível');
            }

            // Executa o reCAPTCHA antes de enviar
            const token = await executeRecaptcha('form_submit');
            data.recaptcha = token;

            const loadingToast = toast.loading('Enviando sua consulta...');

            const response = await fetch('/api/email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            const result = await response.json();
            toast.dismiss(loadingToast);

            if (response.ok && result.success) {
                toast.success(
                    result.message ||
                        'Consulta enviada com sucesso! Verifique seu e-mail para confirmação.',
                );
                form.reset();
                return result;
            } else {
                const errorMessage = result.error || 'Erro ao enviar consulta';
                toast.error(errorMessage);
                if (result.details) {
                    console.error('Form validation errors:', result.details);
                }
                throw new Error(errorMessage);
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            let errorMessage = 'Erro ao enviar consulta. Tente novamente.';
            if (error instanceof Error) {
                if (error.message.includes('fetch')) {
                    errorMessage =
                        'Erro de conexão. Verifique sua internet e tente novamente.';
                } else if (!error.message.includes('Erro ao')) {
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
        isPending: form.formState.isSubmitting,
    };
}
