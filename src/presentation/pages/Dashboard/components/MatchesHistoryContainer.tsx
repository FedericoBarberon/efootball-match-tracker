import Card from "../../../components/Card";
import { useMemo, useState } from "react";
import DownloadMatches from "../../../components/DownloadMatches";
import Spinner from "../../../components/Spinner";
import { useMatchesQuery } from "../../../queries/match/useMatchesQuery";
import { MatchView } from "./MatchView";
import { IoFilterSharp } from "react-icons/io5";
import Modal from "@/presentation/components/Modal";
import FilterMatchesModalContent from "./FilterMatchesModalContent";
import type { TeamId } from "@/domain/team/Team";

type MatchFilters = {
    since?: Date,
    until?: Date,
    homePlayer?: string,
    awayPlayer?: string,
    homeTeamId?: TeamId,
    awayTeamId?: TeamId,
}

export default function MatchesHistoryContainer() {
    const { data: matches = [], isLoading } = useMatchesQuery()
    const [showFilterModal, setShowFilterModal] = useState(false)
    const [filters, setFilters] = useState<MatchFilters>({})

    const filteredMatches = useMemo(() => (
        matches.filter(match => {
            if (filters.since && new Date(match.date).getTime() < filters.since.getTime()) return false
            if (filters.until && new Date(match.date).getTime() > filters.until.getTime()) return false
            if (filters.homePlayer && match.homePlayer !== filters.homePlayer) return false
            if (filters.awayPlayer && match.awayPlayer !== filters.awayPlayer) return false
            if (filters.homeTeamId && match.homeTeam.id !== filters.homeTeamId) return false
            if (filters.awayTeamId && match.awayTeam.id !== filters.awayTeamId) return false
            return true
        })), [filters, matches])

    const filtersOn = Object.values(filters).some(val => val)

    const renderContent = () => {
        if (isLoading) {
            return <div className="flex justify-center items-center h-50">
                <Spinner size={32} />
            </div>
        }

        if (filteredMatches.length === 0) {
            return <p className="text-center font-bold text-xl py-8">There are no matches to show</p>
        }

        return <div className="overflow-auto max-h-[50vh]">
            <table className="w-full relative">
                <thead>
                    <tr className="bg-slate-900 text-blue-200 font-bold sticky top-0 outline-1 outline-slate-600">
                        <th className="p-4 text-left">DATE</th>
                        <th className="p-4 text-right">HOME</th>
                        <th className="p-4">SCORE</th>
                        <th className="p-4 text-left">AWAY</th>
                        <th className="p-4 text-right">ACTIONS</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-700">
                    {
                        filteredMatches.map((match) => <MatchView key={match.id} match={match} />)
                    }
                </tbody>
            </table>
        </div>
    }

    return <Card className="grow">
        <header className="p-4 flex items-center gap-2 w-full">
            <p className="font-bold grow">Recent Matches</p>
            {!isLoading && matches.length > 0 && <>
                <button onClick={() => setShowFilterModal(!showFilterModal)} className={`cursor-pointer rounded hover:bg-[#a099d833] p-2 transition duration-150" title="Filter Matches ${filtersOn ? "text-orange-400" : "text-slate-400 hover:text-white"}`}>
                    <IoFilterSharp size={20} />
                </button>
                {showFilterModal && <Modal onClose={() => setShowFilterModal(false)}>
                    <FilterMatchesModalContent
                        actualFilters={{
                            since: filters.since?.toISOString().split("T")[0] ?? "",
                            until: filters.until?.toISOString().split("T")[0] ?? "",
                            homePlayer: filters.homePlayer ?? "",
                            awayPlayer: filters.awayPlayer ?? "",
                            homeTeamId: filters.homeTeamId ?? "",
                            awayTeamId: filters.awayTeamId ?? "",
                        }}
                        onFilterApplied={(formValues) => {
                            const newFilters = {
                                ...formValues,
                                since: formValues.since !== "" ? new Date(formValues.since) : undefined,
                                until: formValues.until !== "" ? new Date(formValues.until) : undefined,
                            }

                            setFilters(newFilters)
                            setShowFilterModal(false)
                        }} onClose={() => setShowFilterModal(false)} />
                </Modal>}
                <DownloadMatches matches={matches} />
            </>}
        </header>
        {renderContent()}
    </Card>
}