import { unstable_noStore } from "next/cache";

import { SupabaseClient } from "@/types/globals";

export class AuthService {
	constructor(private readonly client: SupabaseClient) {}

	getSession() {
		unstable_noStore();

		return this.client.auth.getSession();
	}

	async getSupabaseUser() {
		const userResponse = await this.client.auth.getUser();

		return userResponse.data.user;
	}

	async getDBUser() {
		const supabaseUser = await this.client.auth.getUser();

		if (!supabaseUser) {
			return null;
		}

		const userResponse = await this.client
			.from("users")
			.select(`*`)
			.eq("base_user", supabaseUser.data.user?.id || "")
			.single();

		if (userResponse.error) {
			return null;
		}

		return userResponse.data;
	}

	async signOut() {
		await this.client.auth.signOut();
	}

	async signInWithGoogle() {
		await this.client.auth.signInWithOAuth({
			provider: "google",
		});
	}
}
