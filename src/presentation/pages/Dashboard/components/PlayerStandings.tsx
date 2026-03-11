import { HiOutlineTrophy } from "react-icons/hi2";
import Card from "../../../components/Card";
import { useMemo } from "react";
import { getRanking, type Ranking } from "../../../utils/getRanking";
import { useMatchesQuery } from "../../../queries/match/useMatchesQuery";
import Spinner from "../../../components/Spinner";

export default function PlayerStandings() {
    const { data: matches = [], isLoading } = useMatchesQuery()
    const ranking: Ranking[] = useMemo(() => getRanking(matches), [matches])

    const renderContent = () => {
        if (isLoading) {
            return <div className="flex justify-center items-center h-full">
                <Spinner size={32} />
            </div>
        }

        if (ranking.length === 0) {
            return <p className="text-center font-bold text-xl">There are no players to show</p>
        }

        return <ul className="flex flex-col gap-4 overflow-auto max-h-[50vh]">
            {
                ranking.map((rank, position) => <PlayerStats key={rank.player} rank={rank} position={position} />)
            }
        </ul>
    }

    return <Card className="p-4">
        <div className="flex gap-2 justify-between mb-4">
            <p className="font-bold text-xl">Player Standings</p>
            <HiOutlineTrophy size={24} className="text-yellow-400" />
        </div>
        {renderContent()}
    </Card>
}

function PlayerStats({ rank, position }: { rank: Ranking, position: number }) {
    return <li key={rank.player} className={`flex gap-4 p-4 rounded border font-bold ${position === 0 ? "bg-[#fdc70035] border-yellow-600" : "bg-slate-900 border-slate-600"}`}>
        <span className="text-slate-300">{position + 1}</span>
        <p className="grow">{rank.player}</p>
        <p className="text-slate-300 font-medium">
            <span className="text-white font-bold">{rank.wins}</span> Wins
        </p>
        <p className="text-slate-300 font-medium">
            <span className="text-white font-bold">{rank.goals}</span> Goals
        </p>
    </li>
}