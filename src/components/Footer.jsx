import './Footer.css';

function Footer() {
  return (
    <footer className="footer bg-white text-dark text-center py-4 mt-5 border-top">
      <div className="container">
        <p className="mb-2 mb-lg-3 fw-semibold">&copy; <span>{new Date().getFullYear()}</span> Mark Neil Cordero. All rights reserved.</p>
        <div className="d-flex justify-content-center flex-wrap gap-3">
          <a href="https://github.com/markneilcordero" className="footer-link" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-github me-1"></i> Github
          </a>
          <a href="mailto:mark.neil.u.cordero@gmail.com" className="footer-link">
            <i className="fas fa-envelope me-1"></i> Email
          </a>
          <a href="https://www.linkedin.com/in/mark-neil-cordero/" className="footer-link" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-linkedin me-1"></i> LinkedIn
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
