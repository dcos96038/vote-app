import { TopTable } from "@/components/top-table";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { FoodPlacesService } from "@/services/food-places";

async function TopPage() {
  const foodPlacesService = new FoodPlacesService(createSupabaseServerClient());

  const foodPlaces = await foodPlacesService.getVerifieds();

  return (
    <div>
      <TopTable data={foodPlaces} />
    </div>
  );
}

export default TopPage;
