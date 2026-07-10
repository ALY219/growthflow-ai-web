import { Link } from "@tanstack/react-router";
import { jsx, jsxs } from "react/jsx-runtime";
import { Globe } from "lucide-react";
//#region src/components/Footer.tsx
var PRODUCT_LINKS = [
	{
		label: "Features",
		href: "#features"
	},
	{
		label: "Pricing",
		href: "/pricing"
	},
	{
		label: "Documentation",
		href: "/docs"
	}
];
var COMPANY_LINKS = [
	{
		label: "About",
		href: "#"
	},
	{
		label: "Contact",
		href: "/contact"
	},
	{
		label: "Privacy Policy",
		href: "/privacy"
	},
	{
		label: "Terms of Service",
		href: "/terms"
	}
];
function Footer() {
	return /* @__PURE__ */ jsx("footer", {
		className: "border-t border-border/40 bg-background",
		children: /* @__PURE__ */ jsxs("div", {
			className: "mx-auto max-w-7xl px-6 py-16",
			children: [/* @__PURE__ */ jsxs("div", {
				className: "grid grid-cols-2 md:grid-cols-4 gap-10",
				children: [
					/* @__PURE__ */ jsxs("div", {
						className: "col-span-2 md:col-span-1",
						children: [/* @__PURE__ */ jsx("div", {
							className: "mb-3",
							children: /* @__PURE__ */ jsx("img", {
								src: "/logo.png",
								alt: "GrowthFlow AI",
								className: "h-6 w-auto object-contain"
							})
						}), /* @__PURE__ */ jsx("p", {
							className: "text-sm text-muted-foreground leading-relaxed max-w-xs",
							children: "Build, launch, and grow your startup with AI — all in one platform."
						})]
					}),
					/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("h4", {
						className: "text-sm font-semibold text-foreground mb-4",
						children: "Product"
					}), /* @__PURE__ */ jsx("ul", {
						className: "space-y-2.5",
						children: PRODUCT_LINKS.map((l) => /* @__PURE__ */ jsx("li", { children: l.href.startsWith("#") ? /* @__PURE__ */ jsx("a", {
							href: l.href,
							className: "text-sm text-muted-foreground hover:text-foreground transition-colors",
							children: l.label
						}) : /* @__PURE__ */ jsx(Link, {
							to: l.href,
							className: "text-sm text-muted-foreground hover:text-foreground transition-colors",
							children: l.label
						}) }, l.label))
					})] }),
					/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("h4", {
						className: "text-sm font-semibold text-foreground mb-4",
						children: "Company"
					}), /* @__PURE__ */ jsx("ul", {
						className: "space-y-2.5",
						children: COMPANY_LINKS.map((l) => /* @__PURE__ */ jsx("li", { children: l.href.startsWith("#") ? /* @__PURE__ */ jsx("a", {
							href: l.href,
							className: "text-sm text-muted-foreground hover:text-foreground transition-colors",
							children: l.label
						}) : /* @__PURE__ */ jsx(Link, {
							to: l.href,
							className: "text-sm text-muted-foreground hover:text-foreground transition-colors",
							children: l.label
						}) }, l.label))
					})] }),
					/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("h4", {
						className: "text-sm font-semibold text-foreground mb-4",
						children: "Follow Us"
					}), /* @__PURE__ */ jsxs("div", {
						className: "flex gap-3",
						children: [/* @__PURE__ */ jsx("a", {
							href: "#",
							className: "size-9 flex items-center justify-center rounded-md border border-border text-muted-foreground hover:text-foreground hover:border-foreground/30 transition-colors",
							"aria-label": "Social",
							children: /* @__PURE__ */ jsx(Globe, { className: "size-4" })
						}), /* @__PURE__ */ jsx("a", {
							href: "#",
							className: "size-9 flex items-center justify-center rounded-md border border-border text-muted-foreground hover:text-foreground hover:border-foreground/30 transition-colors",
							"aria-label": "Social",
							children: /* @__PURE__ */ jsx(Globe, { className: "size-4" })
						})]
					})] })
				]
			}), /* @__PURE__ */ jsx("div", {
				className: "mt-12 pt-6 border-t border-border/40 flex flex-col sm:flex-row items-center justify-between gap-3",
				children: /* @__PURE__ */ jsxs("p", {
					className: "text-xs text-muted-foreground",
					children: [
						"© ",
						(/* @__PURE__ */ new Date()).getFullYear(),
						" GrowthFlow AI. All rights reserved."
					]
				})
			})]
		})
	});
}
//#endregion
export { Footer as t };
