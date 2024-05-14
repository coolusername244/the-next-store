import React from 'react';
import { Nav, NavLink } from '@/components/Nav';

// remove all caching for admin pages so data is always up to date
export const dynamic = 'force-dynamic';

const Layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <>
      <Nav>
        <NavLink href={'/'}>Home</NavLink>
        <NavLink href={'/products'}>Products</NavLink>
        <NavLink href={'/users'}>My Orders</NavLink>
      </Nav>
      <div className="container my-6">{children}</div>
    </>
  );
};

export default Layout;
