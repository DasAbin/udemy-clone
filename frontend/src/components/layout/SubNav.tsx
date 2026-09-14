import React from 'react';
import { Link, useSearchParams } from 'react-router-dom';

const CATEGORIES = [
  'Development',
  'Business',
  'Finance & Accounting',
  'IT & Software',
  'Office Productivity',
  'Personal Development',
  'Design',
  'Marketing',
  'Health & Fitness',
  'Music'
];

export const SubNav: React.FC = () => {
  const [searchParams] = useSearchParams();
  const currentCategory = searchParams.get('category') || '';

  return (
    <nav className="udemy-subnav">
      <div className="subnav-inner">
        {CATEGORIES.map((cat) => {
          const isActive = currentCategory.toLowerCase() === cat.toLowerCase();
          return (
            <Link
              key={cat}
              to={`/?category=${encodeURIComponent(cat)}`}
              className={`subnav-item ${isActive ? 'active' : ''}`}
            >
              {cat}
            </Link>
          );
        })}
      </div>

      <style>{`
        .udemy-subnav {
          background: #ffffff;
          box-shadow: 0 2px 4px rgba(0,0,0,0.08);
          border-top: 1px solid #f2f3f5;
          position: relative;
          z-index: 400;
        }
        .subnav-inner {
          max-width: var(--max-content-width);
          margin: 0 auto;
          display: flex;
          align-items: center;
          gap: 20px;
          padding: 0 24px;
          height: var(--subnav-height);
          overflow-x: auto;
          scrollbar-width: none;
        }
        .subnav-inner::-webkit-scrollbar {
          display: none;
        }
        .subnav-item {
          font-size: 13px;
          color: #2d2f31;
          white-space: nowrap;
          padding: 8px 0;
          transition: color 0.15s;
          position: relative;
        }
        .subnav-item:hover {
          color: var(--udemy-purple-primary);
        }
        .subnav-item.active {
          color: var(--udemy-purple-primary);
          font-weight: 700;
        }
        .subnav-item.active::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 2px;
          background: var(--udemy-purple-primary);
        }
      `}</style>
    </nav>
  );
};
