import { TopTable } from "@/components/top-table";
import { getFoodPlaces } from "@/services/food-places/server";

export default async function Home() {
  const foodPlaces = await getFoodPlaces();

  return (
    <div>
      <TopTable data={foodPlaces} />
    </div>
  );
}
