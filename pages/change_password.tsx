import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import SignupHeader from "../components/SignupHeader";
import { API, JSON_HEADER } from "../constants";

const ChangePassword: React.FC = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    formState: { errors },
  } = useForm({ mode: "all" });

  const [generalError, setGeneralError] = useState(undefined);

  useEffect(() => {
    if (router.isReady) {
      if (!router.query["token"] || !router.query["email"]) {
        router.push("/");
      }
    }
  }, [router]);

  useEffect(() => {
    if (router.query.email) {
      setValue("email", router.query.email);
    }
  }, [router, setValue]);

  const onSubmit = (values) => {
    fetch(API + "/users/change_password", {
      method: "PUT",
      headers: JSON_HEADER,
      body: JSON.stringify({
        email: values.email,
        secretToken: router.query["token"],
        newPassword: values.password,
      }),
    }).then((res) => {
      if (res.status === 200) {
        router.push("/login");
      } else if (res.status === 401) {
        setGeneralError("Invalid or expired link!");
      } else if (res.status === 500) {
        setGeneralError(
          "Something unusual happened. Contact support@podplug.com."
        );
      }
    });
  };
  return (
    <>
      <Head>
        <link rel="shortcut icon" href="/favicon.png" />
        <title>Checkout - Pod Plug</title>
      </Head>
      <SignupHeader text="home" link="/" />
      <main className="relative">
        {/* Clouds */}
        <div className="absolute top-0 z-clouds w-full">
          <img
            src="/clouds_blue.png"
            alt="Clouds"
            className="absolute opacity-80 z-clouds hidden md:block"
            style={{ top: "-4rem", left: "-10vw" }}
          />
          <img
            src="/clouds_blue.png"
            alt="Clouds"
            className="absolute opacity-80 z-clouds hidden md:block"
            style={{ top: "-2rem", left: "55vw" }}
          />
          <img
            src="/clouds_blue.png"
            alt="Clouds"
            className="absolute opacity-80 z-clouds md:hidden"
            style={{ top: "0rem", left: "-10vw" }}
          />
          <img
            src="/clouds_big.png"
            alt="Clouds"
            className="absolute opacity-80 z-clouds transform scale-75 hidden md:block"
            style={{ top: "6rem", left: "-5vw" }}
          />
          <img
            src="/clouds_big.png"
            alt="Clouds"
            className="absolute opacity-80 z-clouds transform scale-75 hidden xl:block"
            style={{ top: "10rem", left: "55vw" }}
          />
          <img
            src="/clouds_blue.png"
            alt="Clouds"
            className="absolute opacity-80 z-clouds transform md:hidden"
            style={{ top: "15rem", left: "60vw" }}
          />
        </div>
        <div className="flex flex-col items-center mt-32 pb-80 relative z-content px-8">
          <div className="font-bold text-4xl text-center">
            Change Your Password
          </div>
          <div className="w-96 max-w-full mt-12">
            <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
              <label className="flex flex-col mt-4">
                <div className="text-sm font-bold">EMAIL</div>
                <input
                  className="p-1 border-black rounded-lg border-3"
                  type="email"
                  disabled
                  {...register("email", {})}
                />
              </label>
              <label className="flex flex-col mt-4">
                <div className="text-sm font-bold">PASSWORD</div>
                <input
                  className="p-1 border-black rounded-lg border-3"
                  type="password"
                  {...register("password", {
                    required: {
                      value: true,
                      message: "Password is required",
                    },
                    minLength: {
                      value: 8,
                      message: "Password must be at least 8 characters long",
                    },
                  })}
                />
                {errors.password && (
                  <div className="text-red-700">{errors.password.message}</div>
                )}
              </label>
              <label className="flex flex-col mt-4">
                <div className="text-sm font-bold">RE-ENTER PASSWORD</div>
                <input
                  className="p-1 border-black rounded-lg border-3"
                  type="password"
                  {...register("password2", {
                    required: {
                      value: true,
                      message: "Re-enter your password to confirm",
                    },
                    validate: (v) =>
                      v === getValues("password") ||
                      "Two passwords do not match",
                  })}
                />
                {errors.password2 && (
                  <div className="text-red-700">{errors.password2.message}</div>
                )}
              </label>
              <input
                className="px-12 mt-4 text-sm font-bold cursor-pointer self-end button-light py-1"
                type="submit"
                value="Submit"
              ></input>
            </form>
            {generalError && (
              <div className="text-red-700 mt-8">{generalError}</div>
            )}
            <div
              className="absolute w-full h-56 left-0 bottom-0 z-bg opacity-30"
              style={{
                backgroundImage: 'url("/skyline_full.png")',
                backgroundSize: "auto 100%",
                backgroundRepeat: "repeat-x",
                backgroundPosition: "bottom left",
              }}
            />
          </div>
        </div>
      </main>
    </>
  );
};

export default ChangePassword;
