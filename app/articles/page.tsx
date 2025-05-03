'use client'

import Header from "@/components/Header";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { UsersType } from "@/types/UserType";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import type { ArticlesType } from "@/types/ArticlesType";
import axios from "axios";
import { useForm, SubmitHandler } from "react-hook-form";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { Badge } from "@/components/ui/badge";

type SearchInput = {
    query: string;
}

export default function ArticleList() {

    const [ username, setUsername ] = useState<string | null>(null);
    const [ firstUsernameChar, setFirstUsernameChar ] = useState<string | null>(null);
    const [ articles, setArticles ] = useState<ArticlesType[]>([]);
    const { register, handleSubmit } = useForm<SearchInput>();
    const [ displayedArticles, setDisplayedArticles ] = useState<ArticlesType[]>([]);
    const [ currentPage, setCurrentPage ] = useState(1);
    const [ itemsPerPage, setItemsPerPage ] = useState(3); // Default mobile render 3 articles

    useEffect(() => {
        const getStore = localStorage.getItem('currentUser') || '[]'

        if (getStore) {
            const currentUser: UsersType = JSON.parse(getStore);
            setUsername(currentUser.username);
            setFirstUsernameChar(currentUser.username[0])
        }

    }, [])
    
    useEffect(() => {
        axios.get('https://test-fe.mysellerpintar.com/api/articles')
        .then(res => {
            setArticles(res.data.data || [])
            setDisplayedArticles(res.data.data || [])
        })

        const handleResize = () => {
            const isMobile = window.innerWidth >= 1080;
            setItemsPerPage(isMobile ? 9 : 3)
        }

        handleResize()

        window.addEventListener('resize', handleResize)

        return () => removeEventListener('resize', handleResize)

    }, [])

    const totalPage = Math.ceil(displayedArticles.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginationArticles = displayedArticles.slice(startIndex, endIndex)


    const filterByCategory = (category: string) => {
        const filterCategory = articles.filter(art => art.category.name === category)
        setDisplayedArticles(filterCategory)
    }

    const searchArticle = (query: string) => {
        const search = articles.filter(art => art.title.toLowerCase().includes(query.toLowerCase()))
        setDisplayedArticles(search)
    }

    const onSubmit: SubmitHandler<SearchInput> = (data) => {
        searchArticle(data.query)
    }


    return (
        <div className="w-screen h-screen relative">
                <div className="absolute w-full h-[70vh] z-0">
                        <Image 
                        src={'/hero.jpg'} 
                        fill
                        alt="Young Man"
                    />
                </div>
                <div className="absolute bg-[#2563EBDB] w-screen h-[70vh]" />

                <Header 
                    username={username}
                    usernameFirstChar={firstUsernameChar}
                />

{/* Filter Section */}
            <section id="articleList" className="w-full h-[75vh] relative flex flex-col justify-center items-center gap-10">
                <div className="w-full text-center text-white md:space-y-2 px-10 md:px-18 lg:px-73">
                    <p className="font-semibold text-xs">Blog genzet</p>
                    <h1 className="text-4xl font-medium">The Journal : Design Resources,Interviews, and Industry News</h1>
                    <p className="text-[20px]">Your daily dose of design insights!</p>
                </div>

                <div className="flex relative flex-col lg:flex-row w-[90vw] md:w-[52vw] lg:w-[50vw] h-[12vh] md:h-[10vh] lg:h-[8vh] justify-center items-center bg-blue-500 gap-4 rounded-lg px-4">
                    <div className="w-[85vw] md:w-[50vw] lg:w-[45vw] relative">
                        <Select onValueChange={(value) => filterByCategory(value)}>
                            <SelectTrigger className="bg-white w-[85vw] md:w-[50vw] lg:w-[15vw]">
                                <SelectValue placeholder='Select Category' />
                            </SelectTrigger>
                            <SelectContent>
                                {articles.map((art, index) => (
                                    <SelectItem key={index} value={art.category.name} onClick={() => filterByCategory(art.category.name)}>{art.category.name}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)} className="flex items-center w-[85vw] md:w-[50vw] lg:w-[95vw]">
                        <Search size={20} color="#94A3B8" className="absolute translate-x-2" />
                        <Input {...register('query')} placeholder="Search Articles" className="pl-9 bg-white" />
                    </form>
                </div>
            </section>

            <section className="w-full h-full px-10">
                <div>
                    <p>Showing {paginationArticles.length} of {articles.length} articles</p>
                </div>

                <div className="w-full h-full grid grid-cols-1 lg:grid-cols-3 justify-items-center relative mt-10">
                    {paginationArticles.map((a, idx) => (
                        <div key={idx} className="flex flex-col w-full h-[50vh] justify-between items-center">
                            <div className="relative rounded-lg flex flex-col gap-2 w-[85vw] h-[30vh] md:w-[70vw] md:h-[30vh] lg:w-[25vw] lg:h-[25vh] bg-white border">
                                {a.imageUrl ? (
                                    <Image 
                                    src={a.imageUrl}
                                    alt={a.title}
                                    fill
                                    className="rounded-lg"
                                    />
                                ) : (
                                    <p>No Image</p>
                                ) }
                            </div>
                            <div className="flex flex-col gap-1 mt-4 w-[85vw] h-[30vh] md:w-[70vw] md:h-[0vh] lg:w-[25vw] lg:h-[25vh]">
                                <p className="text-xs text-slate-600">{new Date(a.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
                                <h2 className="text-slate-900 font-semibold text-xl">{a.title}</h2>
                                <p className="text-slate-600">{a.content.length >= 10 ? a.content.slice(0, 70) + '...' : a.content}</p>
                                <div className="flex gap-2 mt-2 mb-10">
                                    <Badge className="bg-blue-200 text-blue-900">{a.category.name}</Badge>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>


                    <Pagination className="relative mt-95 md:mt-135 lg:mt-95">
                        <PaginationContent>
                            <PaginationItem>
                                <PaginationPrevious onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))} href={"#"}  />
                            </PaginationItem>
                            {Array.from({ length: totalPage }, (_, i) => (
                                <PaginationItem key={i}>
                                    <PaginationLink isActive={currentPage === i + 1} onClick={() => setCurrentPage(i + 1)} href={""}  >
                                        {i + 1}
                                    </PaginationLink>
                                </PaginationItem>
                            ))}
                            <PaginationItem>
                                <PaginationNext onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPage))} href={""} />
                            </PaginationItem>
                        </PaginationContent>
                    </Pagination>

            </section>
        </div>
    )
}