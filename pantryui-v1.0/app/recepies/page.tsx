// pages/results.tsx or anywhere you want to render these cards
"use client";
import InspireCard from "@/components/InspireCard";
import SearchBar from "@/components/SearchBar";

export default function Results() {
  return (
    <div className="min-h-screen bg-gray-100 p-4 flex flex-col items-center pt-32">
      <SearchBar />
      <div className="mt-8"></div> {/* Spacer bc SearchBar is sticky */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6"> 
        <InspireCard />
        
      </div>
    </div>
  );
}
