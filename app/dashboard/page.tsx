'use client'

import { useState } from "react";
import Sidebar from "./components/Sidebar";
import AdminArticlePage from "./components/Article";
import CategoryAdminPage from "./components/Category";
import LogoutAdminPage from "./components/Logout";


export default function DashboardAdmin() {

    const [ dashboardContent, setDashboardContent ] = useState<'Articles' | 'Category' | 'Logout' | ''>('Articles')

    return (
        <div className="grid grid-cols-6 w-screen h-screen">
            <section className="col-span-1 h-full w-full bg-blue-600">
                <Sidebar dashboardContent={dashboardContent} setDashboardContent={setDashboardContent} />
            </section>

            <section className="col-span-5 h-full w-full bg-gray-100">
                {dashboardContent === 'Articles' && <div><AdminArticlePage /></div>}
                {dashboardContent === 'Category' && <div><CategoryAdminPage /></div>}
                {dashboardContent === 'Logout' && <div><LogoutAdminPage /></div>}
            </section>
        </div>
    )
}