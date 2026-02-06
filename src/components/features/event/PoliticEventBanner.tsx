const PoliticEventBanner = () => {
  return (
    <div className="md:p-3 md:bg-base-800 md:rounded-xl mb-5 flex justify-center">
      <div className='bg-[url("/images/politic-event-banner.png")] bg-cover bg-no-repeat h-48 w-full md:max-w-[343px] rounded-xl flex flex-col items-center justify-between p-4'>
        <div className="px-2 h-[22px] bg-background-1/20 flex items-center rounded-xl">
          <span className="text-xs">
            04 Sep&nbsp;<span className="font-bold">15:45</span>
          </span>
        </div>
        <span className="font-medium">VS</span>
        <div className="gap-8 flex">
          <div className="rounded-lg h-10 background-1 flex flex-col items-center justify-center w-[139px]">
            <span className="text-base-900 text-xs font-medium">
              Donald Trump
            </span>
            <div className="flex gap-1 items-center">
              <div className="border-l-[5px] border-l-transparent border-r-[5px] border-r-transparent border-b-[10px] border-b-[#6BE956] border-solid size-0 rounded-sm" />
              <span className="text-accent-positive text-xs font-medium">4.70</span>
            </div>
          </div>
          <div className="rounded-lg h-10 background-1 flex flex-col items-center justify-center w-[139px]">
            <span className="text-base-900 text-xs font-medium">Milan FK</span>
            <div className="flex gap-1 items-center">
              <div className="border-l-[5px] border-l-transparent border-r-[5px] border-r-transparent border-t-[10px] border-t-[#FF725E] border-solid size-0 rounded-sm" />
              <span className="text-accent-negative text-xs font-medium">4.70</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PoliticEventBanner;
