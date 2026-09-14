import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

export const TopPromoBanner: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [timeLeft, setTimeLeft] = useState({ hours: 5, minutes: 59, seconds: 52 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="top-promo-banner">
      <div className="promo-banner-content">
        <span className="promo-text">
          <strong>Ends in {timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s.</strong> Limited time offer | Courses from <strong>₹449.00</strong>. Or, check out <a href="#subscribe" className="promo-link">our subscription</a>.
        </span>
        <button 
          className="promo-dismiss-btn"
          onClick={() => setIsVisible(false)}
          title="Dismiss banner"
        >
          <X size={16} />
        </button>
      </div>

      <style>{`
        .top-promo-banner {
          background-color: #cdeee8;
          color: #195646;
          font-size: 14px;
          padding: 10px 24px;
          position: relative;
          z-index: 600;
        }
        .promo-banner-content {
          max-width: var(--max-content-width);
          margin: 0 auto;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
        }
        .promo-text {
          text-align: center;
        }
        .promo-link {
          color: #195646;
          font-weight: 700;
          text-decoration: underline;
        }
        .promo-dismiss-btn {
          position: absolute;
          right: 0;
          color: #195646;
          padding: 4px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .promo-dismiss-btn:hover {
          opacity: 0.8;
        }
        @media (max-width: 768px) {
          .top-promo-banner {
            padding: 8px 16px;
            font-size: 12px;
          }
          .promo-text {
            padding-right: 20px;
          }
        }
      `}</style>
    </div>
  );
};
