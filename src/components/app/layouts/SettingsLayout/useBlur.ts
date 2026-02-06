import { useEffect, useRef, useState } from 'react';

export const useBlur = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [showLeftBlur, setShowLeftBlur] = useState(false);
  const [showRightBlur, setShowRightBlur] = useState(true);
  const lastScrollLeft = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const container = containerRef.current;
      if (!container) return;

      const { scrollLeft } = container;
      const maxScrollLeft = container.scrollWidth - container.clientWidth;

      const isScrollingRight = scrollLeft > lastScrollLeft.current;
      const isScrollingLeft = scrollLeft < lastScrollLeft.current;

      lastScrollLeft.current = scrollLeft;

      if (isScrollingRight && scrollLeft > 0) {
        setShowLeftBlur(true);
        setShowRightBlur(false);
      }

      if (isScrollingLeft && scrollLeft < maxScrollLeft) {
        setShowRightBlur(true);
        setShowLeftBlur(false);
      }

      if (scrollLeft === 0) {
        setShowLeftBlur(false);
      } else if (scrollLeft === maxScrollLeft) {
        setShowRightBlur(false);
      }
    };

    const container = containerRef.current;
    container?.addEventListener('scroll', handleScroll);

    handleScroll();

    return () => {
      if (container) container.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return { showLeftBlur, showRightBlur, containerRef };
};
