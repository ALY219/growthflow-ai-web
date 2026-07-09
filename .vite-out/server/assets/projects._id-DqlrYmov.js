import { t as useAuth } from "./useAuth-B7Ij5ZTT.js";
import { i as useProjects, n as useCreateGenerationJob, t as parseProjectData } from "./useProjects-BkY3sMGF.js";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Link, useParams } from "@tanstack/react-router";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { Badge, Button, Card, CardContent, Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, Input, Separator } from "@blinkdotnew/ui";
import { ArrowLeft, Banknote, BookOpen, Briefcase, BriefcaseBusiness, Building2, Check, ChevronLeft, ChevronRight, Clock, Cloud, Code, Database, Ellipsis, Eye, FileText, Film, Footprints, Gamepad2, Gauge, Gem, Globe, GraduationCap, HeartPulse, HelpCircle, Layers, Layout, LayoutDashboard, Lightbulb, Loader2, Lock, Mail, MessageCircle, Minus, Monitor, Moon, Package, PaintBucket, Palette, PanelRight, Pen, Rocket, Search, ShieldCheck, ShoppingCart, Smartphone, Smile, Sparkles, Star, Store, Sun, SunMoon, TrendingUp, UtensilsCrossed, Zap } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
//#region src/components/dashboard/WorkspaceSidebar.tsx
var WORKSPACE_NAV = [
	{
		id: "overview",
		label: "Overview",
		icon: LayoutDashboard
	},
	{
		id: "website",
		label: "Website",
		icon: Globe
	},
	{
		id: "blueprint",
		label: "Blueprint",
		icon: FileText
	},
	{
		id: "database",
		label: "Database",
		icon: Database
	},
	{
		id: "deployment",
		label: "Deployment",
		icon: Rocket
	},
	{
		id: "assets",
		label: "Assets",
		icon: Package
	},
	{
		id: "history",
		label: "History",
		icon: Clock
	}
];
var WORKSPACE_NAV_ITEMS = WORKSPACE_NAV;
function WorkspaceSidebar({ active, onSelect, className }) {
	return /* @__PURE__ */ jsx("aside", {
		className: `w-52 shrink-0 border-r border-border bg-card/30 overflow-y-auto ${className ?? ""}`,
		children: /* @__PURE__ */ jsx("nav", {
			className: "p-3 space-y-0.5",
			children: WORKSPACE_NAV.map((item) => {
				const Icon = item.icon;
				return /* @__PURE__ */ jsxs("button", {
					type: "button",
					onClick: () => onSelect(item.id),
					className: `w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-150 ${active === item.id ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-muted hover:text-foreground"}`,
					children: [/* @__PURE__ */ jsx(Icon, { className: "size-4 shrink-0" }), /* @__PURE__ */ jsx("span", {
						className: "truncate",
						children: item.label
					})]
				}, item.id);
			})
		})
	});
}
//#endregion
//#region src/components/dashboard/PropertiesPanel.tsx
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
var TYPE_LABELS = {
	website: "Website",
	saas: "SaaS",
	"landing-page": "Landing Page",
	dashboard: "Dashboard"
};
var STATUS_VARIANTS$1 = {
	draft: "secondary",
	building: "default",
	completed: "outline",
	archived: "secondary"
};
var STATUS_LABELS$1 = {
	draft: "Draft",
	building: "Building",
	completed: "Completed",
	archived: "Archived"
};
function formatDate$1(iso) {
	return new Date(iso).toLocaleDateString("en-US", {
		month: "long",
		day: "numeric",
		year: "numeric"
	});
}
function PropertiesPanel({ project, projectData }) {
	const industryLabel = projectData.industry ? INDUSTRY_LABELS[projectData.industry] ?? projectData.industry : "—";
	const themeLabel = projectData.theme ? THEME_LABELS[projectData.theme] ?? projectData.theme : "—";
	const audienceLabel = projectData.targetAudience ? AUDIENCE_LABELS[projectData.targetAudience] ?? projectData.targetAudience : "—";
	const typeLabel = TYPE_LABELS[project.type] ?? project.type;
	const statusLabel = STATUS_LABELS$1[project.status] ?? project.status;
	const statusVariant = STATUS_VARIANTS$1[project.status] ?? "secondary";
	return /* @__PURE__ */ jsxs("aside", {
		className: "w-64 shrink-0 border-l border-border bg-card/20 p-4 space-y-6 overflow-y-auto",
		children: [/* @__PURE__ */ jsx("h3", {
			className: "text-xs font-semibold uppercase tracking-wider text-muted-foreground",
			children: "Properties"
		}), /* @__PURE__ */ jsxs("div", {
			className: "space-y-4",
			children: [
				/* @__PURE__ */ jsx(PropertyRow, {
					label: "Industry",
					value: industryLabel
				}),
				/* @__PURE__ */ jsx(PropertyRow, {
					label: "Project Type",
					value: typeLabel
				}),
				/* @__PURE__ */ jsx(PropertyRow, {
					label: "Theme",
					value: themeLabel
				}),
				/* @__PURE__ */ jsx(PropertyRow, {
					label: "Target Audience",
					value: audienceLabel
				}),
				/* @__PURE__ */ jsx(Separator, {}),
				/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("p", {
					className: "text-xs text-muted-foreground mb-1.5",
					children: "Status"
				}), /* @__PURE__ */ jsx(Badge, {
					variant: statusVariant,
					children: statusLabel
				})] }),
				/* @__PURE__ */ jsx(PropertyRow, {
					label: "Created",
					value: formatDate$1(project.createdAt)
				}),
				/* @__PURE__ */ jsx(Separator, {}),
				/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("p", {
					className: "text-xs text-muted-foreground mb-1.5",
					children: "Subscription Plan"
				}), /* @__PURE__ */ jsx(Badge, {
					variant: "secondary",
					children: "Free"
				})] })
			]
		})]
	});
}
function PropertyRow({ label, value }) {
	return /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("p", {
		className: "text-xs text-muted-foreground mb-0.5",
		children: label
	}), /* @__PURE__ */ jsx("p", {
		className: "text-sm font-medium text-foreground",
		children: value
	})] });
}
//#endregion
//#region src/components/dashboard/GenerateConfirmDialog.tsx
function GenerateConfirmDialog({ open, onOpenChange, onConfirm, featureLabel }) {
	return /* @__PURE__ */ jsx(Dialog, {
		open,
		onOpenChange,
		children: /* @__PURE__ */ jsxs(DialogContent, {
			className: "sm:max-w-md",
			children: [
				/* @__PURE__ */ jsx(DialogHeader, { children: /* @__PURE__ */ jsx(DialogTitle, { children: "AI Generation" }) }),
				/* @__PURE__ */ jsxs("div", {
					className: "flex flex-col items-center gap-4 py-4",
					children: [
						/* @__PURE__ */ jsx("div", {
							className: "size-12 rounded-full bg-primary/10 flex items-center justify-center",
							children: /* @__PURE__ */ jsx(Sparkles, { className: "size-6 text-primary" })
						}),
						/* @__PURE__ */ jsx(DialogDescription, {
							className: "text-center",
							children: "This feature will be connected to the AI engine in the next version."
						}),
						/* @__PURE__ */ jsxs("p", {
							className: "text-xs text-muted-foreground",
							children: [
								"Generating:",
								" ",
								/* @__PURE__ */ jsx("span", {
									className: "font-medium text-foreground",
									children: featureLabel
								})
							]
						})
					]
				}),
				/* @__PURE__ */ jsxs(DialogFooter, {
					className: "gap-2 sm:gap-0",
					children: [/* @__PURE__ */ jsx(Button, {
						variant: "outline",
						onClick: () => onOpenChange(false),
						children: "Cancel"
					}), /* @__PURE__ */ jsxs(Button, {
						onClick: onConfirm,
						className: "gap-2",
						children: [/* @__PURE__ */ jsx(Sparkles, { className: "size-3.5" }), "Continue"]
					})]
				})
			]
		})
	});
}
//#endregion
//#region src/lib/generation-types.ts
var BUSINESS_CATEGORY_LABELS = {
	technology: "Technology",
	ecommerce: "Ecommerce",
	healthcare: "Healthcare",
	education: "Education",
	finance: "Finance",
	portfolio: "Portfolio",
	restaurant: "Restaurant",
	agency: "Agency",
	other: "Other"
};
var WEBSITE_GOAL_LABELS = {
	"sell-products": "Sell Products",
	"generate-leads": "Generate Leads",
	portfolio: "Portfolio",
	"landing-page": "Landing Page",
	"business-website": "Business Website",
	saas: "SaaS"
};
var PREFERRED_STYLE_LABELS = {
	apple: "Apple",
	stripe: "Stripe",
	notion: "Notion",
	linear: "Linear",
	"modern-startup": "Modern Startup",
	minimal: "Minimal",
	bold: "Bold",
	elegant: "Elegant"
};
var WEBSITE_SECTION_LABELS = {
	hero: "Hero",
	features: "Features",
	pricing: "Pricing",
	testimonials: "Testimonials",
	about: "About",
	faq: "FAQ",
	contact: "Contact",
	blog: "Blog",
	newsletter: "Newsletter",
	footer: "Footer"
};
var TARGET_AUDIENCE_LABELS = {
	students: "Students",
	businesses: "Businesses",
	developers: "Developers",
	creators: "Creators",
	startups: "Startups",
	enterprise: "Enterprise",
	other: "Other"
};
var TONE_LABELS = {
	professional: "Professional",
	friendly: "Friendly",
	luxury: "Luxury",
	minimal: "Minimal",
	playful: "Playful",
	corporate: "Corporate"
};
var ADVANCED_OPTION_LABELS = {
	seo: "SEO Optimization",
	accessibility: "Accessibility",
	"responsive-design": "Responsive Design",
	"dark-mode": "Dark Mode",
	animations: "Animations",
	performance: "Performance Optimization",
	"auth-ready": "Authentication Ready",
	"database-ready": "Database Ready"
};
function createDefaultConfig() {
	return {
		businessName: "",
		businessDescription: "",
		businessCategory: "",
		websiteGoal: "",
		theme: "dark",
		primaryColor: "#3B82F6",
		accentColor: "#8B5CF6",
		preferredStyle: "",
		sections: [],
		targetAudiences: [],
		tone: "",
		advancedOptions: []
	};
}
var STEP_LABELS = {
	1: "Business Information",
	2: "Brand Identity",
	3: "Website Structure",
	4: "Target Audience",
	5: "Advanced Options",
	6: "Review"
};
//#endregion
//#region src/components/dashboard/WebsiteGenerationWizard.tsx
var BUSINESS_CATEGORIES = [
	"technology",
	"ecommerce",
	"healthcare",
	"education",
	"finance",
	"portfolio",
	"restaurant",
	"agency",
	"other"
];
var CATEGORY_ICONS = {
	technology: Code,
	ecommerce: Store,
	healthcare: HeartPulse,
	education: GraduationCap,
	finance: Banknote,
	portfolio: Briefcase,
	restaurant: UtensilsCrossed,
	agency: Building2,
	other: Ellipsis
};
var WEBSITE_GOALS = [
	"sell-products",
	"generate-leads",
	"portfolio",
	"landing-page",
	"business-website",
	"saas"
];
var GOAL_ICONS = {
	"sell-products": ShoppingCart,
	"generate-leads": TrendingUp,
	portfolio: FileText,
	"landing-page": Layout,
	"business-website": Monitor,
	saas: Cloud
};
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
var STYLE_OPTIONS = [
	{
		value: "apple",
		icon: Star
	},
	{
		value: "stripe",
		icon: Layers
	},
	{
		value: "notion",
		icon: FileText
	},
	{
		value: "linear",
		icon: Zap
	},
	{
		value: "modern-startup",
		icon: Rocket
	},
	{
		value: "minimal",
		icon: Minus
	},
	{
		value: "bold",
		icon: Eye
	},
	{
		value: "elegant",
		icon: Gem
	}
];
var SECTION_OPTIONS = [
	{
		value: "hero",
		icon: Monitor
	},
	{
		value: "features",
		icon: Star
	},
	{
		value: "pricing",
		icon: Banknote
	},
	{
		value: "testimonials",
		icon: Smile
	},
	{
		value: "about",
		icon: BookOpen
	},
	{
		value: "faq",
		icon: HelpCircle
	},
	{
		value: "contact",
		icon: MessageCircle
	},
	{
		value: "blog",
		icon: Pen
	},
	{
		value: "newsletter",
		icon: Mail
	},
	{
		value: "footer",
		icon: Footprints
	}
];
var AUDIENCE_OPTIONS = [
	{
		value: "students",
		icon: GraduationCap
	},
	{
		value: "businesses",
		icon: BriefcaseBusiness
	},
	{
		value: "developers",
		icon: Code
	},
	{
		value: "creators",
		icon: Lightbulb
	},
	{
		value: "startups",
		icon: Rocket
	},
	{
		value: "enterprise",
		icon: Building2
	},
	{
		value: "other",
		icon: Ellipsis
	}
];
var TONE_OPTIONS = [
	{
		value: "professional",
		icon: BriefcaseBusiness
	},
	{
		value: "friendly",
		icon: Smile
	},
	{
		value: "luxury",
		icon: Gem
	},
	{
		value: "minimal",
		icon: Minus
	},
	{
		value: "playful",
		icon: Gamepad2
	},
	{
		value: "corporate",
		icon: Building2
	}
];
var ADVANCED_OPTIONS_LIST = [
	{
		value: "seo",
		icon: Search
	},
	{
		value: "accessibility",
		icon: ShieldCheck
	},
	{
		value: "responsive-design",
		icon: Smartphone
	},
	{
		value: "dark-mode",
		icon: Moon
	},
	{
		value: "animations",
		icon: Film
	},
	{
		value: "performance",
		icon: Gauge
	},
	{
		value: "auth-ready",
		icon: Lock
	},
	{
		value: "database-ready",
		icon: Database
	}
];
var PRESET_COLORS = [
	"#3B82F6",
	"#8B5CF6",
	"#EC4899",
	"#EF4444",
	"#F97316",
	"#EAB308",
	"#22C55E",
	"#14B8A6",
	"#06B6D4",
	"#6366F1",
	"#A855F7",
	"#78716C"
];
var stepVariants = {
	enter: {
		x: 60,
		opacity: 0
	},
	center: {
		x: 0,
		opacity: 1
	},
	exit: {
		x: -60,
		opacity: 0
	}
};
function WebsiteGenerationWizard({ open, onOpenChange, config, setConfig, step, setStep, onSubmit, isPending, variant = "dialog" }) {
	const updateConfig = useCallback((patch) => setConfig((prev) => ({
		...prev,
		...patch
	})), [setConfig]);
	const catRef = useRef(false);
	const goalRef = useRef(false);
	function closeAll() {
		catRef.current = false;
		goalRef.current = false;
	}
	const canProceed = {
		1: config.businessName.trim().length > 0 && config.businessCategory !== "" && config.websiteGoal !== "",
		2: config.preferredStyle !== "",
		3: config.sections.length > 0,
		4: config.targetAudiences.length > 0 && config.tone !== "",
		5: true,
		6: !isPending
	};
	const progressDots = Array.from({ length: 6 }, (_, i) => i + 1);
	function handleNext() {
		if (step < 6) setStep(step + 1);
	}
	function handleBack() {
		if (step > 1) setStep(step - 1);
	}
	function handleOpenChange(next) {
		if (!next) closeAll();
		onOpenChange(next);
	}
	const wizardContent = /* @__PURE__ */ jsxs(Fragment, { children: [
		/* @__PURE__ */ jsxs("div", {
			className: "text-center space-y-1.5",
			children: [/* @__PURE__ */ jsx("h2", {
				className: "text-lg font-bold text-foreground",
				children: "Generate Website"
			}), /* @__PURE__ */ jsxs("p", {
				className: "text-sm text-muted-foreground",
				children: [
					"Step ",
					step,
					" of ",
					6,
					" — ",
					STEP_LABELS[step]
				]
			})]
		}),
		/* @__PURE__ */ jsx("div", {
			className: "flex items-center justify-center gap-2 pt-1 pb-2",
			children: progressDots.map((dot) => /* @__PURE__ */ jsx("div", { className: `size-2 rounded-full transition-colors duration-300 ${dot <= step ? "bg-primary" : "bg-muted"}` }, dot))
		}),
		/* @__PURE__ */ jsx("div", {
			className: "relative overflow-hidden flex-1",
			style: { minHeight: variant === "fullscreen" ? 400 : 340 },
			children: /* @__PURE__ */ jsxs(AnimatePresence, {
				mode: "wait",
				initial: false,
				children: [
					step === 1 && /* @__PURE__ */ jsx(Step1, {
						config,
						updateConfig,
						catOpen: catRef,
						goalOpen: goalRef
					}, "s1"),
					step === 2 && /* @__PURE__ */ jsx(Step2, {
						config,
						updateConfig
					}, "s2"),
					step === 3 && /* @__PURE__ */ jsx(Step3, {
						config,
						updateConfig
					}, "s3"),
					step === 4 && /* @__PURE__ */ jsx(Step4, {
						config,
						updateConfig
					}, "s4"),
					step === 5 && /* @__PURE__ */ jsx(Step5, {
						config,
						updateConfig
					}, "s5"),
					step === 6 && /* @__PURE__ */ jsx(Step6, { config }, "s6")
				]
			})
		}),
		/* @__PURE__ */ jsxs("div", {
			className: "flex items-center justify-between pt-2",
			children: [/* @__PURE__ */ jsxs(Button, {
				variant: "outline",
				onClick: step === 1 ? () => handleOpenChange(false) : handleBack,
				className: "gap-2",
				children: [/* @__PURE__ */ jsx(ChevronLeft, { className: "size-4" }), step === 1 ? "Cancel" : "Back"]
			}), step < 6 ? /* @__PURE__ */ jsxs(Button, {
				onClick: handleNext,
				disabled: !canProceed[step],
				className: "gap-2",
				children: ["Continue", /* @__PURE__ */ jsx(ChevronRight, { className: "size-4" })]
			}) : /* @__PURE__ */ jsxs(Button, {
				onClick: onSubmit,
				disabled: !canProceed[6],
				className: "gap-2",
				children: [/* @__PURE__ */ jsx(Sparkles, { className: "size-4" }), isPending ? "Generating..." : "Generate Website"]
			})]
		})
	] });
	if (variant === "fullscreen") return /* @__PURE__ */ jsx(AnimatePresence, { children: open && /* @__PURE__ */ jsxs(motion.div, {
		className: "fixed inset-0 z-50 flex flex-col bg-background",
		initial: { opacity: 0 },
		animate: { opacity: 1 },
		exit: { opacity: 0 },
		transition: { duration: .2 },
		children: [/* @__PURE__ */ jsx("div", {
			className: "absolute top-4 right-4 z-10",
			children: /* @__PURE__ */ jsx(Button, {
				variant: "ghost",
				size: "sm",
				onClick: () => handleOpenChange(false),
				className: "text-muted-foreground hover:text-foreground",
				children: "✕"
			})
		}), /* @__PURE__ */ jsx("div", {
			className: "flex-1 max-w-2xl w-full mx-auto px-4 py-8 flex flex-col justify-center",
			children: wizardContent
		})]
	}) });
	return /* @__PURE__ */ jsx(Dialog, {
		open,
		onOpenChange: handleOpenChange,
		children: /* @__PURE__ */ jsx(DialogContent, {
			className: "sm:max-w-xl lg:max-w-2xl",
			children: wizardContent
		})
	});
}
function Step1({ config, updateConfig, catOpen, goalOpen }) {
	return /* @__PURE__ */ jsxs(motion.div, {
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
					children: ["Business Name ", /* @__PURE__ */ jsx("span", {
						className: "text-destructive",
						children: "*"
					})]
				}), /* @__PURE__ */ jsx(Input, {
					placeholder: "e.g. Acme Corp",
					value: config.businessName,
					onChange: (e) => updateConfig({ businessName: e.target.value }),
					autoFocus: true
				})]
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "space-y-2",
				children: [/* @__PURE__ */ jsx("label", {
					className: "text-sm font-medium text-foreground",
					children: "Business Description"
				}), /* @__PURE__ */ jsx("textarea", {
					className: "flex w-full min-h-[80px] rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring resize-none",
					placeholder: "What does your business do?",
					value: config.businessDescription,
					onChange: (e) => updateConfig({ businessDescription: e.target.value }),
					rows: 3
				})]
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "space-y-2",
				children: [/* @__PURE__ */ jsxs("label", {
					className: "text-sm font-medium text-foreground",
					children: ["Business Category ", /* @__PURE__ */ jsx("span", {
						className: "text-destructive",
						children: "*"
					})]
				}), /* @__PURE__ */ jsx("div", {
					className: "grid grid-cols-3 gap-2",
					children: BUSINESS_CATEGORIES.map((cat) => {
						const Icon = CATEGORY_ICONS[cat];
						const isSelected = config.businessCategory === cat;
						return /* @__PURE__ */ jsxs("button", {
							type: "button",
							onClick: () => updateConfig({ businessCategory: cat }),
							className: `flex items-center gap-2 px-3 py-2.5 rounded-lg border text-sm font-medium transition-all duration-200 ${isSelected ? "border-primary bg-primary/10 text-primary shadow-sm shadow-primary/10" : "border-border bg-card text-muted-foreground hover:border-muted-foreground/30 hover:text-foreground hover:scale-[1.02]"}`,
							children: [/* @__PURE__ */ jsx(Icon, { className: `size-4 shrink-0 ${isSelected ? "text-primary" : ""}` }), /* @__PURE__ */ jsx("span", {
								className: "truncate",
								children: BUSINESS_CATEGORY_LABELS[cat]
							})]
						}, cat);
					})
				})]
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "space-y-2",
				children: [/* @__PURE__ */ jsxs("label", {
					className: "text-sm font-medium text-foreground",
					children: ["Website Goal ", /* @__PURE__ */ jsx("span", {
						className: "text-destructive",
						children: "*"
					})]
				}), /* @__PURE__ */ jsx("div", {
					className: "grid grid-cols-2 sm:grid-cols-3 gap-2",
					children: WEBSITE_GOALS.map((goal) => {
						const Icon = GOAL_ICONS[goal];
						const isSelected = config.websiteGoal === goal;
						return /* @__PURE__ */ jsxs("button", {
							type: "button",
							onClick: () => updateConfig({ websiteGoal: goal }),
							className: `flex items-center gap-2 px-3 py-2.5 rounded-lg border text-sm font-medium transition-all duration-200 ${isSelected ? "border-primary bg-primary/10 text-primary shadow-sm shadow-primary/10" : "border-border bg-card text-muted-foreground hover:border-muted-foreground/30 hover:text-foreground hover:scale-[1.02]"}`,
							children: [/* @__PURE__ */ jsx(Icon, { className: `size-4 shrink-0 ${isSelected ? "text-primary" : ""}` }), /* @__PURE__ */ jsx("span", {
								className: "truncate",
								children: WEBSITE_GOAL_LABELS[goal]
							})]
						}, goal);
					})
				})]
			})
		]
	});
}
function Step2({ config, updateConfig }) {
	return /* @__PURE__ */ jsxs(motion.div, {
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
						const isSelected = config.theme === opt.value;
						return /* @__PURE__ */ jsxs("button", {
							type: "button",
							onClick: () => updateConfig({ theme: opt.value }),
							className: `flex flex-col items-center gap-2 px-4 py-4 rounded-lg border text-sm font-medium transition-all duration-200 ${isSelected ? "border-primary bg-primary/10 text-primary shadow-sm shadow-primary/10" : "border-border bg-card text-muted-foreground hover:border-muted-foreground/30 hover:text-foreground hover:scale-[1.02]"}`,
							children: [/* @__PURE__ */ jsx(Icon, { className: `size-5 shrink-0 ${isSelected ? "text-primary" : ""}` }), opt.label]
						}, opt.value);
					})
				})]
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "space-y-2",
				children: [/* @__PURE__ */ jsxs("label", {
					className: "text-sm font-medium text-foreground flex items-center gap-1.5",
					children: [/* @__PURE__ */ jsx(PaintBucket, { className: "size-3.5" }), "Primary Color"]
				}), /* @__PURE__ */ jsxs("div", {
					className: "flex items-center gap-3",
					children: [/* @__PURE__ */ jsxs("div", {
						className: "relative",
						children: [/* @__PURE__ */ jsx("input", {
							type: "color",
							value: config.primaryColor,
							onChange: (e) => updateConfig({ primaryColor: e.target.value }),
							className: "absolute inset-0 opacity-0 cursor-pointer"
						}), /* @__PURE__ */ jsx("div", {
							className: "size-9 rounded-lg border-2 border-border shadow-sm cursor-pointer",
							style: { backgroundColor: config.primaryColor }
						})]
					}), /* @__PURE__ */ jsx("div", {
						className: "flex items-center gap-1.5 flex-wrap",
						children: PRESET_COLORS.map((color) => /* @__PURE__ */ jsx("button", {
							type: "button",
							onClick: () => updateConfig({ primaryColor: color }),
							className: `size-6 rounded-full border-2 transition-transform hover:scale-110 ${config.primaryColor === color ? "border-foreground scale-110" : "border-transparent"}`,
							style: { backgroundColor: color }
						}, color))
					})]
				})]
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "space-y-2",
				children: [/* @__PURE__ */ jsxs("label", {
					className: "text-sm font-medium text-foreground flex items-center gap-1.5",
					children: [/* @__PURE__ */ jsx(Palette, { className: "size-3.5" }), "Accent Color"]
				}), /* @__PURE__ */ jsxs("div", {
					className: "flex items-center gap-3",
					children: [/* @__PURE__ */ jsxs("div", {
						className: "relative",
						children: [/* @__PURE__ */ jsx("input", {
							type: "color",
							value: config.accentColor,
							onChange: (e) => updateConfig({ accentColor: e.target.value }),
							className: "absolute inset-0 opacity-0 cursor-pointer"
						}), /* @__PURE__ */ jsx("div", {
							className: "size-9 rounded-lg border-2 border-border shadow-sm cursor-pointer",
							style: { backgroundColor: config.accentColor }
						})]
					}), /* @__PURE__ */ jsx("div", {
						className: "flex items-center gap-1.5 flex-wrap",
						children: PRESET_COLORS.map((color) => /* @__PURE__ */ jsx("button", {
							type: "button",
							onClick: () => updateConfig({ accentColor: color }),
							className: `size-6 rounded-full border-2 transition-transform hover:scale-110 ${config.accentColor === color ? "border-foreground scale-110" : "border-transparent"}`,
							style: { backgroundColor: color }
						}, color))
					})]
				})]
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "space-y-2",
				children: [/* @__PURE__ */ jsxs("label", {
					className: "text-sm font-medium text-foreground",
					children: ["Preferred Style ", /* @__PURE__ */ jsx("span", {
						className: "text-destructive",
						children: "*"
					})]
				}), /* @__PURE__ */ jsx("div", {
					className: "grid grid-cols-4 gap-2",
					children: STYLE_OPTIONS.map((opt) => {
						const Icon = opt.icon;
						const isSelected = config.preferredStyle === opt.value;
						return /* @__PURE__ */ jsxs("button", {
							type: "button",
							onClick: () => updateConfig({ preferredStyle: opt.value }),
							className: `flex flex-col items-center gap-2 px-3 py-3 rounded-lg border text-xs font-medium transition-all duration-200 ${isSelected ? "border-primary bg-primary/10 text-primary shadow-sm shadow-primary/10" : "border-border bg-card text-muted-foreground hover:border-muted-foreground/30 hover:text-foreground hover:scale-[1.02]"}`,
							children: [/* @__PURE__ */ jsx(Icon, { className: `size-5 shrink-0 ${isSelected ? "text-primary" : ""}` }), PREFERRED_STYLE_LABELS[opt.value]]
						}, opt.value);
					})
				})]
			})
		]
	});
}
function Step3({ config, updateConfig }) {
	const toggleSection = (section) => {
		updateConfig({ sections: config.sections.includes(section) ? config.sections.filter((s) => s !== section) : [...config.sections, section] });
	};
	return /* @__PURE__ */ jsxs(motion.div, {
		variants: stepVariants,
		initial: "enter",
		animate: "center",
		exit: "exit",
		transition: {
			duration: .25,
			ease: "easeOut"
		},
		className: "space-y-4",
		children: [
			/* @__PURE__ */ jsxs("p", {
				className: "text-sm text-muted-foreground",
				children: ["Select sections to include in your website", /* @__PURE__ */ jsx("span", {
					className: "text-destructive",
					children: "*"
				})]
			}),
			/* @__PURE__ */ jsx("div", {
				className: "grid grid-cols-2 gap-2",
				children: SECTION_OPTIONS.map((opt) => {
					const Icon = opt.icon;
					const isSelected = config.sections.includes(opt.value);
					return /* @__PURE__ */ jsxs("button", {
						type: "button",
						onClick: () => toggleSection(opt.value),
						className: `flex items-center gap-3 px-4 py-3 rounded-lg border text-sm font-medium transition-all duration-200 ${isSelected ? "border-primary bg-primary/10 text-primary shadow-sm shadow-primary/10" : "border-border bg-card text-muted-foreground hover:border-muted-foreground/30 hover:text-foreground hover:scale-[1.02]"}`,
						children: [
							/* @__PURE__ */ jsx(Icon, { className: `size-4 shrink-0 ${isSelected ? "text-primary" : ""}` }),
							/* @__PURE__ */ jsx("span", { children: WEBSITE_SECTION_LABELS[opt.value] }),
							isSelected && /* @__PURE__ */ jsx(Check, { className: "size-3.5 text-primary ml-auto" })
						]
					}, opt.value);
				})
			}),
			config.sections.length > 0 && /* @__PURE__ */ jsxs("p", {
				className: "text-xs text-muted-foreground",
				children: [
					config.sections.length,
					" section",
					config.sections.length !== 1 ? "s" : "",
					" selected"
				]
			})
		]
	});
}
function Step4({ config, updateConfig }) {
	const toggleAudience = (audience) => {
		updateConfig({ targetAudiences: config.targetAudiences.includes(audience) ? config.targetAudiences.filter((a) => a !== audience) : [...config.targetAudiences, audience] });
	};
	return /* @__PURE__ */ jsxs(motion.div, {
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
			children: [/* @__PURE__ */ jsxs("label", {
				className: "text-sm font-medium text-foreground",
				children: ["Target Audience ", /* @__PURE__ */ jsx("span", {
					className: "text-destructive",
					children: "*"
				})]
			}), /* @__PURE__ */ jsx("div", {
				className: "grid grid-cols-2 gap-2",
				children: AUDIENCE_OPTIONS.map((opt) => {
					const Icon = opt.icon;
					const isSelected = config.targetAudiences.includes(opt.value);
					return /* @__PURE__ */ jsxs("button", {
						type: "button",
						onClick: () => toggleAudience(opt.value),
						className: `flex items-center gap-3 px-4 py-3 rounded-lg border text-sm font-medium transition-all duration-200 ${isSelected ? "border-primary bg-primary/10 text-primary shadow-sm shadow-primary/10" : "border-border bg-card text-muted-foreground hover:border-muted-foreground/30 hover:text-foreground hover:scale-[1.02]"}`,
						children: [
							/* @__PURE__ */ jsx(Icon, { className: `size-4 shrink-0 ${isSelected ? "text-primary" : ""}` }),
							/* @__PURE__ */ jsx("span", { children: TARGET_AUDIENCE_LABELS[opt.value] }),
							isSelected && /* @__PURE__ */ jsx(Check, { className: "size-3.5 text-primary ml-auto" })
						]
					}, opt.value);
				})
			})]
		}), /* @__PURE__ */ jsxs("div", {
			className: "space-y-2",
			children: [/* @__PURE__ */ jsxs("label", {
				className: "text-sm font-medium text-foreground",
				children: ["Tone ", /* @__PURE__ */ jsx("span", {
					className: "text-destructive",
					children: "*"
				})]
			}), /* @__PURE__ */ jsx("div", {
				className: "grid grid-cols-3 gap-2",
				children: TONE_OPTIONS.map((opt) => {
					const Icon = opt.icon;
					const isSelected = config.tone === opt.value;
					return /* @__PURE__ */ jsxs("button", {
						type: "button",
						onClick: () => updateConfig({ tone: opt.value }),
						className: `flex flex-col items-center gap-2 px-3 py-3 rounded-lg border text-xs font-medium transition-all duration-200 ${isSelected ? "border-primary bg-primary/10 text-primary shadow-sm shadow-primary/10" : "border-border bg-card text-muted-foreground hover:border-muted-foreground/30 hover:text-foreground hover:scale-[1.02]"}`,
						children: [/* @__PURE__ */ jsx(Icon, { className: `size-5 shrink-0 ${isSelected ? "text-primary" : ""}` }), TONE_LABELS[opt.value]]
					}, opt.value);
				})
			})]
		})]
	});
}
function Step5({ config, updateConfig }) {
	const toggleOption = (opt) => {
		updateConfig({ advancedOptions: config.advancedOptions.includes(opt) ? config.advancedOptions.filter((o) => o !== opt) : [...config.advancedOptions, opt] });
	};
	return /* @__PURE__ */ jsxs(motion.div, {
		variants: stepVariants,
		initial: "enter",
		animate: "center",
		exit: "exit",
		transition: {
			duration: .25,
			ease: "easeOut"
		},
		className: "space-y-4",
		children: [/* @__PURE__ */ jsx("p", {
			className: "text-sm text-muted-foreground",
			children: "Enable advanced features for your website"
		}), /* @__PURE__ */ jsx("div", {
			className: "grid grid-cols-2 gap-2",
			children: ADVANCED_OPTIONS_LIST.map((opt) => {
				const Icon = opt.icon;
				const isSelected = config.advancedOptions.includes(opt.value);
				return /* @__PURE__ */ jsxs("button", {
					type: "button",
					onClick: () => toggleOption(opt.value),
					className: `flex items-center gap-3 px-4 py-3 rounded-lg border text-sm font-medium transition-all duration-200 ${isSelected ? "border-primary bg-primary/10 text-primary shadow-sm shadow-primary/10" : "border-border bg-card text-muted-foreground hover:border-muted-foreground/30 hover:text-foreground hover:scale-[1.02]"}`,
					children: [
						/* @__PURE__ */ jsx(Icon, { className: `size-4 shrink-0 ${isSelected ? "text-primary" : ""}` }),
						/* @__PURE__ */ jsx("span", { children: ADVANCED_OPTION_LABELS[opt.value] }),
						isSelected && /* @__PURE__ */ jsx(Check, { className: "size-3.5 text-primary ml-auto" })
					]
				}, opt.value);
			})
		})]
	});
}
function Step6({ config }) {
	return /* @__PURE__ */ jsx(motion.div, {
		variants: stepVariants,
		initial: "enter",
		animate: "center",
		exit: "exit",
		transition: {
			duration: .25,
			ease: "easeOut"
		},
		className: "space-y-5",
		children: /* @__PURE__ */ jsxs("div", {
			className: "rounded-xl border border-border bg-card/60 p-5 space-y-5",
			children: [
				/* @__PURE__ */ jsxs("div", {
					className: "flex items-center gap-2 pb-2 border-b border-border",
					children: [/* @__PURE__ */ jsx(Sparkles, { className: "size-4 text-primary" }), /* @__PURE__ */ jsx("h3", {
						className: "text-sm font-semibold text-foreground",
						children: "Generation Summary"
					})]
				}),
				/* @__PURE__ */ jsxs(SectionBlock, {
					title: "Business",
					children: [
						/* @__PURE__ */ jsx(ReviewRow, {
							label: "Name",
							value: config.businessName
						}),
						config.businessDescription && /* @__PURE__ */ jsx(ReviewRow, {
							label: "Description",
							value: config.businessDescription
						}),
						/* @__PURE__ */ jsx(ReviewRow, {
							label: "Category",
							value: BUSINESS_CATEGORY_LABELS[config.businessCategory] ?? "—"
						}),
						/* @__PURE__ */ jsx(ReviewRow, {
							label: "Goal",
							value: WEBSITE_GOAL_LABELS[config.websiteGoal] ?? "—"
						})
					]
				}),
				/* @__PURE__ */ jsxs(SectionBlock, {
					title: "Design",
					children: [
						/* @__PURE__ */ jsx(ReviewRow, {
							label: "Theme",
							value: config.theme.charAt(0).toUpperCase() + config.theme.slice(1)
						}),
						/* @__PURE__ */ jsx(ReviewRow, {
							label: "Primary Color",
							value: /* @__PURE__ */ jsxs("span", {
								className: "inline-flex items-center gap-1.5",
								children: [/* @__PURE__ */ jsx("span", {
									className: "size-3.5 rounded-full border border-border inline-block",
									style: { backgroundColor: config.primaryColor }
								}), config.primaryColor]
							})
						}),
						/* @__PURE__ */ jsx(ReviewRow, {
							label: "Accent Color",
							value: /* @__PURE__ */ jsxs("span", {
								className: "inline-flex items-center gap-1.5",
								children: [/* @__PURE__ */ jsx("span", {
									className: "size-3.5 rounded-full border border-border inline-block",
									style: { backgroundColor: config.accentColor }
								}), config.accentColor]
							})
						}),
						/* @__PURE__ */ jsx(ReviewRow, {
							label: "Style",
							value: PREFERRED_STYLE_LABELS[config.preferredStyle] ?? "—"
						})
					]
				}),
				/* @__PURE__ */ jsxs(SectionBlock, {
					title: "Audience",
					children: [/* @__PURE__ */ jsx(ReviewRow, {
						label: "Target",
						value: config.targetAudiences.map((a) => TARGET_AUDIENCE_LABELS[a]).join(", ") || "—"
					}), /* @__PURE__ */ jsx(ReviewRow, {
						label: "Tone",
						value: TONE_LABELS[config.tone] ?? "—"
					})]
				}),
				/* @__PURE__ */ jsx(SectionBlock, {
					title: "Website Sections",
					children: /* @__PURE__ */ jsx(ReviewRow, {
						label: "Sections",
						value: config.sections.length > 0 ? config.sections.map((s) => WEBSITE_SECTION_LABELS[s]).join(", ") : "—"
					})
				}),
				/* @__PURE__ */ jsx(SectionBlock, {
					title: "Advanced Options",
					children: /* @__PURE__ */ jsx(ReviewRow, {
						label: "Features",
						value: config.advancedOptions.length > 0 ? config.advancedOptions.map((o) => ADVANCED_OPTION_LABELS[o]).join(", ") : "None"
					})
				})
			]
		})
	});
}
function SectionBlock({ title, children }) {
	return /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("p", {
		className: "text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2",
		children: title
	}), /* @__PURE__ */ jsx("div", {
		className: "space-y-1.5",
		children
	})] });
}
function ReviewRow({ label, value }) {
	return /* @__PURE__ */ jsxs("div", {
		className: "flex items-start justify-between gap-4",
		children: [/* @__PURE__ */ jsx("span", {
			className: "text-xs text-muted-foreground shrink-0",
			children: label
		}), /* @__PURE__ */ jsx("span", {
			className: "text-sm font-medium text-foreground text-right",
			children: value
		})]
	});
}
//#endregion
//#region src/components/dashboard/GenerationStatusView.tsx
var TIMELINE_STEPS = [
	{
		id: "saving",
		label: "Saving Configuration"
	},
	{
		id: "prompt",
		label: "Preparing Prompt"
	},
	{
		id: "engine",
		label: "Initializing AI Engine"
	},
	{
		id: "response",
		label: "Waiting for AI Response"
	}
];
function GenerationStatusView({ projectId, onDone }) {
	const [completedSteps, setCompletedSteps] = useState(0);
	const [progress, setProgress] = useState(0);
	const [isFinished, setIsFinished] = useState(false);
	const timersRef = useRef([]);
	useEffect(() => {
		const t1 = setTimeout(() => {
			setCompletedSteps(1);
		}, 1200);
		const pInterval = setInterval(() => {
			setProgress((prev) => {
				const next = prev + 1.2;
				return next >= 25 ? 25 : next;
			});
		}, 60);
		timersRef.current.push(t1);
		const tFinish = setTimeout(() => {
			clearInterval(pInterval);
			setProgress(100);
			setIsFinished(true);
		}, 8e3);
		timersRef.current.push(tFinish);
		return () => {
			timersRef.current.forEach(clearTimeout);
			clearInterval(pInterval);
		};
	}, []);
	return /* @__PURE__ */ jsxs("div", {
		className: "flex flex-col items-center justify-center py-12 px-4",
		children: [
			/* @__PURE__ */ jsxs("div", {
				className: "relative mb-10",
				children: [/* @__PURE__ */ jsx("div", { className: "absolute inset-0 size-24 rounded-full bg-primary/20 blur-2xl animate-pulse" }), /* @__PURE__ */ jsx(motion.div, {
					className: "relative size-24 rounded-full bg-primary/10 flex items-center justify-center",
					animate: { scale: [
						1,
						1.05,
						1
					] },
					transition: {
						duration: 2.5,
						repeat: Infinity,
						ease: "easeInOut"
					},
					children: /* @__PURE__ */ jsx(Sparkles, { className: "size-11 text-primary" })
				})]
			}),
			/* @__PURE__ */ jsx(motion.h2, {
				className: "text-2xl font-bold text-foreground tracking-tight text-center",
				initial: {
					opacity: 0,
					y: 8
				},
				animate: {
					opacity: 1,
					y: 0
				},
				transition: { duration: .4 },
				children: isFinished ? "Generation Configured!" : "Preparing your Website Generation..."
			}),
			/* @__PURE__ */ jsx(motion.p, {
				className: "text-sm text-muted-foreground mt-2 mb-10 text-center max-w-md",
				initial: {
					opacity: 0,
					y: 8
				},
				animate: {
					opacity: 1,
					y: 0
				},
				transition: {
					duration: .4,
					delay: .1
				},
				children: isFinished ? "Your configuration has been saved. Generation will begin when the AI engine is connected." : "We are saving your configuration and preparing the generation pipeline."
			}),
			/* @__PURE__ */ jsx("div", {
				className: "w-full max-w-sm mb-8",
				children: /* @__PURE__ */ jsx("div", {
					className: "h-2 rounded-full bg-muted overflow-hidden",
					children: /* @__PURE__ */ jsx(motion.div, {
						className: "h-full rounded-full bg-primary",
						initial: { width: "0%" },
						animate: { width: `${progress}%` },
						transition: {
							duration: .3,
							ease: "easeOut"
						}
					})
				})
			}),
			/* @__PURE__ */ jsx(Card, {
				className: "w-full max-w-md border-border bg-card/50",
				children: /* @__PURE__ */ jsx(CardContent, {
					className: "py-5 px-5",
					children: /* @__PURE__ */ jsx("div", {
						className: "space-y-0",
						children: TIMELINE_STEPS.map((step, idx) => {
							const isCompleted = idx < completedSteps;
							const isCurrent = idx === completedSteps && !isFinished;
							return /* @__PURE__ */ jsxs(motion.div, {
								className: "flex items-center gap-4 py-3",
								initial: {
									opacity: 0,
									x: -10
								},
								animate: {
									opacity: 1,
									x: 0
								},
								transition: {
									duration: .3,
									delay: idx * .15
								},
								children: [
									/* @__PURE__ */ jsx("div", {
										className: "shrink-0 relative",
										children: isCompleted ? /* @__PURE__ */ jsx("div", {
											className: "size-8 rounded-full bg-primary/10 flex items-center justify-center",
											children: /* @__PURE__ */ jsx(Check, { className: "size-4 text-primary" })
										}) : isCurrent ? /* @__PURE__ */ jsx("div", {
											className: "size-8 rounded-full bg-primary/10 flex items-center justify-center",
											children: /* @__PURE__ */ jsx(Loader2, { className: "size-4 text-primary animate-spin" })
										}) : /* @__PURE__ */ jsx("div", {
											className: "size-8 rounded-full bg-muted flex items-center justify-center",
											children: /* @__PURE__ */ jsx(Clock, { className: "size-4 text-muted-foreground" })
										})
									}),
									/* @__PURE__ */ jsx("div", {
										className: "flex-1 min-w-0",
										children: /* @__PURE__ */ jsx("p", {
											className: `text-sm font-medium ${isCompleted ? "text-foreground" : isCurrent ? "text-primary" : "text-muted-foreground"}`,
											children: step.label
										})
									}),
									/* @__PURE__ */ jsx("div", {
										className: "shrink-0",
										children: isCompleted ? /* @__PURE__ */ jsx("span", {
											className: "text-xs text-primary font-medium",
											children: "✓"
										}) : isCurrent ? /* @__PURE__ */ jsx("span", {
											className: "text-xs text-primary font-medium animate-pulse",
											children: "⏳"
										}) : /* @__PURE__ */ jsx("span", {
											className: "text-xs text-muted-foreground",
											children: "⏳"
										})
									})
								]
							}, step.id);
						})
					})
				})
			}),
			/* @__PURE__ */ jsx(AnimatePresence, { children: isFinished && /* @__PURE__ */ jsxs(motion.div, {
				className: "mt-8 flex gap-3",
				initial: {
					opacity: 0,
					y: 12
				},
				animate: {
					opacity: 1,
					y: 0
				},
				transition: { duration: .35 },
				children: [/* @__PURE__ */ jsx(Link, {
					to: "/app/projects/$id",
					params: { id: projectId },
					children: /* @__PURE__ */ jsxs(Button, {
						variant: "outline",
						className: "gap-2",
						children: [/* @__PURE__ */ jsx(ArrowLeft, { className: "size-4" }), "Back to Project"]
					})
				}), /* @__PURE__ */ jsxs(Button, {
					onClick: onDone,
					className: "gap-2",
					children: [/* @__PURE__ */ jsx(Sparkles, { className: "size-4" }), "View Workspace"]
				})]
			}) })
		]
	});
}
//#endregion
//#region src/routes/app/projects.$id.tsx?tsr-split=component
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
var GEN_CARDS = [
	{
		id: "website",
		label: "Website",
		icon: Globe,
		desc: "Generate landing page and website structure.",
		isWizard: true
	},
	{
		id: "blueprint",
		label: "Blueprint",
		icon: FileText,
		desc: "Generate architecture and product planning.",
		isWizard: false
	},
	{
		id: "database",
		label: "Database",
		icon: Database,
		desc: "Generate database schema.",
		isWizard: false
	},
	{
		id: "deployment",
		label: "Deployment",
		icon: Rocket,
		desc: "Prepare deployment configuration.",
		isWizard: false
	}
];
var LOADING_MESSAGES = [
	"Understanding your project...",
	"Planning architecture...",
	"Preparing workspace...",
	"Finalizing..."
];
function formatDate(iso) {
	return new Date(iso).toLocaleDateString("en-US", {
		month: "short",
		day: "numeric",
		year: "numeric"
	});
}
function ProjectDetailPage() {
	const { user } = useAuth();
	const { data: projects = [], isLoading } = useProjects(user?.id);
	const { id } = useParams({ from: "/app/projects/$id" });
	const createGenJob = useCreateGenerationJob();
	const project = useMemo(() => projects.find((p) => p.id === id), [projects, id]);
	const [activeView, setActiveView] = useState("overview");
	const [genState, setGenState] = useState("idle");
	const [genFeature, setGenFeature] = useState("");
	const [progress, setProgress] = useState(0);
	const [statusIndex, setStatusIndex] = useState(0);
	const [mobilePanelOpen, setMobilePanelOpen] = useState(false);
	const [viewState, setViewState] = useState("workspace");
	const [wizardOpen, setWizardOpen] = useState(false);
	const [wizardConfig, setWizardConfig] = useState(createDefaultConfig);
	const [wizardStep, setWizardStep] = useState(1);
	const [wizardPending, setWizardPending] = useState(false);
	const progressRef = useRef(null);
	const messageRef = useRef(null);
	const timeoutRef = useRef(null);
	useEffect(() => {
		return () => {
			if (progressRef.current) clearInterval(progressRef.current);
			if (messageRef.current) clearInterval(messageRef.current);
			if (timeoutRef.current) clearTimeout(timeoutRef.current);
		};
	}, []);
	const openWizard = useCallback(() => {
		setWizardConfig(createDefaultConfig());
		setWizardStep(1);
		setWizardPending(false);
		setWizardOpen(true);
	}, []);
	const handleGenClick = useCallback((feature, isWizard) => {
		if (isWizard) {
			openWizard();
			return;
		}
		setGenFeature(feature);
		setGenState("confirming");
	}, [openWizard]);
	const handleGenConfirm = useCallback(() => {
		setGenState("loading");
		setProgress(0);
		setStatusIndex(0);
		progressRef.current = setInterval(() => {
			setProgress((prev) => {
				const next = prev + 1.5;
				return next >= 100 ? 100 : next;
			});
		}, 100);
		messageRef.current = setInterval(() => {
			setStatusIndex((prev) => (prev + 1) % LOADING_MESSAGES.length);
		}, 1700);
		timeoutRef.current = setTimeout(() => {
			if (progressRef.current) clearInterval(progressRef.current);
			if (messageRef.current) clearInterval(messageRef.current);
			setGenState("idle");
			setProgress(100);
		}, 7e3);
	}, []);
	const handleWizardSubmit = useCallback(async () => {
		if (!user?.id || !project) return;
		setWizardPending(true);
		try {
			const input = {
				projectId: project.id,
				userId: user.id,
				config: wizardConfig
			};
			await createGenJob.mutateAsync(input);
			setWizardOpen(false);
			setWizardPending(false);
			setViewState("status");
		} catch {
			setWizardPending(false);
		}
	}, [
		user?.id,
		project,
		wizardConfig,
		createGenJob
	]);
	const handleStatusDone = useCallback(() => {
		setViewState("workspace");
	}, []);
	if (isLoading) return /* @__PURE__ */ jsxs("div", {
		className: "flex gap-6",
		children: [
			/* @__PURE__ */ jsx("div", {
				className: "hidden lg:block w-52 shrink-0",
				children: /* @__PURE__ */ jsx("div", { className: "h-full rounded bg-muted animate-pulse" })
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "flex-1 space-y-6",
				children: [
					/* @__PURE__ */ jsx("div", { className: "h-6 w-24 rounded bg-muted animate-pulse" }),
					/* @__PURE__ */ jsx("div", { className: "h-10 w-2/3 rounded bg-muted animate-pulse" }),
					/* @__PURE__ */ jsx("div", { className: "h-64 rounded-xl bg-muted animate-pulse" }),
					/* @__PURE__ */ jsxs("div", {
						className: "grid grid-cols-1 sm:grid-cols-2 gap-4",
						children: [
							/* @__PURE__ */ jsx("div", { className: "h-40 rounded-xl bg-muted animate-pulse" }),
							/* @__PURE__ */ jsx("div", { className: "h-40 rounded-xl bg-muted animate-pulse" }),
							/* @__PURE__ */ jsx("div", { className: "h-40 rounded-xl bg-muted animate-pulse" }),
							/* @__PURE__ */ jsx("div", { className: "h-40 rounded-xl bg-muted animate-pulse" })
						]
					})
				]
			}),
			/* @__PURE__ */ jsx("div", {
				className: "hidden lg:block w-64 shrink-0",
				children: /* @__PURE__ */ jsx("div", { className: "h-full rounded bg-muted animate-pulse" })
			})
		]
	});
	if (!project) return /* @__PURE__ */ jsxs("div", {
		className: "space-y-6",
		children: [/* @__PURE__ */ jsxs(Link, {
			to: "/app/projects",
			className: "inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors",
			children: [/* @__PURE__ */ jsx(ArrowLeft, { className: "size-3.5" }), "Back to Projects"]
		}), /* @__PURE__ */ jsx(Card, {
			className: "border-border bg-card border-dashed",
			children: /* @__PURE__ */ jsxs(CardContent, {
				className: "flex flex-col items-center justify-center py-16 text-center",
				children: [
					/* @__PURE__ */ jsx(Clock, { className: "size-12 text-muted-foreground mb-4" }),
					/* @__PURE__ */ jsx("h2", {
						className: "text-lg font-semibold text-foreground",
						children: "Project not found"
					}),
					/* @__PURE__ */ jsx("p", {
						className: "text-sm text-muted-foreground mt-1.5",
						children: "This project may have been deleted or the link is invalid."
					}),
					/* @__PURE__ */ jsx(Link, {
						to: "/app/projects",
						className: "mt-4",
						children: /* @__PURE__ */ jsx(Button, {
							variant: "outline",
							size: "sm",
							children: "View All Projects"
						})
					})
				]
			})
		})]
	});
	const TypeIcon = PROJECT_TYPE_ICONS[project.type] ?? Globe;
	const projectData = parseProjectData(project);
	return /* @__PURE__ */ jsxs(Fragment, { children: [
		/* @__PURE__ */ jsxs("div", {
			className: "flex min-h-0",
			children: [
				/* @__PURE__ */ jsx("div", {
					className: "hidden md:block",
					children: /* @__PURE__ */ jsx(WorkspaceSidebar, {
						active: activeView,
						onSelect: setActiveView
					})
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "flex-1 min-w-0 flex flex-col",
					children: [
						/* @__PURE__ */ jsx("div", {
							className: "md:hidden flex gap-1 overflow-x-auto px-2 py-2 border-b border-border",
							children: WORKSPACE_NAV_ITEMS.map((item) => {
								const Icon = item.icon;
								return /* @__PURE__ */ jsxs("button", {
									type: "button",
									onClick: () => setActiveView(item.id),
									className: `shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors duration-150 ${activeView === item.id ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-muted hover:text-foreground"}`,
									children: [/* @__PURE__ */ jsx(Icon, { className: "size-3" }), item.label]
								}, item.id);
							})
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "flex items-center gap-3 px-4 py-3 border-b border-border shrink-0",
							children: [
								/* @__PURE__ */ jsxs(Link, {
									to: "/app/projects",
									className: "inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors shrink-0",
									children: [/* @__PURE__ */ jsx(ArrowLeft, { className: "size-3.5" }), /* @__PURE__ */ jsx("span", {
										className: "hidden sm:inline",
										children: "Back to Projects"
									})]
								}),
								/* @__PURE__ */ jsxs("div", {
									className: "flex-1 min-w-0 flex items-center gap-2.5",
									children: [
										/* @__PURE__ */ jsx("h2", {
											className: "text-lg font-bold text-foreground truncate",
											children: project.name
										}),
										/* @__PURE__ */ jsxs(Badge, {
											variant: "outline",
											className: "gap-1.5 shrink-0",
											children: [/* @__PURE__ */ jsx(TypeIcon, { className: "size-3" }), /* @__PURE__ */ jsx("span", {
												className: "hidden sm:inline",
												children: PROJECT_TYPE_LABELS[project.type]
											})]
										}),
										/* @__PURE__ */ jsx(Badge, {
											variant: STATUS_VARIANTS[project.status] ?? "secondary",
											className: "shrink-0",
											children: STATUS_LABELS[project.status]
										})
									]
								}),
								/* @__PURE__ */ jsxs("span", {
									className: "hidden sm:inline text-xs text-muted-foreground shrink-0",
									children: ["Updated ", formatDate(project.updatedAt)]
								})
							]
						}),
						/* @__PURE__ */ jsx("div", {
							className: "flex-1 overflow-y-auto p-4",
							children: viewState === "status" ? /* @__PURE__ */ jsx(GenerationStatusView, {
								projectId: project.id,
								onDone: handleStatusDone
							}) : genState === "loading" ? /* @__PURE__ */ jsx(LoadingWorkspace, {
								progress,
								statusIndex
							}) : /* @__PURE__ */ jsx(EmptyWorkspace, { onGenerate: handleGenClick })
						})
					]
				}),
				/* @__PURE__ */ jsx("div", {
					className: "hidden lg:block",
					children: /* @__PURE__ */ jsx(PropertiesPanel, {
						project,
						projectData
					})
				})
			]
		}),
		/* @__PURE__ */ jsxs(Button, {
			size: "sm",
			variant: "outline",
			className: "fixed bottom-4 right-4 z-30 lg:hidden shadow-lg gap-2",
			onClick: () => setMobilePanelOpen(true),
			children: [/* @__PURE__ */ jsx(PanelRight, { className: "size-4" }), "Properties"]
		}),
		/* @__PURE__ */ jsx(Dialog, {
			open: mobilePanelOpen,
			onOpenChange: setMobilePanelOpen,
			children: /* @__PURE__ */ jsx(PropertiesPanel, {
				project,
				projectData
			})
		}),
		/* @__PURE__ */ jsx(GenerateConfirmDialog, {
			open: genState === "confirming",
			onOpenChange: (open) => {
				if (!open) setGenState("idle");
			},
			onConfirm: handleGenConfirm,
			featureLabel: genFeature
		}),
		/* @__PURE__ */ jsx(WebsiteGenerationWizard, {
			open: wizardOpen,
			onOpenChange: setWizardOpen,
			config: wizardConfig,
			setConfig: setWizardConfig,
			step: wizardStep,
			setStep: setWizardStep,
			onSubmit: handleWizardSubmit,
			isPending: wizardPending,
			variant: "fullscreen"
		})
	] });
}
function EmptyWorkspace({ onGenerate }) {
	return /* @__PURE__ */ jsxs("div", {
		className: "flex flex-col items-center",
		children: [
			/* @__PURE__ */ jsxs("div", {
				className: "relative mb-8 mt-6",
				children: [/* @__PURE__ */ jsx("div", { className: "absolute inset-0 size-16 rounded-full bg-primary/20 blur-xl" }), /* @__PURE__ */ jsx(motion.div, {
					className: "relative size-16 rounded-full bg-primary/10 flex items-center justify-center",
					animate: { scale: [
						1,
						1.04,
						1
					] },
					transition: {
						duration: 2.5,
						repeat: Infinity,
						ease: "easeInOut"
					},
					children: /* @__PURE__ */ jsx(Sparkles, { className: "size-7 text-primary" })
				})]
			}),
			/* @__PURE__ */ jsx("h3", {
				className: "text-xl font-bold text-foreground tracking-tight",
				children: "Ready to Generate"
			}),
			/* @__PURE__ */ jsx("p", {
				className: "text-sm text-muted-foreground mt-2 mb-8 max-w-md text-center",
				children: "Choose what you want GrowthFlow AI to generate for this project."
			}),
			/* @__PURE__ */ jsx("div", {
				className: "w-full max-w-2xl grid grid-cols-1 sm:grid-cols-2 gap-4",
				children: GEN_CARDS.map((card) => {
					const Icon = card.icon;
					return /* @__PURE__ */ jsxs("div", {
						className: "rounded-xl border border-border bg-card p-5 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all duration-200 hover:-translate-y-0.5 active:scale-[0.98]",
						children: [
							/* @__PURE__ */ jsx("div", {
								className: "size-10 rounded-lg bg-primary/10 flex items-center justify-center mb-3",
								children: /* @__PURE__ */ jsx(Icon, { className: "size-5 text-primary" })
							}),
							/* @__PURE__ */ jsx("h4", {
								className: "text-sm font-semibold text-foreground mb-1",
								children: card.label
							}),
							/* @__PURE__ */ jsx("p", {
								className: "text-xs text-muted-foreground mb-4 leading-relaxed",
								children: card.desc
							}),
							/* @__PURE__ */ jsxs(Button, {
								variant: "outline",
								size: "sm",
								className: "gap-2",
								onClick: () => onGenerate(card.label, card.isWizard),
								children: [/* @__PURE__ */ jsx(Sparkles, { className: "size-3.5" }), "Generate"]
							})
						]
					}, card.id);
				})
			})
		]
	});
}
function LoadingWorkspace({ progress, statusIndex }) {
	return /* @__PURE__ */ jsxs("div", {
		className: "flex flex-col items-center justify-center py-12",
		children: [
			/* @__PURE__ */ jsxs("div", {
				className: "relative mb-8",
				children: [/* @__PURE__ */ jsx("div", { className: "absolute inset-0 size-20 rounded-full bg-primary/20 blur-2xl" }), /* @__PURE__ */ jsx(motion.div, {
					className: "relative size-20 rounded-full bg-primary/10 flex items-center justify-center",
					animate: { scale: [
						1,
						1.06,
						1
					] },
					transition: {
						duration: 2,
						repeat: Infinity,
						ease: "easeInOut"
					},
					children: /* @__PURE__ */ jsx(Sparkles, { className: "size-9 text-primary" })
				})]
			}),
			/* @__PURE__ */ jsx("div", {
				className: "w-full max-w-sm mb-6",
				children: /* @__PURE__ */ jsx("div", {
					className: "h-1.5 rounded-full bg-muted overflow-hidden",
					children: /* @__PURE__ */ jsx("div", {
						className: "h-full rounded-full bg-primary transition-all duration-300 ease-out",
						style: { width: `${progress}%` }
					})
				})
			}),
			/* @__PURE__ */ jsx("div", {
				className: "h-8 flex items-center justify-center overflow-hidden",
				children: /* @__PURE__ */ jsx(AnimatePresence, {
					mode: "wait",
					children: /* @__PURE__ */ jsx(motion.p, {
						className: "text-sm text-muted-foreground",
						initial: {
							opacity: 0,
							y: 8
						},
						animate: {
							opacity: 1,
							y: 0
						},
						exit: {
							opacity: 0,
							y: -8
						},
						transition: {
							duration: .3,
							ease: "easeInOut"
						},
						children: LOADING_MESSAGES[statusIndex]
					}, statusIndex)
				})
			})
		]
	});
}
//#endregion
export { ProjectDetailPage as component };
