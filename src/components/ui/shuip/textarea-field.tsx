import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import * as React from 'react';
import type {
    FieldPath,
    FieldValues,
    UseFormRegisterReturn,
} from 'react-hook-form';

export interface TextareaFieldProps<T extends FieldValues>
    extends React.ComponentProps<typeof Textarea> {
    register: UseFormRegisterReturn<FieldPath<T>>;
    label?: string;
    description?: string;
}

export function TextareaField<T extends FieldValues>({
    register,
    label,
    description,
    ...props
}: TextareaFieldProps<T>) {
    return (
        <FormField
            {...register}
            render={({ field }) => {
                return (
                    <FormItem>
                        <FormLabel className="flex items-center justify-between">
                            {label}
                            <FormMessage className="max-sm:hidden text-xs opacity-80" />
                        </FormLabel>
                        <FormControl>
                            <Textarea {...field} {...props} />
                        </FormControl>
                        {description && (
                            <p className="text-muted-foreground text-xs">
                                {description}
                            </p>
                        )}
                        <FormMessage className="sm:hidden text-xs text-left opacity-80" />
                    </FormItem>
                );
            }}
        />
    );
}
