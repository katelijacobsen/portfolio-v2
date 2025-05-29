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
const Skills = () => {
  return (
    <>
      <ul className="flex flex-wrap gap-x-small gap-y-small p-0 list-none w-[20rem]">
        <li>
          <Tags skill="HTML" icon={<FaCode />}/>
        </li>
        <li>
          <Tags skill="CSS" icon={<SiCsswizardry />}/>
        </li>
        <li>
          <Tags skill="JavaScript" icon={<AiOutlineJavaScript />}/>
        </li>
        <li>
          <Tags skill="Figma" icon={<FaFigma />}/>
        </li>
        <li>
          <Tags skill="Astro" icon={<SiAstro />}/>
        </li>
        <li>
          <Tags skill="Tailwind" icon={<RiTailwindCssFill />}/>
        </li>
        <li>
          <Tags skill="React" icon={<FaReact />}/>
        </li>
        <li>
          <Tags skill="Next.js" icon={<SiNextdotjs />}/>
        </li>
        <li>
          <Tags skill="Motion" icon={<TbBrandFramerMotion />}/>
        </li>
        <li>
          <Tags skill="GSAP" icon={<PiCirclesFourFill />} className="px-[10px]"/>
        </li>
        <li>
          <Tags skill="Adobe" icon={<SiAdobe />} className="px-[10px]"/>
        </li>
        <li>
          <Tags skill="Jira" icon={<SiJira />} className="px-[10px]"/>
        </li>
      </ul>
    </>
  );
};

export default Skills;
