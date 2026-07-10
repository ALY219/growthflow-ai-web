import { n as blink, t as useAuth } from "./useAuth-B7Ij5ZTT.js";
import { useEffect, useState } from "react";
import { Link, Outlet, useRouterState } from "@tanstack/react-router";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { Button } from "@blinkdotnew/ui";
import { FolderOpen, LayoutDashboard, LogOut, Menu, Settings, Sparkles, X } from "lucide-react";
//#region src/components/dashboard/DashboardSidebar.tsx
var NAV_ITEMS = [
	{
		to: "/app",
		label: "Dashboard",
		icon: LayoutDashboard
	},
	{
		to: "/app/projects",
		label: "Projects",
		icon: FolderOpen
	},
	{
		to: "/app/templates",
		label: "Templates",
		icon: Sparkles
	},
	{
		to: "/app/settings",
		label: "Settings",
		icon: Settings
	}
];
function DashboardSidebar() {
	const { user, signOut } = useAuth();
	const [mobileOpen, setMobileOpen] = useState(false);
	const currentPath = useRouterState({ select: (s) => s.location.pathname });
	const initials = user?.displayName ? user.displayName.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2) : user?.email?.[0]?.toUpperCase() ?? "?";
	const isActive = (to) => {
		if (to === "/app") return currentPath === "/app" || currentPath === "/app/";
		return currentPath.startsWith(to);
	};
	const sidebarContent = /* @__PURE__ */ jsxs("div", {
		className: "flex h-full flex-col bg-sidebar",
		children: [
			/* @__PURE__ */ jsx("div", {
				className: "shrink-0 border-b border-sidebar-border px-4 py-4",
				children: /* @__PURE__ */ jsxs(Link, {
					to: "/",
					className: "flex items-center gap-2.5 font-semibold text-sm text-sidebar-foreground tracking-tight hover:opacity-80 transition-opacity",
					children: [/* @__PURE__ */ jsx("span", {
						className: "relative flex size-7 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-accent text-primary-foreground text-xs font-bold",
						children: "G"
					}), /* @__PURE__ */ jsx("span", {
						className: "truncate",
						children: "GrowthFlow AI"
					})]
				})
			}),
			/* @__PURE__ */ jsx("nav", {
				className: "flex-1 min-h-0 overflow-y-auto px-3 py-4 space-y-0.5",
				children: NAV_ITEMS.map((item) => {
					const Icon = item.icon;
					const active = isActive(item.to);
					return /* @__PURE__ */ jsxs(Link, {
						to: item.to,
						onClick: () => setMobileOpen(false),
						className: `
                flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium
                transition-colors duration-150
                ${active ? "bg-sidebar-accent text-sidebar-primary" : "text-muted-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"}
              `,
						children: [/* @__PURE__ */ jsx(Icon, { className: "size-4 shrink-0" }), /* @__PURE__ */ jsx("span", {
							className: "truncate",
							children: item.label
						})]
					}, item.to);
				})
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "shrink-0 border-t border-sidebar-border p-3 space-y-2",
				children: [/* @__PURE__ */ jsxs("div", {
					className: "flex items-center gap-2.5 px-1",
					children: [/* @__PURE__ */ jsx("div", {
						className: "flex size-7 shrink-0 items-center justify-center rounded-full bg-primary/20 text-primary text-xs font-bold",
						children: initials
					}), /* @__PURE__ */ jsxs("div", {
						className: "flex-1 min-w-0",
						children: [/* @__PURE__ */ jsx("p", {
							className: "text-xs font-medium text-sidebar-foreground truncate",
							children: user?.displayName ?? "User"
						}), /* @__PURE__ */ jsx("p", {
							className: "text-[10px] text-muted-foreground truncate",
							children: user?.email ?? ""
						})]
					})]
				}), /* @__PURE__ */ jsxs(Button, {
					variant: "ghost",
					size: "sm",
					className: "w-full justify-start gap-2 text-muted-foreground hover:text-sidebar-foreground hover:bg-sidebar-accent/50",
					onClick: signOut,
					children: [/* @__PURE__ */ jsx(LogOut, { className: "size-3.5 shrink-0" }), /* @__PURE__ */ jsx("span", {
						className: "text-xs",
						children: "Sign Out"
					})]
				})]
			})
		]
	});
	return /* @__PURE__ */ jsxs(Fragment, { children: [
		/* @__PURE__ */ jsxs("div", {
			className: "md:hidden fixed top-0 left-0 right-0 z-40 flex items-center justify-between h-14 px-4 bg-background border-b border-border",
			children: [/* @__PURE__ */ jsx(Link, {
				to: "/",
				className: "flex items-center",
				children: /* @__PURE__ */ jsx("img", {
					src: "/logo.png",
					alt: "GrowthFlow AI",
					className: "h-5 w-auto object-contain"
				})
			}), /* @__PURE__ */ jsx("button", {
				className: "p-1.5 rounded-md text-muted-foreground hover:text-foreground transition-colors",
				onClick: () => setMobileOpen((v) => !v),
				"aria-label": "Toggle sidebar",
				children: mobileOpen ? /* @__PURE__ */ jsx(X, { className: "size-5" }) : /* @__PURE__ */ jsx(Menu, { className: "size-5" })
			})]
		}),
		/* @__PURE__ */ jsx("aside", {
			className: "hidden md:flex w-64 shrink-0 fixed inset-y-0 left-0 z-30 border-r border-border",
			children: sidebarContent
		}),
		mobileOpen && /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx("div", {
			className: "md:hidden fixed inset-0 z-40 bg-background/80 backdrop-blur-sm",
			onClick: () => setMobileOpen(false)
		}), /* @__PURE__ */ jsx("aside", {
			className: "md:hidden fixed inset-y-0 left-0 z-50 w-72 border-r border-border shadow-2xl",
			children: sidebarContent
		})] })
	] });
}
//#endregion
//#region src/routes/app.tsx?tsr-split=component
function AppLayout() {
	const [ready, setReady] = useState(false);
	const [authenticated, setAuthenticated] = useState(false);
	useEffect(() => {
		return blink.auth.onAuthStateChanged((state) => {
			setAuthenticated(state.isAuthenticated);
			if (!state.isLoading) setReady(true);
		});
	}, []);
	if (!ready) return /* @__PURE__ */ jsx("div", {
		className: "flex min-h-dvh items-center justify-center bg-background",
		children: /* @__PURE__ */ jsx("div", { className: "animate-spin rounded-full h-8 w-8 border-b-2 border-primary" })
	});
	if (!authenticated) {
		if (typeof window !== "undefined") {
			window.location.href = "/sign-in";
			return null;
		}
		return null;
	}
	return /* @__PURE__ */ jsxs("div", {
		className: "flex min-h-dvh bg-background",
		children: [/* @__PURE__ */ jsx(DashboardSidebar, {}), /* @__PURE__ */ jsx("main", {
			className: "flex-1 min-w-0 md:pl-64 pt-14 md:pt-0 overflow-y-auto",
			children: /* @__PURE__ */ jsx("div", {
				className: "p-4 md:p-8",
				children: /* @__PURE__ */ jsx(Outlet, {})
			})
		})]
	});
}
//#endregion
export { AppLayout as component };
