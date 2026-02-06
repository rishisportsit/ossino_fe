import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from 'components/shared/ui/Accordion';
import StatsBlock from 'components/features/game-detail/StatsBlock';
import DailyRaceBlock from 'components/features/game-detail/DailyRaceBlock';

const AboutGame = () => {
  return (
    <>
      <Accordion
        type="single"
        collapsible
        className="px-4 bg-base-800 rounded-xl block xl:hidden"
      >
        <AccordionItem value="item-1" className="flex flex-col">
          <AccordionTrigger>About Game</AccordionTrigger>
          <AccordionContent className="flex flex-col gap-3 pb-4 ">
            <p className="text-sm font-regular">
              At Ossino, we’re giving away $10,000 every 24 hours. The question
              is: are you ready to race to the top?
            </p>
            <p className="text-sm font-regular">
              Enjoy all of your Ossino favourites across our Casino and
              Sportsbook and, for every bet you place, you’ll climb our Daily
              Race Leaderboard. Everyone is eligible so get started and track
              your progress today!
            </p>
            <p className="text-sm font-regular">
              As soon as time is up, the top 5,000 racers will earn prizes that
              are instantly paid out into their account.
            </p>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      <div className="hidden xl:grid h-[506px] grid-cols-[2fr_1fr] gap-5 ">
        <div className="flex flex-col gap-3 pb-4 bg-base-800 p-5 rounded-xl">
          <p className="text-sm font-regular">
            At Ossino, we’re giving away $10,000 every 24 hours. The question
            is: are you ready to race to the top?
          </p>
          <p className="text-sm font-regular">
            Enjoy all of your Ossino favourites across our Casino and Sportsbook
            and, for every bet you place, you’ll climb our Daily Race
            Leaderboard. Everyone is eligible so get started and track your
            progress today!
          </p>
          <p className="text-sm font-regular">
            As soon as time is up, the top 5,000 racers will earn prizes that
            are instantly paid out into their account.
          </p>
        </div>
        <div className="bg-base-800 rounded-xl p-5 overflow-y-auto ">
          <StatsBlock />
          <DailyRaceBlock />
        </div>
      </div>
    </>
  );
};

export default AboutGame;
