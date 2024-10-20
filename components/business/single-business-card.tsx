import Image from "next/image";
import { MapPin, Phone, Mail, Globe, Clock, ShieldCheck } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BusinessState } from "@/utils/types/business";
import Descriptioncard from "./description-card";
// import DescriptionCard from "@/components/business/cards/descriptioncard";
interface SingleBusinessCardProps {
  business: BusinessState;
}
const SingleBusinesscard = ({ business }: SingleBusinessCardProps) => {
  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader className="flex flex-row items-center space-x-4 pb-2">
        <div className="w-16 h-16 relative overflow-hidden rounded-md">
          {business?.logo ? (
            <Image
              src={business?.logo}
              alt={`${business?.name} - ${business?.category}`}
              layout="fill"
              objectFit="cover"
            />
          ) : (
            <div className="w-full h-full bg-gray-300 flex items-center justify-center">
              <span className="text-gay-500 text-xs">No Logo</span>
            </div>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <CardTitle className="text-lg line-clamp-1">
            {business?.name || "Business Name"}
          </CardTitle>
          <p className="text-sm text-muted-foreground line-clamp-1">
            {business?.category || "Category"}
          </p>
        </div>
      </CardHeader>
      <CardContent>
        <Descriptioncard description={business?.description} />
      </CardContent>
    </Card>
  );
};

export default SingleBusinesscard;
