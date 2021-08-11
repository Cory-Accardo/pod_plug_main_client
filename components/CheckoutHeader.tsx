/**
 * Created by Haowen Liu in 2021
 * A header component
 */

import Link from "next/link";
import { useRouter } from "next/router";

import Image from "../components/Image";

export default function CheckoutHeader() {
  const router = useRouter();
  return (
    <>
      <div
        className="flex flex-row items-center px-8 py-4 md:px-32 relative z-content"
        style={{ backgroundColor: "#12172B" }}
      >
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
        <div
          className="h-full flex flex-row items-center cursor-pointer"
          onClick={() => {
            router.push("/");
          }}
        >
          <img src="/arrow_left.svg" alt="Arrow" className="w-3 md:w-4" />
          <div className="font-raleway text-white ml-3 md:ml-3 text-sm md:text-base">
            Exit checkout
          </div>
        </div>
      </div>
    </>
  );
}
