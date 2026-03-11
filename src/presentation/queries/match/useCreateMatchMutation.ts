import { useMutation, useQueryClient } from "@tanstack/react-query"
import { matchOrchestrator } from "@/presentation/di"
import type { CreateMatchCommand } from "@/application/commands"
import toast from "react-hot-toast"

export function useCreateMatchMutation() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (data: CreateMatchCommand) => matchOrchestrator.createMatch(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["matches"] })
            toast.success("Match created successfully")
        }
    })
}
