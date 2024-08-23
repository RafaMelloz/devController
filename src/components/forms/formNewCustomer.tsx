"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { InputForm } from "../inputForm"



export function FormNewCustomer() {

    const schema = z.object({
        name: z.string().min(1, "Nome é obrigatório"),	
        email: z.string().email("Digite um email valido"),
        phone: z.string().min(1, "Telefone é obrigatório").refine(value => {
            return /^(?:\(\d{2}\)\s?)?\d{9}$/.test(value) || /^\d{2}\s\d{9}$/.test(value)
        }, "Telefone deve ter o formato xx xxxxxxxxx")
    })

    type FormValues = z.infer<typeof schema>

    const { register, handleSubmit, formState: {errors}} = useForm<FormValues>({
        resolver: zodResolver(schema)
    })

    function handleNewCustomer(data: FormValues){
        console.log(data)  
    }


    return (
        <form className="grid grid-cols-1 gap-5" onSubmit={handleSubmit(handleNewCustomer)}>
            <InputForm label="Nome:" name={"name"} error={errors.name?.message} register={register} />

            <div className="flex gap-5">
                <InputForm label="Email:" name={"email"} error={errors.email?.message} register={register}/>
                <InputForm label="Telefone" name={"phone"} error={errors.phone?.message} register={register} />
            </div>

            <button className="bg-blue-400 rounded-md py-2 px-3 text-white text-base font-semibold">Cadastrar</button>
        </form>
    )
}