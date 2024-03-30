import { TopTable } from "@/components/top-table";
import { getVerifiedFoodPlaces } from "@/services/food-places/server";

async function TopPage() {
  const foodPlaces = await getVerifiedFoodPlaces();

  return (
    <div>
      <TopTable data={foodPlaces} />
    </div>
  );
}

export default TopPage;
