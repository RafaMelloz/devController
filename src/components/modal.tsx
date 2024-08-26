"use client"

import { ModalContext } from "@/providers/modal";
import { useContext, useRef } from "react";
import { LuX } from "react-icons/lu"

export function ModalTicket(){
    const {handleModal, ticket} = useContext(ModalContext);
    const modalRef = useRef(null);

    const handleClickOutside = ( e: any) => {
        if(modalRef.current === e.target){
            handleModal();
        }
    }



    return(
        <section className="w-full h-screen bg-black/40 absolute flex items-center justify-center" ref={modalRef} onClick={handleClickOutside}>
             <div className="bg-white rounded w-4/5 max-w-2xl p-5">
                <div className="flex justify-between items-center mb-5">
                    <h2 className=" font-semibold text-2xl">Detalhes do chamado</h2>

                    <button className="hover:text-red-500 duration-150" onClick={handleModal}>
                        <LuX size={32}/>
                    </button>
                </div>

                <div className="flex flex-col gap-2">
                    <p><span className="font-semibold">Chamado:</span> {ticket?.ticket.name}</p>

                    <p><span className="font-semibold">Descrição:</span> {ticket?.ticket.description}</p>
                </div>  

                <hr className="my-3"/>

                <div className="flex flex-col gap-2">
                    <h2 className=" font-semibold text-xl">Informações do cliente relacionado</h2>
                    <p><span className="font-semibold">Nome:</span> {ticket?.ticket.customer?.name}</p>

                    <p><span className="font-semibold">Telefone:</span> {ticket?.ticket.customer?.phone}</p>

                    <p><span className="font-semibold">Email:</span> {ticket?.ticket.customer?.email}</p>
                </div>
            </div>
        </section>
    )
}