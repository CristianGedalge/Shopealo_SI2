import React from "react";
import PalceHolder from "./PalceHolder";

export default function PlaceHolderContainer() {
  //const placeNumbers = [...Array(12).keys().slice(0)]
  const placeNumbers = Array.from(Array(12).keys()).slice(0);

  return (
    <>
      <section className="py-10" id="shop">
        <h4 className="text-center text-2xl font-semibold mb-6">
          Our Products
        </h4>

        <div className="px-4 lg:px-20 mt-8">
          <div className="flex flex-wrap justify-center gap-4">
            {placeNumbers.map(num =>  <PalceHolder key={num}/> )}
          
          </div>
        </div>
      </section>
    </>
  );
}
