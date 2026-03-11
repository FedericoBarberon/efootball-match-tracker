import type { Team } from "@/domain/team/Team";
import Card from "../../../components/Card";
import { useState, type FormEvent } from "react";
import toast from "react-hot-toast";
import { IoIosSave, IoMdClose } from "react-icons/io";

type Props = {
  team: Team,
  onEdit: (newName: string) => void
  onClose: () => void
}

export default function EditTeamModalContent({ team, onEdit, onClose }: Props) {
  const [newName, setNewName] = useState(team.name)
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!newName) {
      toast("Name cannot be empty")
      return
    }

    onEdit(newName)
  }

  return <Card className="p-4 text-white">
    <div className="flex justify-between items-center mb-6">
      <h2 className="text-xl font-bold">Edit Team</h2>
      <button title="Close modal" onClick={onClose} className="cursor-pointer hover:bg-slate-700 p-1 rounded transition-colors duration-150 text-slate-400 hover:text-white">
        <IoMdClose size={24} />
      </button>
    </div>

    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <label>
        <span className="font-bold text-slate-300 text-sm block pb-2">Team name</span>
        <input value={newName} onChange={e => setNewName(e.target.value)} className="p-3 w-full bg-slate-900 rounded-md border border-slate-600 focus:outline-none" />
      </label>

      <button className="p-2 flex items-center justify-center w-full gap-2 bg-blue-600 rounded-md cursor-pointer font-bold text-lg transition duration-200 hover:opacity-85 col-span-2">
        <IoIosSave size={24} /> Save changes
      </button>
    </form>
  </Card>
}