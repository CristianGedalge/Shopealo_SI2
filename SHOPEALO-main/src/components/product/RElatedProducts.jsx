import React from 'react';
import { HomeCard } from '../home/HomeCard';

export const RElatedProducts = ({ products }) => {
  return (
    <section>
      <div className="max-w-7xl mx-auto px-4 mt-6">
        <h2 className="text-2xl font-bold mb-6">Productos relacionados</h2>
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map(product => (
            <HomeCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};
