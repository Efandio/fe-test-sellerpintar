import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";


const buttonContent = [
  {label: 'Register', link: '/auth/register'},
  {label: 'Login', link: '/auth/login'}
]

export default function Home() {
  return (
    <div className="w-screen h-screen">

      <section className="w-full h-full relative">
        <div className="absolute w-screen h-screen z-0">
          <Image 
            src={'/hero.jpg'} 
            fill
            alt="Young Man"
          />
          </div>
          <div className="absolute bg-[#2563EBDB] w-screen h-screen" />

        <header className="z-30 flex w-full justify-center items-center h-[10vh] inset-0 absolute px-10 py-5">
          <span className="mt-12">
            <img className="md:scale-[1.4]" src="/Logo.svg" alt="" />
          </span>
        </header>

        <section className="relative flex flex-col gap-2 md:gap-4 lg:gap-2 justify-center items-center h-full px-10 md:px-40 lg:px-90 text-center text-white">
          <span className="font-semibold text-sm md:text-base">Blog genzet</span>
          <h1 className="font-semibold text-xl md:text-3xl">The Journal : Design Resources, Interviews, and Industry News</h1>
          <h2 className="font-normal text-sm md:text-base">Your daily dose of design insights!</h2>

          <div className="flex gap-5 mt-10">
            {buttonContent.map((btn, index) => (
              <Link key={index} href={btn.link}>
                  <Button className="bg-transparent text-xs md:text-sm px-10 md:px-18 md:py-6" variant={'outline'} >{btn.label}</Button>
              </Link>
            ))}
            </div>
        </section>
      </section>
    </div>
  );
}
