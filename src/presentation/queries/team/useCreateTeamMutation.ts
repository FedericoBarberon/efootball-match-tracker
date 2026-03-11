import { useMutation, useQueryClient } from "@tanstack/react-query"
import { teamService } from "@/presentation/di"
import type { CreateTeamCommand } from "@/application/commands"
import toast from "react-hot-toast"

export function useCreateTeamMutation() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (data: CreateTeamCommand) => teamService.create(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["teams"] })
            toast.success("Team created successfully")
        }
    })
}
