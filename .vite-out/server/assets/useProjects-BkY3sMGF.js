import { n as blink } from "./useAuth-B7Ij5ZTT.js";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
//#region src/hooks/useProjects.ts
var projectsTable = blink.db.table("projects");
var generationJobsTable = blink.db.table("generation_jobs");
function useProjects(userId) {
	return useQuery({
		queryKey: ["projects", userId],
		queryFn: async () => {
			if (!userId) return [];
			return await projectsTable.list({
				where: { userId },
				orderBy: { createdAt: "desc" }
			});
		},
		enabled: !!userId
	});
}
function useCreateProject() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async (input) => {
			return await projectsTable.create({
				name: input.name,
				description: input.description,
				type: input.type,
				userId: input.userId,
				status: "draft",
				data: JSON.stringify({
					industry: input.industry,
					theme: input.theme,
					targetAudience: input.targetAudience
				})
			});
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["projects"] });
		}
	});
}
function useCreateGenerationJob() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async (input) => {
			return await generationJobsTable.create({
				projectId: input.projectId,
				userId: input.userId,
				config: JSON.stringify(input.config),
				status: "pending",
				generationType: "website"
			});
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["generation-jobs"] });
		}
	});
}
function parseProjectData(project) {
	try {
		return JSON.parse(project.data || "{}");
	} catch {
		return {};
	}
}
//#endregion
export { useProjects as i, useCreateGenerationJob as n, useCreateProject as r, parseProjectData as t };
