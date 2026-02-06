import { useState, useEffect } from 'react';
import * as Tabs from '@radix-ui/react-tabs';
import type { articles as NewsArticle } from '../../../../api/news/news.types';
import LoadingSpinner from 'components/shared/ui/LoadingSpinner';
import { useAppDispatch, useAppSelector } from 'store/index';
import { getAllNews, getTopNews } from 'store/news/slice';
import {
  selectAllNews,
  selectTopNews,
  selectNewsLoading,
} from 'store/news/selectors';

const arrowRight = '/icons/sports/arrowRight.svg';

const NewsSection = () => {
  const dispatch = useAppDispatch();
  const [activeTab, setActiveTab] = useState<'all' | 'top'>('all');
  const [showAll, setShowAll] = useState(false);

  const allNews = useAppSelector(selectAllNews);
  const topNews = useAppSelector(selectTopNews);
  const loading = useAppSelector(selectNewsLoading);

  useEffect(() => {
    if (allNews?.length === 0) {
      dispatch(getAllNews());
    }
    if (topNews?.length === 0) {
      dispatch(getTopNews());
    }
  }, [dispatch, allNews?.length, topNews?.length]);

  const renderNews = (items: NewsArticle[]) => {
    const displayItems = showAll ? items : items.slice(0, 5);
    return (
      <div className="bg-base-725 rounded-xl p-4 overflow-hidden space-y-4">
        {displayItems.length === 0 ? (
          <div className="text-center text-base-400 py-8">No news available.</div>
        ) : (
          <>
            {/* Main Articles */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-4">
              {displayItems[0] && (
                <article className="space-y-3">
                  <div className="relative">
                    <a href={displayItems[0].url || '#'} target="_blank" rel="noopener noreferrer">
                      <img
                        src={displayItems[0].image || '/images/sports/news/placeholder.jpg'}
                        alt={displayItems[0].title || ''}
                        className="w-full h-[140px] object-cover rounded-lg"
                      />
                    </a>
                  </div>
                  <div>
                    <a href={displayItems[0].url || '#'} target="_blank" rel="noopener noreferrer">
                      <h4 className="text-sm font-medium body-txtColor-1 mb-2 line-clamp-2">
                        {displayItems[0].title}
                      </h4>
                    </a>
                    <p className="text-xs text-base-400 line-clamp-3">
                      {displayItems[0].description}
                    </p>
                  </div>
                </article>
              )}
              {displayItems[1] && (
                <article className="hidden md:block lg:hidden space-y-3">
                  <div className="relative">
                    <a href={displayItems[1].url || '#'} target="_blank" rel="noopener noreferrer">
                      <img
                        src={displayItems[1].image || '/images/sports/news/placeholder.jpg'}
                        alt={displayItems[1].title || ''}
                        className="w-full h-[140px] object-cover rounded-lg"
                      />
                    </a>
                  </div>
                  <div>
                    <a href={displayItems[1].url || '#'} target="_blank" rel="noopener noreferrer">
                      <h4 className="text-sm font-medium body-txtColor-1 mb-2 line-clamp-2">{displayItems[1].title}</h4>
                    </a>
                    <p className="text-xs text-base-400 line-clamp-3">{displayItems[1].description}</p>
                  </div>
                </article>
              )}
            </div>

            <div className="h-px bg-base-800" />

            {/* Secondary Articles */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-2 gap-3">
              {displayItems.slice(1, showAll ? displayItems.length : 3).map((item, idx) => (
                <article key={item.title + idx} className="space-y-2">
                  <a href={item.url || '#'} target="_blank" rel="noopener noreferrer">
                    <img src={item.image || '/images/sports/news/placeholder.jpg'} alt={item.title || ''} className="w-full h-[135px] object-cover rounded-lg" />
                  </a>
                  <a href={item.url || '#'} target="_blank" rel="noopener noreferrer">
                    <h5 className="text-xs font-medium body-txtColor-1 line-clamp-2">{item.title}</h5>
                  </a>
                </article>
              ))}
              {displayItems[4] && !showAll && (
                <article className="hidden md:block lg:hidden space-y-2">
                  <a href={displayItems[4].url || '#'} target="_blank" rel="noopener noreferrer">
                    <img src={displayItems[4].image || '/images/sports/news/placeholder.jpg'} alt={displayItems[4].title || ''} className="w-full h-[135px] object-cover rounded-lg" />
                  </a>
                  <a href={displayItems[4].url || '#'} target="_blank" rel="noopener noreferrer">
                    <h5 className="text-xs font-medium body-txtColor-1 line-clamp-2">{displayItems[4].title}</h5>
                  </a>
                </article>
              )}
            </div>
            {!showAll ? (
              <div className="pt-1 flex justify-center">
                <button
                  type="button"
                  className="text-primary-2 text-sm font-medium flex items-center focus:outline-none"
                  onClick={() => setShowAll(true)}
                >
                  All news
                  <svg className="w-4 h-4" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6.43799 13.28L11.002 8.93333C11.541 8.41999 11.541 7.57999 11.002 7.06666L6.43799 2.71999" className="stroke-primary-2" strokeWidth="1.2" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </div>
            ) : (
              <div className="pt-1 flex justify-center">
                <button
                  type="button"
                  className="text-primary-2 text-sm font-medium flex items-center focus:outline-none"
                  onClick={() => setShowAll(false)}
                >
                  Show less
                  <svg className="w-4 h-4" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6.43799 13.28L11.002 8.93333C11.541 8.41999 11.541 7.57999 11.002 7.06666L6.43799 2.71999" className="stroke-primary-2" strokeWidth="1.2" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </div>
            )}
          </>
        )}
      </div>
    );
  };
  return (
    <div className="w-full lg:w-[290px]">
      <Tabs.Root
        value={activeTab}
        onValueChange={(v) => {
          setActiveTab(v as 'all' | 'top');
          setShowAll(false);
        }}
      >
        <Tabs.List className="flex items-center w-full mb-4">
          <Tabs.Trigger
            value="all"
            className="flex-1 px-0 py-2 text-lg font-medium transition-colors relative text-center data-[state=active]:text-special-2 data-[state=active]:border-b data-[state=active]:border-special-2 data-[state=inactive]:body-txtColor-1 data-[state=inactive]:border-b data-[state=inactive]:border-base-700 hover:data-[state=inactive]:body-txtColor-1 bg-transparent rounded-none border-b border-transparent"
          >
            All news
          </Tabs.Trigger>
          <Tabs.Trigger
            value="top"
            className="flex-1 px-0 py-2 text-lg font-medium transition-colors relative text-center data-[state=active]:text-special-2 data-[state=active]:border-b data-[state=active]:border-special-2 data-[state=inactive]:body-txtColor-1 data-[state=inactive]:border-b data-[state=inactive]:border-base-700 hover:data-[state=inactive]:body-txtColor-1 bg-transparent rounded-none border-b border-transparent"
          >
            Top today
          </Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content value="all">
          {loading ? <div className="text-center body-txtColor-1"><LoadingSpinner></LoadingSpinner></div> : renderNews(allNews)}
        </Tabs.Content>
        <Tabs.Content value="top">
          {loading ? <div className="text-center body-txtColor-1"><LoadingSpinner></LoadingSpinner></div> : renderNews(topNews)}
        </Tabs.Content>
      </Tabs.Root>
    </div>
  );
};

export default NewsSection;
