/** Shared shape for the experience/education cards on the About page. */
export interface ResumeEntry {
  /** Job title or programme name. */
  role: string;
  /** Employer or institution. */
  company: string;
  /** Free-form period, e.g. "2023-2025". */
  year: string;
  /** Logo (public path). */
  imgUrl: string;
  /** Bullet points. Only used by experience entries. */
  points?: string[];
}
