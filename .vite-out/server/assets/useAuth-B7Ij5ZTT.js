import { useCallback, useEffect, useState } from "react";
import { createClient } from "@blinkdotnew/sdk";
//#region src/blink/client.ts
var blink = createClient({
	projectId: "growthflow-ai-saas-kkeg14mp",
	publishableKey: "blnk_pk_xx0cEuGqfsIc79Lbugv-TlWFRiPd7YbQ",
	authRequired: false,
	auth: { mode: "managed" }
});
//#endregion
//#region src/hooks/useAuth.ts
function mapUser(u) {
	if (!u) return null;
	return {
		id: u.id,
		email: u.email ?? "",
		displayName: u.displayName ?? u.email?.split("@")[0] ?? "User",
		avatarUrl: u.avatar ?? void 0
	};
}
function useAuth() {
	const [user, setUser] = useState(null);
	const [isLoading, setIsLoading] = useState(true);
	useEffect(() => {
		return blink.auth.onAuthStateChanged((state) => {
			setUser(mapUser(state.user));
			if (!state.isLoading) setIsLoading(false);
		});
	}, []);
	const signIn = useCallback(() => blink.auth.login(), []);
	const signOut = useCallback(() => blink.auth.logout(), []);
	return {
		user,
		isLoading,
		isAuthenticated: !!user,
		signIn,
		signOut
	};
}
//#endregion
export { blink as n, useAuth as t };
