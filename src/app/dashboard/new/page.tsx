import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function NewTicket(){

    const session = await getServerSession(authOptions);

    if (!session) {
        redirect("/");
    }

    const customers = await prisma.customer.findMany({
        where: {
            userId: session.user.id as string
        }
    });

    async function handleRegister(formData: FormData){
        "use server"

        const name = formData.get("name") as string;
        const description = formData.get("description") as string;
        const customerId = formData.get("customer") as string;

        if (!name || !description || !customerId) {
            return;
            
        }

        await prisma.ticket.create({
            data: {
                name: name as string,
                description: description as string,
                customerId: customerId as string,
                status: "ABERTO",
                userId: session?.user.id,
                priority: "BAIXA"
            }
        })

        redirect("/dashboard");
    }

    return(
        <main className="py-10">
            <div className="flex gap-5 mb-6">
                <Link href="/dashboard" className="bg-gray-900 rounded-lg py-2 px-4 text-white font-semibold">
                    Voltar
                </Link>
                <h2 className="text-3xl font-semibold">Novo chamado</h2>
            </div>
        
            <form action={handleRegister}>    
                <label htmlFor="name" className="font-semibold w-full block mb-5">
                    Nome do chamado
                    <input  
                        type="text" 
                        name="name"
                        className="w-full rounded-md border border-zinc-300 p-2 mt-2"
                    />
                </label>
                
                <label htmlFor="description" className="font-semibold w-full block mb-5">
                    Descreva o problema:
                    <textarea 
                        name="description" 
                        id="description" 
                        className="w-full rounded-md border border-zinc-300 h-24 p-2 mt-2 resize-none"
                    ></textarea>
                </label>

                {
                    customers.length > 0 && (
                        <label htmlFor="customer" className="font-semibold w-full block mb-5">
                            Selecione o cliente:
                            <select
                                name="customer"
                                id="customer"
                                className="w-full rounded-md border border-zinc-300 p-2 mt-2"
                            >
                                {
                                    customers.map(customer => (
                                        <option key={customer.id} value={customer.id}>{customer.name}</option>
                                    ))
                                }
                            </select>
                        </label>
                    ) 
                }

                {
                    customers.length === 0 && (
                        <Link href="/dashboard/customer/new" className="bg-blue-400 rounded-md py-2 px-3 text-white text-base font-semibold">
                            Você precisa cadastrar um cliente antes de criar um chamado
                        </Link>)
                }


                <button className="bg-blue-400 rounded-md py-2 px-3 text-white text-base font-semibold disabled:bg-gray-600 w-full" disabled={customers.length === 0} >Cadastrar</button>
            </form>

        </main>
    )
}