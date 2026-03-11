import { useTeamsQuery } from "../../../queries/team/useTeamsQuery"
import Spinner from "../../../components/Spinner"
import TeamView from "./TeamView"

export default function TeamContainer() {
    const { data: teams = [], isLoading } = useTeamsQuery()

    if (isLoading) return (
        <div className="flex justify-center items-center grow">
            <Spinner size={48} />
        </div>)

    if (teams.length === 0) {
        return <p className="font-bold text-xl text-center">There are no teams</p>
    }

    return <div className="bg-slate-900 overflow-auto max-h-[50vh]">
        <table className="w-full table-fixed relative">
            <thead>
                <tr className="bg-slate-900 text-blue-200 font-bold sticky top-0 outline-1 outline-slate-600">
                    <th className="p-4 w-2/3 text-left">Name</th>
                    <th className="p-4 w-1/3 text-right">Actions</th>
                </tr>
            </thead>
            <tbody className="divide-y divide-slate-700">
                {teams.map(team => <TeamView key={team.id} team={team} />)}
            </tbody>
        </table>
    </div>
}