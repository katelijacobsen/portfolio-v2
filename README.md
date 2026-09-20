# Portfolio — Katja Mähleke

Next.js 15 (App Router) portfolio. Tailwind CSS v4 for styling, GSAP for
scroll-driven animation, Motion for page and layout transitions, three.js for
the WebGL hero background.

## Getting started

```bash
npm install
```

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Other scripts: `npm run build` (production build) and `npm start` (serve it).

## Project structure

```
src/
├── app/            Routes only — each page composes components, nothing more
│   ├── layout.tsx          Nav, footer, metadata
│   ├── page.tsx            Home
│   ├── about/              About
│   ├── projects/[slug]/    One project, deep-linkable
│   └── globals.css         Design tokens, base type, shared effect styles
│
├── components/
│   ├── ui/         Primitives: Button, Tag, Flag, SkillIcon, InterestPill
│   ├── layout/     SiteNav, SiteFooter
│   ├── home/       HeroSection, IntroSection, ProjectsSection
│   ├── about/      ProfileIntro, ResumeSection, ResumeCard
│   ├── projects/   ProjectCardStack, ProjectCard, ProjectOverlay, ProjectDetails
│   └── effects/    Animation-heavy pieces: PixelBlast, ScrollReveal,
│                   SkillsMarquee, magic-bento/
│
├── config/site.ts  Site copy, URL, email, nav links, social links
├── data/           Content: projects, experiences, educations, skills, interests
├── hooks/          useProjectCardStack, useIsMobile, useCopyToClipboard,
│                   useBodyScrollLock
├── lib/            gsap.ts (single plugin registration), cn.ts
└── types/          Project, ResumeEntry
```

Import with the `@/` alias (`@/components/ui/Button`), never long relative paths.

## How to make common changes

| I want to…                  | Edit                                                        |
| --------------------------- | ----------------------------------------------------------- |
| Add or edit a project       | `src/data/projects.ts`                                       |
| Add a job or a degree       | `src/data/experiences.ts` / `src/data/educations.ts`         |
| Add a skill to the marquee  | `src/data/skills.ts`                                         |
| Change an interest or flag  | `src/data/interests.ts`                                      |
| Add a page to the nav       | `navLinks` in `src/config/site.ts` (plus the route itself)   |
| Add a social profile        | `socialLinks` in `src/config/site.ts`                        |
| Change the email or SEO copy| `src/config/site.ts`                                         |
| Change colours or spacing   | the `@theme` block in `src/app/globals.css`                  |

None of these require touching a component.

## Conventions

- **Pages compose, components render.** A file in `src/app` should read like a
  table of contents. Markup, data and animation belong in components.
- **Content is data.** Anything that could change without a design change lives
  in `src/data` or `src/config`, typed against `src/types`.
- **Animation is scoped.** GSAP work goes inside a `gsap.context()` and is torn
  down with `context.revert()`, so one component's cleanup never kills another
  component's ScrollTriggers.
- **Plugins register once**, in `src/lib/gsap.ts`. Import `gsap` from there.
- **`src/components/effects/PixelBlast.tsx` is vendored** third-party code.
  Configure it through props rather than editing it.
