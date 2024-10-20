"use client";
import { Search } from "lucide-react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import React from "react";

export default function SearchButton() {
  const [query, setquery] = React.useState("");
  const { replace } = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  React.useEffect(() => {
    const initialQuery = searchParams.get("query") || "";
    setquery(initialQuery);
  }, [searchParams]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setquery(value);
    replace(`/search?query=${value}`);
  };
  const handleClick = () => {
    replace("/search");
  };

  const sharedClasses =
    "flex items-center w-full max-w-sm cursor-pointer rounded-full border border-gray-500 dark:border-gray-400 bg-white dark:bg-gray-800 px-2 py-1 text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none";
  const sharedStyles: React.CSSProperties = {
    height: "32px",
  };

  if (pathname.includes("search")) {
    return (
      <div style={sharedStyles} className={sharedClasses}>
        <Search size={16} className="text-gray-500 dark:text-gray-500" />
        <input
          type="search"
          className="ml-2 w-full bg-transparent border-none focus:outline-none"
          placeholder="Search Businesses..."
          value={query}
          onChange={handleChange}
          autoFocus
        />
      </div>
    );
  } else {
    return (
      <button onClick={handleClick} className={sharedClasses}>
        <Search size={16} className="text-gray-500 dark:text-gray-300" />
        <span className="ml-2">SearchBusinesses</span>
      </button>
    );
  }
}
