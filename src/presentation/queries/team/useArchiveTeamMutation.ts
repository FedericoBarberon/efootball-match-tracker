import { useMutation, useQueryClient } from "@tanstack/react-query";
import { teamService } from "@/presentation/di";
import type { TeamId } from "@/domain/team/Team";
import toast from "react-hot-toast";

export function useArchiveTeamMutation() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: TeamId) => teamService.archive(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["teams"] });
            toast.success("Team archived successfully");
        },
    });
}
