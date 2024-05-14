'use client';
import { useTransition } from 'react';
import { DropdownMenuItem } from '@/components/ui/dropdown-menu';
import {
  toggleProductAvailability,
  deleteProduct,
} from '../../_actions/products';
import { useRouter } from 'next/navigation';

export const ActiveToggleDropdownItem = ({
  id,
  isAvailable,
}: {
  id: string;
  isAvailable: boolean;
}) => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  return (
    <DropdownMenuItem
      disabled={isPending}
      onClick={() => {
        startTransition(async () => {
          await toggleProductAvailability(id, !isAvailable);
          router.refresh();
        });
      }}
    >
      {isPending ? 'Toggling...' : isAvailable ? 'Deactivate' : 'Activate'}
    </DropdownMenuItem>
  );
};

export const DeleteDropdownItem = ({
  id,
  disabled,
}: {
  id: string;
  disabled: boolean;
}) => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  return (
    <DropdownMenuItem
      variant="destructive"
      disabled={disabled || isPending}
      onClick={() => {
        startTransition(async () => {
          await deleteProduct(id);
          router.refresh();
        });
      }}
    >
      Delete
    </DropdownMenuItem>
  );
};
