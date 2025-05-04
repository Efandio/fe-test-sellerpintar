'use client'

import { Button } from "@/components/ui/button";
import { LogOut, Newspaper, Tag } from "lucide-react";
import Image from "next/image"

interface SidebarProps {
    dashboardContent: string;
    setDashboardContent: (content: 'Articles' | 'Category' | 'Logout' | '') => void;
}

const navButton = [
    {
        icon: <Newspaper size={20} color="#ffffff" />,
        label: 'Articles',
        link: '',
    },
    {
        icon: <Tag size={20} color="#ffffff" />,
        label: 'Category',
        link: '',
    },
    {
        icon: <LogOut size={20} color="#ffffff" />,
        label: 'Logout',
        link: '',
    },
]

export default function Sidebar({ dashboardContent, setDashboardContent }: SidebarProps) {

    const handleDashboardContent = (label: 'Articles' | 'Category' | 'Logout') => {
        setDashboardContent(label)
    }


    return (
        <div className="w-full h-full relative flex flex-col py-5">
            <div className="relative w-[134px] h-[24px] mx-4">
                <Image 
                    src={'/Logo.svg'}
                    alt=""
                    fill
                />
            </div>
            <nav className="w-full mt-8 flex flex-col gap-1 px-2">
                {navButton.map((btn, index) => (
                    <Button onClick={() => handleDashboardContent(btn.label as 'Articles' | 'Category' | 'Logout')} key={index} className={`bg-transparent w-full text-left justify-start hover:bg-blue-800 ${dashboardContent === btn.label ? 'bg-blue-500' : ''}`} >
                        {btn.icon} {btn.label}
                    </Button>
                ))}
            </nav>
        </div>
    )
}