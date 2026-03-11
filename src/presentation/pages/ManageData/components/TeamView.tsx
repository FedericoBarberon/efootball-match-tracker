import { MdEdit } from "react-icons/md"
import { FaArchive, FaTrashAlt } from "react-icons/fa"
import { useArchiveTeamMutation } from "../../../queries/team/useArchiveTeamMutation"
import { useDeleteTeamMutation } from "../../../queries/team/useDeleteTeamMutation"
import { useState } from "react"
import Modal from "../../../components/Modal"
import EditTeamModalContent from "./EditTeamModalContent"
import { useChangeTeamNameMutation } from "../../../queries/team/useEditTeamMutate"
import type { Team } from "@/domain/team/Team"
import { useUnarchiveTeamMutation } from "../../../queries/team/useUnarchiveTeamMutation"
import DeleteTeamModalContent from "./DeleteTeamModalContent"

export default function TeamView({ team }: { team: Team }) {
    const [showEditModal, setShowEditModal] = useState(false)
    const [showDeleteModal, setShowDeleteModal] = useState(false)

    const deleteTeamMutation = useDeleteTeamMutation()
    const archiveTeamMutation = useArchiveTeamMutation()
    const unarchiveTeamMutation = useUnarchiveTeamMutation()
    const changeTeamNameMutation = useChangeTeamNameMutation()

    return <tr>
        <td className="font-bold text-lg px-4 py-2">{team.name}</td>
        <td className="flex flex-col md:flex-row justify-end items-center px-4 py-2 gap-4">
            <button className="border rounded border-blue-500 text-blue-500 px-4 py-2 flex gap-2 items-center cursor-pointer hover:text-white hover:bg-blue-500 transition duration-150 justify-center w-32" onClick={() => setShowEditModal(!showEditModal)}>
                <MdEdit />
                <span>Edit</span>
            </button>
            {
                showEditModal && (
                    <Modal onClose={() => setShowEditModal(false)}>
                        <EditTeamModalContent team={team} onClose={() => setShowEditModal(false)} onEdit={(newName: string) => {
                            changeTeamNameMutation.mutate({
                                id: team.id,
                                newName
                            })

                            setShowEditModal(false)
                        }} />
                    </Modal>)
            }
            {
                team.isArchived ?
                    <>
                        <button className="border rounded border-orange-500 text-orange-500 px-4 py-2 flex gap-2 items-center cursor-pointer hover:text-white hover:bg-orange-500 transition duration-150 justify-center w-32" onClick={() => unarchiveTeamMutation.mutate(team.id)}>
                            <FaArchive />
                            <span>Unarchive</span>
                        </button>
                        <button className="border rounded border-red-500 text-red-500 px-4 py-2 flex gap-2 items-center cursor-pointer hover:text-white hover:bg-red-500 transition duration-150 justify-center w-32" onClick={() => setShowDeleteModal(!showDeleteModal)}>
                            <FaTrashAlt />
                            <span>Delete</span>
                        </button>
                        {
                            showDeleteModal && (
                                <Modal onClose={() => setShowDeleteModal(false)}>
                                    <DeleteTeamModalContent onConfirm={() => {
                                        deleteTeamMutation.mutate(team.id)
                                        setShowDeleteModal(false)
                                    }} onCancel={() => setShowDeleteModal(false)} />
                                </Modal>)
                        }
                    </>
                    :
                    <button className="border rounded border-orange-500 text-orange-500 px-4 py-2 flex gap-2 items-center cursor-pointer hover:text-white hover:bg-orange-500 transition duration-150 justify-center w-32" onClick={() => archiveTeamMutation.mutate(team.id)}>
                        <FaArchive />
                        <span>Archive</span>
                    </button>
            }
        </td>
    </tr>
}