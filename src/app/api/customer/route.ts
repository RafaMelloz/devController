import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";



export async function DELETE(req: Request) {
    const session = await getServerSession(authOptions );

    if (!session) {
        return NextResponse.json({ message: 'Usuário não autenticado' }, { status: 401 });
        
    }

    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    const findTickets = await prisma.ticket.findFirst({
        where: {
            customerId: id as string
        }
    })

    if (findTickets) {
        return NextResponse.json({ message: 'Cliente possui tickets cadastrados' }, { status: 400 });
        
    }

    try{
        await prisma.customer.delete({
            where: {
                id: id as string
            }
        })

        return NextResponse.json({ message: 'Deletado com sucesso' });

    } catch (error) {
        return NextResponse.json({ message: 'Erro ao deletar cliente' }, { status: 500 });
    }
}


export async function POST(req: Request) {
    const session = await getServerSession(authOptions );

    if (!session) {
        return NextResponse.json({ message: 'Usuário não autenticado' }, { status: 401 });
        
    }

    const { name, email, phone } = await req.json();

    try{
        await prisma.customer.create({
            data: {
                name,
                email,
                phone,

                userId: session.user.id
            }
        })

        return NextResponse.json({ message: 'Cadastrado com sucesso' });

    } catch (error) {
        return NextResponse.json({ message: 'Erro ao cadastrar cliente' }, { status: 500 });
    }
    
}