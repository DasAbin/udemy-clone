import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Edit2, Star, CheckCircle2 } from 'lucide-react';
import { api } from '../services/api';
import { User, Course, EnrolledCourse } from '../types';

interface PublicProfilePageProps {
  user: User | null;
  courses: Course[];
}

export const PublicProfilePage: React.FC<PublicProfilePageProps> = ({ user: activeUser, courses }) => {
  const { username } = useParams<{ username?: string }>();
  const [profileUser, setProfileUser] = useState<User | null>(activeUser);
  const [enrolledList, setEnrolledList] = useState<EnrolledCourse[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const loadProfile = async () => {
      try {
        setLoading(true);
        // Load public profile from backend
        const targetSlug = username || (activeUser ? activeUser.id : undefined);
        const data = await api.getPublicProfile(targetSlug);
        if (isMounted && data.user) {
          setProfileUser(data.user);
          setEnrolledList(data.enrolledCourses || []);
        }
      } catch (err) {
        console.error('Failed to load public profile from API:', err);
        if (isMounted) {
          setEnrolledList([]);
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    loadProfile();
    return () => { isMounted = false; };
  }, [username, courses, activeUser]);

  const displayUser = profileUser || activeUser || {
    id: 'usr_student',
    name: 'Student',
    firstName: 'Student',
    lastName: '',
    email: 'student@example.com',
    role: 'LEARNER',
    avatarInitials: 'ST',
    headline: 'Lifelong Learner'
  };

  const initialLetter = displayUser.name ? displayUser.name.trim()[0].toUpperCase() : 'S';

  return (
    <div className="public-profile-page">
      {/* Top Banner (Lavender) */}
      <section className="public-profile-banner">
        <div className="page-container">
          <div className="banner-role-label">{displayUser.role || 'LEARNER'}</div>
          <h1 className="banner-name">{displayUser.name || 'Student'}</h1>
        </div>
      </section>

      {/* Main Content Area */}
      <main className="page-container public-profile-body">
        <div className="profile-two-columns">
          {/* Left Column: Learning Courses */}
          <div className="profile-left-col">
            <h2 className="section-heading">Learning</h2>

            {loading ? (
              <div className="loading-state">Loading selected courses...</div>
            ) : enrolledList.length === 0 ? (
              <div className="empty-state">No courses currently enrolled.</div>
            ) : (
              <div className="public-courses-grid">
                {enrolledList.map((item) => {
                  const c = item.course;
                  return (
                    <div className="public-course-card" key={c.id}>
                      <Link to={`/course/${c.slug}`} className="public-course-link">
                        <div className="public-thumb-container">
                          <img src={c.thumbnailUrl} alt={c.title} className="public-thumb-img" />
                          {c.isPremium && (
                            <span className="badge-premium-tag">
                              ★ Premium
                            </span>
                          )}
                        </div>

                        <div className="public-card-info">
                          <h3 className="public-card-title" title={c.title}>
                            {c.title}
                          </h3>
                          <p className="public-card-subtitle" title={c.subtitle}>
                            {c.subtitle}
                          </p>
                          <p className="public-card-instructor">
                            {c.instructorName}{c.instructorOrg ? `, ${c.instructorOrg}` : ''}
                          </p>

                          <div className="public-meta-row">
                            {c.isBestseller && (
                              <span className="badge badge-bestseller">Bestseller</span>
                            )}
                            <span className="badge badge-course">Course</span>
                            <div className="card-rating">
                              <span className="rating-num">{c.rating}</span>
                              <Star size={12} fill="#b4690e" color="#b4690e" />
                            </div>
                            <span className="meta-ratings-count">
                              {c.ratingsCount.toLocaleString()} ratings
                            </span>
                            <span className="meta-hours">
                              {c.totalHours} total hours
                            </span>
                          </div>

                          {/* 100% Complete Progress Bar & Indicator */}
                          <div className="public-progress-container">
                            <div className="progress-bar-track">
                              <div className="progress-bar-complete" style={{ width: '100%' }} />
                            </div>
                            <div className="completion-status-row">
                              <span className="completion-badge">
                                <CheckCircle2 size={13} className="check-icon" /> 100% complete
                              </span>
                              <span className="star-rating-pill">★ 5.0 rating</span>
                            </div>
                          </div>

                          {/* Price Row: Show full price per explicit instruction */}
                          <div className="public-price-row">
                            <span className="price-bold">₹{c.originalPrice.toFixed(2)}</span>
                          </div>
                        </div>
                      </Link>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Right Floating Profile Card */}
          <aside className="profile-right-col">
            <div className="floating-user-card">
              <div className="floating-avatar-circle">
                <span className="avatar-v-letter">{initialLetter}</span>
              </div>

              <Link to="/user/edit-profile" className="btn-edit-profile-card">
                <Edit2 size={16} className="mr-2" />
                <span>Edit profile</span>
              </Link>
            </div>
          </aside>
        </div>
      </main>

      <style>{`
        .public-profile-page {
          background: #ffffff;
          padding-bottom: 80px;
          min-height: 85vh;
        }
        .public-profile-banner {
          background: #ecebf5;
          padding: 48px 0 40px 0;
        }
        .banner-role-label {
          font-size: 13px;
          font-weight: 700;
          letter-spacing: 0.05em;
          color: #2d2f31;
          margin-bottom: 8px;
        }
        .banner-name {
          font-size: 40px;
          font-weight: 700;
          color: #1c1d1f;
          letter-spacing: -0.5px;
        }
        .public-profile-body {
          padding-top: 40px;
        }
        .profile-two-columns {
          display: flex;
          gap: 48px;
          align-items: flex-start;
        }
        .profile-left-col {
          flex: 1;
        }
        .section-heading {
          font-size: 24px;
          font-weight: 700;
          color: #1c1d1f;
          margin-bottom: 24px;
        }
        .public-courses-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(290px, 1fr));
          gap: 24px;
        }
        .public-course-card {
          border-radius: 4px;
          transition: transform 0.15s ease, box-shadow 0.15s ease;
          display: flex;
          flex-direction: column;
        }
        .public-course-card:hover {
          transform: translateY(-2px);
        }
        .public-course-link {
          display: flex;
          flex-direction: column;
          height: 100%;
          text-decoration: none;
        }
        .public-thumb-container {
          position: relative;
          width: 100%;
          aspect-ratio: 16 / 9;
          border-radius: 4px;
          overflow: hidden;
          background: #1c1d1f;
        }
        .public-thumb-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .badge-premium-tag {
          position: absolute;
          top: 8px;
          left: 8px;
          background: #6a2cc8;
          color: #ffffff;
          font-size: 11px;
          font-weight: 700;
          padding: 3px 8px;
          border-radius: 4px;
        }
        .public-card-info {
          padding-top: 12px;
          display: flex;
          flex-direction: column;
          flex: 1;
        }
        .public-card-title {
          font-size: 15px;
          font-weight: 700;
          color: #1c1d1f;
          line-height: 1.35;
          margin-bottom: 4px;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .public-card-subtitle {
          font-size: 12px;
          color: #6a6f73;
          margin-bottom: 4px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .public-card-instructor {
          font-size: 12px;
          color: #6a6f73;
          margin-bottom: 8px;
        }
        .public-meta-row {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 12px;
          flex-wrap: wrap;
          margin-bottom: 10px;
        }
        .rating-num {
          font-weight: 700;
          color: #b4690e;
        }
        .meta-ratings-count, .meta-hours {
          color: #6a6f73;
        }
        .public-progress-container {
          margin-bottom: 10px;
        }
        .progress-bar-track {
          width: 100%;
          height: 4px;
          background: #d1d7dc;
          border-radius: 2px;
          overflow: hidden;
          margin-bottom: 4px;
        }
        .progress-bar-complete {
          height: 100%;
          background: #2e7d32;
        }
        .completion-status-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 11px;
          font-weight: 600;
        }
        .completion-badge {
          color: #2e7d32;
          display: flex;
          align-items: center;
          gap: 4px;
        }
        .check-icon {
          color: #2e7d32;
        }
        .star-rating-pill {
          color: #b4690e;
        }
        .public-price-row {
          margin-top: auto;
          display: flex;
          align-items: baseline;
          gap: 8px;
          padding-top: 4px;
        }
        .price-bold {
          font-size: 16px;
          font-weight: 700;
          color: #1c1d1f;
        }
        .profile-right-col {
          width: 320px;
          position: relative;
          top: -100px;
          flex-shrink: 0;
        }
        .floating-user-card {
          background: #ffffff;
          border: 1px solid #d1d7dc;
          border-radius: 12px;
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
          padding: 40px 24px;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .floating-avatar-circle {
          width: 140px;
          height: 140px;
          border-radius: 50%;
          background: #1c1d1f;
          color: #ffffff;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 32px;
        }
        .avatar-v-letter {
          font-size: 56px;
          font-weight: 700;
        }
        .btn-edit-profile-card {
          width: 100%;
          height: 48px;
          border: 1px solid #5624d0;
          border-radius: 4px;
          color: #5624d0;
          background: #ffffff;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          font-size: 15px;
          transition: background 0.15s;
          text-decoration: none;
        }
        .btn-edit-profile-card:hover {
          background: #f3e8fd;
        }
        .mr-2 {
          margin-right: 8px;
        }
        .loading-state, .empty-state {
          color: #6a6f73;
          padding: 24px 0;
          font-size: 15px;
        }
        @media (max-width: 900px) {
          .profile-two-columns {
            flex-direction: column-reverse;
            gap: 32px;
          }
          .profile-right-col {
            position: static;
            width: 100%;
          }
          .public-courses-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
};

export default PublicProfilePage;
