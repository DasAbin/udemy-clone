import React from 'react';
import { Link } from 'react-router-dom';
import { Globe } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="udemy-footer">
      {/* Top Banner: Teach on Udemy */}
      <div className="footer-teach-banner">
        <div className="footer-container teach-banner-inner">
          <div className="teach-banner-text">
            <h3 className="teach-title">Teach the world online</h3>
            <p className="teach-desc">
              Create an online video course, reach students across the globe, and earn money
            </p>
          </div>
          <Link to="/teaching" className="btn-teach-udemy">
            Teach on Udemy
          </Link>
        </div>
      </div>

      {/* Business Logos Banner */}
      <div className="footer-business-banner">
        <div className="footer-container business-banner-inner">
          <span className="business-text">
            Top companies choose <span className="business-link">Udemy Business</span> to build in-demand career skills.
          </span>
          <div className="partner-logos">
            <span className="partner-logo">Nasdaq</span>
            <span className="partner-logo">Volkswagen</span>
            <span className="partner-logo">NetApp</span>
            <span className="partner-logo">eventbrite</span>
          </div>
        </div>
      </div>

      {/* Explore Top Skills Grid */}
      <div className="footer-container footer-skills-section">
        <h4 className="skills-main-title">Explore top skills and certifications</h4>
        
        <div className="footer-links-grid">
          {/* Column 1 */}
          <div className="footer-col">
            <h5 className="footer-col-title">In-demand Careers</h5>
            <ul>
              <li><Link to="/?q=Data+Scientist">Data Scientist</Link></li>
              <li><Link to="/?q=Full+Stack+Web+Developer">Full Stack Web Developer</Link></li>
              <li><Link to="/?q=Cloud+Engineer">Cloud Engineer</Link></li>
              <li><Link to="/?q=Project+Manager">Project Manager</Link></li>
              <li><Link to="/?q=Game+Developer">Game Developer</Link></li>
              <li><Link to="/?q=All+Career+Accelerators">All Career Accelerators</Link></li>
            </ul>
          </div>

          {/* Column 2 */}
          <div className="footer-col">
            <h5 className="footer-col-title">Web Development</h5>
            <ul>
              <li><Link to="/?category=Development">Web Development</Link></li>
              <li><Link to="/?q=JavaScript">JavaScript</Link></li>
              <li><Link to="/?q=React+JS">React JS</Link></li>
              <li><Link to="/?q=Angular">Angular</Link></li>
              <li><Link to="/?q=Java">Java</Link></li>
            </ul>
          </div>

          {/* Column 3 */}
          <div className="footer-col">
            <h5 className="footer-col-title">IT Certifications</h5>
            <ul>
              <li><Link to="/?q=Amazon+AWS">Amazon AWS</Link></li>
              <li><Link to="/?q=AWS+Certified+Cloud+Practitioner">AWS Certified Cloud Practitioner</Link></li>
              <li><Link to="/?q=AZ-900">AZ-900: Microsoft Azure Fundamentals</Link></li>
              <li><Link to="/?q=AWS+Solutions+Architect">AWS Certified Solutions Architect - Associate</Link></li>
              <li><Link to="/?q=Kubernetes">Kubernetes</Link></li>
            </ul>
          </div>

          {/* Column 4 */}
          <div className="footer-col">
            <h5 className="footer-col-title">Leadership</h5>
            <ul>
              <li><Link to="/?q=Leadership">Leadership</Link></li>
              <li><Link to="/?q=Management+Skills">Management Skills</Link></li>
              <li><Link to="/?q=Project+Management">Project Management</Link></li>
              <li><Link to="/?q=Personal+Productivity">Personal Productivity</Link></li>
              <li><Link to="/?q=Emotional+Intelligence">Emotional Intelligence</Link></li>
            </ul>
          </div>

          {/* Column 5 */}
          <div className="footer-col">
            <h5 className="footer-col-title">Certifications by Skill</h5>
            <ul>
              <li><Link to="/?q=Cybersecurity+Certification">Cybersecurity Certification</Link></li>
              <li><Link to="/?q=Project+Management+Certification">Project Management Certification</Link></li>
              <li><Link to="/?q=Cloud+Certification">Cloud Certification</Link></li>
              <li><Link to="/?q=Data+Analytics+Certification">Data Analytics Certification</Link></li>
              <li><Link to="/?q=HR+Management+Certification">HR Management Certification</Link></li>
              <li><Link to="/?q=Certifications">See all Certifications</Link></li>
            </ul>
          </div>

          {/* Column 6 */}
          <div className="footer-col">
            <h5 className="footer-col-title">Data Science</h5>
            <ul>
              <li><Link to="/?q=Data+Science">Data Science</Link></li>
              <li><Link to="/?q=Python">Python</Link></li>
              <li><Link to="/?q=Machine+Learning">Machine Learning</Link></li>
              <li><Link to="/?q=ChatGPT">ChatGPT</Link></li>
              <li><Link to="/?q=Deep+Learning">Deep Learning</Link></li>
            </ul>
          </div>

          {/* Column 7 */}
          <div className="footer-col">
            <h5 className="footer-col-title">Communication</h5>
            <ul>
              <li><Link to="/?q=Communication+Skills">Communication Skills</Link></li>
              <li><Link to="/?q=Presentation+Skills">Presentation Skills</Link></li>
              <li><Link to="/?q=Public+Speaking">Public Speaking</Link></li>
              <li><Link to="/?q=Writing">Writing</Link></li>
              <li><Link to="/?q=PowerPoint">PowerPoint</Link></li>
            </ul>
          </div>

          {/* Column 8 */}
          <div className="footer-col">
            <h5 className="footer-col-title">Business Analytics & Intelligence</h5>
            <ul>
              <li><Link to="/?q=Microsoft+Excel">Microsoft Excel</Link></li>
              <li><Link to="/?q=SQL">SQL</Link></li>
              <li><Link to="/?q=Microsoft+Power+BI">Microsoft Power BI</Link></li>
              <li><Link to="/?q=Data+Analysis">Data Analysis</Link></li>
              <li><Link to="/?q=Business+Analysis">Business Analysis</Link></li>
            </ul>
          </div>
        </div>

        <div className="footer-divider" />

        {/* Company & Legal Links Row */}
        <div className="footer-company-links">
          <div className="company-col">
            <h6 className="company-title">About</h6>
            <ul>
              <li><Link to="/about">About us</Link></li>
              <li><Link to="/careers">Careers</Link></li>
              <li><Link to="/contact">Contact us</Link></li>
              <li><Link to="/blog">Blog</Link></li>
              <li><Link to="/investors">Investors</Link></li>
              <li><Link to="/coursera">Find more on Coursera</Link></li>
            </ul>
          </div>

          <div className="company-col">
            <h6 className="company-title">Discover Udemy</h6>
            <ul>
              <li><Link to="/app">Get the app</Link></li>
              <li><Link to="/teaching">Teach on Udemy</Link></li>
              <li><Link to="/plans">Plans and Pricing</Link></li>
              <li><Link to="/affiliate">Affiliate</Link></li>
              <li><Link to="/support">Help and Support</Link></li>
            </ul>
          </div>

          <div className="company-col">
            <h6 className="company-title">Udemy for Business</h6>
            <ul>
              <li><Link to="/business">Udemy Business</Link></li>
            </ul>
          </div>

          <div className="company-col">
            <h6 className="company-title">Legal & Accessibility</h6>
            <ul>
              <li><Link to="/accessibility">Accessibility statement</Link></li>
              <li><Link to="/privacy">Privacy policy</Link></li>
              <li><Link to="/sitemap">Sitemap</Link></li>
              <li><Link to="/terms">Terms</Link></li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Copyright & Language Bar */}
      <div className="footer-bottom-bar">
        <div className="footer-container bottom-bar-inner">
          <div className="bottom-left">
            <span className="bottom-logo">udemy</span>
            <span className="copyright-text">© 2026 Udemy, Inc.</span>
          </div>

          <div className="bottom-center">
            <button className="cookie-btn">Cookie settings</button>
          </div>

          <div className="bottom-right">
            <button className="language-selector-btn">
              <Globe size={16} />
              <span>English</span>
            </button>
          </div>
        </div>
      </div>

      <style>{`
        .udemy-footer {
          background-color: #1c1d1f;
          color: #ffffff;
          font-family: inherit;
          margin-top: 48px;
        }
        .footer-container {
          max-width: var(--max-content-width);
          margin: 0 auto;
          padding: 0 24px;
        }
        .footer-teach-banner {
          border-bottom: 1px solid #3e4143;
          padding: 24px 0;
        }
        .teach-banner-inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 16px;
        }
        .teach-title {
          font-size: 19px;
          font-weight: 700;
          color: #ffffff;
          margin-bottom: 4px;
        }
        .teach-desc {
          font-size: 14px;
          color: #d1d7dc;
        }
        .btn-teach-udemy {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 10px 16px;
          border: 1px solid #ffffff;
          color: #ffffff;
          font-weight: 700;
          font-size: 14px;
          border-radius: 4px;
          transition: background 0.15s;
        }
        .btn-teach-udemy:hover {
          background-color: rgba(255, 255, 255, 0.1);
        }
        .footer-business-banner {
          border-bottom: 1px solid #3e4143;
          padding: 24px 0;
        }
        .business-banner-inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 20px;
        }
        .business-text {
          font-size: 16px;
          font-weight: 700;
          color: #ffffff;
        }
        .business-link {
          color: #c0c4fc;
          cursor: pointer;
        }
        .partner-logos {
          display: flex;
          align-items: center;
          gap: 32px;
        }
        .partner-logo {
          font-size: 18px;
          font-weight: 800;
          color: #ffffff;
          letter-spacing: -0.5px;
          opacity: 0.9;
        }
        .footer-skills-section {
          padding: 40px 24px 20px 24px;
        }
        .skills-main-title {
          font-size: 16px;
          font-weight: 700;
          color: #ffffff;
          margin-bottom: 24px;
        }
        .footer-links-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 32px 24px;
        }
        .footer-col-title {
          font-size: 14px;
          font-weight: 700;
          color: #ffffff;
          margin-bottom: 12px;
        }
        .footer-col ul, .footer-company-links ul {
          list-style: none;
          padding: 0;
          margin: 0;
        }
        .footer-col li, .footer-company-links li {
          margin-bottom: 8px;
        }
        .footer-col a, .footer-company-links a {
          font-size: 13px;
          color: #d1d7dc;
          transition: color 0.15s;
        }
        .footer-col a:hover, .footer-company-links a:hover {
          color: #ffffff;
          text-decoration: underline;
        }
        .footer-divider {
          height: 1px;
          background-color: #3e4143;
          margin: 36px 0 24px 0;
        }
        .footer-company-links {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 24px;
        }
        .company-title {
          font-size: 14px;
          font-weight: 700;
          color: #ffffff;
          margin-bottom: 12px;
        }
        .footer-bottom-bar {
          border-top: 1px solid #3e4143;
          padding: 24px 0 32px 0;
          margin-top: 32px;
        }
        .bottom-bar-inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 16px;
        }
        .bottom-left {
          display: flex;
          align-items: center;
          gap: 16px;
        }
        .bottom-logo {
          font-size: 26px;
          font-weight: 800;
          color: #ffffff;
          letter-spacing: -0.5px;
        }
        .copyright-text {
          font-size: 12px;
          color: #d1d7dc;
        }
        .cookie-btn {
          color: #ffffff;
          font-size: 12px;
          text-decoration: underline;
        }
        .language-selector-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 8px 16px;
          border: 1px solid #ffffff;
          color: #ffffff;
          font-size: 14px;
          border-radius: 4px;
          background: transparent;
        }
        .language-selector-btn:hover {
          background-color: rgba(255, 255, 255, 0.1);
        }
        @media (max-width: 992px) {
          .footer-links-grid, .footer-company-links {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        @media (max-width: 600px) {
          .footer-links-grid, .footer-company-links {
            grid-template-columns: 1fr;
          }
          .partner-logos {
            gap: 16px;
            flex-wrap: wrap;
          }
        }
      `}</style>
    </footer>
  );
};
