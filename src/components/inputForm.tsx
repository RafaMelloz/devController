"use client"

import { RegisterOptions, UseFormRegister } from "react-hook-form";

interface InputFormProps {
    name: string;
    label?: string;
    placeholder?: string;

    register: UseFormRegister<any>
    error?: string;
    rules?: RegisterOptions
}

export function InputForm({ name, label, register, error, rules, placeholder }: InputFormProps){
    return(
        <label htmlFor={name} className="font-semibold w-full">{label}
            <input type={name} id={name} className="w-full rounded-md border border-zinc-300 p-2 mt-2" placeholder={placeholder}  {...register(name, rules)}/>

            {error && <span className="text-red-500 text-sm my-1">{error}</span>}
        </label>
    )
}