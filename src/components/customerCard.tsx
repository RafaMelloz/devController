"use client"

import { api } from "@/lib/api";
import { alertError, alertSuccess } from "@/utils/alerts";
import { useRouter } from "next/navigation";

interface Card{
    id: string;
    name: string;
    email: string;
    phone: string;
}

export function CustomerCard( {id ,name, email, phone}: Card) {

    const router = useRouter()

    async function deleteCustomer() {
        try {
            const response = await api.delete("/api/customer", {
                params: {
                    id
                }
            })

            alertSuccess(response.data.message)
            router.refresh()
        } catch (err:any) {
            alertError(err.response.data.message);
            
        }
    }

    return (
        <div className="w-full bg-blue-50/70 rounded border border-zinc-300 p-3 hover:scale-105 duration-75">
            <p className="font-semibold truncate">Nome: <span className="font-normal ">{name}</span></p>
            <p className="font-semibold truncate">Email: <span className="font-normal ">{email}</span></p>
            <p className="font-semibold">Telefone: <span className="font-normal">{phone}</span></p>

            <button className="mt-5 bg-red-500 rounded-md py-1 px-3 text-white text-sm" onClick={deleteCustomer}>Deletar</button>
        </div>
    )
}