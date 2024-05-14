import React, { Suspense } from 'react';
import prisma from '@/db/db';
import { Product } from '@prisma/client';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { ProductCard, ProductCardSkeleton } from '@/components/ProductCard';
import { cache } from '@/lib/cache';

type ProductGridSectionProps = {
  title: string;
  productsFetcher: () => Promise<Product[]>;
};

const getMostPopularProducts = cache(
  () => {
    return prisma.product.findMany({
      where: { isAvailable: true },
      orderBy: { orders: { _count: 'desc' } },
      take: 6,
    });
  },
  ['/', 'getMostPopularProducts'],
  { revalidate: 60 * 60 * 24 },
);

const getNewestProducts = cache(() => {
  return prisma.product.findMany({
    where: { isAvailable: true },
    orderBy: { createdAt: 'desc' },
    take: 6,
  });
}, ['/', 'getNewestProducts']);

const ProductSuspense = async ({
  productsFetcher,
}: {
  productsFetcher: () => Promise<Product[]>;
}) => {
  return (await productsFetcher()).map(product => (
    <ProductCard key={product.id} {...product} />
  ));
};

const ProductGridSection = ({
  productsFetcher,
  title,
}: ProductGridSectionProps) => {
  return (
    <div className="space-y-4">
      <div className="flex gap-4">
        <h2 className="text-3xl font-bold">{title}</h2>
        <Button variant={'outline'} asChild>
          <Link href={'/products'} className="space-x-2">
            <span>View All</span>
            <ArrowRight className="size-4" />
          </Link>
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Suspense
          fallback={
            <>
              <ProductCardSkeleton />
              <ProductCardSkeleton />
              <ProductCardSkeleton />
            </>
          }
        >
          <ProductSuspense productsFetcher={productsFetcher} />
        </Suspense>
      </div>
    </div>
  );
};

const HomePage = () => {
  return (
    <main className="space-y-12">
      <ProductGridSection
        title="Most Popular"
        productsFetcher={getMostPopularProducts}
      />
      <ProductGridSection title="Newest" productsFetcher={getNewestProducts} />
    </main>
  );
};

export default HomePage;
