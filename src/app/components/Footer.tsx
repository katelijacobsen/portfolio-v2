import { VscGithubAlt } from "react-icons/vsc";
import { SlSocialLinkedin } from "react-icons/sl";

const Footer = () => {
  return (
    <footer
      id="contact-information"
      className="mt-large w-full bg-accent-1 text-body-text py-8 px-10 rounded-tr-3xl rounded-tl-3xl"
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
              className="w-12 h-12 bg-accent-1 rounded-full flex items-center justify-center transition-colors hover:bg-accent-2 focus:outline-none focus:ring-4 focus:ring-secondary-3"
            >
              <SlSocialLinkedin className="w-6 h-6" aria-hidden="true" />
            </a>
          </li>
        </ul>
      </nav>

      <address
        className="not-italic text-center lg:text-left space-y-2 text-primary-1"
      >
        <h2
          className="text-h2 font-header border-b-2 border-primary-1 pb-1 mb-3"

        >
          Contact
        </h2>

        <p>
          <a
            href="mailto:katjamaehleke98@gmail.com"
            className="text-paragraph hover:text-secondary-4 focus:outline-none focus:ring-2 focus:ring-secondary-4"
          >
            katjamaehleke98@gmail.com
          </a>
        </p>

        <p>
          <a
            href="tel:+4591996396"
            className="text-paragraph hover:text-secondary-4 focus:outline-none focus:ring-2 focus:ring-secondary-4"
          >
            +45 91 99 63 96
          </a>
        </p>
      </address>
    </footer>
  );
};

export default Footer;
