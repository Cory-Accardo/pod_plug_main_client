import Head from "next/head";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { useForm } from "react-hook-form";

import SignupHeader from "../components/SignupHeader";
import { JSON_HEADER, API } from "../constants";

export default function Signup() {
  const router = useRouter();
  const {
    register: register1,
    handleSubmit: handleSubmit1,
    getValues: getValues1,
    setValue: setValue1,
    formState: { errors: errors1 },
  } = useForm({ mode: "all" });
  const {
    register: register2,
    handleSubmit: handleSubmit2,
    formState: { errors: errors2 },
  } = useForm({ mode: "all" });
  const [firstForm, setFirstForm] = useState(true);
  const [agreeEmail, setAgreeEmail] = useState(false);
  const [agreeSendInfo, setAgreeSendInfo] = useState(false);
  const [agreeEmailError, setAgreeEmailError] = useState(undefined);
  const [agreeInfoError, setAgreeInfoError] = useState(undefined);
  const [generalError, setGeneralError] = useState(undefined);
  const [form, setForm] = useState({});
  const onSubmit1 = (values) => {
    setFirstForm(false);
    delete values.password2;
    setForm(values);
  };
  const onSubmit2 = (values) => {
    setGeneralError(undefined);
    if (agreeEmail && agreeSendInfo) {
      fetch(API + "/auth/signup", {
        method: "POST",
        body: JSON.stringify({
          ...form,
          name: {
            fname: values.fname,
            lname: values.lname,
          },
          address: {
            street: values.address,
            city: values.city,
            state: values.state,
            zip: values.zip,
          },
          // TODO: use real birthday
          birthday: {
            year: 4000,
            month: 24,
            day: 60,
          },
        }),
        headers: JSON_HEADER,
      }).then((res) => {
        if (res.status === 200) {
          router.push("/setupCard");
        } else if (res.status == 409) {
          setGeneralError(
            "Email is already registered. Try another email or login instead."
          );
        } else {
          setGeneralError("Something is wrong. Please try again.");
        }
      });
    } else {
      if (!agreeEmail) {
        setAgreeEmailError("You need to agree before proceeding");
      }
      if (!agreeSendInfo) {
        setAgreeInfoError("You need to agree before proceeding");
      }
    }
  };
  useEffect(() => {
    if (router.query.email) {
      setValue1("email", router.query.email);
    }
  }, [router, setValue1]);

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
          {!firstForm && (
            <>
              <img
                src="/clouds_blue.png"
                alt="Clouds"
                className="absolute opacity-80 z-clouds block lg:hidden"
                style={{ top: "38rem", left: "-10vw" }}
              />
              <img
                src="/clouds_big.png"
                alt="Clouds"
                className="absolute opacity-80 z-clouds transform scale-75 block lg:hidden"
                style={{ top: "47rem", left: "45vw" }}
              />
            </>
          )}
        </div>
        {/* Skyline */}
        <div
          className="absolute h-80 w-full"
          style={{ top: firstForm ? "35rem" : "50rem" }}
        >
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
        <motion.div
          className="outer-container flex flex-col items-center relative z-content"
          initial={{ transform: "translateX(0vw)" }}
          animate={{
            transform: firstForm ? "translateX(0vw)" : "translateX(-100vw)",
          }}
        >
          <div className="container">
            <div className="relative transform left-1/2 -translate-x-1/2 flex flex-col w-112 max-w-full py-24">
              <div className="font-raleway font-bold text-4xl text-center">
                Create an Account
              </div>
              <div className="font-raleway font-bold text-subtitle-gray text-xl text-center mt-2">
                Join our rewards program today
              </div>
              <form
                className="flex flex-col"
                onSubmit={handleSubmit1(onSubmit1)}
              >
                <div className="flex flex-col mt-4">
                  <label className="text-sm font-bold font-raleway">
                    EMAIL
                  </label>
                  <input
                    className="p-1 border-black rounded-lg border-3"
                    type="email"
                    {...register1("email", {
                      required: { value: true, message: "Email is required" },
                      pattern: {
                        value:
                          /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                        message: "Invalid email format",
                      },
                    })}
                  />
                  {errors1.email && (
                    <div className="font-raleway text-red-700">
                      {errors1.email.message}
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
                    {...register1("password", {
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
                  {errors1.password && (
                    <div className="font-raleway text-red-700">
                      {errors1.password.message}
                    </div>
                  )}
                </div>
                <div className="flex flex-col mt-4">
                  <label className="text-sm font-bold font-raleway">
                    RE-ENTER PASSWORD
                  </label>
                  <input
                    className="p-1 border-black rounded-lg border-3"
                    type="password"
                    {...register1("password2", {
                      required: {
                        value: true,
                        message: "Re-enter your password to confirm",
                      },
                      validate: (v) =>
                        v === getValues1("password") ||
                        "Two passwords do not match",
                    })}
                  />
                  {errors1.password2 && (
                    <div className="font-raleway text-red-700">
                      {errors1.password2.message}
                    </div>
                  )}
                </div>
                <input
                  className="bg-white p-1 px-12 mt-4 text-sm font-bold border-black rounded-lg cursor-pointer font-raleway border-3 text-black self-end"
                  type="submit"
                  value="Next"
                ></input>
              </form>
            </div>
          </div>
        </motion.div>
        <motion.div
          className="outer-container flex flex-col items-center absolute w-full top-0 z-content"
          initial={{ transform: "translateX(100vw)" }}
          animate={{
            transform: firstForm ? "translateX(100vw)" : "translateX(0vw)",
          }}
        >
          <div className="container max-w-full">
            <div className="relative transform left-1/2 -translate-x-1/2 flex flex-col py-24 w-112 max-w-full lg:w-auto">
              <div className="font-raleway font-bold text-4xl text-center">
                Additional Information
              </div>
              <div className="font-raleway font-bold text-subtitle-gray text-xl text-center mt-2">
                Enter the details below
              </div>
              <form
                className="flex flex-col lg:flex-row font-raleway justify-center items-center"
                onSubmit={handleSubmit2(onSubmit2)}
              >
                <div className="flex flex-col w-112 max-w-full mt-4">
                  <div className="flex flex-row mt-4">
                    <div className="flex flex-col w-1/2 pr-1">
                      <label className="text-sm font-bold">FIRST NAME</label>
                      <input
                        className="p-1 border-black rounded-lg border-3"
                        type="text"
                        {...register2("fname", {
                          required: {
                            value: true,
                            message: "First name is required",
                          },
                        })}
                      />
                      {errors2.fname && (
                        <div className="font-raleway text-red-700">
                          {errors2.fname.message}
                        </div>
                      )}
                    </div>
                    <div className="flex flex-col w-1/2 pl-1">
                      <label className="text-sm font-bold">LAST NAME</label>
                      <input
                        className="p-1 border-black rounded-lg border-3"
                        type="text"
                        {...register2("lname")}
                      />
                      {errors2.lname && (
                        <div className="font-raleway text-red-700">
                          {errors2.lname.message}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-col mt-4">
                    <label className="text-sm font-bold">ADDRESS</label>
                    <input
                      className="p-1 border-black rounded-lg border-3"
                      type="text"
                      {...register2("address", {
                        required: {
                          value: true,
                          message: "Address is required",
                        },
                      })}
                    />
                    {errors2.address && (
                      <div className="font-raleway text-red-700">
                        {errors2.address.message}
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col mt-4">
                    <label className="text-sm font-bold">CITY</label>
                    <input
                      className="p-1 border-black rounded-lg border-3"
                      type="text"
                      {...register2("city", {
                        required: {
                          value: true,
                          message: "City is required",
                        },
                      })}
                    />
                    {errors2.city && (
                      <div className="font-raleway text-red-700">
                        {errors2.city.message}
                      </div>
                    )}
                  </div>
                  <div className="flex flex-row mt-4">
                    <div className="flex flex-col w-1/2 pr-1">
                      <label className="text-sm font-bold">STATE</label>
                      <input
                        className="p-1 border-black rounded-lg border-3"
                        type="text"
                        {...register2("state", {
                          required: {
                            value: true,
                            message: "State is required",
                          },
                        })}
                      />
                      {errors2.state && (
                        <div className="font-raleway text-red-700">
                          {errors2.state.message}
                        </div>
                      )}
                    </div>
                    <div className="flex flex-col w-1/2 pl-1">
                      <label className="text-sm font-bold">ZIP</label>
                      <input
                        className="p-1 border-black rounded-lg border-3"
                        type="text"
                        {...register2("zip", {
                          required: {
                            value: true,
                            message: "ZIP is required",
                          },
                        })}
                      />
                      {errors2.zip && (
                        <div className="font-raleway text-red-700">
                          {errors2.zip.message}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-col mt-4">
                    <label className="text-sm font-bold">COUNTRY</label>
                    <input
                      className="p-1 border-black rounded-lg border-3"
                      type="text"
                      {...register2("country", {
                        required: {
                          value: true,
                          message: "Country is required",
                        },
                      })}
                    />
                    {errors2.country && (
                      <div className="font-raleway text-red-700">
                        {errors2.country.message}
                      </div>
                    )}
                  </div>
                  <div className="flex flex-row mt-8 items-center">
                    <button
                      className="border-3 border-black rounded-md relative mr-4 min-w-5 max-w-5 min-h-5 max-h-5"
                      onClick={(e) => {
                        e.preventDefault();
                        setAgreeEmail((orig) => !orig);
                        setAgreeEmailError(undefined);
                      }}
                    >
                      {agreeEmail && (
                        <div className="absolute h-full w-full left-0 top-0 bg-black">
                          <FontAwesomeIcon
                            className="absolute text-white"
                            style={{
                              inset: "0.05rem",
                            }}
                            icon={faCheck}
                          />
                        </div>
                      )}
                    </button>
                    <div className="font-raleway">
                      I agree to receiving future offers in my email or via
                      post.
                      <span className="text-red-600">*</span>
                    </div>
                  </div>
                  {agreeEmailError && (
                    <div className="text-red-700 font-raleway">
                      {agreeEmailError}
                    </div>
                  )}
                  <div className="flex flex-row mt-4 items-center">
                    <button
                      className="border-3 border-black rounded-md relative mr-4 min-w-5 max-w-5 min-h-5 max-h-5"
                      onClick={(e) => {
                        e.preventDefault();
                        setAgreeSendInfo((orig) => !orig);
                        setAgreeInfoError(undefined);
                      }}
                    >
                      {agreeSendInfo && (
                        <div className="absolute h-full w-full left-0 top-0 bg-black">
                          <FontAwesomeIcon
                            className="absolute text-white"
                            style={{
                              inset: "0.05rem",
                            }}
                            icon={faCheck}
                          />
                        </div>
                      )}
                    </button>
                    <div className="font-raleway">
                      I agree to allow my information to be sent to future
                      vendor and venue partners.
                      <span className="text-red-600">*</span>
                    </div>
                  </div>
                  {agreeInfoError && (
                    <div className="text-red-700 font-raleway">
                      {agreeInfoError}
                    </div>
                  )}
                  {generalError && (
                    <div className="text-red-700 font-raleway">
                      {generalError}
                    </div>
                  )}
                  <input
                    className="bg-white p-1 px-12 mt-8 text-sm font-bold border-black rounded-lg cursor-pointer font-raleway border-3 text-black self-end"
                    value="Confirm"
                    type="submit"
                  ></input>
                </div>
              </form>
            </div>
          </div>
        </motion.div>
        <div style={{ height: firstForm ? "20rem" : "30rem" }}></div>
      </main>
    </>
  );
}
