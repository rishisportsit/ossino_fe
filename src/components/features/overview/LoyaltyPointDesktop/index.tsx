import { useEffect, useState } from 'react';
import type { LoyaltyPoint } from 'store/loyaltyPoints/slice';

const LoyaltyPointDesktop = ({
  icon,
  title,
  points,
}: Omit<LoyaltyPoint, 'id'>) => {
  const [svgContent, setSvgContent] = useState<string>('');

  useEffect(() => {
    fetch(icon.href)
      .then(response => response.text())
      .then(svg => setSvgContent(svg))
      .catch(console.error);
  }, [icon.href]);

  return (
    <div className="bg-base-735 rounded-xl py-2 flex flex-col justify-center items-center w-full h-full">
      <div 
        className="w-6 h-6 mb-[5px] [&_svg]:w-full [&_svg]:h-full [&_path]:fill-secondary-2 [&_circle]:fill-secondary-2 [&_rect]:fill-secondary-2"
        dangerouslySetInnerHTML={{ __html: svgContent }}
      />
      
      <h4 className="text-xs leading-none mb-[3px]">{title}</h4>
      <p className="text-sm leading-5 text-primary-1">{points}</p>
    </div>
  );
};

export default LoyaltyPointDesktop;
