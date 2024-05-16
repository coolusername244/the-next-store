'use server';
import { z } from 'zod';
import prisma from '@/db/db';
import { Resend } from 'resend';
import OrderHistoryEmail from '@/email/OrderHistory';

const emailSchema = z.string().email();
const resend = new Resend(process.env.RESEND_API_KEY as string);

export const emailOrderHistory = async (
  prevState: unknown,
  formData: FormData,
): Promise<{ message?: string; error?: string }> => {
  const result = emailSchema.safeParse(formData.get('email') as string);

  if (result.success === false) {
    return { error: 'Invalid email' };
  }

  const user = await prisma.user.findUnique({
    where: { email: result.data },
    select: {
      email: true,
      orders: {
        select: {
          pricePaidInCents: true,
          id: true,
          createdAt: true,
          product: {
            select: {
              id: true,
              name: true,
              description: true,
              imagePath: true,
            },
          },
        },
      },
    },
  });

  if (user == null) {
    return {
      message:
        'Check your email to view your order history and download your products',
    };
  }

  const orders = user.orders.map(async order => {
    return {
      ...order,
      downloadVerificationId: (
        await prisma.downloadVerification.create({
          data: {
            productId: order.product.id,
            expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24),
          },
        })
      ).id,
    };
  });

  const data = await resend.emails.send({
    from: `support <${process.env.SENDER_EMAIL}>`,
    to: user.email,
    subject: 'Order History',
    react: <OrderHistoryEmail orders={await Promise.all(orders)} />,
  });

  if (data.error) {
    return { error: 'Failed to send email' };
  }

  return {
    message:
      'Check your email to view your order history and download your products',
  };
};
