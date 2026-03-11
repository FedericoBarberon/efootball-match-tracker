import { useState, type FormEvent } from "react";
import { useTeamsQuery } from "@/presentation/queries/team/useTeamsQuery";
import Card from "@/presentation/components/Card";
import { IoMdClose } from "react-icons/io";
import { FaFilter } from "react-icons/fa";
import type { TeamId } from "@/domain/team/Team";

type FormValues = {
    since: string,
    until: string,
    homePlayer: string,
    awayPlayer: string,
    homeTeamId: TeamId,
    awayTeamId: TeamId
}

type Props = {
    actualFilters: FormValues
    onFilterApplied?: (filteredMatches: FormValues) => void
    onClose: () => void
}

export default function FilterMatchesModalContent({ actualFilters, onFilterApplied, onClose }: Props) {
    const { data: teams = [] } = useTeamsQuery()
    const [form, setForm] = useState<FormValues>(actualFilters)

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        onFilterApplied?.(form)
    }

    const onInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        if ((e.target.name === "homeGoals" || e.target.name === "awayGoals") && parseInt(e.target.value) < 0) return
        setForm(state => ({
            ...state,
            [e.target.name]: e.target.value
        }))
    }

    const clearFilters = () => {
        const clearedFilters = {
            since: "",
            until: "",
            homePlayer: "",
            awayPlayer: "",
            homeTeamId: "",
            awayTeamId: ""
        }
        setForm(clearedFilters)
        onFilterApplied?.(clearedFilters)
    }

    return <Card className="p-6 text-white flex flex-col gap-6">
        <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold">Filter Matches</h2>
            <button title="Close modal" onClick={onClose} className="cursor-pointer hover:bg-slate-700 p-1 rounded transition-colors duration-150 text-slate-400 hover:text-white">
                <IoMdClose size={24} />
            </button>
        </div>
        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
            <label className="col-span-1">
                <span className="font-bold text-slate-300 text-sm block pb-2">Since</span>
                <input name="since" value={form.since} onChange={onInputChange} type="date" className="p-3 w-full bg-slate-900 rounded-md border border-slate-600 focus:outline-none" />
            </label>
            <label className="col-span-1">
                <span className="font-bold text-slate-300 text-sm block pb-2">Until (not included)</span>
                <input name="until" value={form.until} onChange={onInputChange} type="date" className="p-3 w-full bg-slate-900 rounded-md border border-slate-600 focus:outline-none" />
            </label>
            <label className="col-span-1">
                <span className="font-bold text-slate-300 text-sm block pb-2">Home Player</span>
                <input name="homePlayer" value={form.homePlayer} onChange={onInputChange} className="p-3 w-full bg-slate-900 rounded-md border border-slate-600 focus:outline-none" />
            </label>
            <label className="col-span-1">
                <span className="font-bold text-slate-300 text-sm block pb-2">Away Player</span>
                <input name="awayPlayer" value={form.awayPlayer} onChange={onInputChange} className="p-3 w-full bg-slate-900 rounded-md border border-slate-600 focus:outline-none" />
            </label>
            <label>
                <span className="font-bold text-slate-300 text-sm block pb-2">Home Team</span>
                <select name="homeTeamId" value={form.homeTeamId} onChange={onInputChange} className="p-3 w-full bg-slate-900 rounded-md border border-slate-600 focus:outline-none">
                    <option value="">None</option>
                    {teams.length === 0 && <option disabled>There are no teams</option>}
                    {teams.map(team => (
                        <option key={team.id} value={team.id}>{team.name}</option>
                    ))}
                </select>
            </label>
            <label>
                <span className="font-bold text-slate-300 text-sm block pb-2">Away Team</span>
                <select name="awayTeamId" value={form.awayTeamId} onChange={onInputChange} className="p-3 w-full bg-slate-900 rounded-md border border-slate-600 focus:outline-none">
                    <option value="">None</option>
                    {teams.length === 0 && <option disabled>There are no teams</option>}
                    {teams.map(team => (
                        <option key={team.id} value={team.id}>{team.name}</option>
                    ))}
                </select>
            </label>
            <button className="mt-4 p-2 flex items-center justify-center w-full gap-2 bg-slate-600 rounded-md cursor-pointer font-bold text-lg transition duration-200 hover:opacity-85" type="button" onClick={clearFilters}>
                Clear Filters
            </button>
            <button className="mt-4 p-2 flex items-center justify-center w-full gap-2 bg-blue-600 rounded-md cursor-pointer font-bold text-lg transition duration-200 hover:opacity-85">
                <FaFilter /> Apply Filters
            </button>
        </form>
    </Card>
}