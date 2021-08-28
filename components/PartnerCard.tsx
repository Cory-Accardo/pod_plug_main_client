interface CardProps {
  title: string;
  content: string;
}

const PartnerCard: React.FC<CardProps> = (props) => {
  return (
    <div className="h-48 w-48 lg:w-64 lg:h-64 xl:h-72 xl:w-72 rounded-3xl bg-transparent md:bg-white flex flex-col items-center justify-center p-4 my-4 md:my-0">
      <div className="text-8xl md:text-7xl lg:text-8xl text-theme-light font-thin mb-8">
        {props.title}
      </div>
      <div className="text-theme-light text-center text-base md:text-sm lg:text-base">
        {props.content}
      </div>
    </div>
  );
};

export default PartnerCard;
