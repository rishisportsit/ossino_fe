import './PaginationBlock.module.css';

const PaginationBlock = () => {
  return (
    <div className="swiper-pagination-container absolute bottom-[-24px] left-0 h-[6px] bg-blue-500 w-full flex justify-center z-10">
      <div className="swiper-pagination" />
    </div>
  );
};

export default PaginationBlock;
