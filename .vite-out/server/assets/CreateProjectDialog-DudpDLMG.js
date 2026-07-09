import { t as useAuth } from "./useAuth-B7Ij5ZTT.js";
import { r as useCreateProject } from "./useProjects-BkY3sMGF.js";
import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { Button, Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, Input, toast } from "@blinkdotnew/ui";
import { Check, ChevronDown, Globe, Layers, Layout, LayoutDashboard, Loader2, Moon, Sparkles, Sun, SunMoon } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
//#region src/components/dashboard/CreateProjectDialog.tsx
var PROJECT_TYPE_OPTIONS = [
	{
		value: "website",
		label: "Website",
		icon: Globe
	},
	{
		value: "saas",
		label: "SaaS",
		icon: Layers
	},
	{
		value: "landing-page",
		label: "Landing Page",
		icon: Layout
	},
	{
		value: "dashboard",
		label: "Dashboard",
		icon: LayoutDashboard
	}
];
var INDUSTRY_OPTIONS = [
	{
		value: "technology",
		label: "Technology"
	},
	{
		value: "education",
		label: "Education"
	},
	{
		value: "healthcare",
		label: "Healthcare"
	},
	{
		value: "fitness",
		label: "Fitness"
	},
	{
		value: "finance",
		label: "Finance"
	},
	{
		value: "e-commerce",
		label: "E-commerce"
	},
	{
		value: "ai",
		label: "AI"
	},
	{
		value: "portfolio",
		label: "Portfolio"
	},
	{
		value: "other",
		label: "Other"
	}
];
var THEME_OPTIONS = [
	{
		value: "dark",
		label: "Dark",
		icon: Moon
	},
	{
		value: "light",
		label: "Light",
		icon: Sun
	},
	{
		value: "auto",
		label: "Auto",
		icon: SunMoon
	}
];
var AUDIENCE_OPTIONS = [
	{
		value: "students",
		label: "Students"
	},
	{
		value: "businesses",
		label: "Businesses"
	},
	{
		value: "startups",
		label: "Startups"
	},
	{
		value: "creators",
		label: "Creators"
	},
	{
		value: "developers",
		label: "Developers"
	},
	{
		value: "other",
		label: "Other"
	}
];
var TYPE_INFO = {
	website: {
		label: "Website",
		icon: Globe
	},
	saas: {
		label: "SaaS",
		icon: Layers
	},
	"landing-page": {
		label: "Landing Page",
		icon: Layout
	},
	dashboard: {
		label: "Dashboard",
		icon: LayoutDashboard
	}
};
var INDUSTRY_LABELS = {
	technology: "Technology",
	education: "Education",
	healthcare: "Healthcare",
	fitness: "Fitness",
	finance: "Finance",
	"e-commerce": "E-commerce",
	ai: "AI",
	portfolio: "Portfolio",
	other: "Other"
};
var THEME_LABELS = {
	dark: "Dark",
	light: "Light",
	auto: "Auto"
};
var AUDIENCE_LABELS = {
	students: "Students",
	businesses: "Businesses",
	startups: "Startups",
	creators: "Creators",
	developers: "Developers",
	other: "Other"
};
var stepVariants = {
	enter: {
		x: 40,
		opacity: 0
	},
	center: {
		x: 0,
		opacity: 1
	},
	exit: {
		x: -40,
		opacity: 0
	}
};
var TOTAL_STEPS = 4;
function CreateProjectDialog({ open, onOpenChange, initialType = "website", initialIndustry = "technology", initialName = "" }) {
	const { user } = useAuth();
	const createProject = useCreateProject();
	const navigate = useNavigate();
	const [step, setStep] = useState(1);
	const [projectName, setProjectName] = useState(initialName);
	const [description, setDescription] = useState("");
	const [projectType, setProjectType] = useState(initialType);
	const [industry, setIndustry] = useState(initialIndustry);
	const [industryOpen, setIndustryOpen] = useState(false);
	const [theme, setTheme] = useState("dark");
	const [targetAudience, setTargetAudience] = useState("startups");
	const [lastOpen, setLastOpen] = useState(false);
	if (open && !lastOpen) {
		setLastOpen(true);
		setStep(1);
		setProjectName(initialName);
		setDescription("");
		setProjectType(initialType);
		setIndustry(initialIndustry);
		setTheme("dark");
		setTargetAudience("startups");
		setIndustryOpen(false);
	} else if (!open && lastOpen) setLastOpen(false);
	const resetForm = () => {
		setStep(1);
		setProjectName(initialName);
		setDescription("");
		setProjectType(initialType);
		setIndustry(initialIndustry);
		setTheme("dark");
		setTargetAudience("startups");
		setIndustryOpen(false);
	};
	const handleOpenChange = (next) => {
		if (!next) resetForm();
		onOpenChange(next);
	};
	const canContinueStep1 = projectName.trim().length > 0;
	const canSubmitStep4 = !createProject.isPending;
	const handleSubmit = async () => {
		if (!user?.id) return;
		try {
			const created = await createProject.mutateAsync({
				name: projectName.trim(),
				description: description.trim(),
				type: projectType,
				userId: user.id,
				industry,
				theme,
				targetAudience
			});
			toast.success("Project created!", { description: `${projectName.trim()} has been added to your projects.` });
			resetForm();
			onOpenChange(false);
			navigate({
				to: "/app/projects/$id",
				params: { id: created.id }
			});
		} catch {
			toast.error("Failed to create project", { description: "Please try again." });
		}
	};
	const progressDots = Array.from({ length: TOTAL_STEPS }, (_, i) => i + 1);
	return /* @__PURE__ */ jsx(Dialog, {
		open,
		onOpenChange: handleOpenChange,
		children: /* @__PURE__ */ jsxs(DialogContent, {
			className: "sm:max-w-lg",
			children: [
				/* @__PURE__ */ jsxs(DialogHeader, { children: [/* @__PURE__ */ jsx(DialogTitle, {
					className: "text-foreground",
					children: "Create Project"
				}), /* @__PURE__ */ jsxs(DialogDescription, { children: [
					"Step ",
					step,
					" of ",
					TOTAL_STEPS,
					" —",
					" ",
					step === 1 ? "Project Info" : step === 2 ? "Industry" : step === 3 ? "Generation Options" : "Review"
				] })] }),
				/* @__PURE__ */ jsx("div", {
					className: "flex items-center justify-center gap-2 pt-1 pb-2",
					children: progressDots.map((dot) => /* @__PURE__ */ jsx("div", { className: `size-2 rounded-full transition-colors duration-300 ${dot <= step ? "bg-primary" : "bg-muted"}` }, dot))
				}),
				/* @__PURE__ */ jsx("div", {
					className: "relative overflow-hidden min-h-[280px]",
					children: /* @__PURE__ */ jsxs(AnimatePresence, {
						mode: "wait",
						initial: false,
						children: [
							step === 1 && /* @__PURE__ */ jsxs(motion.div, {
								variants: stepVariants,
								initial: "enter",
								animate: "center",
								exit: "exit",
								transition: {
									duration: .25,
									ease: "easeOut"
								},
								className: "space-y-5",
								children: [
									/* @__PURE__ */ jsxs("div", {
										className: "space-y-2",
										children: [/* @__PURE__ */ jsxs("label", {
											className: "text-sm font-medium text-foreground",
											children: ["Project Name ", /* @__PURE__ */ jsx("span", {
												className: "text-destructive",
												children: "*"
											})]
										}), /* @__PURE__ */ jsx(Input, {
											placeholder: "My Awesome Project",
											value: projectName,
											onChange: (e) => setProjectName(e.target.value),
											autoFocus: true
										})]
									}),
									/* @__PURE__ */ jsxs("div", {
										className: "space-y-2",
										children: [/* @__PURE__ */ jsx("label", {
											className: "text-sm font-medium text-foreground",
											children: "Short Description"
										}), /* @__PURE__ */ jsx("textarea", {
											className: "flex w-full min-h-[80px] rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 resize-none",
											placeholder: "What's this project about?",
											value: description,
											onChange: (e) => setDescription(e.target.value),
											rows: 3
										})]
									}),
									/* @__PURE__ */ jsxs("div", {
										className: "space-y-2",
										children: [/* @__PURE__ */ jsx("label", {
											className: "text-sm font-medium text-foreground",
											children: "Project Type"
										}), /* @__PURE__ */ jsx("div", {
											className: "grid grid-cols-2 gap-2",
											children: PROJECT_TYPE_OPTIONS.map((opt) => {
												const Icon = opt.icon;
												const isSelected = projectType === opt.value;
												return /* @__PURE__ */ jsxs("button", {
													type: "button",
													onClick: () => setProjectType(opt.value),
													className: `flex items-center gap-3 px-4 py-3 rounded-lg border text-sm font-medium transition-all duration-200 ${isSelected ? "border-primary bg-primary/10 text-primary shadow-sm shadow-primary/10" : "border-border bg-card text-muted-foreground hover:border-muted-foreground/30 hover:text-foreground hover:scale-[1.02]"}`,
													children: [/* @__PURE__ */ jsx(Icon, { className: `size-4 shrink-0 ${isSelected ? "text-primary" : ""}` }), opt.label]
												}, opt.value);
											})
										})]
									}),
									/* @__PURE__ */ jsx("div", {
										className: "flex justify-end pt-2",
										children: /* @__PURE__ */ jsx(Button, {
											onClick: () => setStep(2),
											disabled: !canContinueStep1,
											className: "gap-2",
											children: "Continue"
										})
									})
								]
							}, "step-1"),
							step === 2 && /* @__PURE__ */ jsxs(motion.div, {
								variants: stepVariants,
								initial: "enter",
								animate: "center",
								exit: "exit",
								transition: {
									duration: .25,
									ease: "easeOut"
								},
								className: "space-y-5",
								children: [/* @__PURE__ */ jsxs("div", {
									className: "space-y-2",
									children: [
										/* @__PURE__ */ jsx("label", {
											className: "text-sm font-medium text-foreground",
											children: "Industry"
										}),
										/* @__PURE__ */ jsxs("div", {
											className: "relative",
											children: [/* @__PURE__ */ jsxs("button", {
												type: "button",
												onClick: () => setIndustryOpen(!industryOpen),
												className: "flex w-full items-center justify-between rounded-md border border-input bg-transparent px-3 py-2.5 text-sm shadow-sm transition-colors hover:border-muted-foreground/30 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
												children: [/* @__PURE__ */ jsx("span", {
													className: "text-foreground",
													children: INDUSTRY_LABELS[industry]
												}), /* @__PURE__ */ jsx(ChevronDown, { className: `size-4 text-muted-foreground transition-transform duration-200 ${industryOpen ? "rotate-180" : ""}` })]
											}), industryOpen && /* @__PURE__ */ jsx("div", {
												className: "absolute z-20 mt-1 w-full rounded-md border border-border bg-card shadow-lg",
												children: /* @__PURE__ */ jsx("div", {
													className: "max-h-52 overflow-y-auto py-1",
													children: INDUSTRY_OPTIONS.map((opt) => {
														const isSelected = industry === opt.value;
														return /* @__PURE__ */ jsxs("button", {
															type: "button",
															onClick: () => {
																setIndustry(opt.value);
																setIndustryOpen(false);
															},
															className: `flex w-full items-center justify-between px-3 py-2 text-sm transition-colors hover:bg-muted ${isSelected ? "text-primary bg-primary/5" : "text-foreground"}`,
															children: [opt.label, isSelected && /* @__PURE__ */ jsx(Check, { className: "size-3.5 text-primary" })]
														}, opt.value);
													})
												})
											})]
										}),
										industryOpen && /* @__PURE__ */ jsx("div", {
											className: "fixed inset-0 z-10",
											onClick: () => setIndustryOpen(false)
										})
									]
								}), /* @__PURE__ */ jsxs("div", {
									className: "flex items-center justify-between pt-2",
									children: [/* @__PURE__ */ jsx(Button, {
										variant: "outline",
										onClick: () => setStep(1),
										className: "gap-2",
										children: "Back"
									}), /* @__PURE__ */ jsx(Button, {
										onClick: () => setStep(3),
										className: "gap-2",
										children: "Continue"
									})]
								})]
							}, "step-2"),
							step === 3 && /* @__PURE__ */ jsxs(motion.div, {
								variants: stepVariants,
								initial: "enter",
								animate: "center",
								exit: "exit",
								transition: {
									duration: .25,
									ease: "easeOut"
								},
								className: "space-y-5",
								children: [
									/* @__PURE__ */ jsxs("div", {
										className: "space-y-2",
										children: [/* @__PURE__ */ jsx("label", {
											className: "text-sm font-medium text-foreground",
											children: "Theme"
										}), /* @__PURE__ */ jsx("div", {
											className: "grid grid-cols-3 gap-2",
											children: THEME_OPTIONS.map((opt) => {
												const Icon = opt.icon;
												const isSelected = theme === opt.value;
												return /* @__PURE__ */ jsxs("button", {
													type: "button",
													onClick: () => setTheme(opt.value),
													className: `flex flex-col items-center gap-2 px-4 py-4 rounded-lg border text-sm font-medium transition-all duration-200 ${isSelected ? "border-primary bg-primary/10 text-primary shadow-sm shadow-primary/10" : "border-border bg-card text-muted-foreground hover:border-muted-foreground/30 hover:text-foreground hover:scale-[1.02]"}`,
													children: [/* @__PURE__ */ jsx(Icon, { className: `size-5 shrink-0 ${isSelected ? "text-primary" : ""}` }), opt.label]
												}, opt.value);
											})
										})]
									}),
									/* @__PURE__ */ jsxs("div", {
										className: "space-y-2",
										children: [/* @__PURE__ */ jsx("label", {
											className: "text-sm font-medium text-foreground",
											children: "Target Audience"
										}), /* @__PURE__ */ jsx("div", {
											className: "grid grid-cols-3 gap-2",
											children: AUDIENCE_OPTIONS.map((opt) => {
												return /* @__PURE__ */ jsx("button", {
													type: "button",
													onClick: () => setTargetAudience(opt.value),
													className: `px-3 py-2 rounded-full border text-xs font-medium transition-all duration-200 ${targetAudience === opt.value ? "border-primary bg-primary/10 text-primary shadow-sm shadow-primary/10" : "border-border bg-card text-muted-foreground hover:border-muted-foreground/30 hover:text-foreground hover:scale-[1.02]"}`,
													children: opt.label
												}, opt.value);
											})
										})]
									}),
									/* @__PURE__ */ jsxs("div", {
										className: "flex items-center justify-between pt-2",
										children: [/* @__PURE__ */ jsx(Button, {
											variant: "outline",
											onClick: () => setStep(2),
											className: "gap-2",
											children: "Back"
										}), /* @__PURE__ */ jsx(Button, {
											onClick: () => setStep(4),
											className: "gap-2",
											children: "Continue"
										})]
									})
								]
							}, "step-3"),
							step === 4 && /* @__PURE__ */ jsxs(motion.div, {
								variants: stepVariants,
								initial: "enter",
								animate: "center",
								exit: "exit",
								transition: {
									duration: .25,
									ease: "easeOut"
								},
								className: "space-y-5",
								children: [/* @__PURE__ */ jsxs("div", {
									className: "rounded-xl border border-border bg-card/60 p-5 space-y-4",
									children: [/* @__PURE__ */ jsxs("div", {
										className: "flex items-center gap-2",
										children: [/* @__PURE__ */ jsx(Sparkles, { className: "size-4 text-primary" }), /* @__PURE__ */ jsx("h3", {
											className: "text-sm font-semibold text-foreground",
											children: "Project Summary"
										})]
									}), /* @__PURE__ */ jsxs("div", {
										className: "space-y-3",
										children: [
											/* @__PURE__ */ jsxs("div", {
												className: "flex items-center justify-between",
												children: [/* @__PURE__ */ jsx("span", {
													className: "text-xs text-muted-foreground",
													children: "Name"
												}), /* @__PURE__ */ jsx("span", {
													className: "text-sm font-medium text-foreground",
													children: projectName
												})]
											}),
											/* @__PURE__ */ jsxs("div", {
												className: "flex items-center justify-between",
												children: [/* @__PURE__ */ jsx("span", {
													className: "text-xs text-muted-foreground",
													children: "Type"
												}), /* @__PURE__ */ jsx("span", {
													className: "inline-flex items-center gap-1.5 text-sm font-medium text-foreground",
													children: (() => {
														const info = TYPE_INFO[projectType];
														const Icon = info.icon;
														return /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx(Icon, { className: "size-3.5 text-primary" }), info.label] });
													})()
												})]
											}),
											description && /* @__PURE__ */ jsxs("div", {
												className: "flex items-start justify-between gap-4",
												children: [/* @__PURE__ */ jsx("span", {
													className: "text-xs text-muted-foreground shrink-0",
													children: "Description"
												}), /* @__PURE__ */ jsx("span", {
													className: "text-sm text-foreground/80 text-right leading-snug max-w-[60%]",
													children: description
												})]
											}),
											/* @__PURE__ */ jsxs("div", {
												className: "flex items-center justify-between",
												children: [/* @__PURE__ */ jsx("span", {
													className: "text-xs text-muted-foreground",
													children: "Industry"
												}), /* @__PURE__ */ jsx("span", {
													className: "text-sm font-medium text-foreground",
													children: INDUSTRY_LABELS[industry]
												})]
											}),
											/* @__PURE__ */ jsxs("div", {
												className: "flex items-center justify-between",
												children: [/* @__PURE__ */ jsx("span", {
													className: "text-xs text-muted-foreground",
													children: "Theme"
												}), /* @__PURE__ */ jsx("span", {
													className: "text-sm font-medium text-foreground",
													children: THEME_LABELS[theme]
												})]
											}),
											/* @__PURE__ */ jsxs("div", {
												className: "flex items-center justify-between",
												children: [/* @__PURE__ */ jsx("span", {
													className: "text-xs text-muted-foreground",
													children: "Target Audience"
												}), /* @__PURE__ */ jsx("span", {
													className: "text-sm font-medium text-foreground",
													children: AUDIENCE_LABELS[targetAudience]
												})]
											})
										]
									})]
								}), /* @__PURE__ */ jsxs("div", {
									className: "flex items-center justify-between pt-2",
									children: [/* @__PURE__ */ jsx(Button, {
										variant: "outline",
										onClick: () => setStep(3),
										className: "gap-2",
										children: "Back"
									}), /* @__PURE__ */ jsx(Button, {
										onClick: handleSubmit,
										disabled: !canSubmitStep4,
										className: "gap-2",
										children: createProject.isPending ? /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx(Loader2, { className: "size-4 animate-spin" }), "Generating..."] }) : /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx(Sparkles, { className: "size-4" }), "Generate Project"] })
									})]
								})]
							}, "step-4")
						]
					})
				})
			]
		})
	});
}
//#endregion
export { CreateProjectDialog as t };
