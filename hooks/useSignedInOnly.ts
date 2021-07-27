import { useCookies } from "react-cookie";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function useSignedInOnly() {
  const [cookies] = useCookies(["x-token", "x-refresh-token"]);
  const router = useRouter();
  useEffect(() => {
    if (!cookies["x-token"] || !cookies["x-refresh-token"]) {
      router.push("/login");
    }
  }, [cookies, router]);
}
