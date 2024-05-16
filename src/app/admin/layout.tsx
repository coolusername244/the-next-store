import React from 'react';
import { Nav, NavLink } from '@/components/Nav';

// remove all caching for admin pages so data is always up to date
export const dynamic = 'force-dynamic';

const AdminLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <>
      <Nav>
        <NavLink href={'/admin'}>Dashboard</NavLink>
        <NavLink href={'/admin/products'}>Products</NavLink>
        <NavLink href={'/admin/users'}>Customers</NavLink>
        <NavLink href={'/admin/orders'}>Sales</NavLink>
      </Nav>
      <div className="container my-6">{children}</div>
    </>
  );
};

export default AdminLayout;
