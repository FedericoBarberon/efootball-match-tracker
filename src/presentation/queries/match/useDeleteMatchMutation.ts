import { useMutation, useQueryClient } from "@tanstack/react-query"
import { matchService } from "@/presentation/di"
import type { MatchId } from "@/domain/match/Match"
import toast from "react-hot-toast"

export function useDeleteMatchMutation() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (id: MatchId) => matchService.delete(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["matches"] })
            toast.success("Match deleted successfully")
        }
    })
}
