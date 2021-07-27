import { useCookies } from "react-cookie";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function useNotSignedInOnly() {
  const [cookies] = useCookies(["x_token", "x_refresh_token"]);
  const router = useRouter();
  useEffect(() => {
    if (cookies.x_token && cookies.x_refresh_token) {
      router.push("/");
    }
  }, [cookies, router]);
}
