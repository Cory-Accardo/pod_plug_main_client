interface ProcedureProps {
  svg: string;
  caption: string;
}

export default function Procedure(props: ProcedureProps) {
  return (
    <div className="flex flex-col items-center w-36">
      <img src={props.svg} alt={props.caption} className="w-24 h-24"></img>
      <div className="h-16 flex flex-row items-center mt-4">
        <div className="text-xl text-theme-light font-raleway font-bold text-center">
          {props.caption}
        </div>
      </div>
    </div>
  );
}
