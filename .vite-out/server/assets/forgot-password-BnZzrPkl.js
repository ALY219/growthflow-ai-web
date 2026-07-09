import { t as useAuth } from "./useAuth-B7Ij5ZTT.js";
import { t as BlinkClientBoundary } from "./BlinkClientBoundary-Bqt9pIwN.js";
import { Link } from "@tanstack/react-router";
import { jsx, jsxs } from "react/jsx-runtime";
import { Button } from "@blinkdotnew/ui";
import { ArrowLeft } from "lucide-react";
//#region src/routes/forgot-password.tsx?tsr-split=component
function ForgotPasswordPage() {
	return /* @__PURE__ */ jsx(BlinkClientBoundary, {
		fallback: /* @__PURE__ */ jsx(ForgotPasswordSkeleton, {}),
		children: /* @__PURE__ */ jsx(ForgotPasswordContent, {})
	});
}
function ForgotPasswordSkeleton() {
	return /* @__PURE__ */ jsx("main", {
		className: "flex min-h-dvh flex-col items-center justify-center gap-4 px-6 text-center",
		children: /* @__PURE__ */ jsx("div", { className: "animate-spin rounded-full h-8 w-8 border-b-2 border-primary" })
	});
}
function ForgotPasswordContent() {
	const { isLoading, signIn } = useAuth();
	if (isLoading) return /* @__PURE__ */ jsx(ForgotPasswordSkeleton, {});
	return /* @__PURE__ */ jsxs("main", {
		className: "flex min-h-dvh flex-col items-center justify-center gap-6 px-6 text-center",
		children: [
			/* @__PURE__ */ jsxs("div", {
				className: "flex flex-col items-center gap-2",
				children: [/* @__PURE__ */ jsx("h1", {
					className: "text-2xl font-semibold tracking-tight",
					children: "Reset Your Password"
				}), /* @__PURE__ */ jsx("p", {
					className: "text-sm text-muted-foreground max-w-sm",
					children: "You'll be redirected to the Blink authentication page where you can reset your password securely. Follow the instructions sent to your email."
				})]
			}),
			/* @__PURE__ */ jsx(Button, {
				onClick: signIn,
				size: "lg",
				className: "w-full max-w-xs",
				children: "Continue to Reset"
			}),
			/* @__PURE__ */ jsxs(Link, {
				to: "/sign-in",
				className: "inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors",
				children: [/* @__PURE__ */ jsx(ArrowLeft, { className: "size-4" }), "Back to Sign In"]
			})
		]
	});
}
//#endregion
export { ForgotPasswordPage as component };
