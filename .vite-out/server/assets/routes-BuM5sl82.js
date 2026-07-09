import { t as Footer } from "./Footer-CbsGQH5h.js";
import { t as Navbar } from "./Navbar-IbG_XjoO.js";
import { useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { jsx, jsxs } from "react/jsx-runtime";
import { Button } from "@blinkdotnew/ui";
import { ArrowRight, Check, ChevronDown, Globe, Layers, Lightbulb, Play, TrendingUp } from "lucide-react";
import { AnimatePresence, motion, useInView } from "framer-motion";
//#region src/components/landing/HeroSection.tsx
function FloatingGeometricShapes() {
	return /* @__PURE__ */ jsxs("div", {
		className: "relative w-full h-full min-h-[360px] flex items-center justify-center",
		children: [
			/* @__PURE__ */ jsxs(motion.div, {
				animate: { y: [
					0,
					-8,
					0
				] },
				transition: {
					duration: 4,
					repeat: Infinity,
					ease: "easeInOut"
				},
				className: "absolute top-6 right-6 sm:top-10 sm:right-10 w-44 sm:w-56 rounded-xl border border-border/60 bg-card/80 backdrop-blur-sm p-4 shadow-lg",
				children: [/* @__PURE__ */ jsxs("div", {
					className: "flex items-center gap-2 mb-3",
					children: [/* @__PURE__ */ jsx("div", { className: "size-2 rounded-full bg-emerald-400" }), /* @__PURE__ */ jsx("div", { className: "h-2 w-16 rounded bg-muted" })]
				}), /* @__PURE__ */ jsxs("div", {
					className: "space-y-2",
					children: [
						/* @__PURE__ */ jsx("div", { className: "h-2 w-full rounded bg-muted" }),
						/* @__PURE__ */ jsx("div", { className: "h-2 w-4/5 rounded bg-muted" }),
						/* @__PURE__ */ jsx("div", { className: "h-8 w-full rounded-lg bg-gradient-to-r from-primary/20 to-accent/20 mt-3" })
					]
				})]
			}),
			/* @__PURE__ */ jsxs(motion.div, {
				animate: { y: [
					0,
					6,
					0
				] },
				transition: {
					duration: 5,
					repeat: Infinity,
					ease: "easeInOut",
					delay: 1
				},
				className: "absolute bottom-10 left-4 sm:bottom-16 sm:left-8 w-36 sm:w-48 rounded-xl border border-border/60 bg-card/80 backdrop-blur-sm p-4 shadow-lg",
				children: [/* @__PURE__ */ jsxs("div", {
					className: "space-y-1.5 mb-3",
					children: [/* @__PURE__ */ jsx("div", { className: "h-2 w-3/5 rounded bg-muted" }), /* @__PURE__ */ jsx("div", { className: "h-2 w-4/5 rounded bg-muted" })]
				}), /* @__PURE__ */ jsxs("div", {
					className: "flex gap-2",
					children: [/* @__PURE__ */ jsx("div", { className: "h-14 w-1/2 rounded-lg bg-gradient-to-b from-primary/30 to-transparent" }), /* @__PURE__ */ jsx("div", { className: "h-14 w-1/2 rounded-lg bg-gradient-to-b from-accent/30 to-transparent" })]
				})]
			}),
			/* @__PURE__ */ jsx(motion.div, {
				animate: {
					y: [
						0,
						-10,
						0
					],
					rotate: [
						0,
						1,
						0
					]
				},
				transition: {
					duration: 6,
					repeat: Infinity,
					ease: "easeInOut",
					delay: .5
				},
				className: "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-1.5 rounded-full bg-gradient-to-r from-primary to-accent shadow-lg shadow-primary/20"
			}),
			/* @__PURE__ */ jsx("div", { className: "absolute top-1/3 left-1/3 w-20 h-20 rounded-full bg-primary/10 blur-3xl" }),
			/* @__PURE__ */ jsx("div", { className: "absolute bottom-1/3 right-1/4 w-28 h-28 rounded-full bg-accent/10 blur-3xl" }),
			/* @__PURE__ */ jsx("div", { className: "absolute top-1/2 right-1/3 w-16 h-16 rounded-full bg-primary/15 blur-2xl" })
		]
	});
}
function HeroSection() {
	const ref = useRef(null);
	const inView = useInView(ref, {
		once: true,
		margin: "-100px"
	});
	return /* @__PURE__ */ jsxs("section", {
		className: "relative min-h-dvh flex items-center overflow-hidden",
		children: [
			/* @__PURE__ */ jsxs("div", {
				className: "absolute inset-0 -z-10",
				children: [
					/* @__PURE__ */ jsx("div", { className: "absolute top-0 -left-40 w-[600px] h-[500px] rounded-full bg-primary/8 blur-[120px]" }),
					/* @__PURE__ */ jsx("div", { className: "absolute bottom-0 -right-40 w-[500px] h-[400px] rounded-full bg-accent/8 blur-[120px]" }),
					/* @__PURE__ */ jsx("div", { className: "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] rounded-full bg-gradient-to-br from-primary/5 via-transparent to-accent/5 blur-[100px]" })
				]
			}),
			/* @__PURE__ */ jsx("div", { className: "absolute inset-0 -z-10 opacity-[0.03] bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:64px_64px]" }),
			/* @__PURE__ */ jsx("div", {
				className: "mx-auto max-w-7xl px-6 w-full pt-24 pb-16",
				children: /* @__PURE__ */ jsxs("div", {
					className: "grid lg:grid-cols-2 gap-12 lg:gap-16 items-center",
					children: [/* @__PURE__ */ jsxs(motion.div, {
						ref,
						initial: {
							opacity: 0,
							y: 30
						},
						animate: inView ? {
							opacity: 1,
							y: 0
						} : {},
						transition: {
							duration: .7,
							ease: [
								.25,
								.46,
								.45,
								.94
							]
						},
						children: [
							/* @__PURE__ */ jsxs("h1", {
								className: "text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight leading-[1.08]",
								children: [
									"Turn Your Idea",
									" ",
									/* @__PURE__ */ jsx("span", {
										className: "bg-gradient-to-r from-primary via-primary to-accent bg-clip-text text-transparent",
										children: "Into a Real Startup"
									})
								]
							}),
							/* @__PURE__ */ jsx("p", {
								className: "mt-6 text-base sm:text-lg text-muted-foreground leading-relaxed max-w-xl",
								children: "Generate startup blueprints, build professional websites, create SaaS foundations, and launch faster with AI — all in one platform."
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "mt-8 flex flex-col sm:flex-row gap-3",
								children: [/* @__PURE__ */ jsx(Link, {
									to: "/sign-up",
									children: /* @__PURE__ */ jsxs(Button, {
										size: "lg",
										className: "gap-2 text-base",
										children: ["Start Building Free", /* @__PURE__ */ jsx(ArrowRight, { className: "size-4" })]
									})
								}), /* @__PURE__ */ jsxs(Button, {
									variant: "outline",
									size: "lg",
									className: "gap-2 text-base",
									children: [/* @__PURE__ */ jsx(Play, { className: "size-4" }), "View Demo"]
								})]
							})
						]
					}), /* @__PURE__ */ jsx(motion.div, {
						initial: {
							opacity: 0,
							scale: .95
						},
						animate: inView ? {
							opacity: 1,
							scale: 1
						} : {},
						transition: {
							duration: .9,
							delay: .2,
							ease: [
								.25,
								.46,
								.45,
								.94
							]
						},
						className: "hidden lg:block",
						children: /* @__PURE__ */ jsx(FloatingGeometricShapes, {})
					})]
				})
			})
		]
	});
}
//#endregion
//#region src/components/landing/CapabilitiesSection.tsx
var CAPABILITIES = [
	{
		icon: Lightbulb,
		title: "AI Startup Blueprint",
		description: "Transform rough ideas into structured business plans with market analysis, competitor research, and actionable roadmaps."
	},
	{
		icon: Globe,
		title: "Website Builder",
		description: "Generate beautiful, responsive websites from a simple description — no code, no templates, just your brand."
	},
	{
		icon: Layers,
		title: "SaaS Generator",
		description: "Spin up complete SaaS foundations with authentication, payments, dashboards, and API scaffolding in minutes."
	},
	{
		icon: TrendingUp,
		title: "Growth Engine",
		description: "AI-powered growth strategies tailored to your startup, including SEO, content plans, and go-to-market playbooks."
	}
];
var containerVariants$1 = {
	hidden: {},
	visible: { transition: { staggerChildren: .1 } }
};
var cardVariants$1 = {
	hidden: {
		opacity: 0,
		y: 24
	},
	visible: {
		opacity: 1,
		y: 0,
		transition: {
			duration: .5,
			ease: [
				.25,
				.46,
				.45,
				.94
			]
		}
	}
};
function CapabilitiesSection() {
	const ref = useRef(null);
	const inView = useInView(ref, {
		once: true,
		margin: "-80px"
	});
	return /* @__PURE__ */ jsx("section", {
		id: "features",
		className: "py-24 sm:py-32",
		children: /* @__PURE__ */ jsxs("div", {
			className: "mx-auto max-w-7xl px-6",
			children: [/* @__PURE__ */ jsxs(motion.div, {
				ref,
				initial: {
					opacity: 0,
					y: 20
				},
				animate: inView ? {
					opacity: 1,
					y: 0
				} : {},
				transition: { duration: .5 },
				className: "text-center mb-16",
				children: [/* @__PURE__ */ jsx("h2", {
					className: "text-3xl sm:text-4xl font-bold tracking-tight",
					children: "Everything You Need to Launch"
				}), /* @__PURE__ */ jsx("p", {
					className: "mt-4 text-muted-foreground max-w-xl mx-auto",
					children: "From idea validation to launch day — GrowthFlow gives you the full toolkit to build something real."
				})]
			}), /* @__PURE__ */ jsx(motion.div, {
				variants: containerVariants$1,
				initial: "hidden",
				animate: inView ? "visible" : "hidden",
				className: "grid sm:grid-cols-2 lg:grid-cols-4 gap-6",
				children: CAPABILITIES.map((cap) => /* @__PURE__ */ jsxs(motion.div, {
					variants: cardVariants$1,
					className: "group relative rounded-xl border border-border/50 bg-card/60 hover:bg-card hover:border-border transition-all duration-300 p-6",
					children: [
						/* @__PURE__ */ jsx("div", {
							className: "size-11 flex items-center justify-center rounded-lg bg-primary/10 text-primary mb-4 group-hover:scale-110 transition-transform duration-300",
							children: /* @__PURE__ */ jsx(cap.icon, { className: "size-5" })
						}),
						/* @__PURE__ */ jsx("h3", {
							className: "text-base font-semibold text-foreground mb-2",
							children: cap.title
						}),
						/* @__PURE__ */ jsx("p", {
							className: "text-sm text-muted-foreground leading-relaxed",
							children: cap.description
						})
					]
				}, cap.title))
			})]
		})
	});
}
//#endregion
//#region src/components/landing/HowItWorksSection.tsx
var STEPS = [
	{
		step: "01",
		title: "Describe Your Idea",
		description: "Tell us about your startup concept, target audience, and goals. Our AI asks the right questions to understand your vision."
	},
	{
		step: "02",
		title: "AI Builds the Foundation",
		description: "Our AI generates a complete project blueprint, website, or SaaS scaffold — with real code, not just mockups."
	},
	{
		step: "03",
		title: "Customize & Launch",
		description: "Fine-tune the output, connect your domain, and go live. Iterate with AI assistance as your startup grows."
	}
];
function HowItWorksSection() {
	const ref = useRef(null);
	const inView = useInView(ref, {
		once: true,
		margin: "-80px"
	});
	return /* @__PURE__ */ jsx("section", {
		id: "how-it-works",
		className: "py-24 sm:py-32 bg-card/30",
		children: /* @__PURE__ */ jsxs("div", {
			className: "mx-auto max-w-4xl px-6",
			children: [/* @__PURE__ */ jsxs(motion.div, {
				ref,
				initial: {
					opacity: 0,
					y: 20
				},
				animate: inView ? {
					opacity: 1,
					y: 0
				} : {},
				transition: { duration: .5 },
				className: "text-center mb-16",
				children: [/* @__PURE__ */ jsx("h2", {
					className: "text-3xl sm:text-4xl font-bold tracking-tight",
					children: "From Idea to Launch in Minutes"
				}), /* @__PURE__ */ jsx("p", {
					className: "mt-4 text-muted-foreground max-w-lg mx-auto",
					children: "Three simple steps — no technical skills required. Just your idea and ambition."
				})]
			}), /* @__PURE__ */ jsxs("div", {
				className: "relative",
				children: [/* @__PURE__ */ jsx("div", { className: "absolute left-[19px] top-10 bottom-10 w-px bg-border hidden sm:block" }), /* @__PURE__ */ jsx("div", {
					className: "flex flex-col gap-10",
					children: STEPS.map((s, i) => /* @__PURE__ */ jsxs(motion.div, {
						initial: {
							opacity: 0,
							x: -20
						},
						animate: inView ? {
							opacity: 1,
							x: 0
						} : {},
						transition: {
							duration: .5,
							delay: i * .15,
							ease: [
								.25,
								.46,
								.45,
								.94
							]
						},
						className: "flex gap-6 items-start",
						children: [/* @__PURE__ */ jsx("div", {
							className: "relative z-10 shrink-0 size-10 flex items-center justify-center rounded-full border-2 border-primary/40 bg-background text-sm font-bold text-primary",
							children: i + 1
						}), /* @__PURE__ */ jsxs("div", {
							className: "pt-1",
							children: [/* @__PURE__ */ jsx("h3", {
								className: "text-lg font-semibold text-foreground",
								children: s.title
							}), /* @__PURE__ */ jsx("p", {
								className: "mt-2 text-sm text-muted-foreground leading-relaxed max-w-lg",
								children: s.description
							})]
						})]
					}, s.step))
				})]
			})]
		})
	});
}
//#endregion
//#region src/components/landing/PricingSection.tsx
var PLANS = [
	{
		name: "Launch Pad",
		price: "$9",
		period: "/mo",
		for: "For students",
		features: [
			"3 projects",
			"Basic AI generation",
			"Community support",
			"Export as ZIP"
		],
		cta: "Get Started",
		href: "/sign-up",
		popular: false
	},
	{
		name: "Startup Engine",
		price: "$18",
		period: "/mo",
		for: "For freelancers & builders",
		features: [
			"10 projects",
			"Advanced AI generation",
			"Priority support",
			"Custom domains",
			"Analytics dashboard"
		],
		cta: "Get Started",
		href: "/sign-up",
		popular: true
	},
	{
		name: "AI Founder Suite",
		price: "$25",
		period: "/mo",
		for: "For entrepreneurs",
		features: [
			"Unlimited projects",
			"Premium AI models",
			"Dedicated support",
			"Custom domains",
			"Team collaboration",
			"White-label exports"
		],
		cta: "Get Started",
		href: "/sign-up",
		popular: false
	}
];
var containerVariants = {
	hidden: {},
	visible: { transition: { staggerChildren: .1 } }
};
var cardVariants = {
	hidden: {
		opacity: 0,
		y: 24
	},
	visible: {
		opacity: 1,
		y: 0,
		transition: {
			duration: .5,
			ease: [
				.25,
				.46,
				.45,
				.94
			]
		}
	}
};
function PricingSection() {
	const ref = useRef(null);
	const inView = useInView(ref, {
		once: true,
		margin: "-80px"
	});
	return /* @__PURE__ */ jsx("section", {
		id: "pricing",
		className: "py-24 sm:py-32",
		children: /* @__PURE__ */ jsxs("div", {
			className: "mx-auto max-w-7xl px-6",
			children: [/* @__PURE__ */ jsxs(motion.div, {
				ref,
				initial: {
					opacity: 0,
					y: 20
				},
				animate: inView ? {
					opacity: 1,
					y: 0
				} : {},
				transition: { duration: .5 },
				className: "text-center mb-16",
				children: [/* @__PURE__ */ jsx("h2", {
					className: "text-3xl sm:text-4xl font-bold tracking-tight",
					children: "Simple, Transparent Pricing"
				}), /* @__PURE__ */ jsx("p", {
					className: "mt-4 text-muted-foreground max-w-lg mx-auto",
					children: "Start free. Upgrade when you're ready to scale. No hidden fees, no surprises."
				})]
			}), /* @__PURE__ */ jsx(motion.div, {
				variants: containerVariants,
				initial: "hidden",
				animate: inView ? "visible" : "hidden",
				className: "grid md:grid-cols-3 gap-6 max-w-5xl mx-auto",
				children: PLANS.map((plan) => /* @__PURE__ */ jsxs(motion.div, {
					variants: cardVariants,
					className: `
                relative flex flex-col rounded-xl border p-6 transition-all duration-300
                ${plan.popular ? "border-primary/40 bg-card shadow-lg shadow-primary/5 ring-1 ring-primary/20" : "border-border/50 bg-card/60 hover:border-border hover:bg-card"}
              `,
					children: [
						plan.popular && /* @__PURE__ */ jsx("div", {
							className: "absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-primary text-primary-foreground text-xs font-semibold",
							children: "Most Popular"
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "mb-5",
							children: [/* @__PURE__ */ jsx("h3", {
								className: "text-lg font-semibold text-foreground",
								children: plan.name
							}), /* @__PURE__ */ jsx("p", {
								className: "text-sm text-muted-foreground mt-0.5",
								children: plan.for
							})]
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "mb-6",
							children: [/* @__PURE__ */ jsx("span", {
								className: "text-4xl font-bold text-foreground",
								children: plan.price
							}), /* @__PURE__ */ jsx("span", {
								className: "text-muted-foreground",
								children: plan.period
							})]
						}),
						/* @__PURE__ */ jsx("ul", {
							className: "space-y-3 flex-1 mb-6",
							children: plan.features.map((f) => /* @__PURE__ */ jsxs("li", {
								className: "flex items-center gap-2.5 text-sm text-muted-foreground",
								children: [/* @__PURE__ */ jsx(Check, { className: "size-4 text-primary shrink-0" }), f]
							}, f))
						}),
						/* @__PURE__ */ jsx(Link, {
							to: plan.href,
							className: "mt-auto",
							children: /* @__PURE__ */ jsx(Button, {
								variant: plan.popular ? "default" : "outline",
								className: "w-full",
								children: plan.cta
							})
						})
					]
				}, plan.name))
			})]
		})
	});
}
//#endregion
//#region src/components/landing/FAQSection.tsx
var FAQS = [
	{
		question: "What exactly does GrowthFlow AI do?",
		answer: "GrowthFlow AI helps you turn a startup idea into a real, production-ready product. Describe your idea, and our AI generates structured business plans, professional websites, complete SaaS scaffolds with auth and payments, and tailored growth strategies."
	},
	{
		question: "Do I need coding experience to use GrowthFlow?",
		answer: "Not at all. GrowthFlow is designed for founders, entrepreneurs, and builders of any technical level. The AI generates real code and configurations, but you can customize everything through simple descriptions and a visual interface."
	},
	{
		question: "Can I cancel my subscription anytime?",
		answer: "Absolutely. All plans are month-to-month with no long-term contracts. You can cancel anytime from your account settings, and you'll retain access until the end of your billing period."
	},
	{
		question: "Is my data and startup idea safe?",
		answer: "Yes. We take privacy seriously. Your ideas, project data, and generated content are encrypted and never shared with third parties. You retain full ownership of everything you create on our platform."
	},
	{
		question: "How does the AI generate real websites and SaaS apps?",
		answer: "Our AI uses advanced foundation models trained on modern web frameworks. It generates production-grade React, Next.js, and backend code — not just mockups. You can export, deploy, and iterate on the code as your own."
	},
	{
		question: "What's the difference between the plans?",
		answer: "Launch Pad is great for students exploring ideas with up to 3 projects. Startup Engine is our most popular plan for freelancers and builders, offering advanced AI, 10 projects, and priority support. AI Founder Suite unlocks unlimited projects, premium AI models, team collaboration, and white-label exports."
	}
];
function FAQSection() {
	const ref = useRef(null);
	const inView = useInView(ref, {
		once: true,
		margin: "-80px"
	});
	const [openIndex, setOpenIndex] = useState(null);
	return /* @__PURE__ */ jsx("section", {
		id: "faq",
		className: "py-24 sm:py-32 bg-card/30",
		children: /* @__PURE__ */ jsxs("div", {
			className: "mx-auto max-w-2xl px-6",
			children: [/* @__PURE__ */ jsxs(motion.div, {
				ref,
				initial: {
					opacity: 0,
					y: 20
				},
				animate: inView ? {
					opacity: 1,
					y: 0
				} : {},
				transition: { duration: .5 },
				className: "text-center mb-16",
				children: [/* @__PURE__ */ jsx("h2", {
					className: "text-3xl sm:text-4xl font-bold tracking-tight",
					children: "Frequently Asked Questions"
				}), /* @__PURE__ */ jsx("p", {
					className: "mt-4 text-muted-foreground",
					children: "Everything you need to know about GrowthFlow AI."
				})]
			}), /* @__PURE__ */ jsx("div", {
				className: "space-y-3",
				children: FAQS.map((faq, i) => {
					const isOpen = openIndex === i;
					return /* @__PURE__ */ jsxs(motion.div, {
						initial: {
							opacity: 0,
							y: 12
						},
						animate: inView ? {
							opacity: 1,
							y: 0
						} : {},
						transition: {
							duration: .4,
							delay: i * .08
						},
						className: "rounded-xl border border-border/50 bg-card/60 overflow-hidden",
						children: [/* @__PURE__ */ jsxs("button", {
							onClick: () => setOpenIndex(isOpen ? null : i),
							className: "w-full flex items-center justify-between px-5 py-4 text-left text-sm font-medium text-foreground hover:bg-card/80 transition-colors",
							children: [faq.question, /* @__PURE__ */ jsx(ChevronDown, { className: `size-4 text-muted-foreground shrink-0 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}` })]
						}), /* @__PURE__ */ jsx(AnimatePresence, {
							initial: false,
							children: isOpen && /* @__PURE__ */ jsx(motion.div, {
								initial: {
									height: 0,
									opacity: 0
								},
								animate: {
									height: "auto",
									opacity: 1
								},
								exit: {
									height: 0,
									opacity: 0
								},
								transition: {
									duration: .25,
									ease: "easeInOut"
								},
								className: "overflow-hidden",
								children: /* @__PURE__ */ jsx("p", {
									className: "px-5 pb-4 text-sm text-muted-foreground leading-relaxed",
									children: faq.answer
								})
							})
						})]
					}, i);
				})
			})]
		})
	});
}
//#endregion
//#region src/routes/index.tsx?tsr-split=component
function IndexPage() {
	return /* @__PURE__ */ jsxs("div", {
		className: "flex min-h-dvh flex-col bg-background text-foreground",
		children: [
			/* @__PURE__ */ jsx(Navbar, {}),
			/* @__PURE__ */ jsxs("main", {
				className: "flex-1",
				children: [
					/* @__PURE__ */ jsx(HeroSection, {}),
					/* @__PURE__ */ jsx(CapabilitiesSection, {}),
					/* @__PURE__ */ jsx(HowItWorksSection, {}),
					/* @__PURE__ */ jsx(PricingSection, {}),
					/* @__PURE__ */ jsx(FAQSection, {})
				]
			}),
			/* @__PURE__ */ jsx(Footer, {})
		]
	});
}
//#endregion
export { IndexPage as component };
