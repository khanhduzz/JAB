import React from 'react'
import { FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from './ui/form'
import { Input } from './ui/input'
import { Control, FieldValues, Form, Path, UseFormReturn } from 'react-hook-form'
import { z } from 'zod'

interface CustomInputProps<T extends FieldValues>{
    form: UseFormReturn<T>;
    name: Path<T>;
    label: string;
    type: string;
    placeholder?: string;
}

const CustomInput = <T extends FieldValues>({
    form,
    name,
    label,
    type,
    placeholder,
}: CustomInputProps<T>) => {
    return (
        <>
            <FormField
                control={form.control}
                name={name}
                render={({ field }) => (
                    <FormItem className="form-item">
                        <FormLabel className="form-label">{label}</FormLabel>
                        <div className="flex w-full flex-col">
                            <FormControl>
                                <Input
                                    placeholder={placeholder}
                                    className="input-class"
                                    type={type}
                                    {...field}
                                />
                            </FormControl>
                            <FormDescription></FormDescription>
                            <FormMessage className="form-message mt-2" />
                        </div>
                    </FormItem>
                )}
            />
        </>
    )
}

export default CustomInput