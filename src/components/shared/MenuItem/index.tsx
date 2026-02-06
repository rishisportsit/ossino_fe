import { Link } from 'react-router-dom';
import Icon from 'components/shared/Icon';
import type { Icon as IconType } from 'components/shared/MenuItem/menuItems';
import { type DIALOG_TYPE } from 'store/dialog/slice';
import { useDialog } from 'helpers/hooks';
import { cn } from 'helpers/ui';
import { replaceString } from 'helpers/common';
import styles from './styles.module.css';

interface IMenuItem {
  icon?: IconType | null;
  label: string;
  count?: number;
  background?: boolean;
  selected: boolean;
  isOpen?: boolean;
  onClick?: (itemId: number | string) => void;
  href?: string;
  id: number | string;
  withBorder?: boolean;
  dialogId?: keyof typeof DIALOG_TYPE;
  hideIconWhenExpanded?: boolean;
  data?: NonNullable<unknown>;
}

const isIconWithHref = (
  icon: IconType,
): icon is { id: string; href: string } => {
  return 'href' in icon && 'id' in icon;
};

const isIconComponent = (
  icon: IconType,
): icon is { component: (props: any) => JSX.Element } => {
  return 'component' in icon;
};

const MenuItem = ({
  icon,
  label,
  count,
  selected,
  background,
  isOpen,
  onClick,
  href,
  id,
  withBorder,
  dialogId,
  hideIconWhenExpanded,
  data,
}: IMenuItem) => {
  const { openDialog } = useDialog();

  const onClickHandler = () => {
    if (onClick) {
      onClick(id);
    }

    if (dialogId) {
      openDialog(dialogId, data);
    }
  };

  const renderIcon = () => {
    if (!icon) return null;

    if (isIconWithHref(icon)) {
      return (
        <Icon
          id={icon.id}
          href={icon.href}
          className={cn(
            'w-5 h-5 fill-1',
            { 'fill-current body-txtColor-2': selected && !withBorder },
            { 'fill-secondary-2': withBorder },
          )}
        />
      );
    }

    if (isIconComponent(icon)) {
      const IconComponent = icon.component;
      return (
        <IconComponent
          className={cn(
            'w-5 h-5 fill-1',
            { 'fill-current body-txtColor-2': selected && !withBorder },
            { 'fill-secondary-2': withBorder },
          )}
        />
      );
    }

    return null;
  };

  return (
    <button
      title={label}
      type="button"
      className={cn(
        'flex items-center justify-items-center body-txtColor-1',
        { 'rounded-xl bg-secondary-light-2': selected },
        { 'rounded-xl bg-base-750 body-txtColor-1 ': background },
        { 'border border-secondary-light-2 body-txtColor-1': selected && withBorder },
        { [styles.open]: isOpen },
        styles.button,
      )}
    >
      <Link
        to={href || ''}
        className={cn('w-full flex items-center', { '': selected })}
        onClick={() => {
          onClickHandler();
        }}
      >
        <span
          className={cn('w-10 h-10 shrink-0 flex items-center justify-center', {
            invisible: hideIconWhenExpanded && isOpen,
          })}
        >
          {renderIcon()}
        </span>
        <span
          className={cn(
            'text-nowrap text-xs capitalize',
            { 'body-txtColor-2': selected },
            { 'body-txtColor-1': selected && withBorder },
            { [styles.labelOpen]: isOpen },
            { '-ml-6': hideIconWhenExpanded && isOpen },
            styles.label,
          )}
        >
          {replaceString(label, /-/g, ' ')}
        </span>
      </Link>

      {!!count && isOpen && (
        <div className="flex items-center justify-center px-1 h-5 mr-2.5 bg-base-700 text-secondary-light-3 rounded-[100px] text-xs font-medium">
          <span className={cn('text-secondary-2', { [styles.open]: isOpen })}>
            +{count}
          </span>
        </div>
      )}
    </button>
  );
};

export default MenuItem;
