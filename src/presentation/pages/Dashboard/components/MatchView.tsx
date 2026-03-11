import type { MatchHistoryItemDTO } from "@/application/dto/MatchHistoryItemDTO";
import { useDeleteMatchMutation } from "../../../queries/match/useDeleteMatchMutation";
import { TiDelete } from "react-icons/ti";
import { FaArchive } from "react-icons/fa";

const FORMATTER = new Intl.DateTimeFormat('default', {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
})

export function MatchView({ match }: { match: MatchHistoryItemDTO }) {
    const deleteMatchMutation = useDeleteMatchMutation()

    let homeColor: string = "";
    let awayColor: string = "";

    if (match.homeGoals > match.awayGoals) {
        homeColor = "text-green-300"
        awayColor = "text-red-300"
    } else if (match.awayGoals > match.homeGoals) {
        homeColor = "text-red-300"
        awayColor = "text-green-300"
    }
    return (
        <tr>
            <td className="py-4 px-2 text-slate-300 text-center md:text-left">
                <p>{FORMATTER.format(new Date(match.date))}</p>
            </td>
            <td className="py-4 px-2 text-right">
                <p className={`text-xl font-bold ${homeColor}`}>{match.homePlayer}</p>
                <p className={match.homeTeam.isArchived ? "text-orange-400 flex gap-2 justify-end items-center" : "text-slate-300"} title={match.homeTeam.isArchived ? "Archivado" : ""}>
                    {match.homeTeam.isArchived && <FaArchive />}
                    {match.homeTeam.name}
                </p>
            </td>
            <td className="flex justify-center items-center py-4 px-2">
                <div className="rounded bg-slate-900 p-4 text-center font-bold text-xl border border-slate-600 min-w-20 max-w-40 grow">
                    {match.homeGoals} - {match.awayGoals}
                </div>
            </td>
            <td className="py-4 px-2 text-left">
                <p className={`text-xl font-bold ${awayColor}`}>{match.awayPlayer}</p>
                <p className={match.awayTeam.isArchived ? "text-orange-400 flex gap-2 items-center" : "text-slate-300"} title={match.awayTeam.isArchived ? "Archivado" : ""}>
                    {match.awayTeam.isArchived && <FaArchive />}
                    {match.awayTeam.name}
                </p>
            </td>
            <td className="py-4 px-2 text-right">
                <button onClick={() => deleteMatchMutation.mutate(match.id)} className="rounded cursor-pointer hover:bg-[#ff424233] p-2 transition duration-150"><TiDelete size={32} color="red" title="Delete Match" /></button>
            </td>
        </tr>
    )
}