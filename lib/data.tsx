import todoapp from '@/public/Todoapp.png'
import annonce from '@/public/annonce.png'
import chatapp from '@/public/chatapp.png'
import imtLogo from '@/public/projects/logos/imt.png'
import wysLogo from '@/public/projects/logos/wys.png'
import skaLogo from '@/public/projects/logos/ska.png'
import screenshot from '@/public/screenshot.png'
import React from 'react'
import { CgWorkAlt } from 'react-icons/cg'
import { FaReact } from 'react-icons/fa'
import { LuGraduationCap } from 'react-icons/lu'

import imtCalendar from '@/public/projects/imt/imt_calendar.png'
import imtCreateProject from '@/public/projects/imt/imt_create_project.png'
import imtDashboard from '@/public/projects/imt/imt_dashboard.png'
import imtKanbanBlack from '@/public/projects/imt/imt_kanban_black.png'
import imtKanbanWhite from '@/public/projects/imt/imt_kanban_white.png'
import imtTaskManagement from '@/public/projects/imt/imt_task_management.png'

import skaCreateQuote from '@/public/projects/ska/ska_create_devis.png'
import skaCreateProduct from '@/public/projects/ska/ska_create_product.png'
import skaInvoice from '@/public/projects/ska/ska_invoice.png'
import skaProduct from '@/public/projects/ska/ska_product.png'

import wysAuction from '@/public/projects/wys/wys_auction.png'
import wysHome from '@/public/projects/wys/wys_home.png'
import wysSearch from '@/public/projects/wys/wys_search.png'

export const links = [
  {
    name: 'Home',
    hash: '#home'
  },
  {
    name: 'About',
    hash: '#about'
  },
  {
    name: 'Experience',
    hash: '#experience'
  },
  {
    name: 'professional-projects',
    hash: '#professional-projects'
  },
  {
    name: 'Projects',
    hash: '#projects'
  },
  {
    name: 'Skills',
    hash: '#skills'
  },
  {
    name: 'Contact',
    hash: '#contact'
  }
] as const

export const experiencesData = [
  {
    title: 'Web Developer',
    location: 'Quetratech, Tunisia - Mahdia',
    description: (
      <span style={{ fontSize: '0.9rem' }}>
        At <b className="text-emerald-700">Quetratech</b>, I demonstrated my expertise as a Web
        Developer by building scalable projects from the ground up using React. I delivered
        customized features, <b style={{ color: 'rgb(5 150 105)' }}>optimized performance</b>, and
        implemented <b style={{ color: 'rgb(5 150 105)' }}>modern development approaches</b> to
        create efficient, user-centric solutions.
      </span>
    ),
    icon: React.createElement(CgWorkAlt),
    date: '2024 - present'
  },
  {
    title: 'MERN Stack Developer / Project Manager',
    location: 'Tradrly, Tunisia - Mahdia',
    description: (
      <span style={{ fontSize: '0.9rem' }}>
        At <b>Tradrly</b>, I built a production project from scratch using the MERN stack and
        Electron.js. It successfully reached production, delivering robust features. My fast
        learning and problem-solving skills ensured a{' '}
        <b style={{ color: 'rgb(225 29 72)' }}>scalable</b> and{' '}
        <b style={{ color: 'rgb(225 29 72)' }}>efficient</b> solution.
      </span>
    ),
    icon: React.createElement(CgWorkAlt),
    date: '2024'
  },
  {
    title: 'Full-Stack Developer Freelance',
    location: 'Tunis, Mahdia',
    description:
      'Worked as a freelancer, gaining local opportunities to contribute to their ideas and help them realize their vision.',
    icon: React.createElement(FaReact),
    date: '2023 - 2024',
    projects: [
      {
        projectName: 'Thotarts - uncompleted',
        projectDescription:
          'Thotarts is a store offering real paintings, each with a unique QR code that verifies its originality, showcasing a practical example of the NFT concept.',
        projectTechStack: ['Framer Motion', 'Next.js', 'Typescript', 'Tailwind CSS'],
        link: 'https://www.thotarts.com/'
      },
      {
        projectName: 'Yalla-Tunisia',
        projectDescription:
          'Yalla Tunisia is a tourism app offering city-based guidance and services, showcasing local stores with panoramic views. This includes local crafts, entertainment like diving and quad biking, and connecting with local guides for personalized experiences.',
        projectTechStack: ['Next.js', 'Typescript', 'Google Maps API', 'Tailwind CSS', 'Firebase'],
        link: 'https://yalla-tunisia.vercel.app/'
      }
    ]
  },
  {
    title: 'College graduation',
    location: 'Institute of Higher Computing of Mahdia (ISIMA)',
    description:
      'Graduated from ISI Mahdia, specializing in computing, equipped with skills for innovative problem-solving in tech.',
    icon: React.createElement(LuGraduationCap),

    date: '2020 - 2023'
  },
  {
    title: 'Full-Stack Developer internship',
    location: '@Datum - Tech',
    description:
      'Full-Stack Developer internship at @DATOM, gaining hands-on experience in web development over 6 months.',
    icon: React.createElement(CgWorkAlt),
    date: '2023'
  }
] as const

