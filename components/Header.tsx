import Link from "next/link";

import Image from "../components/Image";

interface HeaderProps {
  current: "/" | "/rewards" | "/partners" | "/about" | "/contact";
}

export default function Header(props: HeaderProps) {
  return (
    <div className="bg-theme-dark flex flex-row px-32 py-4 items-center">
      <div className="relative w-20 mr-auto">
        <Image
          src="/logo_small"
          alt="Pod Plug logo"
          layout="responsive"
          width={2098}
          height={1294}
        />
      </div>
      <div
        className={`text-white text-md mx-5 font-raleway font-semibold ${
          props.current === "/" && "font-black"
        }`}
      >
        <Link href="/">Home</Link>
      </div>
      <div
        className={`text-white text-md mx-5 font-raleway font-semibold ${
          props.current === "/rewards" && "font-black"
        }`}
      >
        <Link href="/rewards">Rewards</Link>
      </div>
      <div
        className={`text-white text-md mx-5 font-raleway font-semibold ${
          props.current === "/partners" && "font-black"
        }`}
      >
        <Link href="/partners">Venue Partners</Link>
      </div>
      <div
        className={`text-white text-md mx-5 font-raleway font-semibold ${
          props.current === "/about" && "font-black"
        }`}
      >
        <Link href="/about">About Us</Link>
      </div>
      <div
        className={`text-white text-md mx-5 font-raleway font-semibold ${
          props.current === "/contact" && "font-black"
        }`}
      >
        <Link href="/contact">Contact Us</Link>
      </div>
    </div>
  );
}
