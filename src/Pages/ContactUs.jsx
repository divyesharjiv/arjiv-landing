import React from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Link } from "react-router-dom";
import { ARJIV_INFO_EMAIL_URL, CALL_URL } from "@/Common";

gsap.registerPlugin(ScrollTrigger);

const ContactUs = () => {
  return (
    <main className="contact-us">
      <div>
        <div className="flex flex-col">
          <div className="text-center relative bg-[#c3c5c7]">
            <img
              //   src="/img/Trace/2O7A2888.JPG"
              src="/img/Trace/204A.jpg"
              className="h-[60vh] object-cover w-full"
            />
            <div class="!absolute !inset-0 bg-gradient-to-b from-black/65 to-black/10"></div>
            <div className="!absolute !inset-0 flex items-center justify-star md:ps-12 shadow-2xl">
              <h1 className="text-white text-center text-6xl my-6 px-8 py-4 bg-white/30 backdrop-blur-lg rounded-xl font-serif">
                Contact Us
              </h1>
            </div>
          </div>
          <div className="bg-cover bg-top relative overflow-hidden">
            <div className="absolute inset-0 opacity-60 z-0">
              <img src="/img/radiel1.png" className="opacity-60" />
            </div>
            <div className="container mx-auto px-4 my-16 z-50 relative">
              <h2 className="leading-7 tracking-wide text-5xl mx-auto my-20">
                Fill the form
              </h2>

              <div className="w-full text-[#414143] relative">
                <form action="#" className="space-y-12 mt-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    <div>
                      <label className="text-4xl block font-light mb-2">
                        Name<span className="text-red-500"> *</span>
                      </label>
                      <input
                        placeholder="Full Name"
                        className="w-full py-4 focus:outline-none text-primary text-4xl placeholder-gray-300 border-b border-black/20 font-light"
                        type="text"
                        defaultValue=""
                        name="name"
                        required
                      />
                    </div>
                    <div>
                      <label className="text-4xl block font-light mb-2">
                        Email<span className="text-red-500"> *</span>
                      </label>
                      <input
                        placeholder="your@email.com"
                        className="w-full py-4 focus:outline-none text-primary text-4xl placeholder-gray-300 border-b border-black/20 font-light"
                        type="email"
                        defaultValue=""
                        name="email"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-4xl block font-light mb-2">
                      Subject
                    </label>
                    <input
                      placeholder="Title Here"
                      className="w-full py-4 focus:outline-none text-primary text-4xl placeholder-gray-300 border-b border-black/20 font-light"
                      type="text"
                      defaultValue=""
                      name="subject"
                    />
                  </div>
                  <div>
                    <label className="text-4xl block font-light mb-2">
                      Message<span className="text-red-500"> *</span>
                    </label>
                    <textarea
                      name="message"
                      rows={3}
                      placeholder="Write your message here"
                      className="w-full py-4 focus:outline-none text-primary text-4xl placeholder-gray-300 resize-none border-b border-black/20 font-light"
                      defaultValue={""}
                      required
                    />
                  </div>

                  <button className="p-4 bg-black text-white max-w-lg mx-auto border w-full text-3xl hover:bg-white hover:text-black duration-300 delay-75 ">
                    Send Your Message
                  </button>
                </form>
              </div>
            </div>
          </div>
          <div className="w-full flex justify-center relative">
            <img
              src="/svg/radielwave.svg"
              className="max-w-48 absolute top-0 right-0 rotate-90"
            />
            <div className="w-full border border-gray-300">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
                {/* Email Us */}
                <div className="border-r border-b border-gray-300 p-6 min-h-72 md:border-b">
                  <h3 className="text-4xl font-semibold mb-5 !font-[Lexend] capitalize">
                    Email Us
                  </h3>
                  <p className="text-gray-700 mb-1 text-xl">
                    Email your issues and suggestions for the following
                  </p>
                  <Link
                    to={ARJIV_INFO_EMAIL_URL}
                    className="break-all text-2xl underline"
                  >
                    info@arjiv.com
                  </Link>
                </div>

                {/* Call Us */}
                <div className="border-r border-b border-gray-300 p-6 min-h-72 md:border-b">
                  <h3 className="text-4xl font-semibold mb-5 !font-[Lexend] capitalize">
                    Call Us
                  </h3>
                  <p className="text-gray-700 mb-1 text-xl">
                    From Monday to Friday, 09:00 AM - 06:00 PM (IST)
                  </p>
                  <Link to={CALL_URL} className="break-all text-2xl underline">
                    +91 98983 00984
                  </Link>
                </div>

                <div className="border-r border-b border-gray-300 p-6 min-h-72 md:row-span-2 md:border-b-0 flex flex-col justify-end">
                  <h3 className="text-4xl font-semibold mb-5 !font-[Lexend] capitalize">
                    Support at Every Step
                  </h3>
                  <p className="text-gray-700 text-xl leading-relaxed">
                    From our premium products to secure, reliable shipping,
                    we’ve got every aspect of your experience covered. If you
                    have any questions or need assistance, our friendly support
                    team is always here to help. Reach out to us anytime for
                    quick and reliable assistance we’re committed to ensuring
                    you have the best experience possible.
                  </p>
                </div>

                {/* Head Office */}
                <div className="border-r border-b border-gray-300 p-6 min-h-72 md:border-b-0">
                  <h3 className="text-4xl font-semibold mb-5 !font-[Lexend] capitalize">
                    Head Office
                  </h3>
                  <p className="text-gray-700 text-xl">
                    CC-7085, Bharat Diamond Bourse, BKC, Bandra East,
                    <br />
                    Mumbai, Maharashtra, 400051 - INDIA.
                  </p>
                </div>

                {/* Manufacturing Unit */}
                <div className="border-r border-b border-gray-300 p-6 min-h-72 md:border-b-0">
                  <h3 className="text-4xl font-semibold mb-5 !font-[Lexend] capitalize">
                    Manufacturing Unit Office
                  </h3>
                  <p className="text-gray-700 text-xl">
                    CS NO 3074, Survey NO 412-1 Block NO. 1C,
                    <br />
                    Opp Reshamvala Reyon, Vastadevadi Road Katargam,
                    <br />
                    Surat, Gujarat, 395004 - INDIA.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ContactUs;
