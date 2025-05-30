const Footer = () => {
  return (
    <footer>
      <div className="footer-grid">
        <address>
          <strong>Contact</strong>
          <br />
          Email: <a href="mailto:your@email.com">your@email.com</a>
          <br />
          Phone: <a href="tel:+123456789">+1 234 567 89</a>
        </address>
        <nav aria-label="Social media">
          <strong>Follow me</strong>
          <ul>
            <li>
              <a
                href="https://twitter.com/yourprofile"
                target="_blank"
                rel="noopener noreferrer"
              >
                Twitter
              </a>
            </li>
            <li>
              <a
                href="https://linkedin.com/in/yourprofile"
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn
              </a>
            </li>
            {/* Add more social links as needed */}
          </ul>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
