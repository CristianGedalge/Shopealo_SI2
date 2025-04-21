import React from "react";

export const ProductPagePlaceholder = () => {
  return (
    <section className="py-6">
      <div className="max-w-7xl mx-auto px-4 my-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <div className="w-full h-[700px] bg-gray-300 rounded animate-pulse"></div>
          </div>
          <div className="space-y-4">
            <div className="h-6 w-1/3 bg-gray-300 rounded animate-pulse"></div>
            <div className="h-6 w-full bg-gray-300 rounded animate-pulse"></div>
            <div className="h-6 w-1/3 bg-gray-300 rounded animate-pulse"></div>
          </div>
          <div className="md:col-span-2 space-y-3 mt-6">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-4 w-full bg-gray-300 rounded animate-pulse"></div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
