import Icon from 'components/shared/Icon';
import { useOutsideClick } from 'helpers/hooks';
import { cn } from 'helpers/ui';
import { type ReactNode, useRef, useState, useLayoutEffect } from 'react';
import ReactDOM from 'react-dom';
import arrowDown from '/icons/arrowDown.svg?url';
import './Select.css';

const chevronMainStyle = 'w-[24px] h-[24px] flex justify-center items-center';
const chevronAdditionStyle =
  'xl:rounded-[6px] xl:w-[30px] xl:h-[30px] xl:bg-base-650';

interface DropDownSelectProps {
  children: ReactNode;
  additionalChild?: ReactNode;
  className?: string;
  dropDownClassName?: string;
  childrenClassName?: string;
  chevronClassName?: string;
  list?: ReactNode;
  withChevron?: boolean;
  closeOnClick?: boolean;
  usePortal?: boolean;
  maxHeightDisable?: boolean;
  dropdownWidthMode?: 'trigger' | 'viewport';
  viewportMargin?: number;
}

const Select = ({
  children,
  className,
  dropDownClassName,
  additionalChild,
  childrenClassName,
  chevronClassName,
  list,
  withChevron,
  closeOnClick,
  usePortal = false,
  maxHeightDisable = false,
  dropdownWidthMode = 'trigger',
  viewportMargin = 8,
}: DropDownSelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);
  const [dropdownPos, setDropdownPos] = useState({ top: 0, left: 0, width: 0 });

  const closeHandler = () => {
    setIsOpen(false);
  };

  const handleSelectClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (closeOnClick) setIsOpen(false);
  };

  useOutsideClick(selectRef, closeHandler);

  useLayoutEffect(() => {
    if (isOpen && usePortal && selectRef.current) {
      const rect = selectRef.current.getBoundingClientRect();

      if (dropdownWidthMode === 'viewport') {
        setDropdownPos({
          top: rect.bottom + window.scrollY,
          left: viewportMargin + window.scrollX,
          width: window.innerWidth - viewportMargin * 2,
        });
        return;
      }

      setDropdownPos({
        top: rect.bottom + window.scrollY,
        left: rect.left + window.scrollX,
        width: rect.width,
      });
    }
  }, [isOpen, usePortal, dropdownWidthMode, viewportMargin]);

  useLayoutEffect(() => {
    if (!isOpen || !usePortal) return;
    const update = () => {
      if (selectRef.current) {
        const rect = selectRef.current.getBoundingClientRect();

        if (dropdownWidthMode === 'viewport') {
          setDropdownPos({
            top: rect.bottom + window.scrollY,
            left: viewportMargin + window.scrollX,
            width: window.innerWidth - viewportMargin * 2,
          });
          return;
        }

        setDropdownPos({
          top: rect.bottom + window.scrollY,
          left: rect.left + window.scrollX,
          width: rect.width,
        });
      }
    };
    window.addEventListener("scroll", update, true);
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update, true);
      window.removeEventListener("resize", update);
    };
  }, [isOpen, usePortal, dropdownWidthMode, viewportMargin]);

  const dropdown = isOpen && usePortal
    ? ReactDOM.createPortal(
      <div
        onMouseDown={(e) => {
          e.stopPropagation();
        }}
        className={cn(
          `z-[90] mt-2 rounded-lg bg-base-700 shadow-lg min-w-28 max-w-[calc(100vw-16px)] max-h-60 overflow-y-auto dropdown-scroll ${maxHeightDisable ? "" : "max-h-60"}`,
          dropDownClassName,
        )}
        style={{
          position: 'absolute',
          top: dropdownPos.top,
          left: dropdownPos.left,
          width: dropdownPos.width,
        }}
      >
        {list}
      </div>,
      document.body
    )
    : null;

  return (
    <div
      ref={selectRef}
      className="relative cursor-pointer"
      onClick={() => {
        setIsOpen(!isOpen);
      }}
    >
      <div
        className={cn(
          'flex w-full h-full py-2.5 px-2 md:px-2 items-center justify-between rounded-lg bg-base-700 body-txtColor-1 xl:max-w-[21 zrepoiu325px]',
          className,
        )}
      >
        <div
          className={cn(
            'relative flex w-full items-center justify-center',
            { 'justify-between': withChevron },
            childrenClassName,
          )}
        >
          {children}
          {withChevron && (
            <span
              className={
                !additionalChild
                  ? cn(
                    chevronMainStyle,
                    chevronAdditionStyle,
                    chevronClassName
                  )
                  : chevronMainStyle
              }
            >
              <Icon
                id="arrowDownIcon"
                href={arrowDown}
                className={cn(
                  "w-4 h-4 shrink-0 transition-transform duration-300 body-txtColor-1 origin-center",
                  { "rotate-90": isOpen }
                )}
              />
            </span>
          )}

        </div>
        <span className="hidden xl:block">{additionalChild}</span>
      </div>

      {/* Normal dropdown */}
      {isOpen && !usePortal && (
        <div
          onClick={handleSelectClick}
          className={cn(
            `absolute right-0 top-full z-[90] mt-2 rounded-lg bg-base-700 shadow-lg min-w-28 max-w-[calc(100vw-16px)] overflow-y-auto dropdown-scroll ${maxHeightDisable ? "" : "max-h-60"} `,
            dropDownClassName,
          )}
          style={{ width: '100%' }}
        >
          {list}
        </div>
      )}
      {/* Portal dropdown */}
      {dropdown}
    </div>
  );
};

export default Select;
