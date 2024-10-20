import { getBusinessBySlug } from "@/actions/business";
import BusinessHighlightcard from "@/components/business/business-highlight-card";
import SingleBusinesscard from "@/components/business/single-business-card";

interface BusinessPageprops {
  params: { slug: string };
}
function stripHtmlAndTruncate(text: string, maxLength: number): string {
  // Remove HTML tags
  const strippedText = text.replace(/(<([^>]+)>)/gi, "");

  // Remove line breaks and extra white spaces
  const cleanedText = strippedText.replace(/\s+/g, " ").trim();

  // Truncate the text if necessary
  return cleanedText.length > maxLength
    ? cleanedText.substring(0, maxLength) + "..."
    : cleanedText;
}

export async function generateMetadata({ params }: BusinessPageprops) {
  const business = await getBusinessBySlug(params.slug);
  const imageUrl = business?.logo || "/logo.svg";
  const description = stripHtmlAndTruncate(business?.description, 160);
  return {
    title: business?.name,
    description,
    openGraph: {
      title: business?.name,
      description,
      type: "website",
      url: `${process.env.DOMAIN}/business/${params?.slug}`,
      site_name: process.env.APP_NAME,
      images: [
        {
          url: imageUrl,
          alt: `${business?.name}-${business?.category}`,
          type: "image/jpg",
        },
      ],
      canonical: `${process.env.DOMAIN}/business/${params?.slug}`,
    },
  };
}
export default async function BusinessPage({ params }: BusinessPageprops) {
  const business = await getBusinessBySlug(params.slug);
  return (
    <div className="mx-1 md:m-20">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="order-2 md:order-1 md:col-span-2">
          <SingleBusinesscard business={business} />
        </div>
        <div className="order-1 md:order-2 md:col-span-1">
          <BusinessHighlightcard business={business} />
        </div>
      </div>
    </div>
  );
}
