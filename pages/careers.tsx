import Head from "next/head";
import { useEffect, useState } from "react";

import Header from "../components/Header";
import Image from "../components/Image";
import Footer from "../components/Footer";
import OpeningEntry from "../components/OpeningEntry";
import { ALL, JOBS_LISTALL, JSON_HEADER } from "../constants";

interface Job {
  title: string;
  url: string;
}

export default function Careers() {
  const [jobs, setJobs] = useState<Job[]>([]);
  useEffect(() => {
    fetch(ALL, {
      method: "POST",
      body: JOBS_LISTALL,
      headers: JSON_HEADER,
    })
      .then((res) => {
        return res.json();
      })
      .then((json) => {
        setJobs(
          json.map((value) => {
            return { title: value.title, url: value.linkedin_url };
          })
        );
      });
  }, []);
  return (
    <>
      <Head>
        <link rel="shortcut icon" href="/favicon.png" />
        <title>Careers - Pod Plug</title>
      </Head>
      {/* Header */}
      <Header current="/about" />

      <main className="bg-background-gray">
        {/* Clouds */}
        <div className="absolute z-clouds w-full page">
          <img
            src="/clouds_big.png"
            alt="Clouds"
            className="absolute opacity-80 z-clouds transform scale-75"
            style={{ top: "0rem", left: "-5vw" }}
          />
          <img
            src="/clouds_blue.png"
            alt="Clouds"
            className="absolute opacity-80 z-clouds hidden md:block"
            style={{ top: "10rem", left: "65vw" }}
          />
        </div>
        {/* Main content */}
        <div className="outer-container flex flex-col items-center pt-36 pb-12 relative z-content">
          <div className="container flex flex-col font-raleway">
            <div className="text-subtitle-gray font-bold text-5xl text-center leading-tight">
              Let&apos;s work together
            </div>
            <div className="text-theme-dark md:text-subtitle-gray font-semibold text-2xl text-center mt-4">
              Discover your dream job with Pod Plug
            </div>
            <div className="w-2/5 md:w-64 bg-white rounded-xl p-3 self-center mt-6">
              <div className="relative w-full h-full">
                <Image
                  src="/logo_dark_half"
                  alt="Pod Plug logo"
                  layout="responsive"
                  height={1294}
                  width={2097}
                />
              </div>
            </div>
            <img
              src="/careers.svg"
              alt="Careers illustration"
              className="w-full lg:w-3/4 self-center transform -translate-y-8"
            ></img>
          </div>
        </div>
        <div className="outer-container flex flex-col items-center mt-32 relative z-content">
          <div
            className="absolute w-full h-full left-0 top-0 z-bg opacity-10"
            style={{
              backgroundSize: "auto 100%",
              backgroundRepeat: "repeat-x",
              backgroundImage: 'url("/skyline_full.png")',
            }}
          ></div>
          <div className="max-w-128 font-raleway relative z-content pb-32">
            <div className="font-bold text-4xl md:text-5xl text-center">
              Why Pod Plug?
            </div>
            <div className="text-center mt-10">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui non
              assumenda nam excepturi voluptatum ea incidunt in velit magni
              ullam. Odio deserunt quisquam nesciunt dolorum. Sint ipsum sit
              itaque alias!
            </div>
            <div className="text-center mt-6">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui non
              assumenda nam excepturi voluptatum ea incidunt in velit magni
              ullam. Odio deserunt quisquam nesciunt dolorum. Sint ipsum sit
              itaque alias!
            </div>
            <div className="text-center mt-6">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui non
              assumenda nam excepturi voluptatum ea incidunt in velit magni
              ullam. Odio deserunt quisquam nesciunt dolorum. Sint ipsum sit
              itaque alias!
            </div>
          </div>
        </div>
      </main>
      {/* Opennings */}
      <div className="outer-container flex flex-col items-center">
        <div className="container font-raleway">
          <div className="font-semibold text-3xl md:text-4xl lg:text-5xl mt-24 mb-12">
            Openings
            <span className="text-base md:text-lg ml-4">
              ({jobs.length} openings)
            </span>
          </div>
          <div className="border-b-2 border-black">
            {jobs.map((job, index) => {
              return (
                <OpeningEntry
                  title={job.title}
                  link={job.url}
                  key={index}
                ></OpeningEntry>
              );
            })}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
