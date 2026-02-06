import { cn } from 'helpers/ui';
import { Button } from 'components/shared/ui/Button';
import styles from './index.module.css';

interface ReferProps {
  onInvite?: () => void;
}

const Refer = ({ onInvite }: ReferProps) => {
  return (
    <div className="rounded-xl backdrop-blur-[210px] p-4 pb-5 relative overflow-hidden bg-gradient-to-b from-[3%] from-gradient-secondary-dark-1 to-95% to-gradient-secondary-dark-2 w-full">
      <div className="relative z-10">
        <p className="font-black mb-0.5 body-txtColor-1">REFER A FRIEND</p>
        <p className="max-w-52 text-xs mb-2 body-txtColor-1">
          Get $50 for each friends after registration and first deposit.
        </p>
        <Button variant="filled" size="sm" onClick={onInvite}>
          Invite Friend
        </Button>
      </div>
      <img
        src="/images/hand-phone.png"
        alt=""
        className="w-[72px] absolute bottom-0 right-8 z-10"
      />
      <img
        src="/images/star-1.png"
        alt=""
        className="w-9 absolute top-1 right-[90px] z-10"
      />
      <img
        src="/images/star-2.png"
        alt=""
        className="w-4 absolute top-2 right-8 z-10"
      />
      <img
        src="/images/star-3.png"
        alt=""
        className="w-5 absolute top-24 right-3 z-10"
      />
      <div
        className={cn(
          'absolute w-24 h-20 top-[106px] -right-[70px] origin-center -rotate-[40deg] blur-[30px]',
          styles.background,
        )}
      />
      <div
        className={cn(
          'absolute w-[236px] h-[153px] -top-7 -right-[72px] origin-center rotate-[105deg] blur-[30px]',
          styles.background,
        )}
      />
      <div
        className={cn(
          'absolute w-[308px] h-[308px] -top-[70px] -right-[165px] origin-center rotate-[165deg] blur-[162px]',
          styles.background,
        )}
      />
      <div
        className={cn(
          'absolute w-[236px] h-[236px] -top-[26px] -right-[121px] origin-center rotate-[165deg] blur-[30px]',
          styles.background,
        )}
      />
    </div>
  );
};

export default Refer;
