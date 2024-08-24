import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";


export async function POST(req: Request, res: Response) {
    const session = await getServerSession(authOptions );

    if (!session) {
        return NextResponse.json({ message: 'Usuário não autenticado' }, { status: 401 });
        
    }

    const { name, email, phone } = await req.json();

    console.log(name, email, phone);


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