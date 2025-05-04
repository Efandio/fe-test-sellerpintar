
import Header from "@/components/Header";
import { Badge } from "@/components/ui/badge";
import { ArticlesType } from "@/types/ArticlesType";
import axios from "axios";
import Image from "next/image";

interface ArticlePageProps {
    params: Promise<{id: string}>
};

export default async function ArticleDetails({ params }: ArticlePageProps) {

    const { id } = await params
    
    const res = await axios.get(`https://test-fe.mysellerpintar.com/api/articles/`)
    const details: ArticlesType[] = res.data.data;

    const detailsArticles = details.filter(i => i.id === id)

    const otherArticles = details.filter(a => a.id !== id).slice(0, 3)



    return (
        <div className="w-screen h-screen relative">
            <Header 
            blueLogo={"/authLogo.svg"} 
            whiteLogo={"/Logo.svg"} 
            blueLogoClassName={""} 
            whiteLogoClassName={"hidden"} 
            usernameClassName="text-black" 
            className="border-b relative"
            />
            
            <article className="w-full h-full relative mt-10">
                {detailsArticles.map((a, index) => (
                    <div key={index} className="w-full h-full flex flex-col">
                        <div className="flex items-center justify-center gap-4 font-medium w-full h-[1vh] text-slate-600 text-sm mb-5 md:text-sm">
                            <div>{new Date(a.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric'})}</div>
                            <span className="w-1 h-1 rounded-full bg-black"></span>
                            <div>Created by {a.user.username}</div>
                        </div>

                        <div className="w-full flex flex-col gap-6">
                            <h1 className="w-full px-12 tetx-slate-900 font-semibold text-center text-xl md:text-3xl lg:px-70">
                                {a.title}
                            </h1>

                            <div className="w-full h-[25vh] lg:h-[45vh] justify-items-center">
                                <div className="w-[90vw] md:w-[70vw] lg:w-[80vw] h-[25vh] lg:h-[45vh] relative">
                                    {a.imageUrl && (
                                        <Image 
                                            src={a.imageUrl}
                                            alt={a.title}
                                            fill
                                            className="rounded-lg"
                                        />
                                    )}
                                </div>
                            </div>

                            <p className="w-full px-5 text-balance text-slate-700 text-sm md:text-base md:px-30">
                                {a.content}
                            </p>
                        </div>
                                {/* OTHERS ARTICLES */}
                        <h4 className="text-slate-900 text-lg font-semibold mb-5 text-start w-full md:px-28 px-5 mt-18">Other articles</h4>
                        <div className="w-full h-full grid grid-cols-1 lg:grid-cols-3 justify-items-center relative px-5">
                            {otherArticles.map((other, index) => (
                                <div key={index} className="">
                                    <div key={index} className="flex flex-col w-full h-[50vh] lg:h-[80vh] justify-between items-center">
                                        <div className="relative rounded-lg flex flex-col gap-2 w-[85vw] h-[30vh] md:w-[70vw] md:h-[30vh] lg:w-[25vw] lg:h-[35vh] bg-white border">
                                            {other.imageUrl ? (
                                                <Image 
                                                    src={other.imageUrl}
                                                    alt={other.title}
                                                    fill
                                                    className="rounded-lg"
                                                    />
                                                ) : (
                                                    <p>No Image</p>
                                                ) }
                                        </div>
                                        <div className="flex flex-col gap-1 mt-4 w-[85vw] h-[30vh] md:w-[70vw] md:h-[30vh] lg:w-[25vw] lg:h-[35vh]">
                                            <p className="text-xs text-slate-600">{new Date(other.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
                                            <h2 className="text-slate-900 font-semibold text-xl">{other.title}</h2>
                                            <p className="text-slate-600">{other.content.length >= 10 ? other.content.slice(0, 70) + '...' : other.content}</p>
                                            <div className="flex gap-2 mt-2 mb-10">
                                                <Badge className="bg-blue-200 text-blue-900">{other.category.name}</Badge>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </article>
            
        </div>
    )
}