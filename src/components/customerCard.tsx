export function CustomerCard() {
    return (
        <div className="w-full bg-blue-50/70 rounded border border-zinc-300 p-3 hover:scale-105 duration-75">
            <p className="font-semibold">Nome: <span className="font-normal truncate">Melo</span></p>
            <p className="font-semibold">Email: <span className="font-normal">teste@r.com</span></p>
            <p className="font-semibold">Telefone: <span className="font-normal">11-222112212</span></p>

            <button className="mt-5 bg-red-500 rounded-md py-1 px-3 text-white text-sm">Deletar</button>
        </div>
    )
}