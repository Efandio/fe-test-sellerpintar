import Image from "next/image";

interface HeaderProps {
    username: string | null;
    usernameFirstChar: string | null;
}


export default function Header({ username, usernameFirstChar }: HeaderProps) {
    return (
        <header className="z-50 w-full h-[8vh] flex items-center justify-between px-10 fixed bg-white md:bg-transparent md:py-10 md:px-18">
            <div className="w-[35vw] md:w-[180px] lg:w-[134px] h-[80px] lg:h-[24px] relative">
                <Image 
                    src={'/authLogo.svg'}
                    fill
                    alt="Logo"
                    className="md:hidden"
                />
                <Image 
                    src={'/Logo.svg'}
                    fill
                    alt="Logo"
                    className="hidden md:block"
                />
            </div>
            <div onClick={() => alert('TES')} className="flex md:gap-2 items-center">
                <span className="w-fit h-fit px-3 py-1 bg-blue-200 rounded-full text-blue-900 font-medium">
                    {usernameFirstChar}
                </span>
                <span className="hidden md:block underline text-white md:text-sm underline-offset-3 font-medium">
                    {username}
                </span>
            </div>
        </header>
    )
}