import { LuClipboardList, LuTrash } from "react-icons/lu";

export function TicketItem(){
    return(
        <tr>
            <td className="py-3 pl-4">João</td>
            <td className="py-3">01/04/2024</td>
            <td className="py-3">
                <span>
                    ABERTO
                </span>
            </td>

            <td className="py-3 pr-4 flex justify-end items-center gap-2">
                <button className="text-red-500">
                    <LuTrash size={24} />
                </button>

                <button className="text-blue-400">
                    <LuClipboardList  size={24} />
                </button>
            </td>
        </tr>
    )
}