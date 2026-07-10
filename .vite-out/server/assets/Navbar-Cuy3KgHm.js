import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { jsx, jsxs } from "react/jsx-runtime";
import { Button } from "@blinkdotnew/ui";
import { Menu, X } from "lucide-react";
//#region src/components/Navbar.tsx
var NAV_LINKS = [
	{
		label: "Features",
		href: "#features"
	},
	{
		label: "How It Works",
		href: "#how-it-works"
	},
	{
		label: "Pricing",
		href: "#pricing"
	},
	{
		label: "FAQ",
		href: "#faq"
	}
];
function Navbar() {
	const [mobileOpen, setMobileOpen] = useState(false);
	const [scrolled, setScrolled] = useState(false);
	useEffect(() => {
		const onScroll = () => setScrolled(window.scrollY > 20);
		window.addEventListener("scroll", onScroll, { passive: true });
		return () => window.removeEventListener("scroll", onScroll);
	}, []);
	return /* @__PURE__ */ jsxs("nav", {
		className: `
        fixed top-0 inset-x-0 z-50 transition-all duration-300
        ${scrolled ? "bg-background/80 backdrop-blur-xl border-b border-border/50 shadow-sm" : "bg-transparent backdrop-blur-md"}
      `,
		children: [/* @__PURE__ */ jsxs("div", {
			className: "mx-auto max-w-7xl flex items-center justify-between px-6 h-16",
			children: [
				/* @__PURE__ */ jsxs(Link, {
					to: "/",
					className: "flex items-center gap-2 font-semibold text-lg tracking-tight text-foreground",
					children: [/* @__PURE__ */ jsx("span", {
						className: "relative flex size-7 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-accent text-primary-foreground text-sm font-bold",
						children: "G"
					}), "GrowthFlow"]
				}),
				/* @__PURE__ */ jsx("div", {
					className: "hidden md:flex items-center gap-8",
					children: NAV_LINKS.map((link) => /* @__PURE__ */ jsx("a", {
						href: link.href,
						className: "text-sm text-muted-foreground hover:text-foreground transition-colors duration-200",
						children: link.label
					}, link.href))
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "hidden md:flex items-center gap-3",
					children: [/* @__PURE__ */ jsx(Link, {
						to: "/sign-in",
						children: /* @__PURE__ */ jsx(Button, {
							variant: "ghost",
							size: "sm",
							children: "Sign In"
						})
					}), /* @__PURE__ */ jsx(Link, {
						to: "/sign-up",
						children: /* @__PURE__ */ jsx(Button, {
							size: "sm",
							children: "Get Started"
						})
					})]
				}),
				/* @__PURE__ */ jsx("button", {
					className: "md:hidden p-1.5 rounded-md text-muted-foreground hover:text-foreground transition-colors",
					onClick: () => setMobileOpen((v) => !v),
					"aria-label": "Toggle menu",
					children: mobileOpen ? /* @__PURE__ */ jsx(X, { className: "size-5" }) : /* @__PURE__ */ jsx(Menu, { className: "size-5" })
				})
			]
		}), mobileOpen && /* @__PURE__ */ jsx("div", {
			className: "md:hidden border-t border-border/50 bg-background/95 backdrop-blur-xl",
			children: /* @__PURE__ */ jsxs("div", {
				className: "flex flex-col gap-1 px-6 py-4",
				children: [NAV_LINKS.map((link) => /* @__PURE__ */ jsx("a", {
					href: link.href,
					onClick: () => setMobileOpen(false),
					className: "py-2.5 text-sm text-muted-foreground hover:text-foreground transition-colors",
					children: link.label
				}, link.href)), /* @__PURE__ */ jsx(Link, {
					to: "/sign-up",
					className: "mt-2",
					onClick: () => setMobileOpen(false),
					children: /* @__PURE__ */ jsx(Button, {
						size: "sm",
						className: "w-full",
						children: "Get Started"
					})
				})]
			})
		})]
	});
}
//#endregion
export { Navbar as t };
