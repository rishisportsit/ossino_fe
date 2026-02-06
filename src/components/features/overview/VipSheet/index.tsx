import { useEffect, useMemo } from 'react';

import { useAppDispatch, useAppSelector } from 'store/index';
import { closeDialog, DIALOG_TYPE, openDialog } from 'store/dialog/slice';
import {
  getVipGames,
  getVipDetails,
  selectVipGamesAreFresh,
  type VipDetailsData,
} from 'store/vip/slice';

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetTitle,
} from 'components/shared/ui/Sheet';
import ArrowRight2Icon from 'assets/icons/ArrowRight2';
import VipEditForm from 'components/features/vip/VipEditForm';
import VipDetailsEnhanced from 'components/features/vip/VipDetailsEnhanced';
import VipEarningHistoryContent from 'components/shared/VipEarningHistoryContent';
import PageHeaderBalance from 'components/shared/PageHeaderBalance';

export enum VipSheetView {
  Edit = 'edit',
  Details = 'details',
  New = 'new',
  History = 'history',
}

const getDefaultValues = (data: VipDetailsData) => {
  const { overview, ...other } = data;
  return {
    ...other,
    games: other.games.map((id) => id.toString()),
  };
};

const DetailsView = ({
  onViewChange,
}: {
  onViewChange: (view: VipSheetView) => void;
}) => {
  const dispatch = useAppDispatch();
  const data = useAppSelector((state) => state.vip.details.data);
  const games = useAppSelector((state) => state.vip.games.data);
  const gamesLoading = useAppSelector((state) => state.vip.games.loading);
  const userData = useAppSelector((state) => state.user.data);
  const affiliateData = useAppSelector((state) => state.vip.affiliate.data);
  const vipGamesAreFresh = useAppSelector(selectVipGamesAreFresh);

  useEffect(() => {
    if (
      userData?.id &&
      affiliateData?.btag &&
      !vipGamesAreFresh &&
      !gamesLoading
    ) {
      dispatch(
        getVipGames({
          userId: userData.id.toString(),
          affiliateId: affiliateData.btag,
        }),
      );
    }
    if (!data) {
      dispatch(getVipDetails());
    }
  }, [
    dispatch,
    userData?.id,
    affiliateData?.btag,
    vipGamesAreFresh,
    gamesLoading,
    data,
  ]);

  if (gamesLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-1"></div>
        <span className="ml-3 body-txtColor-1">Loading VIP data...</span>
      </div>
    );
  }

  return (
    <VipDetailsEnhanced
      data={data}
      games={games || []}
      onViewChange={onViewChange}
    />
  );
};

const EditView = () => {
  const data = useAppSelector((state) => state.vip.details.data);
  return data ? <VipEditForm defaultValues={getDefaultValues(data)} /> : null;
};

const NewView = () => {
  return <VipEditForm defaultValues={{ name: '', url: '', games: [] }} isNew />;
};

const VipSheet = () => {
  const dispatch = useAppDispatch();
  const open = useAppSelector((state) => state.dialog.vipPage.open);
  const data = useAppSelector((state) => state.dialog.vipPage.data);

  const currentView = useMemo(() => {
    switch (data?.view) {
      case VipSheetView.Details:
        return (
          <DetailsView
            onViewChange={(view: VipSheetView) =>
              dispatch(openDialog({ id: DIALOG_TYPE.vipPage, data: { view } }))
            }
          />
        );
      case VipSheetView.Edit:
        return <EditView />;
      case VipSheetView.New:
        return <NewView />;
      case VipSheetView.History:
        return <VipEarningHistoryContent />;
      default:
        return null;
    }
  }, [data?.view, dispatch]);

  const onChangeStatus = (open: boolean) => {
    if (open) {
      dispatch(openDialog({ id: DIALOG_TYPE.vipPage }));
    } else {
      dispatch(closeDialog({ id: DIALOG_TYPE.vipPage }));
    }
  };

  return (
    <Sheet open={open} onOpenChange={onChangeStatus}>
      <SheetContent className="z-[999] !max-w-[600px] w-full">
        <SheetTitle className="hidden" />
        <SheetDescription className="hidden" />
        <div className="mb-5 flex justify-between items-center gap-2">
          <div className="flex items-center gap-2">
            <SheetClose className="w-8 h-8 border border-base-700 rounded-lg flex items-center justify-center">
              <span className="sr-only">Close</span>
              <ArrowRight2Icon />
            </SheetClose>
            <div className="bg-base-800 px-2 md:px-4 h-8 flex items-center justify-center rounded-lg min-w-0">
              <span className="font-medium text-primary-2 text-sm truncate max-w-[100px] md:max-w-none md:overflow-visible md:whitespace-normal block">
                {data?.view === VipSheetView.History
                  ? 'Earning History'
                  : 'Vip Page'}
              </span>
            </div>
          </div>
          <PageHeaderBalance />
        </div>
        {currentView}
      </SheetContent>
    </Sheet>
  );
};

export default VipSheet;
