"use client";
import React from "react";
import { useBusiness } from "@/app/context/business";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BusinessState } from "@/utils/types/business";
import PreviewCard from "@/components/ui/business/preview/preview.card";
import { Brain, Loader2Icon, Send } from "lucide-react";
import { usePathname } from "next/navigation";
interface InputField {
  name: string;
  label: string;
  accept?: string;
  type: string;
  required?: boolean;
}
const inputFields: InputField[] = [
  {
    name: "name",
    label: "Business name*",
    type: "text",
    required: true,
  },
  {
    name: "category",
    label: "Category* (e.g. Construction, Cafe, etc)",
    type: "text",
    required: true,
  },
  {
    name: "address",
    label: "Business address* (Write Online if no physical address)",
    type: "text",
    required: true,
  },
  {
    name: "phone",
    label: "Phone",
    type: "tel",
  },

  {
    name: "email",
    label: "Email",
    type: "email",
  },
  { name: "website", label: "Website", type: "url" },
  { name: "hours", label: "Hours (e.g. Mon-Fri 9am-5pm)", type: "text" },
  {
    name: "cvr",
    label: "CVR (Danish Business Number)",
    type: "number",
  },
  {
    name: "logo",
    label: "Uplaod Image",
    accept: "image/*",
    type: "file",
  },
];

const BusinessForm = () => {
  const {
    business,
    handleChange,
    handleSubmit,
    loading,
    logoUploading,
    generateBusinessDescription,
    generateDescriptiveLoading,
    isEditPage,
    updateBusiness,
  } = useBusiness();

  return (
    <div className="flex  flex-col lg:flex-row h-screen">
      <div className="flex flex-col lg:w-1/2 p-4 lg:order-last lg:flex lg:justify-center  lg:items-start overflow-y-auto min-h-[354px]">
        <PreviewCard business={business} />
      </div>
      <div className="flex flex-col lg:w-1/2 p-4 lg:order-first lg:flex  overflow-y-auto">
        <h1>
          List your business for free and reach out to millions of customers
        </h1>
        {inputFields.map((item, index) => (
          <div key={index} className="my-2 w-full">
            <label className="text-xs">{item.label}</label>
            <Input
              name={item.name}
              type={item.type}
              required={item.required}
              onChange={handleChange}
              value={
                item.name === "logo"
                  ? ""
                  : ((business[item.name as keyof BusinessState] || "") as
                      | string
                      | number)
              }
              accept={item.accept}
            />
            {logoUploading && item.name === "logo" && (
              <div className="absolute inset-0 flex items-center justify-center bg-opacity-50 bg-green">
                <Loader2Icon size={32} className="animate-spin"></Loader2Icon>
              </div>
            )}
          </div>
        ))}
        <Button
          variant="destructive"
          disabled={
            !business?.name || !business?.category || generateDescriptiveLoading
          }
          onClick={generateBusinessDescription}
        >
          {generateDescriptiveLoading ? (
            <Loader2Icon className="animate-spin mr-2" size={18} />
          ) : (
            <Brain size={18} className="mr-2" />
          )}{" "}
          Generat Description With AI
        </Button>
        <Button
          onClick={isEditPage ? updateBusiness : handleSubmit}
          type="submit"
          className="my-5"
          disabled={
            !business?.name ||
            !business?.category ||
            !business.address ||
            loading ||
            generateDescriptiveLoading
          }
        >
          {loading ? (
            <Loader2Icon className="animate-spin mr-2" />
          ) : (
            <Send className="mr-2" />
          )}{" "}
          Submit
        </Button>{" "}
      </div>
    </div>
  );
};

export default BusinessForm;
