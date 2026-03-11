import { useQuery } from "@tanstack/react-query";
import { teamService } from "@/presentation/di";

export function useTeamsQuery() {
    return useQuery({
        queryKey: ["teams"],
        queryFn: () => teamService.getAll(),
        select: (data) =>
            data.toSorted((a, b) => {
                if (a.isArchived) return 1;
                if (b.isArchived) return -1;
                return 0;
            }),
    });
}
