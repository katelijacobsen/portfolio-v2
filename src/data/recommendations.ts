import type { Recommendation } from "@/types";

/**
 * Transcribed verbatim from the signed PDF letters, minus the signature blocks:
 * the referees' names, email addresses and phone number are intentionally left
 * out (see `Recommendation`). Newest first.
 */
export const recommendations: Recommendation[] = [
  {
    id: "ek-web-development",
    title: "Associate Professor",
    organisation: "Erhvervsakademi KBH",
    relationship: "Web development lecturer",
    date: "2026-07-04",
    imgUrl: "/img/company/ek.png",
    highlight:
      "She has proven herself to be a motivated learner who can adapt quickly to new technologies and changing requirements.",
    letter: [
      "I am pleased to write this letter of recommendation for Katja, who has been my student in web development. During her studies, she has consistently demonstrated a strong work ethic, curiosity, and a genuine commitment to learning.",
      "Katja has developed a solid foundation in web technologies and has shown the ability to apply both theoretical concepts and practical skills to her projects. She approaches challenges with determination, pays close attention to detail, and is always willing to explore new solutions. Her enthusiasm for web development is evident in the quality of her work and her willingness to continuously improve her technical abilities.",
      "Beyond her technical skills, Katja is dependable, professional, and works well with others. She communicates effectively, accepts feedback constructively, and demonstrates the initiative needed to succeed in both academic and professional environments. She has proven herself to be a motivated learner who can adapt quickly to new technologies and changing requirements.",
      "I am confident that Katja will be an asset to any academic program, internship, or organization she joins. She possesses the technical aptitude, dedication, and positive attitude necessary to excel in the field of web development.",
      "I recommend Katja without reservation and believe she has a bright future ahead.",
    ],
  },
  {
    id: "relesys-internship",
    title: "Design Manager",
    organisation: "Relesys A/S",
    relationship: "Internship manager",
    date: "2025-07-21",
    imgUrl: "/img/company/relesys.png",
    highlight:
      "I would like to specifically highlight Katja’s creative coding with CSS to implement the designs she created within Figma.",
    letter: [
      "It is with great pleasure that I recommend Katja Mähleke. I had the wonderful opportunity to manage and spar with Katja while she was an intern at our company. I was immensely pleased with her level of talent, skill, and her willingness to work on every type of task that she was assigned to.",
      "Considering the fact that Katja was able to grasp the somewhat difficult systems that we work with quite quickly, I believe that she will integrate well into any new system that she is faced with in the future easily. She was always willing and able to ask the right questions to solve any design problem with both quality and efficiency in mind, making her a well-rounded designer on our team. As someone who was in charge of making sure all of our deadlines were met, having Katja on our team was beneficial because she was always ready to jump into the next task.",
      "Katja has experience working on tasks such as rapid prototyping and development of mobile apps in our internal CMS system. I would like to specifically highlight Katja’s creative coding with CSS to implement the designs she created within Figma, she has a knack for code that was really beneficial to her projects that she worked on at Relesys. She worked within all of the latest updates to Figma and was always eager to use creative and out-of-the-box thinking to create designs that pleased our clients.",
      "Katja has a good understanding of creative problem solving and creative coding. She is curious, dedicated, and has a driven attitude that she brought to the team. On top of that, she is a fast learner and a dedicated team member. For these reasons she would be an asset to any team that she joins!",
      "I hope you will consider Katja for the open position. I believe she will be a fantastic addition to any team.",
    ],
  },
];
