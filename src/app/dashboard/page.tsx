import { TicketItem } from "@/components/ticketItem";
import { authOptions } from "@/lib/auth"
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth"
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Dashboard() {

    const session = await getServerSession(authOptions)

    if (!session || !session.user) {
        redirect("/")
    }

    const tickets = await prisma.ticket.findMany({
        where: {
            customer:{
                userId: session.user.id
            }
            
        },include: {
            customer: true
        },
        orderBy: {
            createdAt: 'desc'
        }
    })


    return(
        <main className="py-10">
            <div className="flex justify-between mb-6">
                <h2 className="text-3xl font-semibold">Chamados</h2>
                <Link href="/dashboard/new" className="bg-blue-400 rounded-lg p-2 text-white font-semibold">
                    Abrir chamado
                </Link>
            </div>

            <table className="min-w-full px-4">
                <thead>
                    <tr> 
                        <th className="text-start pl-4">CLIENTE</th>
                        <th className="text-start">DATA CADASTRO</th>
                        <th className="text-start">STATUS</th>
                        <th className="text-start pr-4"></th>
                    </tr>
                </thead>

                <tbody className="divide-zinc-300 divide-y bg-blue-50/35">
                    {
                        tickets.map(ticket => (
                            <TicketItem
                                key={ticket.id}
                                ticket={ticket} 
                            />
                        ))
                    }
                </tbody>
            </table>
        </main>
    )
}