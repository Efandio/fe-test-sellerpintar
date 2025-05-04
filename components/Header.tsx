'use client'

import Image from "next/image";
import { useEffect, useState } from "react";
import type { UsersType } from "@/types/UserType";


interface HeaderProps {
    blueLogo: string;
    whiteLogo: string;
    blueLogoClassName: string;
    whiteLogoClassName: string;
    usernameClassName: string;
}

export default function Header({ blueLogo, whiteLogo, blueLogoClassName, whiteLogoClassName, usernameClassName }: HeaderProps ) {

    const [ username, setUsername ] = useState<string>('');
    const [ usernameFirstChar, setUsernameFirstChar ] = useState<string>('');
    

    useEffect(() => {
        const getStore = localStorage.getItem('currentUser') || '[]';
    
        if (getStore) {
            const currentUser: UsersType = JSON.parse(getStore);
            setUsername(currentUser.username);
            setUsernameFirstChar(currentUser.username[0]);
        };
    }, []);



    return (
        <header className="z-50 w-full h-[8vh] flex items-center justify-between px-10 fixed bg-white md:bg-transparent md:py-10 md:px-18">
            <div className="w-[35vw] md:w-[180px] lg:w-[134px] h-[80px] lg:h-[24px] relative">
                <Image 
                    src={blueLogo}
                    fill
                    alt="Logo"
                    className={blueLogoClassName}
                />
                <Image 
                    src={whiteLogo}
                    fill
                    alt="Logo"
                    className={whiteLogoClassName}
                />
            </div>
            <div onClick={() => alert('TES')} className="flex md:gap-2 items-center">
                <span className="w-fit h-fit px-3 py-1 bg-blue-200 rounded-full text-blue-900 font-medium">
                    {usernameFirstChar}
                </span>
                <span className={`hidden md:block underline md:text-sm underline-offset-3 font-medium ${usernameClassName}`}>
                    {username}
                </span>
            </div>
        </header>
    )
}