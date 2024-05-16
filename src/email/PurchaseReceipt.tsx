import React from 'react';
import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Tailwind,
  Text,
} from '@react-email/components';
import OrderInformation from './components/OrderInformation';

type PurchaseReceiptEmailProps = {
  product: {
    name: string;
    imagePath: string;
    description: string;
  };
  order: {
    id: string;
    createdAt: Date;
    pricePaidInCents: number;
  };
  downloadVerificationId: string;
};

const PurchaseReceiptEmail = ({
  product,
  order,
  downloadVerificationId,
}: PurchaseReceiptEmailProps) => {
  return (
    <Html>
      <Preview>Download {product.name} and view receipt</Preview>
      <Tailwind>
        <Head />
        <Body className="font-sans bg-white text-black">
          <Container className="max-w-xl">
            <Text className="text-4xl font-bold">Purchase Receipt</Text>
            <OrderInformation
              order={order}
              product={product}
              downloadVerificationId={downloadVerificationId}
            />
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

PurchaseReceiptEmail.PreviewProps = {
  product: {
    name: 'Product Name',
    description: 'Product Description',
    imagePath: '/products/3fcc062d-c4aa-4e7b-852e-bbff55c96dff-coffee-7.jpg',
  },
  order: {
    id: crypto.randomUUID(),
    createdAt: new Date(),
    pricePaidInCents: 1000,
  },
  downloadVerificationId: crypto.randomUUID(),
} satisfies PurchaseReceiptEmailProps;

export default PurchaseReceiptEmail;
