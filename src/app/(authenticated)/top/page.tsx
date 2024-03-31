import { TopTable } from "@/components/top-table";
import { foodPlacesServerService } from "@/services/food-places/server";

async function TopPage() {
  const foodPlaces = await foodPlacesServerService.getVerifieds();

  return (
    <div>
      <TopTable data={foodPlaces} />
    </div>
  );
}

export default TopPage;
