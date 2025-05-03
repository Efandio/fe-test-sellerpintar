'use client'

import Image from "next/image"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useForm, SubmitHandler } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import Link from "next/link"
import type { UsersType } from "@/types/UserType"
import { useRouter } from "next/navigation"

const LoginSchema = z.object({
    username: z.string().min(3, { message: 'Username field cannot be empty' }),
    password: z.string().min(8, { message: 'Password must be at least 8 characters long' }),
})

type LoginSchema = z.infer<typeof LoginSchema>

export default function LoginForm() {

    const { register, handleSubmit,formState: { errors } } = useForm({
        resolver: zodResolver(LoginSchema)
    })
    
    const route = useRouter()

    const onSubmit: SubmitHandler<LoginSchema> = (data: LoginSchema) => {
        // Check local storage for validation
        const users: UsersType[] = JSON.parse(localStorage.getItem('users') || '[]');
        const user = users.find(u => u.username === data.username && u.password === data.password);

        if (user) {
            console.log(`benar`)
            localStorage.setItem('currentUser', JSON.stringify(user))
            if (user.roles === 'Admin') {
                route.push('/dashboard')
            } else {
                route.push('/articles')
            }
        } else {
            console.log('Salah woii')
        }

    };
    
    return (
        <main className="w-screen h-screen bg-[#F3F4F6] flex flex-col justify-center items-center">
            <div className="w-full h-[50vh] md:w-[50vw] md:h-[35vh] lg:w-[40vw] lg:h-[60vh] md:bg-white rounded-lg flex flex-col justify-center items-center gap-10">
                <div className="relative w-[40vw] h-[15vh] md:w-[30vw] md:h-[5vh] translate-y-14 md:translate-y-6">
                    <Image 
                    src={'/authLogo.svg'}
                    fill
                    alt="Auth Logo"
                    />
                </div>

                <form className="flex flex-col gap-2 w-full px-10" onSubmit={handleSubmit(onSubmit)}>
                    <div className="flex flex-col gap-1">
                        <label htmlFor="">Username</label>
                        <Input {...register('username', {required: true})} placeholder="Username" />
                        {errors.username && <span className="text-xs text-red-500">
                            {errors.username.message}
                        </span>}
                    </div>
                    <div className="flex flex-col gap-1">
                        <label htmlFor="">Password</label>
                        <Input type="password" {...register('password', {required: true})} placeholder="Password" />
                        {errors.password && <span className="text-xs text-red-500">
                            {errors.password.message}
                        </span>}
                    </div>

                    <Button type="submit" className="bg-blue-600 w-full mt-6 font-normal">Login</Button>
                </form>

                <span className="text-xs -translate-y-5">
                    Dont have an account?
                    <Link className="text-blue-500 pl-1" href={'/auth/register'}>Register</Link>
                </span>
            </div>
    </main>
    )
}