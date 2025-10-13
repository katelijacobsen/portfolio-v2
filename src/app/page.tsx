import Flag from "./components/Flag";
import Interest from "./components/Interest";
import Marquee from "./components/Marquee";
import MagicExperienceBento from "./components/MagicExperienceBento";
import MagicEducationBento from "./components/MagicEducationBento";
import Image from "next/image";

const experiences = [
  {
    imgUrl: "/img/company/relesys.png",
    role: "Digital Designer",
    company: "Relesys A/S",
    year: "2025",
    points: [
      "Design-system",
      "Visual Identity",
      "Wireframing",
      "Prototyping",
      "Sales Mockups",
    ],
  },
  {
    imgUrl: "/img/company/IKEA.png",
    role: "Sales Associate",
    company: "IKEA",
    year: "2023-2025",
    points: [
      "Guide customers through products",
      "Delivery assistance",
      "Improving work schedule routine",
      "Plan care and maintenance",
    ],
  },
  {
    imgUrl: "/img/company/IKEA.png",
    role: "Returns & Claims Associate",
    company: "IKEA",
    year: "2021-2023",
    points: [
      "Improving spare-parts system for colleagues",
      "Assessed items for refund, replacement or repair",
      "Provided guidance on return policies",
      "Handles customer returns and claims",
    ],
  },
  {
    imgUrl: "/img/company/redbarnetungdom.png",
    role: "Tutor",
    company: "Red Barnet Ungdom",
    year: "2025",
    points: [
      "Encouraged learning through patience, motivation and positive reinforcement with children",
      "Encouraged confidence through one-on-one tutoring",
    ],
  },
];
const educations = [
  {
    imgUrl: "/img/company/ek.png",
    role: "Web developer",
    company: "Profession bachelor degree",
    year: "2025",
  },
  {
    imgUrl: "/img/company/ek.png",
    role: "Multimedia design",
    company: "Academic profession degree",
    year: "2023-2025",
  },
  {
    imgUrl: "/img/company/krabbesholm.png",
    role: "Architecture",
    company: "Program",
    year: "2020",
  },
  {
    imgUrl: "/img/company/kvuc.png",
    role: "Psychology",
    company: "High school degree",
    year: "2021",
  },
];

export default function About() {
  return (
    <main className="space-y-sections py-large px-medium md:px-negative max-w-[1280px] m-auto">

    </main>
  );
}
