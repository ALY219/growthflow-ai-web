import { t as Footer } from "./Footer-CbsGQH5h.js";
import { Link } from "@tanstack/react-router";
import { jsx, jsxs } from "react/jsx-runtime";
import { ArrowLeft, Mail, MessageSquare } from "lucide-react";
//#region src/routes/contact.tsx?tsr-split=component
function ContactPage() {
	return /* @__PURE__ */ jsxs("div", {
		className: "min-h-dvh bg-background text-foreground",
		children: [/* @__PURE__ */ jsxs("main", {
			className: "max-w-2xl mx-auto px-6 py-24 text-center",
			children: [
				/* @__PURE__ */ jsxs(Link, {
					to: "/",
					className: "inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-12",
					children: [/* @__PURE__ */ jsx(ArrowLeft, { className: "size-4" }), "Back to Home"]
				}),
				/* @__PURE__ */ jsx("h1", {
					className: "text-4xl font-bold tracking-tight mb-4",
					children: "Get in Touch"
				}),
				/* @__PURE__ */ jsx("p", {
					className: "text-muted-foreground text-lg mb-12 max-w-md mx-auto",
					children: "Have questions about GrowthFlow AI? We'd love to hear from you."
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "grid grid-cols-1 sm:grid-cols-2 gap-4",
					children: [/* @__PURE__ */ jsxs("div", {
						className: "flex flex-col items-center gap-3 p-6 rounded-xl border border-border bg-card",
						children: [
							/* @__PURE__ */ jsx("div", {
								className: "flex size-10 items-center justify-center rounded-lg bg-primary/10",
								children: /* @__PURE__ */ jsx(Mail, { className: "size-5 text-primary" })
							}),
							/* @__PURE__ */ jsx("h3", {
								className: "font-semibold text-sm",
								children: "Email Us"
							}),
							/* @__PURE__ */ jsx("p", {
								className: "text-xs text-muted-foreground",
								children: "hello@growthflow.ai"
							})
						]
					}), /* @__PURE__ */ jsxs("div", {
						className: "flex flex-col items-center gap-3 p-6 rounded-xl border border-border bg-card",
						children: [
							/* @__PURE__ */ jsx("div", {
								className: "flex size-10 items-center justify-center rounded-lg bg-accent/10",
								children: /* @__PURE__ */ jsx(MessageSquare, { className: "size-5 text-accent" })
							}),
							/* @__PURE__ */ jsx("h3", {
								className: "font-semibold text-sm",
								children: "Join Discord"
							}),
							/* @__PURE__ */ jsx("p", {
								className: "text-xs text-muted-foreground",
								children: "Community coming soon"
							})
						]
					})]
				})
			]
		}), /* @__PURE__ */ jsx(Footer, {})]
	});
}
//#endregion
export { ContactPage as component };
