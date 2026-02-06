import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useDialog } from 'helpers/hooks';
import { DIALOG_TYPE } from 'store/dialog/slice';
import { LocalStorageHelper } from 'helpers/storage';

const RegisterRoute = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { openDialog } = useDialog();

  useEffect(() => {
    const refId = searchParams.get('refId');
    const afid = searchParams.get('afid');
    
    if (afid) {
      LocalStorageHelper.setItem('vip_affiliate_code', afid);
    }
    
    openDialog(DIALOG_TYPE.login, {
      tab: 'register',
      ...(refId ? { referalCode: refId } : {}),
      ...(afid ? { isVipAffiliate: true } : {}),
    });
    navigate('/', { replace: true });
  }, [searchParams, openDialog, navigate]);

  return null;
};

export default RegisterRoute;
