"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";
import { BsArrowRight, BsLinkedin } from "react-icons/bs";
import { HiDownload } from "react-icons/hi";
import { FaGithubSquare } from "react-icons/fa";
import { useSectionInView } from "@/lib/hooks";
import { useActiveSectionContext } from "@/context/active-section-context";
import { TypeAnimation } from "react-type-animation";
import { useState } from "react";

export default function Intro() {
  const { ref } = useSectionInView("Home", 0.5);
  const { setActiveSection, setTimeOfLastClick } = useActiveSectionContext();
  const [terminated, setTerminated] = useState(false);
  return (
    <section
      ref={ref}
      id="home"
      className="mb-2 max-w-[50rem] w-full text-center sm:mb-0 scroll-mt-96 flex items-center justify-center flex-col"
    >
      <div className="flex items-center justify-center">
        <div className="relative">
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              type: "tween",
              duration: 0.2,
            }}
          >
            <Image
              src={"/mypicture.jpg"}
              alt="profile-picture"
              width={640}
              height={640}
              quality={95}
              priority={true}
              className="w-[10rem] h-[10rem] rounded-full border-[0.1rem] border-white object-cover shadow-xl"
            />
          </motion.div>
          <motion.span
            className="absolute bottom-0 right-0 text-4xl"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              type: "spring",
              stiffness: 125,
              delay: 0.1,
              duration: 0.7,
            }}
          >
            👋
          </motion.span>
        </div>
      </div>
      <motion.span
        className="mb-10 mt-8 px-4 font-medium text-xl !leading-[1.5] sm:text-2xl min-h-[14rem] sm:min-h-[9rem] max-w-[50rem] flex flex-col items-center justify-start"
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <TypeAnimation
          sequence={[
            "Hello, I'm Chamsedin Azouz, a passionate full stack developer ready to innovate and create.",
            1000,
            () => {
              setTerminated(true);
            },
          ]}
          wrapper="span"
          cursor={true}
          repeat={0}
          style={{
            display: "block",
          }}
        />
        {terminated && (
          <TypeAnimation
            sequence={[
              "I'm a versatile full stack developer. I craft dynamic web solutions.",
              2000,
              "Building web applications is not just my job; it's my craft. Let's create something extraordinary together.",
              2000,
              () => {
                setTerminated(true);
              },
            ]}
            wrapper="span"
            cursor={true}
            repeat={Infinity}
            style={{
              display: "block",
            }}
          />
        )}
      </motion.span>
      <motion.div
        className="flex flex-col sm:flex-row items-center justify-center gap-4 px-4 text-lg font-medium"
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.2,
        }}
      >
        <Link
          className="group bg-gray-900 text-white px-7 py-3 flex items-center gap-2 rounded-full outline-none focus:scale-110 hover:scale-110 hover:bg-gray-950 active:scale-105 transition"
          href="#contact"
          onClick={() => {
            setActiveSection("Contact");
            setTimeOfLastClick(Date.now());
          }}
        >
          Contact me here{" "}
          <BsArrowRight className="opacity-70 group-hover:translate-x-1 transition" />
        </Link>
        <a
          className="group cursor-pointer bg-white px-7 py-3 flex items-center gap-2 rounded-full outline-none focus:scale-110 hover:scale-110 active:scale-105 transition border border-black/10 dark:bg-white/10 dark:text-white/80 hover:backdrop-brightness-80"
          href="/cv.pdf"
          download
        >
          Download CV{" "}
          <HiDownload className="opacity-60 dark:opacity-80 group-hover:translate-y-1 transition" />
        </a>
        <a
          href="https://www.linkedin.com/in/chamsedin-azouz-613a77245/"
          target="_blank"
          className="bg-white p-4 text-gray-700 flex items-center gap-2 rounded-full outline-none focus:scale-[1.15] hover:scale-[1.15] hover:text-gray-950 active:scale-105 transition border border-black/10 cursor-pointer dark:bg-white/10 dark:text-white/80"
        >
          <BsLinkedin />
        </a>
        <a
          href="https://github.com/Chamesss"
          target="_blank"
          className="bg-white  p-4 text-gray-700 flex items-center gap-2 rounded-full text-[1.20rem] outline-none focus:scale-[1.15] hover:scale-[1.15] hover:text-gray-950 active:scale-105 transition border border-black/10 cursor-pointer dark:bg-white/10 dark:text-white/80"
        >
          <FaGithubSquare />
        </a>
      </motion.div>
    </section>
  );
}
