import { VscGithubAlt } from "react-icons/vsc";
import { SlSocialLinkedin } from "react-icons/sl";

const Footer = () => {
  return (
    <footer
      id="contact-information"
      className="mt-large w-full bg-primary-1 text-body-text py-8 px-10"
    >
      <nav aria-label="Social media links" className="mb-6">
        <ul className="flex gap-6 justify-center lg:justify-end">
          <li>
            <a
              href="https://github.com/katelijacobsen"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub profile of Katja"
              className="w-12 h-12 bg-secondary-1 rounded-full flex items-center justify-center transition-colors hover:bg-secondary-2 focus:outline-none focus:ring-4 focus:ring-secondary-3"
            >
              <VscGithubAlt className="w-6 h-6" aria-hidden="true" />
            </a>
          </li>

          <li>
            <a
              href="https://www.linkedin.com/in/katja-m%C3%A4hleke-16b08328a/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn profile of Katja"
              className="w-12 h-12 bg-accent-1  text-primary-2 rounded-full flex items-center justify-center transition-colors hover:bg-accent-2 focus:outline-none focus:ring-4 focus:ring-secondary-3"
            >
              <SlSocialLinkedin className="w-6 h-6" aria-hidden="true" />
            </a>
          </li>
        </ul>
      </nav>

      <address
        className="not-italic text-center lg:text-left space-y-2"
      >
        <h2
          className="text-h2 font-header border-b-2 border-accent-1 pb-1 mb-3"

        >
          LET'S TALK
        </h2>

        <p>
          <a
            href="mailto:katjamaehleke98@gmail.com"
            className="text-h3 hover:text-accent-1 focus:outline-none focus:ring-2 focus:ring-secondary-4"
          >
            katjamaehleke98@gmail.com
          </a>
        </p>

        <p>
          <a
            href="tel:+4591996396"
            className="text-h3 hover:text-accent-1 focus:outline-none focus:ring-2 focus:ring-secondary-4"
          >
            +45 91 99 63 96
          </a>
        </p>
      </address>
      <h5 className="font-header text-h1 text-right text-border text-accent-1 md:mt-0 mt-10">KAT<span className="text-primary-1">J</span>A M<span className="text-primary-1">Ä</span>HLE<span className="text-primary-1">K</span>E</h5>
    </footer>
  );
};

export default Footer;
