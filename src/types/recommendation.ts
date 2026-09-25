/**
 * A recommendation letter shown on the About page.
 *
 * There are deliberately no name or contact fields (email, phone): referees
 * are identified by job title and organisation only.
 */
export interface Recommendation {
  /** Stable slug, used for keys and element ids. */
  id: string;
  /** Referee's job title, shown as the card heading. */
  title: string;
  /** Employer or institution. */
  organisation: string;
  /** How the referee knows Katja, e.g. "Internship manager". */
  relationship: string;
  /** Date the letter was signed, as an ISO date (YYYY-MM-DD). */
  date: string;
  /** Logo (public path). */
  imgUrl: string;
  /** Short verbatim quote from the letter, shown up front. */
  highlight: string;
  /** Body of the letter, one string per paragraph, without the signature block. */
  letter: string[];
}
