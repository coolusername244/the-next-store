import React, { Suspense } from 'react';
import { ProductCard, ProductCardSkeleton } from '@/components/ProductCard';
import prisma from '@/db/db';
import { cache } from '@/lib/cache';

const getProducts = cache(() => {
  return prisma.product.findMany({
    where: { isAvailableForPurchase: true },
    orderBy: { name: 'asc' },
  });
}, ['/products', 'getProducts']);

const ProductsSuspense = async () => {
  const products = await getProducts();
  return products.map(product => <ProductCard key={product.id} {...product} />);
};

const ProductsPage = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <Suspense
        fallback={
          <>
            <ProductCardSkeleton />
            <ProductCardSkeleton />
            <ProductCardSkeleton />
            <ProductCardSkeleton />
            <ProductCardSkeleton />
            <ProductCardSkeleton />
          </>
        }
      >
        <ProductsSuspense />
      </Suspense>
    </div>
  );
};

export default ProductsPage;
