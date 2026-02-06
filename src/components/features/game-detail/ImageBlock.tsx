interface ImageBlockProps {
  image: string;
  title: string;
}

const ImageBlock = ({ image, title }: ImageBlockProps) => {
  return (
    <div className="w-full order-1 md:order-2">
      <div className="flex items-center justify-center rounded-[12px] py-[26px] h-full bg-game-detail bg-cover ">
        <img
          src={image}
          alt={title}
          className="object-cover mx-auto w-[148px] h-[148px] rounded-[12px]"
        />
      </div>
    </div>
  );
};

export default ImageBlock;
