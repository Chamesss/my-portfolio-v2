import React from "react";
import { CgWorkAlt } from "react-icons/cg";
import { FaReact } from "react-icons/fa";
import { LuGraduationCap } from "react-icons/lu";
import chatapp from "@/public/chatapp.png";
import todoapp from "@/public/Todoapp.png";
import annonce from "@/public/annonce.png"

export const links = [
    {
        name: "Home",
        hash: "#home",
    },
    {
        name: "About",
        hash: "#about",
    },
    {
        name: "Projects",
        hash: "#projects",
    },
    {
        name: "Skills",
        hash: "#skills",
    },
    {
        name: "Experience",
        hash: "#experience",
    },
    {
        name: "Contact",
        hash: "#contact",
    },
] as const;

export const experiencesData = [
    {
        title: "Full-Stack Developer Freelance",
        location: "Tunis, Mahdia",
        description:
            "I'm now a full-stack developer working as a freelancer. My stack includes React, Next.js, TypeScript, Tailwind, Firebase, MongoDB, etc... I'm open to full-time opportunities.",
        icon: React.createElement(FaReact),
        date: "2023 - present",
    },
    {
        title: "College graduation",
        location: "Institute of Higher Computing of Mahdia (ISIMA)",
        description:
            "Graduated from ISIMA, Mahdia, specializing in computing, equipped with skills for innovative problem-solving in tech.",
        icon: React.createElement(LuGraduationCap),

        date: "2020 - 2023",
    },
    {
        title: "Full-Stack Developer internship",
        location: "@DATOM",
        description:
            "Full-Stack Developer internship at @DATOM, gaining hands-on experience in web development over 6 months.",
        icon: React.createElement(CgWorkAlt),
        date: "2023",
    },
] as const;

export const projectsData = [
    {
        title: "Do-it",
        description:
            "A cross-platform task manager designed for learning. It offers a user-friendly interface for effortless task creation, organization, and tracking.",
        tags: ["Expo", "ReactNative", "Tailwind", "Redux ", "Sqlite"],
        imageUrl: todoapp,
        sourceCode: "https://github.com/Chamesss/Do-It"
    },
    {
        title: "EchoVerse",
        description:
            "EchoVerse: A full-stack project for learning. It's a Messenger (Meta clone) where users can log in, chat, and send messages while appearing online.",
        tags: ["React", "Chakra UI", "Socket IO", "Nodejs ", "MongoDB"],
        imageUrl: chatapp,
        sourceCode: "https://github.com/Chamesss/EchoVerse"
    },
    {
        title: "Annonce",
        description:
            "For my end-of-studies project,, I developed a web app called <<Annonce>> where users can publish and sell items. The app uses geolocation for enhanced product proximity.",
        tags: ["React", "Nodejs", "OpenStreetMaps", "MongoDB", "Microsoft Azure"],
        imageUrl: annonce,
        sourceCode: "https://github.com/Chamesss?tab=repositories"
    },
] as const;

export const skillsData = [
    "HTML",
    "CSS",
    "JavaScript",
    "TypeScript",
    "React",
    "Figma",
    "Next.js",
    "Node.js",
    "Git",
    "Tailwind",
    "ChakraUI",
    "NextUI",
    "MongoDB",
    "Redux",
    "SCSS",
    "Expo",
    "ReactNative",
    "Vite",
    "Hooks",
    "Framer Motion",
    "Firebase",
    "OpenStreetMaps API",
    "GoogleMapsAPI"
] as const;