import Image from "../components/Image";
import { useRouter } from "next/router";

export default function SignupHeader() {
  const router = useRouter();
  return (
    <div
      className="flex flex-row items-center px-16 py-4 md:px-32 relative z-content"
      style={{ backgroundColor: "#12172B" }}
    >
      <div
        className="absolute h-full flex flex-row items-center cursor-pointer"
        onClick={() => {
          router.push("/");
        }}
      >
        <img src="/arrow_left.svg" alt="Arrow" className="w-4" />
        <div className="font-raleway text-white ml-6 hidden md:block">Exit to home</div>
      </div>
      <div className="relative w-20 mx-auto">
        <Image
          src="/logo_small"
          alt="Pod Plug logo"
          layout="responsive"
          width={2098}
          height={1294}
        />
      </div>
    </div>
  );
}