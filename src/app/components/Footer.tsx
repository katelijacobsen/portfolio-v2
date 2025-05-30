const Footer = () => {
  return (
    <footer className="w-full text-white bg-accent py-negative px-large rounded-tr-3xl rounded-tl-3xl">
      <div className="grid lg:grid-cols-2 gap-x-medium">
        <address className="not-italic">
          <h4 className="border-b-2 border-white grid text-h2 ">Contact</h4>
          <a href="mailto:your@email.com" className="text-h3">katjamaehleke98gmail.com</a>
          <br />
              
          <a href="tel:+123456789" className="text-h3">+1 234 567 89</a>
        </address>
        <nav aria-label="Social media">
          <h4 className="border-b-2 border-white grid text-h2  ">Follow me</h4>
          <ul>
            <li>
              <a
                href="https://twitter.com/yourprofile"
                target="_blank"
                rel="noopener noreferrer"
                className="text-h3"
                >
                Twitter
              </a>
            </li>
            <li>
              <a
                href="https://linkedin.com/in/yourprofile"
                target="_blank"
                rel="noopener noreferrer"
                className="text-h3"
              >
                LinkedIn
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
