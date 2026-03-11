import { useState } from "react"
import { FaPlus } from "react-icons/fa6"
import { useCreateTeamMutation } from "../../../queries/team/useCreateTeamMutation"

export default function TeamForm() {
    const createTeamMutation = useCreateTeamMutation()

    const [name, setName] = useState("")

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        createTeamMutation.mutate({ name })
        setName("")
    }

    return <form onSubmit={handleSubmit}>
        <h3 className="font-bold pb-4">Create Team</h3>
        <label className="font-bold text-slate-300 text-sm block pb-2" htmlFor="team-name">Team Name</label>
        <div className="flex gap-2 items-center">
            <input id="team-name" required name="name" value={name} onChange={(e) => setName(e.target.value)} className="p-3 w-full bg-slate-900 rounded-md border border-slate-600 focus:outline-none" placeholder="Enter the team name" />
            <button className="p-3 rounded bg-blue-600 hover:brightness-95 cursor-pointer" title="Create team">
                <FaPlus size={24} />
            </button>
        </div>
    </form>
}