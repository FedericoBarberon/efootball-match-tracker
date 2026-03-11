import { useMutation, useQueryClient } from "@tanstack/react-query"
import { teamService } from "@/presentation/di"
import toast from "react-hot-toast"
import type { TeamId } from "@/domain/team/Team"

export function useChangeTeamNameMutation() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: ({ id, newName }: { id: TeamId, newName: string }) => teamService.changeName(id, newName),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["teams"] })
            toast.success("Team name changed successfully")
        }
    })
}
