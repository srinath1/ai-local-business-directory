"use client";
import React from "react";
import { throttle } from "lodash";
import { searchBusinessInDB } from "@/actions/business";
import BusinessCard from "@/components/business/business-card";
import { BusinessState } from "@/utils/types/business";
import Link from "next/link";

const throttleFetchResults = throttle(
  async (
    query: string,
    setResults: React.Dispatch<React.SetStateAction<BusinessState[]>>,
    setLoading: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    if (query) {
      setLoading(true);
      try {
        const data = await searchBusinessInDB(query);
        setResults(data);
      } catch (error: any) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    } else {
      setResults([]);
      setLoading(false);
    }
  },
  1000
);
const SearchPage = ({ searchParams }: { searchParams: { query?: string } }) => {
  const [results, setResults] = React.useState<BusinessState[]>([]);
  const [loading, setLoading] = React.useState(false);
  const fetchResults = React.useCallback(() => {
    throttleFetchResults(searchParams.query || "", setResults, setLoading);
  }, [searchParams.query]);
  React.useEffect(() => {
    fetchResults();
  }, [fetchResults]);
  React.useEffect(() => {
    if (!searchParams.query) {
      setResults([]);
      setLoading(false);
    }
  }, [searchParams.query]);
  return (
    <div>
      <div className="p-5">
        <h1 className="text-2xl font-bold mb-5 text-center">Search Results</h1>
        {loading && searchParams.query && (
          <p className="text-center">Loading...</p>
        )}
        {!loading && results.length === 0 && searchParams.query && (
          <p className="text-center">No results found.</p>
        )}
        {results.length > 0 && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {results.map((business: BusinessState) => (
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
        )}
      </div>
    </div>
  );
};

export default SearchPage;
