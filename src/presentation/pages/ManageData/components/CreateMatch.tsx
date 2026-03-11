import { MdOutlineAddCircleOutline } from "react-icons/md";
import Card from "../../../components/Card";
import { useState } from "react";
import { IoIosSave } from "react-icons/io";
import type { TeamId } from "@/domain/team/Team";
import type { CreateMatchCommand } from "@/application/commands";
import { useTeamsQuery } from "../../../queries/team/useTeamsQuery";
import { useCreateMatchMutation } from "../../../queries/match/useCreateMatchMutation";

type FormValues = {
    date: string
    homePlayer: string
    awayPlayer: string
    homeTeamId: TeamId
    awayTeamId: TeamId
    homeGoals: string
    awayGoals: string
}

export default function CreateMatch() {
    const [form, setForm] = useState<FormValues>({
        date: "",
        homePlayer: "",
        awayPlayer: "",
        homeTeamId: "",
        awayTeamId: "",
        homeGoals: "0",
        awayGoals: "0"
    })
    const { data: teams = [] } = useTeamsQuery()
    const createMatchMutation = useCreateMatchMutation()

    const onInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        if ((e.target.name === "homeGoals" || e.target.name === "awayGoals") && parseInt(e.target.value) < 0) return
        setForm(state => ({
            ...state,
            [e.target.name]: e.target.value
        }))
    }

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const match: CreateMatchCommand = {
            ...form,
            homeGoals: parseInt(form.homeGoals),
            awayGoals: parseInt(form.awayGoals),
            date: new Date(form.date)
        }
        createMatchMutation.mutate(match)
    }

    return (
        <Card className="flex flex-col gap-4 p-6">
            <header className="flex gap-2 items-center border-b border-slate-600 pb-2">
                <MdOutlineAddCircleOutline className="text-blue-600" size={24} />
                <h3 className="font-bold">New Match Result</h3>
            </header>
            <form className="grid grid-cols-2 gap-6" onSubmit={onSubmit}>
                <label className="col-span-2">
                    <span className="font-bold text-slate-300 text-sm block pb-2">Date</span>
                    <input required name="date" value={form.date} onChange={onInputChange} type="datetime-local" className="p-3 w-full bg-slate-900 rounded-md border border-slate-600 focus:outline-none" />
                </label>
                <label>
                    <span className="font-bold text-slate-300 text-sm block pb-2">Home Player</span>
                    <input required name="homePlayer" value={form.homePlayer} onChange={onInputChange} className="p-3 w-full bg-slate-900 rounded-md border border-slate-600 focus:outline-none" />
                </label>
                <label>
                    <span className="font-bold text-slate-300 text-sm block pb-2">Away Player</span>
                    <input required name="awayPlayer" value={form.awayPlayer} onChange={onInputChange} className="p-3 w-full bg-slate-900 rounded-md border border-slate-600 focus:outline-none" />
                </label>
                <label>
                    <span className="font-bold text-slate-300 text-sm block pb-2">Home Team</span>
                    <select required name="homeTeamId" value={form.homeTeamId} onChange={onInputChange} className="p-3 w-full bg-slate-900 rounded-md border border-slate-600 focus:outline-none">
                        <option value="" hidden>Select a team</option>
                        {teams.length === 0 && <option disabled>There are no teams, create one in the Manage page</option>}
                        {teams.map(team => (
                            <option key={team.id} value={team.id}>{team.name}</option>
                        ))}
                    </select>
                </label>
                <label>
                    <span className="font-bold text-slate-300 text-sm block pb-2">Away Team</span>
                    <select required name="awayTeamId" value={form.awayTeamId} onChange={onInputChange} className="p-3 w-full bg-slate-900 rounded-md border border-slate-600 focus:outline-none">
                        <option value="" hidden>Select a team</option>
                        {teams.length === 0 && <option disabled>There are no teams, create one in the Manage page</option>}
                        {teams.map(team => (
                            <option key={team.id} value={team.id}>{team.name}</option>
                        ))}
                    </select>
                </label>
                <label>
                    <span className="font-bold text-slate-300 text-sm block pb-2">Home Goals</span>
                    <input required name="homeGoals" value={form.homeGoals} onChange={onInputChange} type="number" min={0} className="p-3 w-full bg-slate-900 rounded-md border border-slate-600 focus:outline-none" />
                </label>
                <label>
                    <span className="font-bold text-slate-300 text-sm block pb-2">Away Goals</span>
                    <input required name="awayGoals" value={form.awayGoals} onChange={onInputChange} type="number" min={0} className="p-3 w-full bg-slate-900 rounded-md border border-slate-600 focus:outline-none" />
                </label>
                <button className="p-4 flex items-center justify-center w-full gap-2 bg-blue-600 rounded-xl cursor-pointer font-bold text-lg hover:scale-[99%] transition duration-200 hover:opacity-85 col-span-2">
                    <IoIosSave size={24} /> Log Match Result
                </button>
            </form>
        </Card>
    )
}
