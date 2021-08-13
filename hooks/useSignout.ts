import { useCookies } from "react-cookie";
import { useCallback } from "react";

export default function useSignout() {
  const [, , removeCookie] = useCookies(["x-token", "x-refresh-token"]);
  return useCallback(() => {
    removeCookie("x-refresh-token");
    removeCookie("x-token");
  }, [removeCookie]);
}
