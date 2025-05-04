
import Header from "@/components/Header";
import { ArticlesType } from "@/types/ArticlesType";
import axios from "axios";

interface ArticlePageProps {
    params: Promise<{id: string}>
};

export default async function ArticleDetails({ params }: ArticlePageProps) {

    const { id } = await params
    
    const res = await axios.get(`https://test-fe.mysellerpintar.com/api/articles/`)
    const details: ArticlesType[] = res.data.data;

    const detailsArticles = details.filter(i => i.id === id)
    console.log(detailsArticles)

// RENDER BY ID
    return (
        <div className="w-screen h-screen">
            <Header 
            blueLogo={"/authLogo.svg"} 
            whiteLogo={"/Logo.svg"} 
            blueLogoClassName={""} 
            whiteLogoClassName={"hidden"} 
            usernameClassName="text-black" 
            />
            
            
            
        </div>
    )
}