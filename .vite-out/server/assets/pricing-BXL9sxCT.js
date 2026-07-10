import { t as Footer } from "./Footer-Co4lKgok.js";
import { t as Navbar } from "./Navbar-Cuy3KgHm.js";
import { jsx, jsxs } from "react/jsx-runtime";
import { Badge, Button, Card, CardContent, CardDescription, CardHeader, CardTitle } from "@blinkdotnew/ui";
import { Check } from "lucide-react";
//#region src/routes/pricing.tsx?tsr-split=component
var PLANS = [
	{
		name: "Launch Pad",
		price: 9,
		description: "Perfect for students and first-time founders.",
		features: [
			"3 active projects",
			"Basic AI assistance",
			"Community support",
			"Export to PDF",
			"Standard templates"
		],
		popular: false
	},
	{
		name: "Startup Engine",
		price: 18,
		description: "For freelancers and builders shipping fast.",
		features: [
			"10 active projects",
			"Advanced AI generation",
			"Priority support",
			"Custom domains",
			"Premium templates",
			"Analytics dashboard"
		],
		popular: true
	},
	{
		name: "AI Founder Suite",
		price: 25,
		description: "For entrepreneurs building multiple ventures.",
		features: [
			"Unlimited projects",
			"Premium AI models",
			"Dedicated support",
			"Team collaboration",
			"White-label exports",
			"API access",
			"Early feature access"
		],
		popular: false
	}
];
function PricingPage() {
	return /* @__PURE__ */ jsxs("div", {
		className: "min-h-dvh bg-background text-foreground",
		children: [
			/* @__PURE__ */ jsx(Navbar, {}),
			/* @__PURE__ */ jsx("main", {
				className: "pt-24 pb-20 px-6",
				children: /* @__PURE__ */ jsxs("div", {
					className: "max-w-6xl mx-auto",
					children: [/* @__PURE__ */ jsxs("div", {
						className: "text-center mb-16",
						children: [/* @__PURE__ */ jsx("h1", {
							className: "text-4xl md:text-5xl font-bold tracking-tight",
							children: "Simple, Transparent Pricing"
						}), /* @__PURE__ */ jsx("p", {
							className: "mt-4 text-muted-foreground text-lg max-w-xl mx-auto",
							children: "Start building for free. Upgrade when you're ready to scale."
						})]
					}), /* @__PURE__ */ jsx("div", {
						className: "grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto",
						children: PLANS.map((plan) => /* @__PURE__ */ jsxs(Card, {
							className: `relative border-border bg-card transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/5 ${plan.popular ? "ring-1 ring-primary/50 shadow-lg shadow-primary/5" : ""}`,
							children: [
								plan.popular && /* @__PURE__ */ jsx("div", {
									className: "absolute -top-3 left-1/2 -translate-x-1/2",
									children: /* @__PURE__ */ jsx(Badge, {
										className: "bg-primary text-primary-foreground text-xs font-medium px-3 py-0.5",
										children: "Most Popular"
									})
								}),
								/* @__PURE__ */ jsxs(CardHeader, {
									className: "text-center pb-4",
									children: [
										/* @__PURE__ */ jsx(CardTitle, {
											className: "text-xl font-semibold",
											children: plan.name
										}),
										/* @__PURE__ */ jsx(CardDescription, {
											className: "text-sm mt-1",
											children: plan.description
										}),
										/* @__PURE__ */ jsxs("div", {
											className: "mt-4",
											children: [/* @__PURE__ */ jsxs("span", {
												className: "text-4xl font-bold",
												children: ["$", plan.price]
											}), /* @__PURE__ */ jsx("span", {
												className: "text-muted-foreground text-sm",
												children: "/mo"
											})]
										})
									]
								}),
								/* @__PURE__ */ jsxs(CardContent, { children: [/* @__PURE__ */ jsx("ul", {
									className: "space-y-3 mb-6",
									children: plan.features.map((f) => /* @__PURE__ */ jsxs("li", {
										className: "flex items-start gap-2.5 text-sm text-muted-foreground",
										children: [/* @__PURE__ */ jsx(Check, { className: "size-4 shrink-0 text-primary mt-0.5" }), f]
									}, f))
								}), /* @__PURE__ */ jsx(Button, {
									className: "w-full",
									variant: plan.popular ? "default" : "outline",
									children: "Get Started"
								})] })
							]
						}, plan.name))
					})]
				})
			}),
			/* @__PURE__ */ jsx(Footer, {})
		]
	});
}
//#endregion
export { PricingPage as component };
