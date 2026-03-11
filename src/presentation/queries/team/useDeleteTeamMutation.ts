import { useMutation, useQueryClient } from "@tanstack/react-query";
import { teamOrchestrator } from "@/presentation/di";
import type { TeamId } from "@/domain/team/Team";
import toast from "react-hot-toast";

export function useDeleteTeamMutation() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: TeamId) => teamOrchestrator.deleteTeam(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["teams"] });
            toast.success("Team and matches deleted successfully");
        },
    });
}
