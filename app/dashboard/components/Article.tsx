'use client'

import { useState } from "react";
import AdminHeader from "./Header";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { ArrowLeft, ImagePlus, Plus, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useForm, SubmitHandler } from "react-hook-form";
import Image from "next/image";

interface IFormInput {
    file?: File;
    title: string;
    category: string;
}

export default function AdminArticlePage() {
    const [page, setPage] = useState<'main' | 'Add Article' | 'Edit Article' | 'Delete Article'>('main');
    const { register, handleSubmit, setValue } = useForm<IFormInput>();
    const [preview, setPreview] = useState<string | null>(null);

    const handlePageChange = (change: 'main' | 'Add Article' | 'Edit Article' | 'Delete Article') => {
        setPage(change);
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files ? e.target.files[0] : null;
        if (selectedFile) {
            const objectUrl = URL.createObjectURL(selectedFile);
            setPreview(objectUrl);
            setValue('file', selectedFile); 
        }
    };


    const onSubmit: SubmitHandler<IFormInput> = (data) => {
        console.log("form data", data);
        if (data.file) {
            console.log("Uploaded file:", data.file);
        }
    };


    return (
        <div className="w-full h-screen flex flex-col items-center">
            <AdminHeader currentPage={"Article"} />
            
            {page === 'main' && (
                <section className="bg-gray-50 w-[80vw] h-[25vh] border border-slate-200 mt-10 rounded-lg flex flex-col">
                    <div className="w-full border-b border-slate-200 h-[10vh] flex items-center px-4 text-sm font-medium">
                        Total Articles:
                    </div>
                    <div className="w-full h-[15vh] px-4 flex justify-between items-center">
                        <div className="flex items-center gap-2">
                            <div>
                                <Select>
                                    <SelectTrigger>
                                        <SelectValue placeholder='Category' />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="s">asa</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="flex items-center">
                                <Search size={18} color="#94A3B8" className="absolute translate-x-2" />
                                <Input placeholder="Search by title" className="pl-8" />
                            </div>
                        </div>

                        <div>
                            <Button onClick={() => handlePageChange('Add Article')} className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium">
                                <Plus size={18} color="#F8FAFC" />
                                Add Articles
                            </Button>
                        </div>
                    </div>
                </section>
            )}

            {/* ADD ARTICLES */}

            {page === 'Add Article' && (
                <form 
                    onSubmit={handleSubmit(onSubmit)}
                    className="bg-gray-50 w-[80vw] h-auto border border-slate-200 mt-10 rounded-lg flex flex-col"
                >
                    <div className="w-fit h-fit">
                        <Button onClick={() => handlePageChange('main')} className="bg-transparent hover:bg-transparent text-black" type="button">
                            <ArrowLeft color="black" className="translate-y-0.5" />
                            Create Articles
                        </Button>
                    </div>

                    {/* --- Input File --- */}
                    <div className="w-full px-4 flex flex-col gap-1 mt-10">
                        <div className="text-sm font-medium">Thumbnails</div>
                        <div className="w-[15vw] h-[25vh] bg-white border-[1.5] border-dashed border-slate-300 rounded-lg relative">
                            <label className="w-full h-full flex flex-col cursor-pointer" htmlFor="files">
                                {preview ? (
                                    <Image src={preview} fill alt="Preview" />
                                ) : (
                                    <div className="w-full h-full flex flex-col gap-1 justify-center items-center">
                                        <ImagePlus size={20} color="#64748B" />
                                        <span className="w-fit text-slate-500 underline text-xs">Click to select files</span>
                                        <span className="w-fit text-slate-500 text-xs">Support File Type : jpg or png</span>
                                    </div>
                                )}
                                <Input 
                                    id="files" 
                                    type="file" 
                                    className="hidden" 
                                    {...register('file')} 
                                    onChange={handleFileChange}
                                />
                            </label>
                        </div>
                        <div className="w-full">
                                <label htmlFor="">Title</label>
                                <Input placeholder="Title" />
                        </div>
                    </div>


                    {/* --- Submit ---
                    <div className="w-full flex justify-center mt-4">
                        <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-slate-50">
                            Upload
                        </Button>
                    </div> */}
                </form>
            )}
        </div>
    );
}
