"use client";
import { motion } from "framer-motion";
import SectionHeading from "./section-heading";
import { useSectionInView } from "@/lib/hooks";

export default function About() {
  const { ref } = useSectionInView("About");

  return (
    <motion.section
      ref={ref}
      className="mb-28 max-w-[45rem] text-center leading-8 sm:mb-40 scroll-mt-28"
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.175 }}
      id="about"
    >
      <SectionHeading>About me</SectionHeading>
      <p className="mb-3">
        My main <b>focus</b> is on making{" "}
        <span className="underline">stunning</span> and{" "}
        <span className="underline">efficient</span> web experiences that users{" "}
        <span className="text-rose-500">
          <b>love</b>
        </span>
        .
      </p>
      <p>
        I'm constantly learning and improving, blending design and tech know-how
        to create innovative solutions. My goal is to craft web applications
        that look great, work seamlessly, and leave a lasting impression on
        users.
      </p>
    </motion.section>
  );
}
