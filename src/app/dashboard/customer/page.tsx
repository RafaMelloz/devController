import { CustomerCard } from "@/components/customerCard"
import { authOptions } from "@/lib/auth"
import { getServerSession } from "next-auth"
import Link from "next/link"
import { redirect } from "next/navigation"

export default async function Customer() {

    const session = await getServerSession(authOptions)

    if (!session || !session.user) {
        redirect("/")
    }

    return (
        <main className="py-10">
            <div className="flex justify-between mb-6">
                <h2 className="text-3xl font-semibold">Meus clientes</h2>
                <Link href="/dashboard/customer/new" className="bg-blue-400 rounded-lg p-2 text-white font-semibold">
                    Novo cliente
                </Link>
            </div>


            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                <CustomerCard/>
                <CustomerCard />
                <CustomerCard />
                <CustomerCard />
                <CustomerCard />
                <CustomerCard />

            </div>
        </main>
    )
}