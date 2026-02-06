import { Link } from 'react-router-dom';

const HeroText = () => {
  return (
    <div className="block bg-gradient-to-b from-special-1">
      <div className="flex uppercase flex-col pt-4 md:pt-5 items-center md:items-start h-full gap-2 md:ml-5">
        <div className="inline-block rounded-[100px] font-corsa-grotesk body-txtColor-2 text-2xs md:text-[10px] md:leading-3 font-bold py-1 px-2 bg-base-100 md:bg-accent-3 ">
          GAME OF THE WEEK
        </div>
        <div className="flex flex-col gap-1">
          <p className="font-black text-[22px] leading-[28px] md:text-[26px] md:leading-8 body-txtColor-1">
            Gates of olympus
          </p>
          <p className="font-black text-left inline-block mx-auto md:mx-0 text-[10px] md:text-sm leading-3 md:leading-[18px] object-contain md:m-0E">
            Get 100% return bonuses <br /> with the game of this week
          </p>
        </div>
        <Link
          to="/"
          className="block mx-auto md:ml-0 capitalize mt-1 md:mt-6 px-4 py-2 text-xs body-txtColor-2 font-medium leading-4 rounded-lg bg-gradient-to-r from-accent-3 to-accent-4"
        >
          Play Now
        </Link>
      </div>
    </div>
  );
};

export default HeroText;
