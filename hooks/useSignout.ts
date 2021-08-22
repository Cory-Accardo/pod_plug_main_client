import { useCookies } from "react-cookie";
import { useCallback } from "react";

export default function useSignout() {
  const [, , removeCookie] = useCookies(["x-token", "x-refresh-token"]);
  return useCallback(() => {
    console.log("removing cookie!");
    removeCookie("x-refresh-token", { path: "/", sameSite: "strict" });
    removeCookie("x-token", { path: "/", sameSite: "strict" });
  }, [removeCookie]);
}
