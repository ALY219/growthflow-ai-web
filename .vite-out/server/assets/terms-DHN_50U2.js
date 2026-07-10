import { t as Footer } from "./Footer-Co4lKgok.js";
import { Link } from "@tanstack/react-router";
import { jsx, jsxs } from "react/jsx-runtime";
import { ArrowLeft, Scale } from "lucide-react";
//#region src/routes/terms.tsx?tsr-split=component
function TermsPage() {
	return /* @__PURE__ */ jsxs("div", {
		className: "min-h-dvh bg-background text-foreground",
		children: [/* @__PURE__ */ jsxs("main", {
			className: "max-w-3xl mx-auto px-6 py-24",
			children: [
				/* @__PURE__ */ jsxs(Link, {
					to: "/",
					className: "inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8",
					children: [/* @__PURE__ */ jsx(ArrowLeft, { className: "size-4" }), "Back to Home"]
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "flex items-center gap-3 mb-8",
					children: [/* @__PURE__ */ jsx("div", {
						className: "flex size-10 items-center justify-center rounded-xl bg-muted",
						children: /* @__PURE__ */ jsx(Scale, { className: "size-5 text-muted-foreground" })
					}), /* @__PURE__ */ jsx("h1", {
						className: "text-3xl font-bold tracking-tight",
						children: "Terms of Service"
					})]
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "prose prose-invert max-w-none space-y-4 text-muted-foreground text-sm leading-relaxed",
					children: [
						/* @__PURE__ */ jsx("p", { children: "Last updated: July 2026" }),
						/* @__PURE__ */ jsx("p", { children: "By using GrowthFlow AI (“the Service”), you agree to these Terms of Service. Please read them carefully before using the platform." }),
						/* @__PURE__ */ jsx("h2", {
							className: "text-foreground text-lg font-semibold mt-8",
							children: "Use of Service"
						}),
						/* @__PURE__ */ jsx("p", { children: "You may use the Service to generate startup blueprints, websites, and SaaS foundations. You retain all rights to the content you create. You are responsible for complying with all applicable laws." }),
						/* @__PURE__ */ jsx("h2", {
							className: "text-foreground text-lg font-semibold mt-8",
							children: "Account Terms"
						}),
						/* @__PURE__ */ jsx("p", { children: "You are responsible for maintaining the security of your account. You must provide accurate information when creating an account and keep it up to date." }),
						/* @__PURE__ */ jsx("h2", {
							className: "text-foreground text-lg font-semibold mt-8",
							children: "Contact"
						}),
						/* @__PURE__ */ jsx("p", { children: "For questions about these terms, email us at legal@growthflow.ai." })
					]
				})
			]
		}), /* @__PURE__ */ jsx(Footer, {})]
	});
}
//#endregion
export { TermsPage as component };
