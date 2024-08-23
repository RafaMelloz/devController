"use client"

import { signIn, signOut, useSession } from "next-auth/react"
import Link from "next/link"
import {LuLoader2, LuLogOut, LuUser } from "react-icons/lu"


export function Header() {

    const { data, status } = useSession()

    async function handleLogin(){
        await signIn("google")
    }

    async function handleLogout() {
        await signOut()
    }

    return(
        <header className="shadow-md">
            <nav className="flex justify-between items-center fit-container py-4">
                <Link href="/">
                    <h1 className="font-bold text-2xl hover:tracking-wide duration-300">
                        DEV <span className="text-blue-800">CONTROLLER</span>
                    </h1>
                </Link>

                
                {status === "unauthenticated" && (
                    <button onClick={handleLogin}  className="hover:text-zinc-700 duration-200">
                        <LuUser size={22} />
                    </button>
                )}  

                {status === "loading" && (
                    <button onClick={handleLogout} className="hover:text-zinc-700 duration-200 animate-spin">
                        <LuLoader2 size={22} />
                    </button>
                )}  

                {status === "authenticated" && (
                    <div className="flex gap-5 text-zinc-500">
                        <Link href="/dashboard" className="hover:text-zinc-700 duration-200">
                            <LuUser size={22}/>
                        </Link>


                        <button onClick={handleLogout} className="hover:text-zinc-700 duration-200">
                            <LuLogOut size={22} />
                        </button>
                    </div>
                )}
            </nav>
        </header>
    )
}