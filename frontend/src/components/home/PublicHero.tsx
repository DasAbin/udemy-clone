import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';

interface PublicHeroProps {
  onOpenLogin: () => void;
  onOpenSignup: () => void;
}

export const PublicHero: React.FC<PublicHeroProps> = ({ onOpenLogin, onOpenSignup }) => {
  const [slideIndex, setSlideIndex] = useState(0);

  const slides = [
    {
      title: 'Subscribe to the best of Udemy',
      desc: 'With Personal Plan, you get access to 26,000+ of our top-rated courses in tech, business, and more.',
      cta: 'Try it now',
      imageUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=1000&auto=format&fit=crop&q=80'
    },
    {
      title: 'Skills that drive you forward',
      desc: 'Technology and the world of work change fast — with us, you’re faster. Get the skills to achieve goals and stay competitive.',
      cta: 'Explore courses',
      imageUrl: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=1000&auto=format&fit=crop&q=80'
    }
  ];

  const current = slides[slideIndex];

  return (
    <div className="public-hero-container">
      {/* Main Hero Slider */}
      <div className="hero-slide-stage">
        <button
          className="hero-chevron prev"
          onClick={() => setSlideIndex(slideIndex === 0 ? slides.length - 1 : slideIndex - 1)}
          title="Previous slide"
        >
          <ChevronLeft size={24} />
        </button>

        <div className="hero-slide-content">
          {/* Card Overlay on left */}
          <div className="hero-overlay-card">
            <h1 className="hero-overlay-title">{current.title}</h1>
            <p className="hero-overlay-desc">{current.desc}</p>
            <button className="btn btn-primary hero-cta-btn" onClick={onOpenSignup}>
              {current.cta}
            </button>
          </div>

          {/* Right Image */}
          <div className="hero-image-wrapper">
            <img src={current.imageUrl} alt={current.title} className="hero-main-img" />
          </div>
        </div>

        <button
          className="hero-chevron next"
          onClick={() => setSlideIndex(slideIndex === slides.length - 1 ? 0 : slideIndex + 1)}
          title="Next slide"
        >
          <ChevronRight size={24} />
        </button>
      </div>

      {/* "Learn essential career and life skills" Section */}
      <section className="career-skills-section">
        <h2 className="career-skills-title">Learn essential career and life skills</h2>
        
        <div className="career-cards-grid">
          <div className="career-feature-card" onClick={onOpenSignup}>
            <div className="feature-card-visual bg-lavender">
              <div className="visual-graphic">📱✨</div>
            </div>
            <div className="feature-card-content">
              <h3 className="feature-title">Generative AI</h3>
              <p className="feature-desc">Learn ChatGPT, Claude, Prompt Engineering, and AI automations.</p>
              <span className="feature-link">Explore GenAI <ArrowRight size={14} /></span>
            </div>
          </div>

          <div className="career-feature-card" onClick={onOpenSignup}>
            <div className="feature-card-visual bg-gold">
              <div className="visual-graphic">🏆⭐</div>
            </div>
            <div className="feature-card-content">
              <h3 className="feature-title">Leadership & Management</h3>
              <p className="feature-desc">Executive decision making, agile sprint management, and team leadership.</p>
              <span className="feature-link">Explore Leadership <ArrowRight size={14} /></span>
            </div>
          </div>

          <div className="career-feature-card" onClick={onOpenSignup}>
            <div className="feature-card-visual bg-cyan">
              <div className="visual-graphic">📊📈</div>
            </div>
            <div className="feature-card-content">
              <h3 className="feature-title">Full Stack Development & Cloud</h3>
              <p className="feature-desc">Java Spring Boot, React, AWS, Docker, Kubernetes and microservices.</p>
              <span className="feature-link">Explore Tech <ArrowRight size={14} /></span>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        .public-hero-container {
          margin-bottom: 40px;
        }
        .hero-slide-stage {
          position: relative;
          background: #f7f9fa;
          overflow: hidden;
          margin-bottom: 48px;
        }
        .hero-slide-content {
          max-width: var(--max-content-width);
          margin: 0 auto;
          position: relative;
          min-height: 400px;
          display: flex;
          align-items: center;
          padding: 32px 24px;
        }
        .hero-overlay-card {
          position: relative;
          z-index: 5;
          background: #ffffff;
          padding: 32px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.12);
          border-radius: 4px;
          max-width: 440px;
        }
        .hero-overlay-title {
          font-size: 32px;
          font-weight: 800;
          color: #1c1d1f;
          line-height: 1.2;
          margin-bottom: 12px;
        }
        .hero-overlay-desc {
          font-size: 15px;
          color: #2d2f31;
          line-height: 1.45;
          margin-bottom: 24px;
        }
        .hero-cta-btn {
          height: 48px;
          padding: 0 24px;
          font-size: 16px;
        }
        .hero-image-wrapper {
          position: absolute;
          right: 0;
          top: 0;
          bottom: 0;
          width: 65%;
          overflow: hidden;
        }
        .hero-main-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: top center;
        }
        .hero-chevron {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background: #ffffff;
          border: 1px solid #d1d7dc;
          box-shadow: 0 2px 4px rgba(0,0,0,0.15);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #1c1d1f;
          z-index: 10;
          cursor: pointer;
        }
        .hero-chevron:hover {
          background: #f7f9fa;
        }
        .hero-chevron.prev {
          left: 16px;
        }
        .hero-chevron.next {
          right: 16px;
        }
        .career-skills-section {
          max-width: var(--max-content-width);
          margin: 0 auto;
          padding: 0 24px;
        }
        .career-skills-title {
          font-size: 24px;
          font-weight: 700;
          color: #1c1d1f;
          margin-bottom: 24px;
        }
        .career-cards-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
        }
        .career-feature-card {
          border: 1px solid #d1d7dc;
          border-radius: 8px;
          overflow: hidden;
          background: #ffffff;
          cursor: pointer;
          transition: transform 0.15s, box-shadow 0.15s;
          display: flex;
          flex-direction: column;
        }
        .career-feature-card:hover {
          transform: translateY(-2px);
          box-shadow: var(--shadow-md);
        }
        .feature-card-visual {
          height: 160px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .visual-graphic {
          font-size: 48px;
        }
        .bg-lavender { background: #ecebf5; }
        .bg-gold { background: #fdf5e6; }
        .bg-cyan { background: #e0f5f1; }
        .feature-card-content {
          padding: 20px;
          display: flex;
          flex-direction: column;
          flex: 1;
        }
        .feature-title {
          font-size: 17px;
          font-weight: 700;
          color: #1c1d1f;
          margin-bottom: 8px;
        }
        .feature-desc {
          font-size: 13px;
          color: #6a6f73;
          margin-bottom: 16px;
          line-height: 1.4;
          flex: 1;
        }
        .feature-link {
          font-size: 13px;
          font-weight: 700;
          color: #5624d0;
          display: inline-flex;
          align-items: center;
          gap: 6px;
        }
        @media (max-width: 900px) {
          .career-cards-grid {
            grid-template-columns: 1fr;
          }
          .hero-image-wrapper {
            opacity: 0.25;
            width: 100%;
          }
          .hero-overlay-card {
            max-width: 100%;
          }
        }
      `}</style>
    </div>
  );
};
