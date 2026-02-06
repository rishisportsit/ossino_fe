import { Dialog, DialogContent } from 'components/shared/ui/Dialog';
import { setSelectedGameUrl } from 'store/games/slice';
import { useAppDispatch, useAppSelector } from 'store/index';

const GameDialog = () => {
  const dispatch = useAppDispatch();
  const selectedGameUrl = useAppSelector(
    (state) => state.games.selectedGameUrl,
  );

  return (
    <Dialog
      open={!!selectedGameUrl}
      onOpenChange={() => dispatch(setSelectedGameUrl({ url: null }))}
    >
      <DialogContent className="!rounded-none w-full max-w-full h-full max-h-full !p-0 !pt-10">
        {selectedGameUrl ? (
          <iframe
            title="game"
            className="w-full h-full"
            src={selectedGameUrl}
          />
        ) : null}
      </DialogContent>
    </Dialog>
  );
};

export default GameDialog;
