// Component
import Tags from "./Tags";

// Icons
import { FaCode } from "react-icons/fa6";
import { SiCsswizardry } from "react-icons/si";
import { RiTailwindCssFill } from "react-icons/ri";
import { AiOutlineJavaScript } from "react-icons/ai";
import { FaFigma } from "react-icons/fa";
import { SiAstro } from "react-icons/si";
import { FaReact } from "react-icons/fa";
import { SiNextdotjs } from "react-icons/si";
import { TbBrandFramerMotion } from "react-icons/tb";
import { SiAdobe } from "react-icons/si";
import { PiCirclesFourFill } from "react-icons/pi";
import { SiJira } from "react-icons/si";
const TechSkills = () => {
  return (
    <ul className="flex flex-wrap gap-x-small gap-y-small list-none w-full bg-white p-medium rounded-lg blue-shadow">
      <li>
        <Tags
          skill="HTML"
          icon={<FaCode />}
          bgColor="bg-orange-100"
          txtColor="text-orange-700"
        />
      </li>
      <li>
        <Tags
          skill="CSS"
          icon={<SiCsswizardry />}
          bgColor="bg-violet-100"
          txtColor="text-violet-700"
        />
      </li>
      <li>
        <Tags
          skill="JavaScript"
          icon={<AiOutlineJavaScript />}
          bgColor="bg-amber-100"
          txtColor="text-amber-700"
        />
      </li>
      <li>
        <Tags
          skill="Figma"
          icon={<FaFigma />}
          bgColor="bg-gray-800"
          txtColor="text-slate-50"
        />
      </li>
      <li>
        <Tags
          skill="Astro"
          icon={<SiAstro />}
          bgColor="bg-fuchsia-200"
          txtColor="text-indigo-800"
        />
      </li>
      <li>
        <Tags
          skill="Tailwind"
          icon={<RiTailwindCssFill />}
          bgColor="bg-sky-900"
          txtColor="text-sky-300"
        />
      </li>
      <li>
        <Tags
          skill="React"
          icon={<FaReact />}
          bgColor="bg-cyan-100"
          txtColor="text-cyan-900"
        />
      </li>
      <li>
        <Tags
          skill="Next.js"
          icon={<SiNextdotjs />}
          bgColor="bg-slate-100"
          txtColor="text-slate-800"
        />
      </li>
      <li>
        <Tags
          skill="Motion"
          icon={<TbBrandFramerMotion />}
          bgColor="bg-[#F9EE2C]"
        />
      </li>
      <li>
        <Tags
          skill="GSAP"
          icon={<PiCirclesFourFill />}
          className="px-[10px]"
          bgColor="bg-lime-100"
          txtColor="text-lime-700"
        />
      </li>
      <li>
        <Tags
          skill="Adobe"
          icon={<SiAdobe />}
          className="px-[10px]"
          bgColor="bg-red-50"
          txtColor="text-red-700"
        />
      </li>
      <li>
        <Tags
          skill="Jira"
          icon={<SiJira />}
          className="px-[10px]"
          bgColor="bg-blue-600"
          txtColor="text-blue-50"
        />
      </li>
    </ul>
  );
};

export default TechSkills;
