'use client';
import { useTransition } from 'react';
import { DropdownMenuItem } from '@/components/ui/dropdown-menu';
import {
  toggleProductAvailability,
  deleteProduct,
} from '../../_actions/products';

export const ActiveToggleDropdownItem = ({
  id,
  isAvailable,
}: {
  id: string;
  isAvailable: boolean;
}) => {
  const [isPending, startTransition] = useTransition();

  return (
    <DropdownMenuItem
      disabled={isPending}
      onClick={() => {
        startTransition(async () => {
          await toggleProductAvailability(id, !isAvailable);
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

  return (
    <DropdownMenuItem
      disabled={disabled || isPending}
      onClick={() => {
        startTransition(async () => {
          await deleteProduct(id);
        });
      }}
    >
      Delete
    </DropdownMenuItem>
  );
};
