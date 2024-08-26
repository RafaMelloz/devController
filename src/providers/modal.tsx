"use client"

import { ModalTicket } from "@/components/modal";
import { createContext, ReactNode, useState } from "react";

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

interface ModalContextData {
    visible: boolean;
    handleModal: () => void;
    setDetailsTicket: (ticket: TicketItemProps) => void;
    ticket: TicketItemProps | null;
}

export const ModalContext = createContext({} as ModalContextData);

export const ModalProvider = ({children} : {children : ReactNode}) =>{
    const [visible, setVisible] = useState(false);
    const [ticket, setTicket] = useState<TicketItemProps | null>(null);

    function handleModal(){
        setVisible(!visible);
    }

    function setDetailsTicket(ticket: TicketItemProps){
        setTicket(ticket);
        handleModal();
    }

    return(
        <ModalContext.Provider value={{ visible, handleModal, ticket, setDetailsTicket }}>
            {visible && <ModalTicket />}
            {children}
        </ModalContext.Provider>
    )
}

