import React from 'react';
import type { SortState } from 'store/transactions/types';
import { SORT_STATE } from 'store/transactions/constants';
import Icon from "../Icon";
import sortingArrowsIcon from '/icons/sortingArrows.svg?url';

type SortingColumnProps = {
  state: SortState,
  label?: string,
  handleSort: () => void
}


const SortingColumn = ({ state, label, handleSort }: SortingColumnProps) => {

  const switchSortType = (event: React.MouseEvent) => {
    event.preventDefault();
    handleSort();
  }

  return (
    <div className='flex items-center cursor-pointer' onClick={switchSortType}>
      {label && (
        <span className='text-xs font-medium leading-4 text-base-300'>{label}</span>
      )}
      <div 
        className="sort-arrows relative h-4 w-4 flex justify-center items-center"
        
      >
        <Icon href={sortingArrowsIcon} id='sortingArrowsIcon' className="h-[7px] w-1 cursor-pointer fill-base-300" />
        {state === SORT_STATE.DESC && (
          <div className="absolute top-0 w-full h-1/2 background-2" /> 
        )}
        {state === SORT_STATE.ASC && (
          <div className="absolute bottom-0 w-full h-1/2 background-2" /> 
        )}
      </div>
    </div>
  );
}

export default SortingColumn;

