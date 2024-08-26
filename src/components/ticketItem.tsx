"use client"

import { api } from "@/lib/api";
import { useRouter } from "next/navigation";
import { LuCheckCircle, LuClipboardList } from "react-icons/lu";
interface TicketItemProps {
    ticket: {
        id: string;
        name: string;
        status: string;
        description: string;
        createdAt: Date | null;
        updatedAt: Date | null;
        priority: string;
        customer: {
            id: string;
            name: string;
            email: string;
            phone: string;
            address: string | null;
            createdAt: Date | null;
            updatedAt: Date | null;
            userId: string | null; // Modificado para aceitar string ou null
        } | null;
    };
}

export function TicketItem({ ticket }: TicketItemProps) {

    const router = useRouter();

    async function handleTicketStatus() {
        try {
            const res = await api.patch('api/ticket', {
                id: ticket.id
            });

            router.refresh()
        } catch (error) {
            console.log(error);
            
        }
    }

    return(
        <tr>
            <td className="py-3 pl-4">{ticket.name}</td>
            <td className="py-3">{ticket.createdAt?.toLocaleDateString("pt-br")}</td>
            <td className="py-3">
                <span className={`${ticket.status === 'ABERTO' ?  'bg-green-500' : 'bg-red-500'} p-1 rounded text-white`}>
                    {ticket.status}
                </span>
            </td>

            <td className="py-3 pr-4 flex justify-end items-center gap-2">
                <button className="text-green-500" onClick={handleTicketStatus}>
                    <LuCheckCircle size={24} />
                </button>

                <button className="text-blue-400">
                    <LuClipboardList  size={24} />
                </button>
            </td>
        </tr>
    )
}