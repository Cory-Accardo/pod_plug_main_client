import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";

interface OpeningEntryProps {
  title: string;
  link: string;
}

export default function OpeningEntry(props: OpeningEntryProps) {
  return (
    <div className="border-t-2 border-black px-2 py-8 md:p-8 relative">
      <a href={props.link} target="_blank" rel="noreferrer">
        <div className="font-semibold text-lg md:text-xl mb-1">
          {props.title}
        </div>
      </a>
      <a href={props.link} target="_blank" rel="noreferrer">
        <div className="text-xs md:text-base">{props.link}</div>
      </a>
      <a href={props.link} target="_blank" rel="noreferrer">
        <div className="absolute right-2 md:right-8 top-0 bottom-0">
          <FontAwesomeIcon
            icon={faAngleRight}
            className="w-8 h-8 relative top-1/2 transform -translate-y-1/2 text-subtitle-gray"
          />
        </div>
      </a>
    </div>
  );
}
