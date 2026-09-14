import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MoreVertical, Star } from 'lucide-react';
import { EnrolledCourse } from '../../types';

interface EnrolledCourseCardProps {
  enrolled: EnrolledCourse;
}

export const EnrolledCourseCard: React.FC<EnrolledCourseCardProps> = ({ enrolled }) => {
  const [showMenu, setShowMenu] = useState(false);
  const navigate = useNavigate();
  const { course, progressPercent, userRating } = enrolled;

  return (
    <div className="enrolled-course-card">
      {/* Thumbnail */}
      <div className="enrolled-thumb-container" onClick={() => navigate(`/course/${course.slug}/learn/lecture/lec_122`)}>
        <img src={course.thumbnailUrl} alt={course.title} className="enrolled-thumb-img" />
        
        {/* Kebab Menu Button */}
        <button 
          className="kebab-btn"
          onClick={(e) => {
            e.stopPropagation();
            setShowMenu(!showMenu);
          }}
          title="More options"
        >
          <MoreVertical size={18} />
        </button>

        {showMenu && (
          <div className="kebab-dropdown" onClick={(e) => e.stopPropagation()}>
            <button className="kebab-item" onClick={() => setShowMenu(false)}>Share</button>
            <button className="kebab-item" onClick={() => setShowMenu(false)}>Create a list</button>
            <button className="kebab-item" onClick={() => setShowMenu(false)}>Archive</button>
          </div>
        )}
      </div>

      {/* Details */}
      <div className="enrolled-details">
        <Link to={`/course/${course.slug}/learn/lecture/lec_122`} className="enrolled-title">
          {course.title}
        </Link>
        <div className="enrolled-instructor">
          {course.instructorName}{course.instructorOrg ? `, ${course.instructorOrg}` : ''}
        </div>

        {/* Progress Bar */}
        <div className="enrolled-progress-wrapper">
          <div className="progress-bar-bg">
            <div 
              className="progress-bar-fill" 
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          
          <div className="progress-status-row">
            <span className="progress-percent-text">{progressPercent}% complete</span>
            
            {/* Rating */}
            <div className="user-rating-stars">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  size={14}
                  fill={star <= (userRating || 5) ? '#b4690e' : 'none'}
                  color="#b4690e"
                />
              ))}
              <span className="your-rating-label">Your rating</span>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .enrolled-course-card {
          width: 250px;
          background: #ffffff;
          display: flex;
          flex-direction: column;
        }
        .enrolled-thumb-container {
          position: relative;
          width: 100%;
          aspect-ratio: 16 / 9;
          cursor: pointer;
          background: #1c1d1f;
        }
        .enrolled-thumb-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .kebab-btn {
          position: absolute;
          top: 8px;
          right: 8px;
          width: 32px;
          height: 32px;
          background: rgba(255, 255, 255, 0.9);
          border-radius: 4px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #1c1d1f;
          box-shadow: 0 1px 3px rgba(0,0,0,0.2);
        }
        .kebab-btn:hover {
          background: #ffffff;
        }
        .kebab-dropdown {
          position: absolute;
          top: 44px;
          right: 8px;
          background: #ffffff;
          border: 1px solid #d1d7dc;
          box-shadow: var(--shadow-dropdown);
          border-radius: 4px;
          z-index: 10;
          min-width: 140px;
          padding: 6px 0;
        }
        .kebab-item {
          display: block;
          width: 100%;
          text-align: left;
          padding: 8px 16px;
          font-size: 13px;
          color: #2d2f31;
        }
        .kebab-item:hover {
          background: #f7f9fa;
          color: var(--udemy-purple-primary);
        }
        .enrolled-details {
          padding-top: 10px;
          display: flex;
          flex-direction: column;
        }
        .enrolled-title {
          font-size: 14px;
          font-weight: 700;
          color: #2d2f31;
          line-height: 1.35;
          margin-bottom: 4px;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          min-height: 38px;
        }
        .enrolled-title:hover {
          color: var(--udemy-purple-primary);
        }
        .enrolled-instructor {
          font-size: 12px;
          color: #6a6f73;
          margin-bottom: 12px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .enrolled-progress-wrapper {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .progress-bar-bg {
          height: 3px;
          background: #d1d7dc;
          width: 100%;
          overflow: hidden;
        }
        .progress-bar-fill {
          height: 100%;
          background: #a435f0;
          transition: width 0.3s ease;
        }
        .progress-status-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 12px;
        }
        .progress-percent-text {
          color: #2d2f31;
          font-weight: 500;
        }
        .user-rating-stars {
          display: flex;
          align-items: center;
          gap: 1px;
        }
        .your-rating-label {
          font-size: 11px;
          color: #6a6f73;
          margin-left: 4px;
        }
      `}</style>
    </div>
  );
};
