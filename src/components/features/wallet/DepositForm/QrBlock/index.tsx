/* eslint-disable jsx-a11y/anchor-is-valid */
import { useDialog } from 'helpers/hooks';
import { QRCodeSVG } from 'qrcode.react';
import { Link, useNavigate } from "react-router-dom";
import { DIALOG_TYPE } from 'store/dialog/slice';
// import TwoFactorAuthBlock from "../../../../shared/TwoFactorAuthBlock";

type QrBlockProps = {
  walletNumber: string;
}

const QrBlock = ({ walletNumber }: QrBlockProps) => {
  const navigate = useNavigate();
  const { closeDialog } = useDialog();

  const handleHistoryClick = (e: React.MouseEvent) => {
    e.preventDefault();
    closeDialog(DIALOG_TYPE.wallet);
    navigate('/transactions');
  }

  return (
    <div className="p-4 h-[390px] flex flex-col gap-8 items-center justify-center pt-[38px] border border-base-700 rounded-xl">
      <div className="flex flex-col gap-2 items-center">
        <QRCodeSVG value={walletNumber} size={174} bgColor='var(--qr-bg)' fgColor='var(--qr-fg)' level='H' />
        <Link to='/transactions'>
          <button type='button' onClick={handleHistoryClick}>
            <p className="text-sm leading-[18px] font-medium text-primary-2">
              Deposit History
            </p>
          </button>
        </Link>
      </div>
      {/* <TwoFactorAuthBlock /> */}
    </div>
  )
}

export default QrBlock