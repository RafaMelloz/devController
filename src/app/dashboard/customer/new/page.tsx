import { FormNewCustomer } from "@/components/forms/formNewCustomer";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function NewCustomer() {
    const session = await getServerSession(authOptions)

    if (!session || !session.user) {
        redirect("/")
    }


    return(
        <main className="py-10">
            <div className="flex gap-5 mb-6">
                <Link href="/dashboard/customer" className="bg-gray-900 rounded-lg py-2 px-4 text-white font-semibold">
                    Voltar
                </Link>
                <h2 className="text-3xl font-semibold">Meus clientes</h2>
            </div>

            <FormNewCustomer/>
        </main>
    )
}