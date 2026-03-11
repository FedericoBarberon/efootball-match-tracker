import { GoAlert } from "react-icons/go";
import Card from "../../../components/Card";
import { FaTrash } from "react-icons/fa6";

type Props = {
    onConfirm: () => void,
    onCancel: () => void,
}

export default function DeleteTeamModalContent({ onConfirm, onCancel }: Props) {
    return (
        <Card className="p-4 text-white flex flex-col gap-4">
            <h2 className="text-xl font-bold text-red-500 flex gap-2 items-center">
                <GoAlert size={24} /> ALERT
            </h2>
            <p>Deleting a team would remove <strong>all</strong> matches played by this team. Are you sure that you want to continue?</p>

            <div className="flex justify-end gap-4">
                <button className="py-2 px-4 flex items-center justify-center gap-2 bg-gray-600 rounded-md cursor-pointer font-bold transition duration-200 hover:opacity-85" onClick={onCancel}>
                    Cancel
                </button>
                <button className="py-2 px-4 flex items-center justify-center gap-2 bg-red-500 rounded-md cursor-pointer font-bold transition duration-200 hover:opacity-85" onClick={onConfirm}>
                    <FaTrash />
                    Delete
                </button>
            </div>
        </Card>
    )
}