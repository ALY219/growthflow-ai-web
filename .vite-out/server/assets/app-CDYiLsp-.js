import { t as useAuth } from "./useAuth-B7Ij5ZTT.js";
import { i as useProjects } from "./useProjects-BkY3sMGF.js";
import { t as CreateProjectDialog } from "./CreateProjectDialog-DudpDLMG.js";
import { useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import { jsx, jsxs } from "react/jsx-runtime";
import { Badge, Button, Card, CardContent, CardDescription, CardHeader, CardTitle, Skeleton } from "@blinkdotnew/ui";
import { CheckCircle2, ChevronRight, Clock, FolderOpen, Globe, Layers, Layout, LayoutDashboard, Plus, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
//#region src/routes/app/index.tsx?tsr-split=component
var PROJECT_TYPE_ICONS = {
	website: Globe,
	saas: Layers,
	"landing-page": Layout,
	dashboard: LayoutDashboard
};
var PROJECT_TYPE_LABELS = {
	website: "Website",
	saas: "SaaS",
	"landing-page": "Landing Page",
	dashboard: "Dashboard"
};
var STATUS_VARIANTS = {
	draft: "secondary",
	building: "default",
	completed: "outline",
	archived: "secondary"
};
var STATUS_LABELS = {
	draft: "Draft",
	building: "Building",
	completed: "Completed",
	archived: "Archived"
};
function formatDate(iso) {
	return new Date(iso).toLocaleDateString("en-US", {
		month: "short",
		day: "numeric",
		year: "numeric"
	});
}
function DashboardPage() {
	const { user } = useAuth();
	const { data: projects = [], isLoading } = useProjects(user?.id);
	const [dialogOpen, setDialogOpen] = useState(false);
	const kpi = useMemo(() => {
		return {
			total: projects.length,
			inProgress: projects.filter((p) => p.status === "draft" || p.status === "building").length,
			completed: projects.filter((p) => p.status === "completed").length
		};
	}, [projects]);
	return /* @__PURE__ */ jsxs("div", {
		className: "space-y-8",
		children: [
			/* @__PURE__ */ jsxs("div", {
				className: "flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4",
				children: [
					/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsxs("h1", {
						className: "text-2xl md:text-3xl font-bold tracking-tight text-foreground",
						children: ["Welcome back, ", user?.displayName ?? user?.email ?? "there"]
					}), /* @__PURE__ */ jsx("p", {
						className: "text-muted-foreground mt-1 text-sm",
						children: "Here's what's happening with your projects today."
					})] }),
					/* @__PURE__ */ jsx(CreateProjectDialog, {
						open: dialogOpen,
						onOpenChange: setDialogOpen
					}),
					/* @__PURE__ */ jsxs(Button, {
						size: "sm",
						className: "gap-2",
						onClick: () => setDialogOpen(true),
						children: [/* @__PURE__ */ jsx(Plus, { className: "size-4" }), "Create New Project"]
					})
				]
			}),
			/* @__PURE__ */ jsx("div", {
				className: "grid grid-cols-1 sm:grid-cols-3 gap-4",
				children: [
					{
						label: "Active Projects",
						value: kpi.inProgress,
						icon: Clock,
						color: "text-primary",
						bg: "bg-primary/10"
					},
					{
						label: "Total Projects",
						value: kpi.total,
						icon: FolderOpen,
						color: "text-accent",
						bg: "bg-accent/10"
					},
					{
						label: "Completed",
						value: kpi.completed,
						icon: CheckCircle2,
						color: "text-emerald-400",
						bg: "bg-emerald-400/10"
					}
				].map((stat) => /* @__PURE__ */ jsx(Card, {
					className: "border-border bg-card",
					children: /* @__PURE__ */ jsx(CardContent, {
						className: "p-5",
						children: /* @__PURE__ */ jsxs("div", {
							className: "flex items-center gap-4",
							children: [/* @__PURE__ */ jsx("div", {
								className: `flex size-10 items-center justify-center rounded-lg ${stat.bg}`,
								children: /* @__PURE__ */ jsx(stat.icon, { className: `size-5 ${stat.color}` })
							}), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("div", {
								className: "text-2xl font-bold text-foreground",
								children: isLoading ? /* @__PURE__ */ jsx(Skeleton, { className: "h-7 w-10 inline-block" }) : stat.value
							}), /* @__PURE__ */ jsx("p", {
								className: "text-xs text-muted-foreground",
								children: stat.label
							})] })]
						})
					})
				}, stat.label))
			}),
			/* @__PURE__ */ jsxs("div", { children: [
				/* @__PURE__ */ jsxs("div", {
					className: "flex items-center justify-between mb-4",
					children: [/* @__PURE__ */ jsx("h2", {
						className: "text-lg font-semibold text-foreground",
						children: "Your Projects"
					}), projects.length > 0 && /* @__PURE__ */ jsxs(Link, {
						to: "/app/projects",
						className: "flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors",
						children: ["View all", /* @__PURE__ */ jsx(ChevronRight, { className: "size-3.5" })]
					})]
				}),
				isLoading && /* @__PURE__ */ jsx("div", {
					className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4",
					children: [...Array(6)].map((_, i) => /* @__PURE__ */ jsxs(Card, {
						className: "border-border bg-card",
						children: [/* @__PURE__ */ jsxs(CardHeader, {
							className: "pb-2",
							children: [/* @__PURE__ */ jsx(Skeleton, { className: "h-5 w-3/4" }), /* @__PURE__ */ jsx(Skeleton, { className: "h-3 w-1/2 mt-1" })]
						}), /* @__PURE__ */ jsxs(CardContent, { children: [/* @__PURE__ */ jsx(Skeleton, { className: "h-4 w-full" }), /* @__PURE__ */ jsx(Skeleton, { className: "h-4 w-2/3 mt-1" })] })]
					}, i))
				}),
				!isLoading && projects.length === 0 && /* @__PURE__ */ jsx(Card, {
					className: "border-border bg-card border-dashed",
					children: /* @__PURE__ */ jsxs(CardContent, {
						className: "flex flex-col items-center justify-center py-16 text-center",
						children: [
							/* @__PURE__ */ jsx("div", {
								className: "flex size-16 items-center justify-center rounded-2xl bg-muted mb-5",
								children: /* @__PURE__ */ jsx(Sparkles, { className: "size-8 text-muted-foreground" })
							}),
							/* @__PURE__ */ jsx("h3", {
								className: "text-lg font-semibold text-foreground",
								children: "No projects yet"
							}),
							/* @__PURE__ */ jsx("p", {
								className: "text-sm text-muted-foreground mt-1.5 max-w-sm",
								children: "Create your first project to get started with AI-powered blueprints, website generation, and more."
							}),
							/* @__PURE__ */ jsxs(Button, {
								className: "mt-6 gap-2",
								onClick: () => setDialogOpen(true),
								children: [/* @__PURE__ */ jsx(Plus, { className: "size-4" }), "Create Your First Project"]
							})
						]
					})
				}),
				!isLoading && projects.length > 0 && /* @__PURE__ */ jsx("div", {
					className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4",
					children: projects.map((project, i) => {
						const TypeIcon = PROJECT_TYPE_ICONS[project.type];
						return /* @__PURE__ */ jsx(motion.div, {
							initial: {
								opacity: 0,
								y: 16
							},
							animate: {
								opacity: 1,
								y: 0
							},
							transition: {
								duration: .35,
								delay: i * .06,
								ease: "easeOut"
							},
							children: /* @__PURE__ */ jsx(Link, {
								to: "/app/projects/$id",
								params: { id: project.id },
								children: /* @__PURE__ */ jsxs(Card, {
									className: "group border-border bg-card hover:shadow-lg hover:shadow-primary/5 hover:border-primary/30 transition-all duration-200 hover:-translate-y-0.5 cursor-pointer",
									children: [/* @__PURE__ */ jsxs(CardHeader, {
										className: "pb-3",
										children: [/* @__PURE__ */ jsxs("div", {
											className: "flex items-start justify-between gap-2",
											children: [/* @__PURE__ */ jsx(CardTitle, {
												className: "text-base font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-1",
												children: project.name
											}), /* @__PURE__ */ jsx(TypeIcon, { className: "size-4 shrink-0 text-muted-foreground group-hover:text-primary transition-colors" })]
										}), /* @__PURE__ */ jsxs(CardDescription, {
											className: "flex items-center gap-2 mt-1",
											children: [/* @__PURE__ */ jsx(Badge, {
												variant: STATUS_VARIANTS[project.status],
												children: STATUS_LABELS[project.status]
											}), /* @__PURE__ */ jsx(Badge, {
												variant: "outline",
												children: PROJECT_TYPE_LABELS[project.type]
											})]
										})]
									}), /* @__PURE__ */ jsxs(CardContent, { children: [/* @__PURE__ */ jsx("p", {
										className: "text-sm text-muted-foreground line-clamp-2",
										children: project.description || "No description yet."
									}), /* @__PURE__ */ jsxs("p", {
										className: "text-xs text-muted-foreground/60 mt-3",
										children: ["Created ", formatDate(project.createdAt)]
									})] })]
								})
							})
						}, project.id);
					})
				})
			] })
		]
	});
}
//#endregion
export { DashboardPage as component };
