/**
 * Created by Haowen Liu in 2021
 * A header component
 */

import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

import Image from "../components/Image";

interface HeaderProps {
  current: "/" | "/rewards" | "/partners" | "/about" | "/contact";
}

export default function Header(props: HeaderProps) {
  const [showMenu, setShowMenu] = useState(false);
  return (
    <>
      <div className="flex flex-row items-center px-16 py-4 md:px-32 bg-theme-dark relative z-content">
        <div className="relative w-20 mr-auto">
          <Image
            src="/logo_small"
            alt="Pod Plug logo"
            layout="responsive"
            width={2098}
            height={1294}
          />
        </div>
        <div className="flex-row hidden lg:flex">
          <div
            className={`text-white mx-5 font-raleway font-semibold ${
              props.current === "/" && "font-black"
            }`}
          >
            <Link href="/">Home</Link>
          </div>
          <div
            className={`text-white mx-5 font-raleway font-semibold ${
              props.current === "/rewards" && "font-black"
            }`}
          >
            <Link href="/rewards">Rewards</Link>
          </div>
          <div
            className={`text-white mx-5 font-raleway font-semibold ${
              props.current === "/partners" && "font-black"
            }`}
          >
            <Link href="/partners">Venue Partners</Link>
          </div>
          <div
            className={`text-white mx-5 font-raleway font-semibold ${
              props.current === "/about" && "font-black"
            }`}
          >
            <Link href="/about">About Us</Link>
          </div>
          <div
            className={`text-white mx-5 font-raleway font-semibold ${
              props.current === "/contact" && "font-black"
            }`}
          >
            <Link href="/contact">Contact Us</Link>
          </div>
        </div>
        <div
          className="block cursor-pointer lg:hidden"
          onClick={() => {
            setShowMenu(true);
          }}
        >
          <FontAwesomeIcon icon={faBars} className="w-8 h-8 text-white" />
        </div>
      </div>
      <AnimatePresence>
        {showMenu && (
          <motion.div
            className="absolute top-0 bottom-0 right-0 flex flex-col w-64 p-6 bg-theme-dark z-overlay"
            initial={{ transform: "translateX(16rem)" }}
            animate={{ transform: "translateX(2rem)" }}
            exit={{ transform: "translateX(16rem)" }}
          >
            <div
              className="w-6 h-6 mb-10 text-white cursor-pointer"
              onClick={() => {
                setShowMenu(false);
              }}
            >
              <FontAwesomeIcon icon={faTimes} />
            </div>
            <div
              className={`text-white font-raleway font-semibold mb-8 ${
                props.current === "/" && "font-black"
              }`}
            >
              <Link href="/">Home</Link>
            </div>
            <div
              className={`text-white font-raleway font-semibold mb-8 ${
                props.current === "/rewards" && "font-black"
              }`}
            >
              <Link href="/rewards">Rewards</Link>
            </div>
            <div
              className={`text-white font-raleway font-semibold mb-8 ${
                props.current === "/partners" && "font-black"
              }`}
            >
              <Link href="/partners">Venue Partners</Link>
            </div>
            <div
              className={`text-white font-raleway font-semibold mb-8 ${
                props.current === "/about" && "font-black"
              }`}
            >
              <Link href="/about">About Us</Link>
            </div>
            <div
              className={`text-white font-raleway font-semibold mb-8 ${
                props.current === "/contact" && "font-black"
              }`}
            >
              <Link href="/contact">Contact Us</Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
