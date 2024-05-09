"use client";
import { motion } from "framer-motion";
import SectionHeading from "./section-heading";

export default function About() {
  return (
    <motion.section
      className="mb-28 max-w-[45rem] text-center leading-8 sm:mb-40"
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.175 }}
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
