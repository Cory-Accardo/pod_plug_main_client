import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useCookies } from "react-cookie";

import SignupHeader from "../components/SignupHeader";
import { JSON_HEADER, API } from "../constants";
import useNotSignedInOnly from "../hooks/useNotSignedInOnly";

export default function Login() {
  useNotSignedInOnly();
  const [cookies, setCookie] = useCookies(["x-token", "x-refresh-token"]);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "all" });
  const [generalError, setGeneralError] = useState(undefined);
  const onSubmit = (values) => {
    setGeneralError(undefined);
    fetch(API + "/auth/login", {
      method: "POST",
      body: JSON.stringify({
        email: values.email,
        password: values.password,
      }),
      headers: JSON_HEADER,
    })
      .then((res) => {
        if (res.status !== 200) {
          if (res.status === 401) {
            setGeneralError(
              "Your account and password do not match. Please try again."
            );
          } else {
            setGeneralError("Something is wrong. Please try again.");
          }
        }
        return res.json();
      })
      .then((json) => {
        if (json["x-token"] && json["x-refresh-token"]) {
          setCookie("x-token", json["x-token"], {
            path: "/",
            sameSite: "strict",
          });
          setCookie("x-refresh-token", json["x-refresh-token"], {
            path: "/",
            sameSite: "strict",
          });
        }
      });
  };

  return (
    <>
      <Head>
        <link rel="shortcut icon" href="/favicon.png" />
        <title>Sign Up - Pod Plug</title>
      </Head>
      {/* Header */}
      <SignupHeader />

      <main className="relative overflow-hidden">
        {/* Clouds */}
        <div className="absolute z-clouds w-full">
          <img
            src="/clouds_blue.png"
            alt="Clouds"
            className="absolute opacity-80 z-clouds"
            style={{ top: "-2rem", left: "55vw" }}
          />
          <img
            src="/clouds_blue.png"
            alt="Clouds"
            className="absolute opacity-80 z-clouds"
            style={{ top: "0rem", left: "-10vw" }}
          />
          <img
            src="/clouds_big.png"
            alt="Clouds"
            className="absolute opacity-80 z-clouds transform scale-75"
            style={{ top: "10rem", left: "-5vw" }}
          />
          <img
            src="/clouds_big.png"
            alt="Clouds"
            className="absolute opacity-80 z-clouds transform scale-50"
            style={{ top: "16rem", left: "55vw" }}
          />
        </div>
        {/* Skyline */}
        <div className="absolute h-80 w-full" style={{ top: "35rem" }}>
          <div
            className="absolute h-96 z-bg opacity-30 bottom-0 left-0 right-0"
            style={{
              backgroundImage: 'url("/skyline_full.png")',
              backgroundSize: "auto 100%",
              backgroundRepeat: "repeat-x",
              backgroundPosition: "bottom left",
            }}
          />
        </div>
        {/* First form */}
        <div className="outer-container flex flex-col items-center relative z-content">
          <div className="container">
            <div className="relative transform left-1/2 -translate-x-1/2 flex flex-col w-112 max-w-full py-24 mt-12">
              <div className="font-raleway font-bold text-4xl text-center mb-8">
                Log into your account
              </div>
              <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
                <div className="flex flex-col mt-4">
                  <label className="text-sm font-bold font-raleway">
                    EMAIL
                  </label>
                  <input
                    className="p-1 border-black rounded-lg border-3"
                    type="email"
                    {...register("email", {
                      required: { value: true, message: "Email is required" },
                    })}
                  />
                  {errors.email && (
                    <div className="font-raleway text-red-700">
                      {errors.email.message}
                    </div>
                  )}
                </div>
                <div className="flex flex-col mt-4">
                  <label className="text-sm font-bold font-raleway">
                    PASSWORD
                  </label>
                  <input
                    className="p-1 border-black rounded-lg border-3"
                    type="password"
                    {...register("password", {
                      required: {
                        value: true,
                        message: "Password is required",
                      },
                    })}
                  />
                  {errors.password && (
                    <div className="font-raleway text-red-700">
                      {errors.password.message}
                    </div>
                  )}
                </div>
                {generalError && (
                  <div className="font-raleway text-red-700">
                    {generalError}
                  </div>
                )}
                <input
                  className="bg-white p-1 px-12 mt-4 text-sm font-bold border-black rounded-lg cursor-pointer font-raleway border-3 text-black self-end"
                  type="submit"
                  value="Next"
                ></input>
              </form>
            </div>
          </div>
        </div>
        <div style={{ height: "20rem" }}></div>
      </main>
    </>
  );
}
