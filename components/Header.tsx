/**
 * Created by Haowen Liu in 2021
 * A header component
 */

import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faTimes,
  faUser,
  faSignInAlt,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useCookies } from "react-cookie";

import Image from "../components/Image";
import MyAccount from "./MyAccount";
import useSignout from "../hooks/useSignout";

interface HeaderProps {
  current: "/" | "/rewards" | "/partners" | "/about" | "/contact";
}

export default function Header(props: HeaderProps) {
  const [showMenu, setShowMenu] = useState(false);
  const [cookies] = useCookies(["x-token", "x-refresh-token"]);
  const signOut = useSignout();
  return (
    <>
      <div className="flex flex-row items-center px-16 py-4 md:px-32 relative z-content bg-header-black">
        <Link href="/" passHref>
          <a className="relative w-20 mr-auto cursor-pointer">
            <Image
              src="/logo_small"
              alt="Pod Plug logo"
              layout="responsive"
              width={2098}
              height={1294}
            />
          </a>
        </Link>
        <div className="flex-row hidden xl:flex items-center">
          <div
            className={`text-white mx-5 font-semibold ${
              props.current === "/" && "font-black"
            }`}
          >
            <Link href="/">Home</Link>
          </div>
          <div
            className={`text-white mx-5 font-semibold ${
              props.current === "/rewards" && "font-black"
            }`}
          >
            <Link href="/rewards">Rewards</Link>
          </div>
          <div
            className={`text-white mx-5 font-semibold ${
              props.current === "/partners" && "font-black"
            }`}
          >
            <Link href="/partners">Venue Partners</Link>
          </div>
          <div
            className={`text-white mx-5 font-semibold ${
              props.current === "/about" && "font-black"
            }`}
          >
            <Link href="/about">About Us</Link>
          </div>
          <div
            className={`text-white mx-5 font-semibold ${
              props.current === "/contact" && "font-black"
            }`}
          >
            <Link href="/contact">Contact Us</Link>
          </div>
          <MyAccount />
        </div>
        <div
          className="block cursor-pointer xl:hidden"
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
            className="fixed top-0 bottom-0 right-0 flex flex-col w-64 p-6 z-overlay"
            style={{ backgroundColor: "#12172B" }}
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
              className={`text-white font-semibold mb-8 ${
                props.current === "/" && "font-black"
              }`}
            >
              <Link href="/">Home</Link>
            </div>
            <div
              className={`text-white font-semibold mb-8 ${
                props.current === "/rewards" && "font-black"
              }`}
            >
              <Link href="/rewards">Rewards</Link>
            </div>
            <div
              className={`text-white font-semibold mb-8 ${
                props.current === "/partners" && "font-black"
              }`}
            >
              <Link href="/partners">Venue Partners</Link>
            </div>
            <div
              className={`text-white font-semibold mb-8 ${
                props.current === "/about" && "font-black"
              }`}
            >
              <Link href="/about">About Us</Link>
            </div>
            <div
              className={`text-white font-semibold mb-8 ${
                props.current === "/contact" && "font-black"
              }`}
            >
              <Link href="/contact">Contact Us</Link>
            </div>
            {cookies["x-token"] && cookies["x-refresh-token"] && (
              <>
                <Link href="/cards" passHref>
                  <a className="button-gray flex flex-row mr-6 px-2 py-1 items-center">
                    <img
                      src="/credit_cards.png"
                      alt="Credit cards image"
                      className="w-8 h-8"
                    ></img>
                    <div className="ml-2">Your Cards</div>
                  </a>
                </Link>
                <button
                  className="button-gray flex flex-row mr-6 p-2 mt-4 items-center"
                  onClick={() => signOut()}
                >
                  <FontAwesomeIcon
                    icon={faSignOutAlt}
                    className="w-6 h-6 mx-1"
                  ></FontAwesomeIcon>
                  <div className="ml-2">Logout</div>
                </button>
              </>
            )}
            {(!cookies["x-token"] || !cookies["x-refresh-token"]) && (
              <>
                <Link href="/signup" passHref>
                  <a className="button-yellow flex flex-row mr-6 p-2 items-center">
                    <FontAwesomeIcon
                      icon={faUser}
                      className="w-6 h-6"
                    ></FontAwesomeIcon>
                    <div className="ml-2">Signup</div>
                  </a>
                </Link>
                <Link href="/login" passHref>
                  <a className="button-gray flex flex-row mr-6 p-2 mt-4 items-center">
                    <FontAwesomeIcon
                      icon={faUser}
                      className="w-6 h-6"
                    ></FontAwesomeIcon>
                    <div className="ml-2">Login</div>
                  </a>
                </Link>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
