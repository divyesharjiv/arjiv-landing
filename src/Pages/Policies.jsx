import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { ARJIV_EMAIL_URL } from "@/Common";

import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Lenis from "@studio-freight/lenis";

gsap.registerPlugin(ScrollTrigger);

function Policies() {
  const containerRef = useRef(null);

  //   useEffect(() => {
  //     const lenis = new Lenis({ smoothWheel: true, lerp: 0.2 });
  //     const raf = (t) => {
  //       lenis.raf(t);
  //       requestAnimationFrame(raf);
  //     };
  //     requestAnimationFrame(raf);

  //     gsap.utils.toArray(".policies p, .policies h2").forEach((el, i) => {
  //       const beam = document.createElement("div");
  //       beam.style.position = "absolute";
  //       beam.style.inset = "0";
  //       beam.style.height = "0%";
  //       beam.style.background =
  //         "linear-gradient(90deg, transparent, rgba(255,255,255,0.8), transparent)";
  //       el.style.position = "relative";
  //       el.style.overflow = "hidden";
  //       el.appendChild(beam);

  //       gsap.to(beam, {
  //         height: "150%",
  //         opacity: 0,
  //         duration: 2, // much longer
  //         ease: "expo.inOut",
  //         delay: i * 0.5, // lazier stagger
  //         scrollTrigger: {
  //           trigger: el,
  //           start: "top 50%", // lazy trigger
  //         },
  //       });
  //     });
  //   }, []);

  //   useEffect(() => {
  //     const lenis = new Lenis({ smoothWheel: true, lerp: 0.2 });
  //     const raf = (t) => {
  //       lenis.raf(t);
  //       requestAnimationFrame(raf);
  //     };
  //     requestAnimationFrame(raf);

  //     gsap.utils.toArray(".policies p, .policies h2").forEach((el, i) => {
  //       const words = el.textContent.trim().split(" ");
  //       el.innerHTML = words
  //         .map((w) => `<span class="w inline-block">${w}</span>`)
  //         .join(" ");

  //       const wordEls = el.querySelectorAll(".w");

  //       gsap.fromTo(
  //         wordEls,
  //         { y: -25, opacity: 0, filter: "blur(4px)" },
  //         {
  //           y: 0,
  //           opacity: 1,
  //           filter: "blur(0px)",
  //           duration: 0.2,
  //           ease: "elastic.in",
  //           stagger: 0.02,
  //           scrollTrigger: {
  //             trigger: el,
  //             start: "top 80%",
  //           },
  //         }
  //       );
  //     });
  //   }, []);

  useEffect(() => {
    const lenis = new Lenis({ smoothWheel: true, lerp: 0.15 });
    const raf = (t) => {
      lenis.raf(t);
      requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);

    // Add perspective to parent (VERY important for rounding illusion)
    document.querySelector(".policies").style.perspective = "1200px";

    gsap.utils.toArray(".policies p").forEach((el, i) => {
      el.style.transformStyle = "preserve-3d";
      el.style.transformOrigin = "center bottom"; // REAL cylinder pivot

      gsap.fromTo(
        el,
        {
        //   rotateX: 85, // nearly laying backward (wrap-around)
        //   scaleY: -0.1, // very compressed bottom (proper curve)
        //   z: 120, // push backward for deeper roundness
          filter: 'blur(5px)', // push backward for deeper roundness
        },
        {
        //   rotateX: 0,
        //   scaleY: 1,
        //   opacity: 1, // push backward for deeper roundness
        //   z: 0,
          filter: 'blur(0px)', // push backward for deeper roundness
          duration: 1.3,
          ease: "expo.out",
          scrollTrigger: {
            trigger: el,
            start: "top 80%",
          },
        }
      );
    });
  }, []);

  return (
    <main ref={containerRef} className="policies mt-20">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-center text-3xl sm:text-5xl !my-24 uppercase tracking-wide">
          Our Policies
        </h1>
        <div className="flex flex-col space-y-12">
          <div>
            <h2 className="text-3xl !font-medium mb-4 !font-[Lexend]">
              Policy – Supply Chain
            </h2>
            <p className="text-[16px] leading-relaxed text-justify">
              This Policy demonstrates Arjiv Exports is committed and its
              expectations for its product suppliers regarding actions to
              address Conflict Minerals. Arjiv Exports expects its suppliers to
              have in place policies and due diligence measures that will enable
              us to reasonably assure that products and components supplied to
              us containing conflict minerals are DRC conflict free. We being a
              responsible company, Arjiv Exports supports the goal of the
              Dodd-Frank Act of preventing armed groups in the Democratic
              Republic of the Congo and adjoining countries from benefitting
              from the sourcing of Conflict Minerals from that region. Arjiv
              Exports is committed to working with its suppliers to educate them
              on these matters and concerning steps they can take to obtain
              increased transparency regarding the origin of minerals contained
              in the products they manufacture and sell to Arjiv Exports. Arjiv
              Exports reserves the right to request additional documentation
              from its suppliers regarding the origin of any Conflict Minerals
              included in any products sold to Arjiv Exports. Suppliers who do
              not reasonably comply with this Policy shall be reviewed by Arjiv
              Exports for future business.
            </p>
          </div>

          <div>
            <h2 className="text-3xl !font-medium mb-4 !font-[Lexend]">
              Policy – Sourcing
            </h2>
            <p className="text-[16px] leading-relaxed text-justify">
              Arjiv Exports is committed to ensuring that our supply chain is
              free of any metal which was procured for the support or benefit of
              armed and anti social conflict groups or involving serious abuses
              of human rights and non compliant with OECD Guidelines. Arjiv
              Exports clearly criticizes such activity and will reject any
              material which we believe was obtained involving serious human
              rights violations or which benefitted or supported armed rebels or
              terrorist groups through illegal finance or other activities. The
              company shall carry out risk assessment for its supply chain and
              shall not enter into any business relationship or if may require
              then shall suspend/discontinue the engagement with any such
              supplier involved in dealing with Conflict-Affected and High-Risk
              areas, Any form of Human Right Violation; Torture, Cruel, In-Human
              and Degrading Treatment; Forced/Compulsory Labour; Child Labour;
              Abuses such as widespread Sexual Violence; War Crimes; other
              serious violations of International Humanitarian Law, Crime
              against Humanity; Genocide and/or To Bribe or To be Bribed. We
              strictly condemn and prohibit any Direct/Indirect support to
              public/private security forces which illegally Control, Tax or
              Extort money from Mining Sites, Transportation Routes and Upstream
              Sectors. The Company shall carry out due diligence to assess risks
              related to procurement from the Conflict-affected and high-risk
              areas – CAHRAs and shall always source from compliant
              miners/refiners/ traders. We shall always set reasonable efforts
              to source Conflict Minerals from smelters and refiners validated
              as being DRC Conflict Free, and require their direct and indirect
              suppliers to do the same; We strive to work supportively with our
              customers and supply chain partners in implementing conflict
              minerals compliance programs.
            </p>
          </div>

          <div>
            <h2 className="text-3xl !font-medium mb-4 !font-[Lexend]">
              Policy – Due Diligence
            </h2>
            <p className="text-[16px] leading-relaxed text-justify">
              The company shall always undertake to ensure that the extraction
              and trade of diamond support peace and development, not conflict.
              Arjiv Exports remains committed to enhance its Supply Chain Due
              Diligence program through internal review and external
              assessments. We have zero tolerance policy for the supplier
              violating OECD due diligence guideline and we shall immediately
              stop commercial relationship if any of our business associates
              found non-compliant or High-Risk during our internal/external risk
              assessment. Currently Arjiv Exports procure its precious metals
              from RJC-CoC and CoP compliant miners/refiners/traders. However,
              we have established a strong due diligence process and we shall
              review it as and when we observe significant risk or upon receipt
              of any grievance or complaint but in normal course, we shall carry
              our due diligence process on annual basis.
            </p>
          </div>

          <div>
            <h2 className="text-3xl !font-medium mb-4 !font-[Lexend]">
              Grievance Mechanism
            </h2>
            <p className="text-[16px] leading-relaxed text-justify">
              Our employees, suppliers and other parties can report concerns and
              alleged violations of supply chain/sourcing/due diligence policy
              as follows: Email:{" "}
              <Link
                to={ARJIV_EMAIL_URL}
                className="text-blue-600 font-medium underline"
              >
                surat@arjiv.com
              </Link>
              . Reports can be made anonymously and will be kept confidential to
              the fullest extent practicable and allowed by law. We will not
              take any retaliatory action against our employees, suppliers, or
              other parties who make a report in good faith. Our suppliers are
              encouraged to contact{" "}
              <Link
                to={ARJIV_EMAIL_URL}
                className="text-blue-600 font-medium underline"
              >
                surat@arjiv.com
              </Link>{" "}
              if they wish to seek guidance on the application of this Policy.
            </p>
          </div>
        </div>
        <div className="block bg-[#F5F5F5] px-8 py-4 text-center rounded-full my-12 max-w-max mx-auto shadow-inner">
          <h4 className="text-xl font-medium tracking-widest">
            Date: 01/04/2024 | India
          </h4>
        </div>
      </div>
    </main>
  );
}

export default Policies;
