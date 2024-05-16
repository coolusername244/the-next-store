'use client';
import { emailOrderHistory } from '@/actions/order';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Divide } from 'lucide-react';
import React from 'react';
import { useFormState, useFormStatus } from 'react-dom';

const SubmitButton = () => {
  const { pending } = useFormStatus();

  return (
    <Button className="w-full" size={'lg'} disabled={pending} type="submit">
      {pending ? 'Sending...' : 'Send'}
    </Button>
  );
};

const MyOrdersPage = () => {
  const [data, action] = useFormState(emailOrderHistory, {});

  return (
    <form action={action} className="max-w-xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>My Orders</CardTitle>
          <CardDescription>
            Enter your email and we will email you your order history and
            download links
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input type="email" id="email" name="email" required />
            {data.error && <div className="text-destructive">{data.error}</div>}
          </div>
        </CardContent>
        <CardFooter>
          {data.message ? (
            <p className="text-center">{data.message}</p>
          ) : (
            <SubmitButton />
          )}
        </CardFooter>
      </Card>
    </form>
  );
};

export default MyOrdersPage;
