import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { consultaSchema } from './schema';

export default function useFormConsultaSociedades() {
    const signInForm = useForm({
        resolver: zodResolver(consultaSchema),
    });

    const form = signInForm;
    const onSubmit = (d: any) => {
        return new Promise((resolve) => {
            setTimeout(() => {
                console.log(d);
                resolve(d);
            }, 1000);
        });
    };

    return { form, onSubmit, isPending: signInForm.formState.isSubmitting };
}
