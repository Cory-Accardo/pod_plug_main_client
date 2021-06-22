interface RewardsCardProps {
  index: number;
  title: string;
  image: string;
}

export default function RewardsCard(props: RewardsCardProps) {
  return (
    <div className="rounded-3xl bg-white shadow-xl flex flex-col lg:flex-row h-80 items-center my-4 overflow-hidden w-72 sm:w-96 lg:w-184">
      <div className="flex flex-row items-center py-2 lg:py-0 w-full lg:w-auto">
        <div className="font-raleway font-bold text-theme-light text-3xl sm:text-4xl ml-6 lg:ml-12 mr-6">
          {props.index}
        </div>
        <div className="font-raleway font-semibold text-xl sm:text-2xl w-80">
          {props.title}
        </div>
      </div>
      <div
        className="flex-grow w-full lg:w-auto lg:h-full relative"
        style={{
          backgroundImage: `url(/rewards_procedure_${props.index}.png)`,
          backgroundSize: "cover",
          backgroundPosition: "center center",
        }}
      ></div>
    </div>
  );
}
