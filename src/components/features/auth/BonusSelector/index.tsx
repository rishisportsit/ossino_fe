import { useState, useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from 'store/index';
import { getQuickLinks } from 'store/footer/slice';
import { selectQuickLinks } from 'store/footer/selectors';
import { useDialog } from 'helpers/hooks';
import { DIALOG_TYPE } from 'store/dialog/slice';
import BonusesList from '../BonusesList';
import SelectBonusButton from '../SelectBonusButton';

type BonusSelectorProps = {
  onDialogClose: () => void;
  onPolicyOpened?: () => void;
  useNewBonusSystem?: boolean;
};

const BonusSelector = ({
  onDialogClose,
  onPolicyOpened,
  useNewBonusSystem = true,
}: BonusSelectorProps) => {
  const { getValues } = useFormContext();
  const dispatch = useAppDispatch();
  const quickLinks = useAppSelector(selectQuickLinks);
  const { openDialog } = useDialog();

  const [selectedBonusId, setSelectedBonusId] = useState(
    getValues('promocode') || (useNewBonusSystem ? 'none' : ''),
  );

  useEffect(() => {
    dispatch(getQuickLinks());
  }, [dispatch]);

  const sportsLink = quickLinks.find((link) =>
    link.link_name?.toLowerCase().includes('sports bonus'),
  );
  const casinoLink = quickLinks.find((link) =>
    link.link_name?.toLowerCase().includes('casino bonus'),
  );

  const handleLinkClick = (e: React.MouseEvent, link: any) => {
    e.preventDefault();

    if (link.is_content && link.is_content.trim() !== '') {
      if (onPolicyOpened) {
        onPolicyOpened();
      } else {
        onDialogClose();
      }

      openDialog(DIALOG_TYPE.footerContent, {
        title: link.link_name,
        content: link.is_content,
        link: link.menu_link,
        isNewWindow: link.is_newwindow === 'Yes',
      });
    } else if (link.menu_link) {
      if (link.is_newwindow === 'Yes') {
        window.open(link.menu_link, '_blank', 'noopener noreferrer');
      } else {
        window.location.href = link.menu_link;
      }
    }
  };

  return (
    <>
      <BonusesList
        selectedBonusId={selectedBonusId}
        setSelectedBonusId={setSelectedBonusId}
        useNewBonuses={useNewBonusSystem}
      />
      <div>
        <p className="text-xs leading-4 font-regular text-base-200 mb-3 max-w-[250px] lg:max-w-[300px]">
          By choosing a bonus, you confirm that you have read and accept the
          policy of{' '}
          {sportsLink ? (
            <button
              onClick={(e) => handleLinkClick(e, sportsLink)}
              className="font-medium underline hover:body-txtColor-1 transition-colors cursor-pointer"
            >
              {sportsLink.link_name}
            </button>
          ) : (
            <span className="font-medium underline">Sports Bonus</span>
          )}{' '}
          and{' '}
          {casinoLink ? (
            <button
              onClick={(e) => handleLinkClick(e, casinoLink)}
              className="font-medium underline hover:body-txtColor-1 transition-colors cursor-pointer"
            >
              {casinoLink.link_name}
            </button>
          ) : (
            <span className="font-medium underline">Casino Bonus</span>
          )}
        </p>
        <SelectBonusButton
          onDialogClose={onDialogClose}
          selectedBonusId={selectedBonusId}
        />
      </div>
    </>
  );
};

export default BonusSelector;
