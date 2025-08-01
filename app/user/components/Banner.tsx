"use client";

import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

const Banner: React.FC<{ playAnimation: boolean }> = ({ playAnimation }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [bannerCount, setBannerCount] = useState(0);

  useEffect(() => {
    calBannerCount();

    window.addEventListener("resize", calBannerCount);
    return () => window.removeEventListener("resize", calBannerCount);
  }, []);

  useGSAP(
    () => {
      const tl = gsap
        .timeline({
          paused: true,
        })
        .to("#banner-blue-container", {
          delay: 1,
          ease: "power1.in",
          opacity: 1,
          rotate: -3,
          y: 0,
        })
        .to(
          "#banner-white-container",
          {
            ease: "power1.in",
            opacity: 1,
            rotate: 3,
            y: 0,
          },
          "<+0.4",
        )
        .to(
          "#banner-white",
          {
            duration: 20,
            ease: "none",
            repeat: -1,
            xPercent: 0,
          },
          "<-0.4",
        )
        .to(
          "#banner-blue",
          {
            duration: 20,
            ease: "none",
            repeat: -1,
            xPercent: -50,
          },
          "<-0.4",
        );

      if (playAnimation) tl.play();
    },
    { scope: containerRef, dependencies: [playAnimation] },
  );

  const calBannerCount = () => {
    const windowW = window.innerWidth;
    let bannerImgW: number;

    if (windowW < 640) bannerImgW = Math.floor(windowW / (30 * 3));
    else if (windowW < 768) bannerImgW = Math.floor(windowW / (34.4 * 3));
    else if (windowW < 1024) bannerImgW = Math.floor(windowW / (38.8 * 3));
    else if (windowW < 1280) bannerImgW = Math.floor(windowW / (45.4 * 3));
    else if (windowW < 1536) bannerImgW = Math.floor(windowW / (52 * 3));
    else bannerImgW = Math.floor(windowW / (58.6 * 3));

    setBannerCount(bannerImgW);
  };

  return (
    <div ref={containerRef} className="relative z-[1] mt-[2em] sm:mt-0">
      {/* White banner */}
      <div
        id="banner-white-container"
        className="translate-y-1/4 overflow-x-clip bg-white opacity-0 shadow-[0.1em_0.1em_0.5em_rgba(0,0,0,0.4)] lg:absolute lg:right-0 lg:bottom-0 lg:left-0"
      >
        <div
          id="banner-white"
          className="grid h-[30px] w-[200%] -translate-x-1/2 grid-cols-2 sm:h-[34.4px] md:h-[38.8px] lg:h-[45.4px] xl:h-[52px] 2xl:h-[58.6px]"
        >
          {Array.from({ length: 2 }).map((_, i) => (
            <div key={i} className="flex justify-around">
              {Array.from({ length: bannerCount }).map((_, i) => (
                <div key={i} className="h-full">
                  <svg
                    viewBox="0 0 150 50"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-full"
                  >
                    <rect width="150" height="50" fill="white" />
                    <path
                      d="M26.486 35.5V20.29H21.13V16.338H36.704V20.29H31.348V35.5H26.486ZM38.6638 35.5V16.338H53.2238V20.29H43.5257V23.826H52.2618V27.492H43.5257V31.548H53.2238V35.5H38.6638ZM58.7016 35.5L55.8156 32.614V19.224L58.7016 16.338H68.5556L71.4676 19.224V23.098H66.7356V20.94L65.7996 20.03H61.6136L60.6776 20.94V30.898L61.6136 31.808H65.9556L66.9176 30.898V28.714H71.6236V32.614L68.7376 35.5H58.7016ZM73.7536 35.5V16.338H78.6156V23.462H85.1416V16.338H90.0036V35.5H85.1416V27.258H78.6156V35.5H73.7536ZM96.0005 35.5L93.1145 32.614V19.224L96.0005 16.338H105.854L108.766 19.224V23.098H104.034V20.94L103.098 20.03H98.9125L97.9765 20.94V30.898L98.9125 31.808H103.254L104.216 30.898V28.714H108.922V32.614L106.036 35.5H96.0005ZM111.052 35.5V16.338H123.558L127.536 20.316V31.522L123.558 35.5H111.052ZM115.914 31.808H121.452L122.83 30.43V21.408L121.452 20.03H115.914V31.808Z"
                      fill="black"
                    />
                  </svg>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Blue banner */}
      <div
        id="banner-blue-container"
        className="absolute right-0 bottom-0 left-0 translate-y-1/4 overflow-x-clip bg-primary opacity-0 shadow-[0.1em_0.1em_0.5em_rgba(0,0,0,0.4)]"
      >
        <div
          id="banner-blue"
          className="grid h-[30px] w-[200%] grid-cols-2 sm:h-[34.4px] md:h-[38.8px] lg:h-[45.4px] xl:h-[52px] 2xl:h-[58.6px]"
        >
          {Array.from({ length: 2 }).map((_, i) => (
            <div key={i} className="flex justify-around">
              {Array.from({ length: bannerCount }).map((_, i) => (
                <div key={i} className="h-full">
                  <svg
                    viewBox="0 0 150 50"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-full"
                  >
                    <rect width="150" height="50" fill="primary" />
                    <path
                      d="M26.486 35.5V20.29H21.13V16.338H36.704V20.29H31.348V35.5H26.486ZM38.6638 35.5V16.338H53.2238V20.29H43.5257V23.826H52.2618V27.492H43.5257V31.548H53.2238V35.5H38.6638ZM58.7016 35.5L55.8156 32.614V19.224L58.7016 16.338H68.5556L71.4676 19.224V23.098H66.7356V20.94L65.7996 20.03H61.6136L60.6776 20.94V30.898L61.6136 31.808H65.9556L66.9176 30.898V28.714H71.6236V32.614L68.7376 35.5H58.7016ZM73.7536 35.5V16.338H78.6156V23.462H85.1416V16.338H90.0036V35.5H85.1416V27.258H78.6156V35.5H73.7536ZM96.0005 35.5L93.1145 32.614V19.224L96.0005 16.338H105.854L108.766 19.224V23.098H104.034V20.94L103.098 20.03H98.9125L97.9765 20.94V30.898L98.9125 31.808H103.254L104.216 30.898V28.714H108.922V32.614L106.036 35.5H96.0005ZM111.052 35.5V16.338H123.558L127.536 20.316V31.522L123.558 35.5H111.052ZM115.914 31.808H121.452L122.83 30.43V21.408L121.452 20.03H115.914V31.808Z"
                      fill="white"
                    />
                  </svg>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Banner;
