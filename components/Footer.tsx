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
    <div className="flex flex-col outer-container">
      <div className="container">
        <div className="flex flex-row py-16 md:py-32">
          <div className="flex flex-col mr-auto">
            <div className="flex flex-row items-center md:block">
              <div className="relative w-12 mr-8 md:w-24 md:mr-16 md:mx-0 md:my-8 z-content">
                <Image
                  src="/logo_dark_small"
                  alt="Pod Plug logo"
                  layout="responsive"
                  width={2097}
                  height={1294}
                />
              </div>
              <div>
                <div className="relative text-xs md:text-base md:mx-0 md:mt-8 md:mb-4 font-roboto z-content">
                  Copyright &copy; 2021 Pod Plug
                </div>
                <div className="relative text-xs md:text-base font-roboto z-content md:mb-4">
                  <Link href="/copyright">Privacy Policy</Link>
                </div>
              </div>
            </div>
            <div className="flex flex-row mt-6 text-theme-dark z-content">
              <FontAwesomeIcon
                icon={faInstagramSquare}
                className="w-4 h-4 mr-2 md:mr-3 md:w-6 md:h-6"
              />
              <FontAwesomeIcon
                icon={faFacebookSquare}
                className="w-4 h-4 mr-2 md:mr-3 md:w-6 md:h-6"
              />
              <FontAwesomeIcon
                icon={faBuilding}
                className="w-4 h-4 mr-2 md:mr-3 md:w-6 md:h-6"
              />
              <FontAwesomeIcon
                icon={faPhone}
                className="w-4 h-4 md:w-6 md:h-6"
              />
            </div>
          </div>
          <div className="flex-row self-center hidden z-content md:flex">
            <div className="self-center mx-2 lg:mx-5">
              <Link href="/">Home</Link>
            </div>
            <div className="self-center mx-2 lg:mx-5">
              <Link href="/rewards">Rewards Venues</Link>
            </div>
            <div className="self-center mx-2 lg:mx-5">
              <Link href="/about">About Us</Link>
            </div>
            <div className="self-center mx-2 lg:mx-5">
              <Link href="/careers">Careers</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
