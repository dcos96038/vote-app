import { FoodPlaceWithValorations } from "@/types/globals";

export const getFoodPlaceScore = (place: FoodPlaceWithValorations) => {
	if (!place.valorations.length) {
		return 0;
	}

	const totalScore = place.valorations.reduce(
		(acc, v) => acc + (v.score ?? 0),
		0,
	);

	return (totalScore / place.valorations.length).toFixed(2);
};
