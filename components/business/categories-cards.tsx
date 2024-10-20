import React from "react";
import { getUniqueCategoriesAndAddresses } from "@/actions/business";
import FilteredList from "../search/filtered-list";
import { LayoutList, MapPinHouse } from "lucide-react";

const CategoryAddresscard = async () => {
  const { uniquecategories, uniqueAddresses } =
    await getUniqueCategoriesAndAddresses();
  const categories = Array.isArray(uniquecategories) ? uniquecategories : [];
  const addresses = Array.isArray(uniqueAddresses) ? uniqueAddresses : [];
  return (
    <aside className="pb-10 mt-5 relative">
      <div className="m-5 space-y-6">
        <FilteredList
          data={categories}
          title="Categories"
          icon={<LayoutList />}
        />
        <FilteredList
          data={addresses}
          title="Addresses"
          icon={<MapPinHouse />}
        />
      </div>
    </aside>
  );
};

export default CategoryAddresscard;
