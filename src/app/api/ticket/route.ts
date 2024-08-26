import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function PATCH(req: Request){
    const session = await getServerSession(authOptions);

    if (!session) {
        return NextResponse.json('Usuário não autenticado', { status: 401 });
    }

    const {id} = await req.json();

    const findTicket = await prisma.ticket.findFirst({
        where: {
            id: id as string,
        }
    });

    if (!findTicket) {
        return NextResponse.json({message:'Ticket não encontrado'}, {status:404}); 
    }

    try {
        await prisma.ticket.update({
            where: {
                id: id as string
            },
            data: {
                status: 'FECHADO'
            }
        })
    } catch (error) {
        return NextResponse.json({message: 'Erro ao fechar ticket'}, {status:500});
        
    }
    
    return NextResponse.json({message: 'Ticket fechado com sucesso'});
}

export async function POST(req: Request) {
    const { customerId, name, description } = await req.json();

    try {
        await prisma.ticket.create({
            data: {
                name,
                description,
                status: 'ABERTO',
                customerId,
                priority: 'BAIXA'
            }
        })

        console.log(customerId, name, description);

        return NextResponse.json({ message: 'Ticket cadastrado com sucesso' });	
    } catch (error) {
        console.log(error);
    }
}