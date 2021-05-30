import Link from "next/link";
import Image from "../components/Image";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInstagramSquare,
  faFacebookSquare,
} from "@fortawesome/free-brands-svg-icons";
import { faBuilding, faPhone } from "@fortawesome/free-solid-svg-icons";

export default function Footer() {
  return (
    <div className="flex flex-col">
      <div className="container">
        <div className="flex flex-row py-32">
          <div className="flex flex-col mr-auto">
            <div className="relative w-24">
              <Image
                src="/logo_dark_small"
                alt="Pod Plug logo"
                layout="responsive"
                width={2097}
                height={1294}
              />
            </div>
            <div className="mt-6 text-base font-roboto">
              Copyright &copy; 2021 PodPlug
            </div>
            <div className="text-base font-roboto">
              <Link href="/copyright">Privacy Policy</Link>
            </div>
            <div className="flex flex-row mt-4 gap-3 text-theme-dark">
              <FontAwesomeIcon
                icon={faInstagramSquare}
                className="w-6 h-6"
              ></FontAwesomeIcon>
              <FontAwesomeIcon
                icon={faFacebookSquare}
                className="w-6 h-6"
              ></FontAwesomeIcon>
              <FontAwesomeIcon
                icon={faBuilding}
                className="w-6 h-6"
              ></FontAwesomeIcon>
              <FontAwesomeIcon
                icon={faPhone}
                className="w-6 h-6"
              ></FontAwesomeIcon>
            </div>
          </div>
          <div className="self-center mx-5 font-raleway">
            <Link href="/">Home</Link>
          </div>
          <div className="self-center mx-5 font-raleway">
            <Link href="/rewards">Rewards Venues</Link>
          </div>
          <div className="self-center mx-5 font-raleway">
            <Link href="/about">About Us</Link>
          </div>
          <div className="self-center mx-5 font-raleway">
            <Link href="/careers">Careers</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
