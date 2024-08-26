"use client"

import { LuSearch, LuX } from "react-icons/lu";
import { z } from "zod"
import { InputForm } from "@/components/inputForm";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { FormNewTicket } from "@/components/forms/formNewTicket";
import { api } from "@/lib/api";

interface Customer {
    id: number;
    name: string;
}

const schema = z.object({
    email: z.string().email("Digite o email para localizar o cliente").min(1, "Digitar no campo é obrigatório")
});

type FormData = z.infer<typeof schema>;

export default function OpenTicket() {

    const [customer, setCustomer ] = useState<Customer | null>(null)

    const { register, handleSubmit, setValue, formState: { errors } } = useForm<FormData>({
        resolver: zodResolver(schema)
    })

    function clearCustomer(){
        setCustomer(null)
        setValue("email", "")
    }


    async function searchCustomer(data: FormData){   
        try {
            const response = await api.get("/api/customer",{
                params:{
                    email: data.email
                }
            })

            setCustomer(response.data.customer)

        } catch (error) {
            alert("Cliente não encontrado")
            console.log(error)
        }
    }



  return (
    <main className="fit-container">
      <h2 className="text-center text-3xl font-bold mt-32 my-5">Abrir chamado</h2>

        {customer ?(
                <>
                      <section className="rounded bg-blue-300/10 p-5 max-w-2xl m-auto flex justify-between items-center">
                          <h3 className="font-semibold">Cliente selecionado: <span className="font-normal">{customer.name}</span></h3>

                          <button className="hover:text-red-500 duration-150" onClick={clearCustomer}>
                                <LuX size={32}/>
                          </button>
                      </section>
                      
                </>
            ) 
            :
            (
                <section className="rounded bg-blue-300/10 p-5 max-w-2xl m-auto">
                      <form onSubmit={handleSubmit(searchCustomer)}>
                        <InputForm
                            placeholder="Digite o nome do cliente"
                            name="email"
                            register={register}
                              error={errors.email?.message}
                        />
                        <button className="bg-blue-600 mt-4 flex justify-center items-center gap-2 text-white w-full py-2 rounded text-lg">Pesquisar cliente <LuSearch /></button>
                    </form>
                </section>
            )}

        {customer && <FormNewTicket customerId={customer.id}/>}   
    </main>
  )
}