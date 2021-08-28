import Head from "next/head";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import { useState, useEffect, useRef, useCallback } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { faCheckSquare } from "@fortawesome/free-regular-svg-icons";
import { useForm } from "react-hook-form";

import SignupHeader from "../components/SignupHeader";
import { JSON_HEADER, API, VERIDAS_URL } from "../constants";
import { dlOptions } from "../veridasOptions";

// Check is older than 21
// TODO: now the limit is 18 for testing
const isOldEnough = (birthday: Date) => {
  const now = new Date();
  const yearDiff = now.getFullYear() - birthday.getFullYear();
  if (yearDiff > 18) {
    return true;
  } else if (yearDiff < 18) {
    return false;
  } else {
    if (now.getMonth() > birthday.getMonth()) {
      return true;
    } else if (now.getMonth() < birthday.getMonth()) {
      return false;
    } else {
      if (now.getDate() >= birthday.getDate()) {
        return true;
      }
    }
  }
  return false;
};

// Check veridas return data
const checkVeridas = (
  data: { additionalData },
  setBirthday: (birthday: { day; month; year }) => void,
  setFormNum: (num: number) => void
) => {
  const lifeProof = data.additionalData.globalScores.biometryScores.find(
    (node) => node.name === "ValidasScoreLifeProof"
  ).value;
  const documentScore = data.additionalData.globalScores.documentScores.find(
    (node) => node.name === "Score-DocumentGlobal"
  ).value;
  console.log("Life proof", lifeProof);
  console.log("Document score", documentScore);
  if (lifeProof < 0.65 || documentScore < 0.65) {
    return false;
  }
  const dobNode = data.additionalData.ocr.nodes.find(
    (node) => node.fieldName === "Date of Birth"
  );
  if (!dobNode || !dobNode.text) {
    return false;
  }
  const dobFields = dobNode.text.split(" ").map((text) => parseInt(text));
  if (dobFields.length != 3) {
    return false;
  }
  // Validate birthday
  const date = new Date();
  date.setFullYear(dobFields[2], dobFields[1] - 1, dobFields[0]);

  if (
    date.getFullYear() !== dobFields[2] ||
    date.getMonth() !== dobFields[1] - 1 ||
    date.getDate() !== dobFields[0]
  ) {
    return false;
  }
  // Check is older than 21
  if (!isOldEnough(date)) {
    return false;
  }

  setBirthday({
    day: dobFields[0],
    month: dobFields[1],
    year: dobFields[2],
  });
  setTimeout(() => {
    setFormNum(4);
  }, 1000);
  return true;
};

