import { t as Footer } from "./Footer-Co4lKgok.js";
import { Link } from "@tanstack/react-router";
import { jsx, jsxs } from "react/jsx-runtime";
import { ArrowLeft, BookOpen } from "lucide-react";
//#region src/routes/docs.tsx?tsr-split=component
function DocsPage() {
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
						children: /* @__PURE__ */ jsx(BookOpen, { className: "size-5 text-muted-foreground" })
					}), /* @__PURE__ */ jsx("h1", {
						className: "text-3xl font-bold tracking-tight",
						children: "Documentation"
					})]
				}),
				/* @__PURE__ */ jsx("p", {
					className: "text-muted-foreground text-lg mb-8",
					children: "Full documentation is coming soon. In the meantime, here are the basics to get started."
				}),
				/* @__PURE__ */ jsx("div", {
					className: "grid grid-cols-1 sm:grid-cols-2 gap-4",
					children: [
						{
							title: "Quick Start Guide",
							desc: "Learn how to create your first project and generate a startup blueprint."
						},
						{
							title: "Project Types",
							desc: "Understand the differences between blueprints, websites, and SaaS projects."
						},
						{
							title: "AI Features",
							desc: "Explore the AI-powered tools available for each project type."
						},
						{
							title: "Account & Billing",
							desc: "Manage your subscription, team members, and account settings."
						}
					].map((doc) => /* @__PURE__ */ jsxs("div", {
						className: "p-5 rounded-xl border border-border bg-card",
						children: [/* @__PURE__ */ jsx("h3", {
							className: "font-semibold text-sm mb-1.5",
							children: doc.title
						}), /* @__PURE__ */ jsx("p", {
							className: "text-xs text-muted-foreground",
							children: doc.desc
						})]
					}, doc.title))
				})
			]
		}), /* @__PURE__ */ jsx(Footer, {})]
	});
}
//#endregion
export { DocsPage as component };
