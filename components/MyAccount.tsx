import { useState, useCallback } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";
import Link from "next/link";
import { useCookies } from "react-cookie";

export default function MyAccount() {
  const [open, setOpen] = useState(false);
  const [cookies, , removeCookie] = useCookies(["x-token", "x-refresh-token"]);
  const signOut = useCallback(() => {
    removeCookie("x-refresh-token");
    removeCookie("x-token");
  }, [removeCookie]);
  return (
    <div
      className="relative ml-4 cursor-pointer"
      onClick={() => {
        setOpen((orig) => !orig);
      }}
    >
      {cookies["x-token"] && cookies["x-refresh-token"] && (
        <div className="flex flex-row items-center">
          <Link href="/cards" passHref>
            <a className="relative p-3 flex flex-row items-center rounded-lg border-2 border-header-black bg-myaccount-gray">
              <img
                src="/credit_cards.png"
                alt="Credit card image"
                className="w-8 h-8"
              ></img>
              <div className="font-semibold ml-2">Your Cards</div>
            </a>
          </Link>
          <FontAwesomeIcon
            icon={faSignOutAlt}
            className="w-6 h-6 text-background-gray ml-6"
            onClick={() => {
              setOpen(true);
              signOut();
            }}
          />
        </div>
      )}
      {(!cookies["x-token"] || !cookies["x-refresh-token"]) && (
        <>
          <motion.div
            className="rounded-lg border-2 border-header-black bg-myaccount-gray absolute top-0 left-0 right-0 overflow-hidden"
            initial={{ bottom: "0rem" }}
            animate={{ bottom: open ? "-5rem" : "0rem" }}
          >
            <div className="flex flex-col absolute top-12 left-3 right-3">
              <Link href="/signup" passHref>
                <a className="text-center button-yellow">Signup</a>
              </Link>
              <Link href="/login" passHref>
                <a className="button-light mt-2 text-center">Login</a>
              </Link>
            </div>
          </motion.div>
          <div className="flex flex-row relative p-3">
            <FontAwesomeIcon icon={faUser} className="w-6 h-6" />
            <div
              style={{ textShadow: "0px 4px 4px 0px #00000040" }}
              className="font-semibold ml-2"
            >
              My Account
            </div>
          </div>
        </>
      )}
    </div>
  );
}
