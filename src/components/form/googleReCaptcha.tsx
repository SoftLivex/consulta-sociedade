'use client';

import React from 'react';
import {
    GoogleReCaptcha,
    GoogleReCaptchaProvider,
} from 'react-google-recaptcha-v3';
import { Control, Controller, FieldPath, FieldValues } from 'react-hook-form';

interface ReCaptchaFieldProps<T extends FieldValues> {
    name: FieldPath<T>;
    control: Control<T>;
    siteKey: string;
    refresh?: ()=>void;
}

export function ReCaptchaField<T extends FieldValues>({
    name,
    control,
    siteKey,
    refresh,
}: ReCaptchaFieldProps<T>) {
    const [refreshReCaptcha, setRefreshReCaptcha] = React.useState(false);
    React.useEffect(() => {
        if (refresh) {
            setRefreshReCaptcha(true);
            refresh();
        } else {
            setRefreshReCaptcha(false);
        }
    }, [refresh]);
    
    return (
        <GoogleReCaptchaProvider reCaptchaKey={siteKey}>
            <Controller
                control={control}
                name={name}
                render={({ field }) => (
                    <GoogleReCaptcha
                        onVerify={(token) => {
                            field.onChange(token);
                        }}
                        refreshReCaptcha={refreshReCaptcha}
                    />
                )}
            />
        </GoogleReCaptchaProvider>
    );
}
