import { closeDialog, DIALOG_TYPE } from 'store/dialog/slice';
import { useAppDispatch, useAppSelector } from 'store/index';

import Icon from 'components/shared/Icon';
import { Button } from 'components/shared/ui/Button';
import { Dialog, DialogContent, DialogTitle } from 'components/shared/ui/Dialog';
import crown from '/icons/crown2.svg?url';
import copy from '/icons/copy.svg?url';

const DialogVipPage = () => {
  const dispatch = useAppDispatch();
  const open = useAppSelector((state) => state.dialog.vipPageCreated.open);
  const url = useAppSelector((state) => state.dialog.vipPageCreated.data?.url);

  const onClose = () => {
    dispatch(closeDialog({ id: DIALOG_TYPE.vipPageCreated }));
  };

  const onCopy = () => {
    if (url) {
      navigator.clipboard.writeText(url);
    }
  };

  return (
    <Dialog open={open && !!url} onOpenChange={onClose}>
      <DialogContent className="max-w-80 p-10 md:max-w-[400px] md:p-8">
        <DialogTitle className="hidden" />
        <div className="flex flex-col items-center">
          <div className="relative max-w-56 w-full aspect-square flex justify-center items-center mb-8">
            <img
              src="/images/success-gif.gif"
              className="w-full h-full absolute"
              alt=""
            />
            <div className="w-24 h-24 bg-base-700 flex items-center justify-center rounded-full z-10">
              <Icon
                id="crown2Icon"
                href={crown}
                className="h-10 w-10 fill-current body-txtColor-1"
              />
            </div>
          </div>
          <p className="text-xl font-bold body-txtColor-1 text-center mb-2">
            Congratulations!
          </p>
          <p className="text-center text-base-200 mb-11">
            You&apos;ve created your own VIP Page. Share link with friend to
            start earning.
          </p>
          <div
            className="px-3 rounded-lg border border-1 mb-3 flex justify-between items-center cursor-pointer w-full h-10 text-sm"
            onClick={onCopy}
          >
            <span className="text-base-100 text-sm">{url}</span>
            <Icon id="copyIcon" href={copy} className="h-4 w-4 fill-1" />
          </div>
          <Button variant="filled" onClick={onClose} className="w-full">
            Share Link
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DialogVipPage;
