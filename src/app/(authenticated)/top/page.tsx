import { TopTable } from "@/components/top-table";
import { getFoodPlaces } from "@/services/food-places/server";

async function TopPage() {
  const foodPlaces = await getFoodPlaces();

  return (
    <div>
      <TopTable data={foodPlaces} />
    </div>
  );
}

export default TopPage;
