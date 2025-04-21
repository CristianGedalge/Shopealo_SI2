
import React from "react";
import { HomeCard } from "./HomeCard";

export const CardContainer = ({products}) => {
  return (
    <>
    
    
    <section id="shop" className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <h4 className="text-center text-2xl font-semibold text-gray-800">
          Descubre las últimas tendencias con nuestra colección moderna
        </h4>

        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {/*   {
            products.map(product => <HomeCard  key={product.id} product={product} />)
          } */}
        <HomeCard   product={products} /> 
       
        </div>
      </div>
    </section>
    </>
  );
};
