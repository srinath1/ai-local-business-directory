"use client";
import React from "react";
import { useBusiness } from "../context/business";
import PreviewCard from "@/components/ui/business/preview/preview.card";
import Link from "next/link";
import SkeletonCard from "@/components/business/skeleton-card";

const Dashboard = () => {
  const { businesses } = useBusiness();

  if (!businesses?.length) {
    return (
      <div>
        <p className="text-center my-5">Loading....</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4  m-5 px-5">
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
        </div>
      </div>
    );
  }
  return (
    <div className="p-5">
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {businesses.map((business) => (
          <Link
            key={business._id}
            href={`/dashboard/business/edit/${business._id}`}
          >
            <div
              className="transform transition duration-300 hover:scale
105 hover:shadow-lg"
            >
              <PreviewCard business={business} />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
