import { t as Footer } from "./Footer-Co4lKgok.js";
import { Link } from "@tanstack/react-router";
import { jsx, jsxs } from "react/jsx-runtime";
import { ArrowLeft, Shield } from "lucide-react";
//#region src/routes/privacy.tsx?tsr-split=component
function PrivacyPage() {
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
						children: /* @__PURE__ */ jsx(Shield, { className: "size-5 text-muted-foreground" })
					}), /* @__PURE__ */ jsx("h1", {
						className: "text-3xl font-bold tracking-tight",
						children: "Privacy Policy"
					})]
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "prose prose-invert max-w-none space-y-4 text-muted-foreground text-sm leading-relaxed",
					children: [
						/* @__PURE__ */ jsx("p", { children: "Last updated: July 2026" }),
						/* @__PURE__ */ jsx("p", { children: "GrowthFlow AI (“we,” “our,” or “us”) is committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your information when you use our platform." }),
						/* @__PURE__ */ jsx("h2", {
							className: "text-foreground text-lg font-semibold mt-8",
							children: "Information We Collect"
						}),
						/* @__PURE__ */ jsx("p", { children: "We collect information you provide directly, such as your name, email address, and project data. We also collect usage data automatically to improve our services." }),
						/* @__PURE__ */ jsx("h2", {
							className: "text-foreground text-lg font-semibold mt-8",
							children: "How We Use Your Data"
						}),
						/* @__PURE__ */ jsx("p", { children: "Your data is used to provide and improve our AI-powered services, communicate with you about your account, and ensure the security of our platform." }),
						/* @__PURE__ */ jsx("h2", {
							className: "text-foreground text-lg font-semibold mt-8",
							children: "Contact"
						}),
						/* @__PURE__ */ jsx("p", { children: "For questions about this policy, email us at privacy@growthflow.ai." })
					]
				})
			]
		}), /* @__PURE__ */ jsx(Footer, {})]
	});
}
//#endregion
export { PrivacyPage as component };
