"use server";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function createFoodPlaceProposal(_: unknown, formData: FormData) {
	const rawFormData = {
		name: formData.get("name") as string,
		location: formData.get("location") as string,
		menu: formData.get("menu-link") as string,
		opening_time: formData.get("opening-time") as string,
		closing_time: formData.get("closing-time") as string,
	};

	const supabase = createSupabaseServerClient();

	const { error } = await supabase.from("food_places").insert(rawFormData);

	if (error) {
		console.error(error);
		return {
			message: "Error al enviar la propuesta",
			success: false,
		};
	}

	return {
		message: "Propuesta enviada!",
		success: true,
	};
}
