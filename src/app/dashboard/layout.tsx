import Link from "next/link";
import { ReactNode } from "react";

export default function DashboardLayout({children} : { children : ReactNode} ){
    return(
        <section className="fit-container">
            <nav className="flex gap-4 items-center text-white py-3 px-4 bg-gray-900 mt-4 rounded-md">
                <Link href="/dashboard">Chamados</Link>
                <Link href="/dashboard/customer">Clientes</Link>
            </nav>

            {children}
        </section>
    )
}