const Signup: React.FC = () => {
  const [formNum, setFormNum] = useState(0);
  const [form, setForm] = useState({});
  const [csrfToken, setCsrfToken] = useState(undefined);

  // begin: cred form
  const {
    register: register1,
    handleSubmit: handleSubmit1,
    getValues: getValues1,
    setValue: setValue1,
    setError: setError1,
    formState: { errors: errors1 },
  } = useForm({ mode: "all" });
  const onSubmit1 = async (values) => {
    fetch(API + "/auth/veridasToken", {
      method: "POST",
      headers: JSON_HEADER,
      body: JSON.stringify({
        email: values.email,
      }),
    })
      .then((res) => {
        if (res.status === 429) {
          setError1("email", {
            type: "manual",
            message: "You made too many requests. Try again 24 hours later.",
          });
        } else if (res.status === 400) {
          setError1("email", {
            type: "manual",
            message: "The provided email is not a valid and reachable address.",
          });
        } else {
          return res.json();
        }
      })
      .then((json) => {
        if (json) {
          setToken(json.veridas.access_token);
          setCsrfToken(json.signupSecret);
          setFormNum(1);
          delete values.password2;
          setForm(values);
        }
      });
  };
  // end: cred form

  // begin: detials form
  const [agreeEmail, setAgreeEmail] = useState(false);
  const [agreeSendInfo, setAgreeSendInfo] = useState(false);
  const [agreeEmailError, setAgreeEmailError] = useState(undefined);
  const [agreeInfoError, setAgreeInfoError] = useState(undefined);
  const [generalError, setGeneralError] = useState(undefined);
  const {
    register: register2,
    handleSubmit: handleSubmit2,
    formState: { errors: errors2 },
  } = useForm({ mode: "all" });
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
          birthday: birthday,
          signupToken: csrfToken,
        }),
        headers: JSON_HEADER,
      }).then((res) => {
        if (res.status === 200) {
          router.push("/setup_card");
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
  // end: details form

  // begin: initial email
  const router = useRouter();
  useEffect(() => {
    if (router.query.email) {
      setValue1("email", router.query.email);
    }
  }, [router, setValue1]);
  // end: initial email

  // begin: Veridas
  const [licenseState, setLicenseState] = useState("Alaska");
  const [type, setType] = useState(undefined);
  const [token, setToken] = useState(undefined);
  const stateRef = useRef<HTMLSelectElement>(undefined);
  const yearRef = useRef<HTMLSelectElement>(undefined);
  const veridasRef = useRef<HTMLIFrameElement>(null);
  const [birthday, setBirthday] = useState({ day: -1, month: -1, year: -1 });
  // 0 No error, 1 Try again, 2 Attempts used up
  const [veridasCompleteError, setVeridasCompleteError] = useState(0);
  const start = useCallback(() => {
    if (stateRef && stateRef.current) {
      if (yearRef && yearRef.current) {
        setType(dlOptions[stateRef.current.value][yearRef.current.value]);

        setFormNum(2);
      }
    }
  }, [stateRef, yearRef]);

  useEffect(() => {
    if (type) {
      const listener = (event) => {
        console.log(event.data);
        if (event.data.code === "ProcessCompleted") {
          if (!checkVeridas(event.data, setBirthday, setFormNum)) {
            fetch(API + "/auth/veridasAttempts", {
              method: "POST",
              headers: JSON_HEADER,
              body: JSON.stringify({
                email: form["email"],
              }),
            })
              .then((res) => {
                return res.json();
              })
              .then((attempts) => {
                if (parseInt(attempts) < 2) {
                  setVeridasCompleteError(1);
                } else {
                  setVeridasCompleteError(2);
                }
                setFormNum(3);
              });
          } else {
            setFormNum(3);
          }
        }
      };

      window.addEventListener("message", listener);

      return () => {
        window.removeEventListener("message", listener);
      };
    }
  }, [form, type]);
  // end: veridas

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
          {formNum === 2 && (
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
          style={{ top: formNum === 4 ? "50rem" : "35rem" }}
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
            transform: formNum === 0 ? "translateX(0vw)" : "translateX(-100vw)",
          }}
        >
          <div className="container">
            <div className="relative transform left-1/2 -translate-x-1/2 flex flex-col w-112 max-w-full py-24">
              <div className="font-bold text-4xl text-center">
                Create an Account
              </div>
              <div className="font-bold text-subtitle-gray text-xl text-center mt-2">
                Join our rewards program today
              </div>
              <form
                className="flex flex-col"
                onSubmit={handleSubmit1(onSubmit1)}
              >
                <div className="flex flex-col mt-4">
                  <label className="text-sm font-bold">EMAIL</label>
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
                    <div className="text-red-700">{errors1.email.message}</div>
                  )}
                </div>
                <div className="flex flex-col mt-4">
                  <label className="text-sm font-bold">PASSWORD</label>
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
                    <div className="text-red-700">
                      {errors1.password.message}
                    </div>
                  )}
                </div>
                <div className="flex flex-col mt-4">
                  <label className="text-sm font-bold">RE-ENTER PASSWORD</label>
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
                    <div className="text-red-700">
                      {errors1.password2.message}
                    </div>
                  )}
                </div>
                <input
                  className="px-12 mt-4 text-sm font-bold cursor-pointer self-end button-light py-1"
                  type="submit"
                  value="Next"
                ></input>
              </form>
            </div>
          </div>
        </motion.div>
        <motion.div
          className="outer-container flex flex-col items-center absolute w-full top-0 z-content"
          initial={{ transform: "translateX(-100vw)" }}
          animate={{
            transform:
              formNum === 0
                ? "translateX(100vw)"
                : formNum === 1
                ? "translateX(0vw)"
                : "translateX(-100vw)",
          }}
        >
          <div className="flex flex-col items-center z-content relative py-24 container">
            <div className="text-4xl font-black text-center">
              Age Verification
            </div>
            <img
              src="/age.svg"
              alt="Age 21 warning"
              className="w-36 pt-2 relative"
            />
            <label className="mt-4 w-96 max-w-full font-semibold">
              Driver License Issuing State
              <select
                className="w-full mt-2 border-3 border-subtitle-gray rounded-lg p-1"
                value={licenseState}
                onChange={(e) => {
                  setLicenseState(e.target.value);
                }}
                ref={stateRef}
              >
                {Object.keys(dlOptions).map((key) => (
                  <option key={key}>{key}</option>
                ))}
              </select>
            </label>
            <label className="mt-4 w-96 max-w-full font-semibold">
              License Version
              <select
                className="w-full mt-2 border-3 border-subtitle-gray rounded-lg p-1"
                ref={yearRef}
              >
                {Object.keys(dlOptions[licenseState]).map((year) => (
                  <option key={year}>{year}</option>
                ))}
              </select>
            </label>
            <button
              className="w-96 max-w-full mt-8 p-1 button-dark"
              onClick={() => start()}
            >
              Next
            </button>
          </div>
        </motion.div>
        <motion.div
          className="outer-container flex flex-col items-center absolute w-full top-0 z-content"
          initial={{ transform: "translateX(100vw)" }}
          animate={{
            transform: formNum < 4 ? "translateX(100vw)" : "translateX(0vw)",
          }}
        >
          <div className="container max-w-full">
            <div className="relative transform left-1/2 -translate-x-1/2 flex flex-col py-24 w-112 max-w-full lg:w-auto">
              <div className="font-bold text-4xl text-center">
                Additional Information
              </div>
              <div className="font-bold text-subtitle-gray text-xl text-center mt-2">
                Enter the details below
              </div>
              <form
                className="flex flex-col lg:flex-row justify-center items-center"
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
                        <div className="text-red-700">
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
                        <div className="text-red-700">
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
                      <div className="text-red-700">
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
                      <div className="text-red-700">{errors2.city.message}</div>
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
                        <div className="text-red-700">
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
                        <div className="text-red-700">
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
                      <div className="text-red-700">
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
                    <div>
                      I agree to receiving future offers in my email or via
                      post.
                      <span className="text-red-600">*</span>
                    </div>
                  </div>
                  {agreeEmailError && (
                    <div className="text-red-700">{agreeEmailError}</div>
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
                    <div>
                      I agree to allow my information to be sent to future
                      vendor and venue partners.
                      <span className="text-red-600">*</span>
                    </div>
                  </div>
                  {agreeInfoError && (
                    <div className="text-red-700">{agreeInfoError}</div>
                  )}
                  {generalError && (
                    <div className="text-red-700">{generalError}</div>
                  )}
                  <input
                    className="bg-white p-1 px-12 mt-8 text-sm font-bold border-black rounded-lg cursor-pointer border-3 text-black self-end"
                    value="Confirm"
                    type="submit"
                  ></input>
                </div>
              </form>
            </div>
          </div>
        </motion.div>
        <div style={{ height: formNum === 4 ? "30rem" : "20rem" }}></div>
        {token && formNum === 2 && (
          <>
            <iframe
              ref={veridasRef}
              className="w-screen h-[90vh] md:h-screen fixed top-0 left-0 z-content"
              allow="camera; microphone;"
              src={`https://${VERIDAS_URL}?access_token=${token}`}
              onLoad={(e) => {
                (e.target as HTMLIFrameElement).contentWindow.postMessage(
                  {
                    documentType: type,
                    callbackData: {
                      ocr: true,
                    },
                  },
                  "*"
                );
              }}
            ></iframe>
            <div className="bg-background-gray h-[10vh] fixed block md:hidden top-[90vh] w-screen left-0 z-content"></div>
          </>
        )}
        {veridasCompleteError === 2 && formNum === 3 && (
          <div className="px-8 absolute z-content top-32 w-screen flex flex-col items-center">
            <div className="w-96 max-w-full text-center flex flex-col items-center">
              <div className="text-4xl font-black">Final attempt failed</div>
              <div className="text-xl text-subtitle-gray text-center mt-4">
                If this is an error, email{" "}
                <a href="mailto:contact@podplug.com" className="font-semibold">
                  contact@podplug.com
                </a>{" "}
                for additional support!
              </div>
              <div className="text-xl text-subtitle-gray text-center mt-4">
                Or try again when you’re 21 :)
              </div>
              <button
                className="p-1 button-dark w-full mt-6"
                onClick={() => {
                  router.push("/");
                }}
              >
                Exit
              </button>
            </div>
          </div>
        )}
        {veridasCompleteError === 1 && formNum === 3 && (
          <div className="px-8 absolute z-content top-32 w-screen flex flex-col items-center">
            <div className="w-96 max-w-full text-center flex flex-col items-center">
              <div className="text-4xl font-black">Verification Failed</div>
              <div className="text-xl text-subtitle-gray text-center mt-4">
                Our systems were unable to verify that you are over 21.
              </div>
              <div className="text-xl text-subtitle-gray text-center mt-4">
                You may attempt ONE more time. Try taking a clearer photo or
                using a better camera!
              </div>
              <button
                className="p-1 button-dark w-full mt-6"
                onClick={() => {
                  setFormNum(1);
                }}
              >
                Retry
              </button>
            </div>
          </div>
        )}
        {veridasCompleteError === 0 && formNum === 3 && (
          <div className="px-8 absolute z-content top-32 w-screen flex flex-col items-center">
            <div className="w-96 max-w-full text-center flex flex-col items-center">
              <div className="text-4xl font-black">
                Verification Successful!
              </div>
              <div className="text-lg mt-8">
                Let’s just double check we got the right information!
              </div>
              <FontAwesomeIcon
                icon={faCheckSquare}
                className="w-20 mt-8 text-green-600"
              />
            </div>
          </div>
        )}
      </main>
    </>
  );
};

export default Signup;
