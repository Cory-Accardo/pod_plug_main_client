import Head from "next/head";

import Header from "../components/Header";

export default function Contact() {
  return (
    <>
      <Head>
        <link rel="shortcut icon" href="/favicon.png" />
        <title>Contact Us - Pod Plug</title>
      </Head>
      {/* Header */}
      <Header current="/contact" />

      {/* Main */}
      <main className="flex flex-col items-center outer-container mt-36">
        <div className="container flex flex-row">
          <div className="flex flex-col">
            <div className="text-5xl font-bold font-raleway">Let's Talk</div>
            <div className="text-lg font-raleway">
              <div className="mt-6">
                Curious to learn more about our product?
              </div>
              <div className="mt-6">
                Reach out to us at our email or number, or find us at our
                headquarters in Dallas, TX.
              </div>
              <div className="mt-6">
                Alternatively, fill in the form, and we will aim to respond
                within two working days.
              </div>
            </div>
            <form onSubmit={() => {}} className="flex flex-col">
              <div className="flex flex-col mt-4">
                <label className="text-sm font-bold font-raleway">NAME</label>
                <input
                  className="p-1 border-black rounded-lg border-3"
                  type="text"
                />
              </div>
              <div className="flex flex-col mt-4">
                <label className="text-sm font-bold font-raleway">EMAIL</label>
                <input
                  className="p-1 border-black rounded-lg border-3"
                  type="email"
                />
              </div>
              <div className="flex flex-col mt-4">
                <label className="text-sm font-bold font-raleway">NUMBER</label>
                <input
                  className="p-1 border-black rounded-lg border-3"
                  type="tel"
                />
              </div>
              <div className="flex flex-col mt-4">
                <label className="text-sm font-bold font-raleway">
                  MESSAGE
                </label>
                <textarea className="p-1 border-black rounded-lg border-3" />
              </div>
              <input
                type="submit"
                value="Send"
                className="self-end p-1 px-12 mt-4 text-sm font-semibold border-black rounded-lg font-raleway border-3"
              />
            </form>
          </div>
        </div>
      </main>
    </>
  );
}
