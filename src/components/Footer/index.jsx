import React, { useRef, useEffect } from "react";

import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF, Center, Environment } from "@react-three/drei";

import { Link } from "react-router-dom";
import {
  APP_STORE_APP_URL,
  ARJIV_INFO_EMAIL_URL,
  CALL_URL,
  FACEBOOK_URL,
  INSTAGRAM_URL,
  LINKEDIN_URL,
  PLAY_STORE_APP_URL,
  WHATSAPP_URL,
} from "@/Common";

import ARJIVSVG from "/svg/ARJIV2.svg";
import CRYSTAL from "/img/CRYSTAL.jpg";
import diamondGLB from "/models/diamond3.glb";

const FOOTER_MENU = [
  {
    label: "Our History",
    url: "/our-history",
  },
  {
    label: "What We Do",
    url: "/what-we-do",
  },
  {
    label: "CSR",
    url: "/csr",
  },
  {
    label: "Contact Us",
    url: "/contact-us",
  },
  {
    label: "News & Updates",
    url: "/news",
  },
  {
    label: "Events",
    url: "/events",
  },
  {
    label: "RJC Policy",
    url: "/rjc-policy",
  },
  {
    label: "Sitemap",
    url: "/sitemap",
  },
];

export default function ArchitectsFooter() {
  function DiamondGLB() {
    const model = useGLTF(diamondGLB);
    const ref = useRef();

    useEffect(() => {
      const diamondMaterial = new THREE.MeshPhysicalMaterial({
        metalness: 0,
        roughness: 0.1,
        transmission: 1,
        clearcoat: 2,
        clearcoatRoughness: 0.7,
        ior: 3.417,
        reflectivity: 0,
        envMapIntensity: 2,
        color: new THREE.Color(0x000000),
      });

      model.scene.traverse((child) => {
        if (child.isMesh) {
          child.material = diamondMaterial;
          child.castShadow = true;
          child.receiveShadow = true;
        }
      });
    }, [model]);

    useFrame(() => {
      if (ref.current) {
        ref.current.rotation.y += 0.005;
      }
    });

    return (
      <Center>
        <primitive
          ref={ref}
          object={model.scene}
          scale={0.65}
          rotation={[-Math.PI / 5, 0, 0]}
        />
      </Center>
    );
  }

  return (
    <footer className="relative w-full overflow-hidden flex items-center justify-center select-none bg-[#f5f5f5]">
      <section className="overflow-hidden bg-bright-50">
        <div className="container mx-auto">
          <div className="flex flex-col pt-24 lg:flex-row lg:flex-wrap">
            <div className="flex flex-col items-center gap-y-6 md:w-full md:flex-row md:items-start md:justify-center md:gap-y-0 md:gap-x-6 xl:w-4/12 xl:items-start xl:justify-start xl:flex-col xl:gap-y-6 xxl:w-1/2">
              <div className="text-center md:text-left">
                <p>
                  Look­ing for more info?{" "}
                  <Link className="underline" to="mailto:info@arjiv.com">
                    Get in touch
                  </Link>{" "}
                  with us.
                </p>
              </div>
              <ul className="flex flex-col items-center space-y-7 md:items-start">
                <li>
                  <Link
                    to={CALL_URL}
                    title={CALL_URL}
                    className="border p-2 rounded-4xl !bg-lime-100"
                  >
                    Contact — +91 989 8300 984
                  </Link>
                </li>
                <li>
                  <Link
                    className="border p-2 rounded-4xl !bg-lime-100"
                    to={ARJIV_INFO_EMAIL_URL}
                    title={ARJIV_INFO_EMAIL_URL}
                  >
                    Mail — info@arjiv.com
                  </Link>
                </li>
              </ul>
              <div className="flex lg:justify-start gap-2 items-center mt-8">
                <Link
                  rel="noopener noreferrer"
                  title="Download on the App Store"
                  to={APP_STORE_APP_URL}
                  target="_blank"
                >
                  <img
                    alt="Download from App Store"
                    className="w-38 h-auto shadow-md"
                    src="https://www.arjivexports.com/static/media/app-store-white.1afd2b718e38efd5968277d147cb032c.svg"
                    title="Download from App Store"
                  />
                </Link>
                <Link
                  rel="noopener noreferrer"
                  title="Download on Google Play Store"
                  to={PLAY_STORE_APP_URL}
                  target="_blank"
                >
                  <img
                    alt="Download from Play Store"
                    className="w-38 h-auto shadow-md"
                    src="https://www.arjivexports.com/static/media/play-store-white.0efeed89c32a8f2418243971382c8a83.svg"
                  />
                </Link>
              </div>
            </div>

            <div
              className="w-auto lg:w-full lg:mt-16 lg:max-w-4xl lg:mx-auto xl:w-6/12 xl:mt-0 xxl:w-5/12"
              aria-label="Quicklinks"
            >
              <ul className="flex flex-col px-6 gap-y-4 md:grid md:grid-cols-2 md:gap-x-16 lg:px-0">
                {FOOTER_MENU.map((item) => (
                  <li key={item.label}>
                    <Link
                      to={item.url}
                      className="group flex items-center justify-between w-full pb-1 leading-tight border-b border-black text-2xl"
                    >
                      <span>{item.label}</span>

                      <span className="icon icon-basic-arrow-right ml-4 text-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        <img
                          className="w-14 h-5 object-cover"
                          src="https://www.svgrepo.com/show/494664/arrow-right.svg"
                        />
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <nav
              className="w-auto lg:w-full xl:w-1/12"
              aria-label="Social Media"
            >
              <ul className="grid grid-cols-2 gap-2">
                <li>
                  <Link
                    aria-label="Facebook"
                    className="flex items-center justify-center p-1 border border-gray-400 rounded-full aspect-square"
                    target="_blank"
                    to={FACEBOOK_URL}
                  >
                    <img
                      className="w-8 h-8"
                      src="https://cdn-icons-png.flaticon.com/512/5968/5968764.png"
                      alt="Facebook"
                      title="Facebook"
                    />
                  </Link>
                </li>
                <li>
                  <Link
                    aria-label="Instagram"
                    className="flex items-center justify-center p-1 border border-gray-400 rounded-full aspect-square"
                    target="_blank"
                    to={INSTAGRAM_URL}
                  >
                    <span className="icon icon-social-instagram">
                      <img
                        className="w-8 h-8"
                        src="https://cdn-icons-png.flaticon.com/512/1384/1384063.png"
                        alt="Instagram"
                        title="Instagram"
                      />
                    </span>
                  </Link>
                </li>
                <li>
                  <Link
                    aria-label="LinkedIn"
                    className="flex items-center justify-center p-1 border border-gray-400 rounded-full aspect-square"
                    target="_blank"
                    to={LINKEDIN_URL}
                  >
                    <span className="icon icon-social-linkedin">
                      <img
                        className="w-8 h-8"
                        src="https://cdn-icons-png.flaticon.com/512/174/174857.png"
                        alt="LinkedIn"
                        title="LinkedIn"
                      />
                    </span>
                  </Link>
                </li>
                <li>
                  <Link
                    aria-label="Whatsapp"
                    className="flex items-center justify-center p-1 border border-gray-400 rounded-full aspect-square"
                    target="_blank"
                    to={WHATSAPP_URL}
                  >
                    <span className="icon icon-social-whatsapp">
                      <img
                        className="w-8 h-8"
                        src="https://cdn-icons-png.flaticon.com/512/733/733585.png"
                        alt="Whatsapp"
                        title="Whatsapp"
                      />
                    </span>
                  </Link>
                </li>
              </ul>
            </nav>
            <div className="flex items-center justify-center w-full xl:justify-between lg:mt-16 xl:mt-32 xxl:mt-36">
              <Link
                to={"/"}
                className="hidden xl:block"
                aria-label="Arjiv Exports"
              >
                <img
                  src="https://www.arjivexports.com/static/media/arjiv-exports-w.ae506152548491e0ea16.png"
                  className="max-w-60 invert"
                />
              </Link>
              <div
                aria-label="Legal"
                className="w-full mx-auto mt-10 xl:w-auto xl:mt-0 xl:ml-auto xl:mr-0 xxl:w-1/2 max-w-prose leading-6"
              >
                <ul className="flex flex-wrap justify-center gap-2 lg:gap-6 xxl:justify-between type-xs">
                  <li className="w-full text-center lg:w-auto">
                    © {new Date().getFullYear()} ARJIV EXPORTS. All Rights
                    Reserved.
                  </li>
                  <li>
                    <Link
                      to="/policies"
                      aria-label="policies"
                      className="underline"
                    >
                      Policies
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/rjc-policy"
                      aria-label="RJC Policy"
                      className="underline"
                    >
                      RJC Policy
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <hr className="flex-grow block w-full scale-x-110 mt-12 border-t border-t-black" />
          </div>
        </div>
      </section>

      <div className="relative z-10 w-full flex justify-center gap-16 items-center">
        <img src={ARJIVSVG} alt="logo" className="w-[70vw] max-w-none h-fit" />

        <div className="w-96 h-96 overflow-hidden">
          {/* // For the Diamond3.glb */}
          <Canvas camera={{ position: [0, 1, 1] }} className="animate-polish">
            {/* <Canvas camera={{ position: [0, 4, 5] }}> */}
            <color attach="background" args={["#f5f5f5"]} />

            <ambientLight intensity={0} />
            <directionalLight position={[5, 5, 5]} intensity={1} castShadow />
            <directionalLight position={[-5, 5, -5]} intensity={0.5} />
            <pointLight position={[0, 10, 0]} intensity={1} />
            <spotLight
              position={[10, 50, 10]}
              angle={0.1}
              penumbra={45}
              intensity={2}
              castShadow
            />
            <Environment files={CRYSTAL} background={false} />
            <DiamondGLB />
            <OrbitControls
              enableZoom={false}
              enableRotate={false}
              enablePan={false}
            />
          </Canvas>
        </div>
      </div>
    </footer>
  );
}
