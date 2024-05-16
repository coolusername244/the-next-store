import React from 'react';
import {
  Body,
  Container,
  Head,
  Hr,
  Html,
  Preview,
  Tailwind,
  Text,
} from '@react-email/components';
import OrderInformation from './components/OrderInformation';

type OrderHistoryEmailProps = {
  orders: {
    id: string;
    createdAt: Date;
    pricePaidInCents: number;
    downloadVerificationId: string;
    product: {
      name: string;
      imagePath: string;
      description: string;
    };
  }[];
};

const OrderHistoryEmail = ({ orders }: OrderHistoryEmailProps) => {
  return (
    <Html>
      <Preview>Order history and downloads</Preview>
      <Tailwind>
        <Head />
        <Body className="font-sans bg-white text-black">
          <Container className="max-w-xl">
            <Text className="text-4xl font-bold">Order History</Text>
            {orders.map((order, index) => (
              <React.Fragment key={order.id}>
                <OrderInformation
                  key={order.id}
                  order={order}
                  product={order.product}
                  downloadVerificationId={order.downloadVerificationId}
                />
                {index < orders.length - 1 && <Hr />}
              </React.Fragment>
            ))}
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

OrderHistoryEmail.PreviewProps = {
  orders: [
    {
      id: crypto.randomUUID(),
      createdAt: new Date(),
      pricePaidInCents: 1000,
      downloadVerificationId: crypto.randomUUID(),
      product: {
        name: 'Product Name',
        description: 'Product Description',
        imagePath:
          '/products/3fcc062d-c4aa-4e7b-852e-bbff55c96dff-coffee-7.jpg',
      },
    },
    {
      id: crypto.randomUUID(),
      createdAt: new Date(),
      pricePaidInCents: 10500,
      downloadVerificationId: crypto.randomUUID(),
      product: {
        name: 'Product Name 2',
        description: 'Product 2 Description',
        imagePath:
          '/products/3fcc062d-c4aa-4e7b-852e-bbff55c96dff-coffee-7.jpg',
      },
    },
  ],
} satisfies OrderHistoryEmailProps;

export default OrderHistoryEmail;
