interface CardProps {
  title: string;
  content: string;
}

export default function Card(props: CardProps) {
  return (
    <div className="h-72 w-72 rounded-3xl bg-white flex flex-col items-center justify-center p-4">
      <div className="text-8xl text-theme-light font-raleway font-thin mb-8">
        {props.title}
      </div>
      <div className="font-raleway text-theme-light text-center">
        {props.content}
      </div>
    </div>
  );
}
