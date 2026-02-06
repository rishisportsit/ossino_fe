import {
  type ComponentPropsWithoutRef,
  type ElementRef,
  forwardRef,
} from 'react';
import * as SliderPrimitive from '@radix-ui/react-slider';
import { cn } from 'helpers/ui';

const SliderRoot = forwardRef<
  ElementRef<typeof SliderPrimitive.Root>,
  ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, ...props }, ref) => {
  return (
    <SliderPrimitive.Root
      ref={ref}
      className={cn(
        'relative flex h-5 w-full touch-none select-none items-center',
        className,
      )}
      {...props}
    />
  );
});

SliderRoot.displayName = SliderPrimitive.Root.displayName;

const SliderTrack = forwardRef<
  ElementRef<typeof SliderPrimitive.Track>,
  ComponentPropsWithoutRef<typeof SliderPrimitive.Track>
>(({ className, ...props }, ref) => {
  return (
    <SliderPrimitive.Track
      ref={ref}
      className={cn('relative h-2 grow rounded-full bg-base-600', className)}
      {...props}
    />
  );
});

SliderTrack.displayName = SliderPrimitive.Track.displayName;

const SliderRange = forwardRef<
  ElementRef<typeof SliderPrimitive.Range>,
  ComponentPropsWithoutRef<typeof SliderPrimitive.Range>
>(({ className, ...props }, ref) => {
  return (
    <SliderPrimitive.Range
      ref={ref}
      className={cn('absolute h-full rounded-full bg-accent-2', className)}
      {...props}
    />
  );
});

SliderRange.displayName = SliderPrimitive.Range.displayName;

const SliderThumb = forwardRef<
  ElementRef<typeof SliderPrimitive.Thumb>,
  ComponentPropsWithoutRef<typeof SliderPrimitive.Thumb>
>(({ className, ...props }, ref) => {
  return (
    <SliderPrimitive.Thumb
      ref={ref}
      className={cn('block size-[18px] rounded-full background-1', className)}
      aria-label="Volume"
      {...props}
    />
  );
});

SliderThumb.displayName = SliderPrimitive.Thumb.displayName;

export { SliderRoot, SliderTrack, SliderRange, SliderThumb };
