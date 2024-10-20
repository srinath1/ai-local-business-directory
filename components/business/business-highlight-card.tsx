"use client";
import { Button } from "@/components/ui/button";
import { Clock, Globe, Mail, Phone, MapPin } from "lucide-react";
import { BusinessState } from "@/utils/types/business";
import React from "react";
import toast from "react-hot-toast";

const BusinessHighlightcard = ({ business }: { business: BusinessState }) => {
  const handleCopy = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    toast.success(`${field} copied to clipboard`);
  };
  return (
    <div className="space-y-4 p-4 rounded-lg border:shadow-sm">
      <h2 className=" text-xl font-bold">{business.name}</h2>
      <span className="text-sm text-muted-foreground">
        Business Information
      </span>
      <Button
        variant="outline"
        className="w-full justify-start "
        onClick={() =>
          business.address &&
          window.open(
            `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
              business.address
            )}`,
            "_blank",
            "noopener noreferrer"
          )
        }
      >
        <MapPin size={16}></MapPin>
        <span className="ml-2">{business.address || "Address"}</span>
      </Button>
      <Button
        variant="outline"
        className="w-full justify-start"
        onClick={() =>
          business.website &&
          window.open(
            formatUrl(business.website),
            "_blank",
            "noopener noreferrer"
          )
        }
      >
        <Globe size={16}></Globe>
        <span className="ml-2">{business.website || "Website"}</span>
      </Button>

      <Button
        variant="outline"
        className="w-full justify-start"
        onClick={() => handleCopy(business.phone, "Phone")}
      >
        <Phone size={16} />
        <span className="ml-2">{business.phone}</span>
      </Button>
      <Button
        variant="outline"
        className="w-full justify-start"
        onClick={() => handleCopy(business.email, "Email")}
      >
        <Mail size={16} />
        <span className="ml-2">{business.email}</span>
      </Button>
      <Button
        variant="outline"
        className="w-full justify-start "
        onClick={() =>
          business.address &&
          window.open(
            `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
              business.name
            )}`,
            "_blank",
            "noopener noreferrer"
          )
        }
      >
        <Clock size={16} />
        <span className="ml-2">{business.hours || "Opening Hours"}</span>
      </Button>
    </div>
  );
};
function formatUrl(url: string): string {
  if (!url) return "";
  // Add http:// if missing
  if (!/^https?:\/\//i.test(url)) {
    return `http://${url}`;
  }
  return url;
}

export default BusinessHighlightcard;
