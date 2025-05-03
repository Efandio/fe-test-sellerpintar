
'use client'

import Image from "next/image"
import { z } from "zod"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useForm, SubmitHandler, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { setUser } from "@/lib/localStorage"
import { UsersType } from "@/types/UserType"
import { useRouter } from "next/navigation"


const RolesEnum = z.enum(['User', 'Admin']);
type RolesEnum = z.infer<typeof RolesEnum>;

const RegisterSchema = z.object({
    username: z.string().min(3, { message: 'Username field cannot be empty' }),
    password: z.string().min(8, { message: 'Password must be at least 8 characters long' }),
    roles: RolesEnum
})

type RegisterSchema = z.infer<typeof RegisterSchema>

export default function RegisterForm() {

    const { register, handleSubmit, control,  formState: { errors } } = useForm({
        resolver: zodResolver(RegisterSchema)
    })

    const router = useRouter()

    const onSubmit: SubmitHandler<RegisterSchema> = (data: RegisterSchema) => {
        // assigned users data
        const newUsers: UsersType = {
            username: data.username,
            password: data.password,
            roles: data.roles,
        };

        //  if key: users doesnt exist, turn into empty array
        const users: UsersType[] = JSON.parse(localStorage.getItem('users') || '[]')

        const user = users.find(u => u.username === data.username && u.password === data.password && u.roles === data.roles)
        
        // if key: users exist insert newUsers into array
        const addNewUsers = [...users, newUsers];

        // set to localStorage
        setUser(addNewUsers)

        if (user) {
            if (user.roles === 'Admin') {
                router.push('/dashboard')
            } else {
                router.push('/articles')
            }
        }
    }

    return (
        <main className="w-screen h-screen bg-[#F3F4F6] flex flex-col justify-center items-center">
            <div className="w-full h-[50vh] md:w-[50vw] md:h-[40vh] lg:w-[40vw] lg:h-[75vh] md:bg-white rounded-lg flex flex-col justify-center items-center gap-10">
                <div className="relative w-[40vw] aspect-[3/1] md:w-[30vw] lg:w-[20vw] translate-y-6">
                    <Image 
                    src={'/authLogo.svg'}
                    fill
                    alt="Auth Logo"
                    priority
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
                    <div className="flex flex-col gap-1">
                    <label htmlFor="">Role</label>
                        <Controller
                            control={control}
                            name="roles"
                            render={({ field }) => (
                            <Select onValueChange={field.onChange} value={field.value}>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder='Select Role' />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="User">
                                        User
                                    </SelectItem>
                                    <SelectItem value="Admin">
                                        Admin
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                            )}
                        />
                    </div>

                    <Button type="submit" className="bg-blue-600 w-full mt-6 font-normal">Register</Button>
                </form>

                <span className="text-xs -translate-y-5">
                    Already have an account?
                    <Link className="text-blue-500 pl-1" href={'/auth/login'}>Login</Link>
                </span>
            </div>
        </main>
    )
}