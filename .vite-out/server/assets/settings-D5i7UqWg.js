import { jsx, jsxs } from "react/jsx-runtime";
import { Badge, Card, CardDescription, CardHeader, CardTitle } from "@blinkdotnew/ui";
import { Bell, CreditCard, UserCog } from "lucide-react";
//#region src/routes/app/settings.tsx?tsr-split=component
var SETTINGS_CARDS = [
	{
		title: "Account Settings",
		description: "Manage your profile, email, and password.",
		icon: UserCog
	},
	{
		title: "Notifications",
		description: "Configure how you receive updates and alerts.",
		icon: Bell
	},
	{
		title: "Billing",
		description: "View plan details and manage your subscription.",
		icon: CreditCard
	}
];
function SettingsPage() {
	return /* @__PURE__ */ jsxs("div", {
		className: "space-y-6",
		children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("h1", {
			className: "text-2xl md:text-3xl font-bold tracking-tight text-foreground",
			children: "Settings"
		}), /* @__PURE__ */ jsx("p", {
			className: "text-muted-foreground mt-1 text-sm",
			children: "Manage your account preferences and workspace configuration."
		})] }), /* @__PURE__ */ jsx("div", {
			className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4",
			children: SETTINGS_CARDS.map((card) => /* @__PURE__ */ jsx(Card, {
				className: "border-border bg-card hover:border-primary/30 transition-colors duration-200 cursor-pointer",
				children: /* @__PURE__ */ jsxs(CardHeader, {
					className: "pb-3",
					children: [
						/* @__PURE__ */ jsxs("div", {
							className: "flex items-start justify-between gap-2 mb-1",
							children: [/* @__PURE__ */ jsx("div", {
								className: "flex size-9 items-center justify-center rounded-lg bg-muted",
								children: /* @__PURE__ */ jsx(card.icon, { className: "size-4.5 text-muted-foreground" })
							}), /* @__PURE__ */ jsx(Badge, {
								variant: "secondary",
								className: "text-[10px] px-1.5 py-0",
								children: "Coming Soon"
							})]
						}),
						/* @__PURE__ */ jsx(CardTitle, {
							className: "text-sm font-semibold text-foreground",
							children: card.title
						}),
						/* @__PURE__ */ jsx(CardDescription, {
							className: "text-xs text-muted-foreground",
							children: card.description
						})
					]
				})
			}, card.title))
		})]
	});
}
//#endregion
export { SettingsPage as component };
