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
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ipsam
        blanditiis laudantium non deleniti, quisquam repellat eligendi
        consequatur ratione. Vitae veritatis dignissimos distinctio vero fugit
        consectetur illum officiis tenetur maiores sapiente.
      </p>
      <p>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ratione
        officiis vel modi aperiam nemo totam expedita omnis inventore laborum
        nulla nesciunt suscipit illum consequuntur, vero distinctio, in corporis
        quis nobis.
      </p>
    </motion.section>
  );
}
