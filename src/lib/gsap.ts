/**
 * Single place where GSAP plugins are registered.
 *
 * Importing `gsap` from here (instead of from "gsap" directly) guarantees the
 * plugins are registered exactly once, no matter which component loads first.
 */
import { gsap } from "gsap";
import Observer from "gsap/Observer";
import ScrollToPlugin from "gsap/ScrollToPlugin";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger, Observer, ScrollToPlugin);

export { gsap, Observer, ScrollTrigger, ScrollToPlugin };
