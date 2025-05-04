'use client'

import { UsersType } from "@/types/UserType";
import { useEffect, useState } from "react"

interface AdminHeaderProps {
    currentPage: string;
}

export default function AdminHeader({ currentPage }: AdminHeaderProps) {

    const [ username, setUsername ] = useState('');
    const [ firstChar, setFirstChar ] = useState('');

    useEffect(() => {
        const getStorage = localStorage.getItem('currentUser') || '[]';

        const getUser: UsersType = JSON.parse(getStorage);
        
        setUsername(getUser.username)
        setFirstChar(getUser.username[0])
    }, [])



    return (
        <div className="w-full h-[2vh] flex justify-between px-4 py-2">
            <div className="font-semibold text-slate-900">
                {currentPage}
            </div>

            <div>
                <div onClick={() => alert('TES')} className="flex md:gap-2 items-center">
                    <span className="w-fit h-fit px-3 py-1 bg-blue-200 rounded-full text-blue-900 font-medium">
                        {firstChar}
                    </span>
                    <span className={`hidden md:block underline md:text-sm underline-offset-3 font-medium`}>
                        {username}
                    </span>
                </div>
            </div>
        </div>
    )
}