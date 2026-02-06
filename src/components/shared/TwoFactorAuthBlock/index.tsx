import { Button } from "components/shared/ui/Button"
import { useDialog } from "helpers/hooks"
import { cn } from "helpers/ui"
import { useNavigate } from "react-router-dom"
import { DIALOG_TYPE } from "store/dialog/slice"

type TwoFactorAuthBlockProps = {
  border?: boolean
}

const TwoFactorAuthBlock = ({ border }: TwoFactorAuthBlockProps) => {
  const navigate = useNavigate();
  const { closeDialog } = useDialog();
  // when Settings page will be ready, it should redirect user to Settings/Security tab

  const handleClick = () => {
    navigate('/settings/security');
    closeDialog(DIALOG_TYPE.wallet);
  }

  return (
    <div className={cn("w-full flex flex-col gap-3", 
      { "border border-base-700 rounded-xl p-4": border })}
    >
      <p className="text-xs leading-4 text-center">Improve your security with Two-Factor <br/> Authentication</p>
      <Button className="w-full text-xs leading-4 text-accent-3" variant='outline' onClick={handleClick}>Enable 2FA</Button>
    </div>
  )
}

export default TwoFactorAuthBlock