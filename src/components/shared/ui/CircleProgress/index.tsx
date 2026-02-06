import { type PropsWithChildren, useMemo } from 'react';

import { cn } from 'helpers/ui';

const VIEWBOX_HEIGHT_HALF = 50;
const VIEWBOX_CENTER_X = 50;
const VIEWBOX_CENTER_Y = 50;

type CircleProgressProps = {
  value: number;
  minValue: number;
  maxValue: number;
  strokeWidth?: number;
  mainClassName?: string;
  bgClassName?: string;
  secondaryClassName?: string;
};

type PathProps = {
  className: string | undefined;
  dashRatio: number;
  pathRadius: number;
  strokeWidth: number;
};

const Path = ({ className, dashRatio, pathRadius, strokeWidth }: PathProps) => {
  const getPathDescription = (pathRadius: number) => {
    return `
          M ${VIEWBOX_CENTER_X},${VIEWBOX_CENTER_Y}
          m 0,-${pathRadius}
          a ${pathRadius},${pathRadius} 1 1 1 0,${2 * pathRadius}
          a ${pathRadius},${pathRadius} 1 1 1 0,-${2 * pathRadius}
        `;
  };

  const getDashStyle = ({
    dashRatio,
    pathRadius,
  }: {
    dashRatio: number;
    pathRadius: number;
  }) => {
    const diameter = Math.PI * 2 * pathRadius;
    const gapLength = (1 - dashRatio) * diameter;

    return {
      strokeDasharray: `${diameter}px ${diameter}px`,
      strokeDashoffset: `${-gapLength}px`,
    };
  };

  return (
    <path
      className={className}
      style={getDashStyle({ pathRadius, dashRatio })}
      d={getPathDescription(pathRadius)}
      strokeWidth={strokeWidth}
      fillOpacity={0}
      strokeLinecap="round"
    />
  );
};

const CircleProgress = ({
  children,
  value,
  minValue,
  maxValue,
  strokeWidth = 8,
  mainClassName = '',
  secondaryClassName = '',
  bgClassName = '',
}: PropsWithChildren<CircleProgressProps>) => {
  const pathRatio = useMemo(() => {
    const boundedValue = Math.min(Math.max(value, minValue), maxValue);
    return (boundedValue - minValue) / (maxValue - minValue);
  }, [maxValue, minValue, value]);

  const pathRadius = VIEWBOX_HEIGHT_HALF - strokeWidth / 2;

  return (
    <div className="relative w-full h-full">
      <svg
        className="w-full align-middle relative overflow-visible"
        viewBox="0 0 100 100"
      >
        <Path
          className={cn('opacity-5 stroke-base-700', bgClassName)}
          dashRatio={1}
          pathRadius={pathRadius}
          strokeWidth={strokeWidth}
        />

        <Path
          className={cn(
            'stroke-primary-1 stroke-linecap-round origin-center -scale-x-100',
            mainClassName,
          )}
          dashRatio={pathRatio}
          pathRadius={pathRadius}
          strokeWidth={strokeWidth}
        />
        <Path
          className={cn(
            'stroke-primary-1 stroke-linecap-round origin-center -scale-x-100 blur-[2px]',
            secondaryClassName,
          )}
          dashRatio={pathRatio}
          pathRadius={pathRadius}
          strokeWidth={strokeWidth}
        />
      </svg>
      <div className="absolute w-full h-full -mt-[100%] flex flex-col justify-center items-center">
        {children}
      </div>
    </div>
  );
};

export default CircleProgress;
