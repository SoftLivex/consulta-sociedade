'use client';

import React from 'react';
import {
    GoogleReCaptchaProvider,
    useGoogleReCaptcha,
} from 'react-google-recaptcha-v3';
import { FieldPath, FieldValues, UseFormSetValue } from 'react-hook-form';

interface ReCaptchaFieldProps<T extends FieldValues> {
    name: FieldPath<T>;
    setValue: UseFormSetValue<T>;
    siteKey: string;
    onExecute?: () => void; // callback opcional para avisar que executou
}

export function ReCaptchaField<T extends FieldValues>({
    name,
    setValue,
    siteKey,
    onExecute,
}: ReCaptchaFieldProps<T>) {
    return (
        <GoogleReCaptchaProvider reCaptchaKey={siteKey}>
           {children}
        </GoogleReCaptchaProvider>
    );
}

function ReCaptchaRunner<T extends FieldValues>({
    name,
    setValue,
    onExecute,
}: {
    name: FieldPath<T>;
    setValue: UseFormSetValue<T>;
    onExecute?: () => void;
}) {
    const { executeRecaptcha } = useGoogleReCaptcha();

    // Exponha função para o submit disparar
    const runRecaptcha = React.useCallback(async () => {
        if (!executeRecaptcha) {
            console.warn('executeRecaptcha ainda não está pronto');
            return;
        }

        try {
            const token: any = await executeRecaptcha('form_submit');
            setValue(name, token, { shouldValidate: true });
            onExecute?.();
        } catch (err) {
            console.error('Erro ao executar reCAPTCHA:', err);
        }
    }, [executeRecaptcha, name, setValue, onExecute]);

    return null;
}
