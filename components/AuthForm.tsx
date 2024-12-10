'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import CustomInput from './CustomInput'
import { Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { signIn, signUp } from '@/lib/actions/user.actions'

const buildFormSchema = (type: string) => {
    const formSchema = z.object({
        email: z.string().email(),
        password: z.string().min(8, {
            message: "Password must be at least 5 characters.",
        }),
        firstName: type === 'sign-in' ? z.string().optional()
            : z.string().min(1, { message: "First name is required." }),
        lastName: type === 'sign-in' ? z.string().optional()
            : z.string().min(1, { message: "Last name is required." }),
        address: type === 'sign-in' ? z.string().optional()
            : z.string().min(1, { message: "Address is required." }),
        city: type === 'sign-in' ? z.string().optional()
            : z.string().min(1, { message: "City is required." }),
        state: type === 'sign-in' ? z.string().optional()
            : z.string().min(1, { message: "State is required." }),
        postalCode: type === 'sign-in' ? z.string().optional()
            : z.string().min(1, { message: "Postal code is required." }),
        dateOfBirth: type === 'sign-in' ? z.string().optional()
            : z.string().date().refine(date => {
                const parsedDate = new Date(date);
                return parsedDate < new Date();
            }, {
                message: "Date of birth must be before today.",
            }),
    })

    return formSchema;
}


const AuthForm = ({ type }: { type: string }) => {

    const router = useRouter();
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const formSchema = buildFormSchema(type);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
            firstName: '',
            lastName: '',
            address: '',
            city: '',
            state: '',
            postalCode: '',
            dateOfBirth: '',
        },
    })

    const onSubmit = async (data: z.infer<typeof formSchema>) => {
        setIsLoading(true);

        try {
            if (type === 'sign-up') {
                const newUser = await signUp(data);
                setUser(newUser);
            }

            if (type === 'sign-in') {
                const response = await signIn({
                    email: data.email,
                    password: data.password,
                })

                if(response) router.push('/')
            }
            
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <>
            <section className="auth-form">
                <header className="flex flex-col gap-5 md:gap-8">
                    <Link href="/" className='cursor-pointer flex items-center gap-1'>
                        <Image
                            src="/icons/logo.svg"
                            width={34}
                            height={34}
                            alt='Logo'
                        />
                        <h1 className="text-26 font-ibm-plex-serif font-bold text-black-1">Horizon</h1>
                    </Link>

                    <div className="flex flex-col gap-1 md:gap-3">
                        <h1 className='text-24 lg:text-36 font-semibold text-gray-700'>
                            {user
                                ? 'Link Account'
                                : type === 'sign-in'
                                    ? 'Sign In'
                                    : 'Sign Up'}
                            <p className="text-16 font-normal text-gray-600">
                                {user
                                    ? 'Link your account to get started'
                                    : 'Please enter your detail'}
                            </p>
                        </h1>
                    </div>
                </header>

                {user ? (
                    <div className="flex flex-col gap-4">
                        {/* PlaidLink */}
                    </div>
                ) : (
                    <>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                                {type === 'sign-up' ? (
                                    <>
                                        <div className='flex gap-4'>
                                            <CustomInput
                                                form={form}
                                                name="firstName"
                                                placeholder="Ex: David"
                                                label="First Name"
                                                type="text"
                                            />
                                            <CustomInput
                                                form={form}
                                                name="lastName"
                                                placeholder="Ex: Malan"
                                                label="Last Name"
                                                type="text"
                                            />
                                        </div>
                                        <CustomInput
                                            form={form}
                                            name="address"
                                            placeholder="Enter your address"
                                            label="Address"
                                            type="text"
                                        />
                                        <CustomInput
                                            form={form}
                                            name="city"
                                            placeholder="Enter your city"
                                            label="City"
                                            type="text"
                                        />
                                        <div className='flex gap-4'>
                                            <CustomInput
                                                form={form}
                                                name="state"
                                                placeholder="Ex: NY"
                                                label="State"
                                                type="text"
                                            />
                                            <CustomInput
                                                form={form}
                                                name="postalCode"
                                                placeholder="Ex: 1101"
                                                label="Postal Code"
                                                type="text"
                                            />
                                        </div>
                                        <CustomInput
                                            form={form}
                                            name="dateOfBirth"
                                            placeholder="Enter your Date of birth"
                                            label="Date of birth"
                                            type="date"
                                        />
                                        <CustomInput
                                            form={form}
                                            name="email"
                                            placeholder="Enter your email"
                                            label="Email"
                                            type="text"
                                        />
                                        <CustomInput
                                            form={form}
                                            name="password"
                                            placeholder="Enter your password"
                                            label="Password"
                                            type='password'
                                        />
                                    </>
                                ) : (
                                    <>
                                        <CustomInput
                                            form={form}
                                            name="email"
                                            placeholder="Enter your email"
                                            label="Email"
                                            type="text"
                                        />
                                        <CustomInput
                                            form={form}
                                            name="password"
                                            placeholder="Enter your password"
                                            label="Password"
                                            type='password'
                                        />
                                    </>
                                )}

                                <div className='flex flex-col gap-4'>
                                    <Button type="submit" className='form-btn' disabled={isLoading}>
                                        {isLoading ? (
                                            <>
                                                <Loader2
                                                    size={20}
                                                    className='animate-spin'
                                                /> &nbsp;Loading...
                                            </>
                                        ) : type === 'sign-in'
                                            ? "Sign In" : "Sign Up"}
                                    </Button>
                                </div>
                            </form>
                        </Form>

                        <footer className="flex justify-center gap-1">
                            <p className="text-14 font-normal text-gray-600">
                                {type === 'sign-in'
                                    ? "Don't have an account?"
                                    : "Already have an account?"}
                            </p>
                            <Link
                                href={type === 'sign-in' ? '/sign-up' : '/sign-in'} className='form-link'
                            >
                                {type === 'sign-in' ? 'Sign up' : 'Sign in'}
                            </Link>
                        </footer>
                    </>
                )}
            </section>
        </>
    )
}

export default AuthForm 