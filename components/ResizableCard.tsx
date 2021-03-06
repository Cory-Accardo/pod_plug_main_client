interface ResizableCardProps {
  header: string;
  title: string;
  content: string;
  footer: string;
}

const ResizableCard: React.FC<ResizableCardProps> = (props) => {
  return (
    <div className="h-72 min-w-48 xl:min-w-56 rounded-3xl bg-transparent md:bg-white flex flex-col items-center justify-center p-4 relative">
      <div className="text-theme-light font-black text-xl mb-4">
        {props.header}
      </div>
      <div
        className="text-7xl md:text-5xl lg:text-6xl xl:text-8xl text-theme-light font-thin mb-8"
        dangerouslySetInnerHTML={{ __html: props.title }}
      />
      <div className="text-theme-light text-center">{props.content}</div>
      {props.footer !== "" && (
        <div className="absolute bottom-4 text-theme-light text-xs text-center">
          {props.footer}
        </div>
      )}
    </div>
  );
};

export default ResizableCard;
