import { t as useAuth } from "./useAuth-B7Ij5ZTT.js";
import { t as BlinkClientBoundary } from "./BlinkClientBoundary-Bqt9pIwN.js";
import { useEffect } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { jsx, jsxs } from "react/jsx-runtime";
import { Button } from "@blinkdotnew/ui";
//#region src/routes/sign-in.tsx?tsr-split=component
function SignInPage() {
	return /* @__PURE__ */ jsx(BlinkClientBoundary, {
		fallback: /* @__PURE__ */ jsx(SignInSkeleton, {}),
		children: /* @__PURE__ */ jsx(SignInContent, {})
	});
}
function SignInSkeleton() {
	return /* @__PURE__ */ jsx("main", {
		className: "flex min-h-dvh flex-col items-center justify-center gap-4 px-6 text-center",
		children: /* @__PURE__ */ jsx("div", { className: "animate-spin rounded-full h-8 w-8 border-b-2 border-primary" })
	});
}
function SignInContent() {
	const { isAuthenticated, isLoading, signIn } = useAuth();
	const navigate = useNavigate();
	useEffect(() => {
		if (isAuthenticated) navigate({ to: "/app" });
	}, [isAuthenticated, navigate]);
	if (isLoading) return /* @__PURE__ */ jsx(SignInSkeleton, {});
	if (isAuthenticated) return null;
	return /* @__PURE__ */ jsxs("main", {
		className: "flex min-h-dvh flex-col items-center justify-center gap-6 px-6 text-center",
		children: [
			/* @__PURE__ */ jsxs("div", {
				className: "flex flex-col items-center gap-2",
				children: [/* @__PURE__ */ jsx("h1", {
					className: "text-2xl font-semibold tracking-tight",
					children: "Welcome Back"
				}), /* @__PURE__ */ jsx("p", {
					className: "text-sm text-muted-foreground max-w-sm",
					children: "Sign in to your GrowthFlow AI account and continue building."
				})]
			}),
			/* @__PURE__ */ jsx(Button, {
				onClick: signIn,
				size: "lg",
				className: "w-full max-w-xs",
				children: "Sign In with Email"
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "flex flex-col gap-1 text-sm text-muted-foreground",
				children: [/* @__PURE__ */ jsxs("p", { children: [
					"Don't have an account?",
					" ",
					/* @__PURE__ */ jsx(Link, {
						to: "/sign-up",
						className: "text-primary hover:underline font-medium",
						children: "Sign up"
					})
				] }), /* @__PURE__ */ jsx("p", { children: /* @__PURE__ */ jsx(Link, {
					to: "/forgot-password",
					className: "text-primary hover:underline font-medium",
					children: "Forgot your password?"
				}) })]
			})
		]
	});
}
//#endregion
export { SignInPage as component };
