import React from 'react';
import DashboardCard from '@/components/DashboardCard';
import prisma from '@/db/db';
import { formatCurrency, formatNumber } from '@/lib/formatters';

const getSalesData = async () => {
  const data = await prisma.order.aggregate({
    _sum: { priceInCents: true },
    _count: true,
  });
  return {
    amount: (data._sum.priceInCents || 0) / 100,
    numberOfSales: data._count,
  };
};

const getUserData = async () => {
  const [userCount, orderData] = await Promise.all([
    prisma.user.count(),
    prisma.order.aggregate({
      _sum: { priceInCents: true },
    }),
  ]);

  return {
    userCount,
    averageValuePerUser:
      userCount === 0
        ? 0
        : (orderData._sum.priceInCents || 0) / userCount / 100,
  };
};

const getProductData = async () => {
  const [activeCount, inactiveCount] = await Promise.all([
    prisma.product.count({ where: { isAvailable: true } }),
    prisma.product.count({ where: { isAvailable: true } }),
  ]);

  return { activeCount, inactiveCount };
};

const AdminDashboard = async () => {
  const [salesData, userData, productData] = await Promise.all([
    getSalesData(),
    getUserData(),
    getProductData(),
  ]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <DashboardCard
        title="Sales"
        subtitle={`${formatNumber(salesData.numberOfSales)} Orders`}
        body={formatCurrency(salesData.amount)}
      />
      <DashboardCard
        title="Customers"
        subtitle={`${formatCurrency(
          userData.averageValuePerUser,
        )} Average Value`}
        body={formatNumber(userData.userCount)}
      />
      <DashboardCard
        title="Active Products"
        subtitle={`${formatNumber(productData.inactiveCount)} Inactive`}
        body={formatNumber(productData.activeCount)}
      />
    </div>
  );
};

export default AdminDashboard;
