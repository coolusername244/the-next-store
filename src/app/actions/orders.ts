'use server';
import prisma from '@/db/db';

export const userOrderExists = async (email: string, productId: string) => {
  return (
    (await prisma.order.findFirst({
      where: { user: { email }, productId },
      select: { id: true },
    })) != null
  );
};
