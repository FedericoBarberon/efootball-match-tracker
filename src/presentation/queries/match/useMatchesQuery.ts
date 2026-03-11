import { useQuery } from "@tanstack/react-query";
import { matchOrchestrator } from "@/presentation/di";

export function useMatchesQuery() {
    return useQuery({
        queryKey: ["matches"],
        queryFn: () => matchOrchestrator.getMatchHistory(),
        select: (data) =>
            data.toSorted((a, b) =>
                new Date(b.date).getTime() - new Date(a.date).getTime()
            ),
    });
}
