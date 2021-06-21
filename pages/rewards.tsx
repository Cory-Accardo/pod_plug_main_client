import Head from "next/head";

import Header from "../components/Header";
import Footer from "../components/Footer";

export default function Rewards() {
  return (
    <>
      <Head>
        <link rel="shortcut icon" href="/favicon.png" />
        <title>About Us - Pod Plug</title>
      </Head>
      {/* Header */}
      <Header current="/rewards" />
      <main className="bg-background-gray">
        <div className="outer-container flex flex-col items-center md:h-page_md lg:h-page relative">
          <div className="absolute right-0 bottom-32 top-32 xl:top-16 xl:bottom-16 2xl:right-16 flex-col items-end hidden lg:flex">
            <img
              src="/rewards.svg"
              alt="Rewards illustration"
              className="h-full"
            ></img>
          </div>
          <div className="container flex flex-col items-center md:items-start mt-24 mb-24 md:mb-0 md:mt-64 w-max md:w-auto">
            <div className="font-raleway font-bold text-4xl md:text-4.5xl xl:text-5xl mb-4 mt-auto text-center md:text-left">
              Rewards that
              <br className="sm:hidden" /> don&apos;t stop giving
            </div>
            <div className="flex flex-col w-full md:w-max">
              <div className="font-raleway font-bold text-xl sm:text-2xl tracking-wider mb-4 text-center md:text-left text-theme-dark md:text-black">
                Treat yourself; you deserve it
              </div>
              <input className="p-1 rounded-lg border-2 text-base border-subtitle-gray md:border-theme-light w-full md:w-4/5 mb-4"></input>
            </div>
            <button className="bg-theme-dark md:bg-theme-light rounded-lg py-1 px-8 text-white font-raleway w-full md:w-auto">
              Sign Up
            </button>
          </div>
        </div>
      </main>
      {/* Footer */}
      <Footer />
    </>
  );
}
