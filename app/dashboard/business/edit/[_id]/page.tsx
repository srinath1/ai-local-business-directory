"use client";
import { useBusiness } from "@/app/context/business";
import BusinessForm from "@/components/ui/business/forms/business-form";
import React from "react";
export default function BusinessEditPage() {
  const { business } = useBusiness();
  return <BusinessForm />;
}
