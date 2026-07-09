import { t as useAuth } from "./useAuth-B7Ij5ZTT.js";
import { t as BlinkClientBoundary } from "./BlinkClientBoundary-Bqt9pIwN.js";
import { useEffect } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { jsx, jsxs } from "react/jsx-runtime";
import { Button } from "@blinkdotnew/ui";
//#region src/routes/sign-up.tsx?tsr-split=component
function SignUpPage() {
	return /* @__PURE__ */ jsx(BlinkClientBoundary, {
		fallback: /* @__PURE__ */ jsx(SignUpSkeleton, {}),
		children: /* @__PURE__ */ jsx(SignUpContent, {})
	});
}
function SignUpSkeleton() {
	return /* @__PURE__ */ jsx("main", {
		className: "flex min-h-dvh flex-col items-center justify-center gap-4 px-6 text-center",
		children: /* @__PURE__ */ jsx("div", { className: "animate-spin rounded-full h-8 w-8 border-b-2 border-primary" })
	});
}
function SignUpContent() {
	const { user, isLoading, isAuthenticated, signIn } = useAuth();
	const navigate = useNavigate();
	useEffect(() => {
		if (isAuthenticated) navigate({ to: "/app" });
	}, [isAuthenticated, navigate]);
	if (isLoading) return /* @__PURE__ */ jsx(SignUpSkeleton, {});
	if (isAuthenticated) return null;
	return /* @__PURE__ */ jsxs("main", {
		className: "flex min-h-dvh flex-col items-center justify-center gap-6 px-6 text-center",
		children: [
			/* @__PURE__ */ jsxs("div", {
				className: "flex flex-col items-center gap-2",
				children: [/* @__PURE__ */ jsx("h1", {
					className: "text-2xl font-semibold tracking-tight",
					children: "Sign Up"
				}), /* @__PURE__ */ jsx("p", {
					className: "text-sm text-muted-foreground max-w-sm",
					children: "Create your GrowthFlow AI account and start transforming your ideas into real startups."
				})]
			}),
			/* @__PURE__ */ jsx(Button, {
				onClick: signIn,
				size: "lg",
				className: "w-full max-w-xs",
				children: "Continue with Email"
			}),
			/* @__PURE__ */ jsxs("p", {
				className: "text-sm text-muted-foreground",
				children: [
					"Already have an account?",
					" ",
					/* @__PURE__ */ jsx(Link, {
						to: "/sign-in",
						className: "text-primary hover:underline font-medium",
						children: "Sign in"
					})
				]
			})
		]
	});
}
//#endregion
export { SignUpPage as component };
