/** A single portfolio project, as rendered in the card stack and on its detail page. */
export interface Project {
  /** URL segment — also the id used for the shared-layout image transition. */
  slug: string;
  title: string;
  /** Short one-liner shown in listings. */
  description: string;
  /** Category badge, e.g. "website", "web-game", "App". */
  tag: string;
  /** Cover image (public path). */
  image: string;
  /** Long-form sections. Empty strings are treated as "not written yet" and hidden. */
  overview?: string;
  process?: string;
  results?: string;
  /** Optional external links. */
  figmaLink?: string;
  site?: string;
  /** Optional mockup images shown between "Process" and "The results". */
  mockups?: ProjectMockup[];
}

export interface ProjectMockup {
  src: string;
  alt: string;
}
