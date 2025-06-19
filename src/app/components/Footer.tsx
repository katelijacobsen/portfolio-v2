import { VscGithubAlt } from "react-icons/vsc";
import { SlSocialLinkedin } from "react-icons/sl";

const Footer = () => {
  return (
    <footer
      id="contact-information"
      className="w-full text-body-text bg-accent py-negative px-large rounded-tr-3xl rounded-tl-3xl"
    >
      <nav aria-label="Social media">
        <ul>
          <li className="w-18 h-18 bg-secondary-1 p-2 rounded-full flex items-center justify-center">
            <a
              href="https://github.com/katelijacobsen"
              target="_blank"
              rel="noopener noreferrer"
            >
              <VscGithubAlt className="w-18 h-16 p-2 aspect-square" />
            </a>
          </li>
          <li className="w-18 h-18 bg-accent-1 text-primary-1 p-2 rounded-full flex items-center justify-center">
            <a
              href="https://www.linkedin.com/in/katja-m%C3%A4hleke-16b08328a/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-h3"
            >
              <SlSocialLinkedin />
            </a>
          </li>
        </ul>
      </nav>
      <div className="grid lg:grid-cols-2 gap-x-medium">
        {/* Contact Information */}
        <address className="not-italic">
          <h4 className="border-b-2 border-white grid text-h2 ">Contact</h4>
          <a href="mailto:your@email.com" className="text-h3">
            katjamaehleke98gmail.com
          </a>
          <br />

          <a href="tel:+4591996396" className="text-h3">
            91 99 63 96
          </a>
        </address>
        {/* My Social Media */}
      </div>
    </footer>
  );
};

export default Footer;
