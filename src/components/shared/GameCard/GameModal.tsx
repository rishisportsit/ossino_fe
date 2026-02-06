import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from 'components/shared/ui/Dialog';
import { cn } from 'helpers/ui';
import Icon from 'components/shared/Icon';
import bookmark from '/icons/bookmark.svg?url';
import { Button } from 'components/shared/ui/Button';
import FavoritesWager from 'components/shared/FavoritesWager';
import { useAppDispatch } from 'store/index';
import { refreshUserData } from 'store/user/slice';

interface GameModalProps {
  open: boolean;
  onClose: () => void;
  className?: string;
}

const GameModal = ({ onClose, open, className }: GameModalProps) => {
  const dispatch = useAppDispatch();

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className={cn('max-w-[366px]', className)}>
        <DialogHeader>
          <div className="mb-8 w-24 h-24 rounded-full bg-background-1/20 flex items-center justify-center mx-auto">
            <Icon id="bookmarkIcon" href={bookmark} className="w-10 h-10 text-primary-1 fill-current" />
          </div>
          <DialogTitle className="mb-2">This feature is locked</DialogTitle>
          <DialogDescription>Reach the $500 on your balance to unlock favourites</DialogDescription>
        </DialogHeader>
        <FavoritesWager />
        <Button onClick={() => {
          // just increment user balance to check render logic
          dispatch(refreshUserData({ pointsBalance: 500 }))
          onClose()
        }}
        >
          Deposit Now
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default GameModal;