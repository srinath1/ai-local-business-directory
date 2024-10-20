import { getlatestBusinessesFRomDB } from "@/actions/business";
import { BusinessState } from "@/utils/types/business";
import Link from "next/link";
import BusinessCard from "@/components/business/business-card";
import BusinessPagination from "@/components/nav/pagination";
import CategoryAddresscard from "@/components/business/categories-cards";
// export const meta = {
//   title: "Local Business Directory",
//   description: "Find your local business in your area",
// };
interface BusinessPageProps {
  searchParams: { page?: number };
}

export default async function Home({ searchParams }: BusinessPageProps) {
  const page = searchParams?.page
    ? parseInt(searchParams.page as unknown as string, 10)
    : 1;
  const limit = 4;
  const { businesses, totalCount } = await getlatestBusinessesFRomDB(
    page,
    limit
  );
  const totalPages = Math.ceil(totalCount / limit);
  return (
    <div>
      <p className="text-center my-5">
        {businesses.length} businesses on this page / total: {totalCount}
        {"  "}
      </p>
      <div className="p-5">
        <h1 className="text-2xl font-bold mb-5 text-center">
          Recently added businesses
        </h1>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {businesses.map((business: BusinessState) => (
            <Link key={business._id} href={`/business/${business.slug}`}>
              <div
                className="transform transition duration-300 
    hover:scale-105 hover:shadow-lg"
              >
                <BusinessCard business={business} />
              </div>
            </Link>
          ))}
        </div>
      </div>
      <div className=" flex justify-center mt-5">
        <BusinessPagination page={page} totalPages={totalPages} />
      </div>
      <div className="mt-8">
        <CategoryAddresscard />
      </div>
    </div>
  );
}