export const projectsData = [
  {
    title: 'Screenshots - Using electron js',
    description:
      "A simple electron js app that takes screenshots of the user's screen. The app is built using electron js, React, and Tailwind CSS.",
    tags: ['Electron', 'React', 'Tailwind CSS', 'Nodejs', 'Firebase'],
    imageUrl: screenshot,
    sourceCode: 'https://github.com/Chamesss/screenshots-eletron-app'
  },
  {
    title: 'Do-it',
    description:
      'A cross-platform task manager designed for learning. It offers a user-friendly interface for effortless task creation, organization, and tracking.',
    tags: ['Expo', 'ReactNative', 'Tailwind CSS', 'Redux ', 'Sqlite'],
    imageUrl: todoapp,
    sourceCode: 'https://github.com/Chamesss/Do-It'
  },
  {
    title: 'EchoVerse',
    description:
      "EchoVerse: A full-stack project for learning. It's a Messenger (Meta clone) where users can log in, chat, and send messages while appearing online.",
    tags: ['React', 'Chakra UI', 'Socket IO', 'Nodejs ', 'MongoDB'],
    imageUrl: chatapp,
    sourceCode: 'https://github.com/Chamesss/EchoVerse'
  },
  {
    title: 'Annonce',
    description:
      'For my end-of-studies project, I developed a web app called <<Annonce>> where users can publish and sell items. The app uses geolocation for enhanced product proximity.',
    tags: ['React', 'Nodejs', 'OpenStreetMaps', 'MongoDB', 'Microsoft Azure'],
    imageUrl: annonce,
    sourceCode: 'https://github.com/Chamesss?tab=repositories'
  }
] as const

// Professional Projects Data
export const professionalProjectsData = [
  {
    id: 1,
    header: 'WYS',
    logo: wysLogo,
    title: 'World Yacht Store',
    description: [
      'A yacht & berth marketplace that simplifies live auctions, sales, and charters for MN LAND & SEA S.R.L.',
      'Empowers users to easily bid, buy, or charter yachts online, streamlining a previously complex process.',
      'Widely adopted with positive user feedback, improving efficiency and customer satisfaction across the platform.'
    ],
    images: [wysHome, wysSearch, wysAuction],
    liveUrl: 'https://worldyachtstore.com'
  },
  {
    id: 2,
    header: 'SKA',
    logo: skaLogo,
    title: 'Skartisanal',
    description: [
      'A cross-platform desktop app that helps businesses seamlessly manage inventory and WooCommerce products.',
      'Simplifies daily operations with product control, client management, and invoicing, saving time and reducing errors.',
      'Received positive client feedback for improving workflow efficiency and streamlining online store management.'
    ],
    images: [skaCreateProduct, skaProduct, skaCreateQuote, skaInvoice],
    liveUrl: null
  },
  {
    id: 3,
    header: 'IMT',
    logo: imtLogo,
    title: 'Intelligent Management Tracker (IMT)',
    description: [
      'A B2B productivity tracker delivered as an alpha release, designed to monitor work time, activity, and project progress for freelancers and teams.',
      'Helps managers and businesses gain actionable insights through performance tracking, screenshots, and task management.',
      'Improves accountability and efficiency, allowing teams to focus on results while keeping transparent records of work.'
    ],
    images: [
      imtDashboard,
      imtKanbanBlack,
      imtKanbanWhite,
      imtTaskManagement,
      imtCalendar,
      imtCreateProject
    ],
    liveUrl: 'https://im-tracker.net/'
  }
]

export const skillsData = [
  'Javascript',
  'Typescript',
  'React.js',
  'Next.js',
  'React Native',
  'Electron.js',
  'Hooks',
  'Redux',
  'Zustand',
  'CSS',
  'UI Libraries',
  'Tailwind CSS',
  'Node.js',
  'Express.js',
  'Socket.io',
  'MongoDB',
  'Docker',
  'CPanel',
  'Firebase',
  'Git',
  'Geocode APIs',
  'RESTful APIs'
] as const
