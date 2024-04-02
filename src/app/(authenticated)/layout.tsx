import { redirect } from "next/navigation";

import { Navbar } from "@/components/ui/navbar";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { AuthService } from "@/services/auth";

export default async function HomeLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const authService = new AuthService(createSupabaseServerClient());

	const user = await authService.getSupabaseUser();

	if (!user) {
		redirect("/");
	}

	return (
		<main className="mx-auto min-h-screen max-w-screen-lg py-2">
			<Navbar />
			<div className="px-4 py-8">{children}</div>
		</main>
	);
}
