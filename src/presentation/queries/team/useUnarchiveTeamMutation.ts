import { useMutation, useQueryClient } from "@tanstack/react-query";
import { teamService } from "@/presentation/di";
import type { TeamId } from "@/domain/team/Team";
import toast from "react-hot-toast";

export function useUnarchiveTeamMutation() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: TeamId) => teamService.unarchive(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["teams"] });
            toast.success("Team unarchived successfully");
        },
    });
}
