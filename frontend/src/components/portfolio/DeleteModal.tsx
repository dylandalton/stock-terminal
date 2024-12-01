import { Trash2 } from 'lucide-react'
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { deleteHoldingAsync } from '@/state/slices/userSlice';
import { useAppDispatch } from '@/lib/hooks/hooks';

interface DeleteModalProps {
  isOpen: boolean;
  symbol: string | undefined;
  userId?: string;
  onRemove: () => void;
}

export default function DeleteModal({ isOpen, symbol, userId, onRemove }: DeleteModalProps) {
  const dispatch = useAppDispatch();

  const handleRemove = () => {
    if(userId){
      if(!symbol){
        console.error('Stock symbol is undefined. Cannot remove investment.');
        return;
      }
      dispatch(deleteHoldingAsync({ userId, symbol }));
      onRemove();
    } else {
      console.error('User ID is undefined. Cannot remove investment.');
      return;
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onRemove}>
      <DialogTrigger asChild>
        <Button variant="destructive">Remove {symbol}</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Are you sure you want to remove this investment?</DialogTitle>
        </DialogHeader>
        <div className="flex justify-end mt-4">
          <Button variant="destructive" onClick={handleRemove}>
            <Trash2 className="mr-2 h-4 w-4" />
            Remove
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

