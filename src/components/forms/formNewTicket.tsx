"use client"

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod"
import { InputForm } from "../inputForm";
import { api } from "@/lib/api";
import { useRouter } from "next/navigation";

export function FormNewTicket({customerId}: {customerId: number}){

    const schema = z.object({
        name: z.string().min(1, "Digite o nome do cliente").max(255, "O nome do cliente é muito grande"),
        description: z.string().min(1, "Digite a descrição do chamado").max(255, "A descrição do chamado é muito grande"),
    })

    type FormData = z.infer<typeof schema>;

    const { register, handleSubmit, setValue, formState: { errors } } = useForm<FormData>({
        resolver: zodResolver(schema)
    })

    const router = useRouter()

    
    async function registerTicket(data: FormData){
        try {
            const res = await api.post("/api/ticket", {
                name: data.name,
                description: data.description,
                customerId
            })

            setValue("name", "")
            setValue("description", "")

            router.refresh()
        }catch(err){
            console.log(err)
        }
    }

    return(
        <form onSubmit={handleSubmit(registerTicket)} className="rounded bg-blue-300/10 p-5 max-w-2xl m-auto flex flex-col gap-4 mt-5">

            <InputForm name="name" placeholder="Digite o nome do chamado" register={register} error={errors.name?.message}/>

            <label htmlFor="description" className="font-semibold w-full">
                <textarea className="w-full rounded-md border border-zinc-300 p-2 mt-2 resize-none" placeholder="Digite a descrição do chamado" {...register("description")}></textarea>
                {errors.description && <span className="text-red-500 text-sm my-1">{errors.description.message}</span>}
            </label>

            <button className="bg-blue-600 flex justify-center items-center gap-2 text-white w-full py-2 rounded text-lg">Cadastrar</button>
        </form>
    )
}