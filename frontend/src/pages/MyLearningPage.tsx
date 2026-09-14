import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { StreakCard } from '../components/learning/StreakCard';
import { SchedulerCard } from '../components/learning/SchedulerCard';
import { EnrolledCourseCard } from '../components/learning/EnrolledCourseCard';
import { api } from '../services/api';
import { EnrolledCourse, StreakInfo } from '../types';

export const MyLearningPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeTab = searchParams.get('tab') || 'all';
  const [enrolledCourses, setEnrolledCourses] = useState<EnrolledCourse[]>([]);
  const [streak, setStreak] = useState<StreakInfo | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLearning = async () => {
      try {
        const data = await api.getMyLearning();
        setEnrolledCourses(data.enrolledCourses);
        setStreak(data.streak);
      } catch (err) {
        console.error('Error loading my learning:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchLearning();
  }, []);

  const tabs = [
    { key: 'all', label: 'All courses' },
    { key: 'lists', label: 'My Lists' },
    { key: 'wishlist', label: 'Wishlist' },
    { key: 'certifications', label: 'Certifications' },
    { key: 'archived', label: 'Archived' },
    { key: 'tools', label: 'Learning tools' }
  ];

  return (
    <div className="my-learning-page">
      {/* Dark Top Banner */}
      <section className="my-learning-header-banner">
        <div className="page-container">
          <h1 className="my-learning-title">My learning</h1>

          <div className="learning-tabs-bar">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                className={`learning-tab-btn ${activeTab === tab.key ? 'active' : ''}`}
                onClick={() => setSearchParams({ tab: tab.key })}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <main className="page-container my-learning-body">
        {loading ? (
          <div className="loading-spinner-wrapper">Loading your courses...</div>
        ) : (
          <>
            {/* Streak & Schedule Cards */}
            {activeTab === 'all' && streak && (
              <>
                <StreakCard streak={streak} />
                <SchedulerCard />
              </>
            )}

            {/* Courses Display */}
            {activeTab === 'all' && (
              enrolledCourses.length === 0 ? (
                <div className="empty-tab-state" style={{ padding: '60px 20px', textAlign: 'center' }}>
                  <h3 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '8px' }}>Start learning from over 250,000 courses today</h3>
                  <p style={{ color: '#6a6f73', marginBottom: '20px' }}>When you enroll in a course, it will appear here.</p>
                  <a href="/" className="btn btn-primary" style={{ display: 'inline-block', padding: '12px 24px', backgroundColor: '#a435f0', color: '#fff', textDecoration: 'none', fontWeight: 700, borderRadius: '4px' }}>
                    Browse courses now
                  </a>
                </div>
              ) : (
                <div className="enrolled-courses-grid">
                  {enrolledCourses.map((item) => (
                    <EnrolledCourseCard key={item.course.id} enrolled={item} />
                  ))}
                </div>
              )
            )}

            {activeTab === 'wishlist' && (
              <div className="empty-tab-state">
                <h3>Your wishlist is empty</h3>
                <p>Explore courses and add them to your wishlist to track what you want to learn next.</p>
              </div>
            )}

            {activeTab === 'certifications' && (
              <div className="certifications-tab-view">
                <h3 className="section-title">Completed Certifications</h3>
                <div className="cert-item-card">
                  <h4>Java Spring Framework, Spring Boot, Spring AI - Gen AI</h4>
                  <p className="cert-meta">Completed on March 26, 2026 • 55 total hours</p>
                  <a href="/certificate/UC-48d475b3-3dd7-443d-bfef-ab611f8f1937" className="btn btn-outline btn-sm mt-2">
                    View Certificate
                  </a>
                </div>
              </div>
            )}

            {['lists', 'archived', 'tools'].includes(activeTab) && (
              <div className="empty-tab-state">
                <h3>No items in {tabs.find(t => t.key === activeTab)?.label}</h3>
                <p>You haven't added any items to this section yet.</p>
              </div>
            )}
          </>
        )}
      </main>

      <style>{`
        .my-learning-page {
          min-height: 80vh;
        }
        .my-learning-header-banner {
          background-color: #1c1d1f;
          color: #ffffff;
          padding-top: 40px;
        }
        .my-learning-title {
          font-size: 38px;
          font-weight: 700;
          letter-spacing: -0.5px;
          margin-bottom: 24px;
        }
        .learning-tabs-bar {
          display: flex;
          gap: 24px;
          overflow-x: auto;
          scrollbar-width: none;
        }
        .learning-tabs-bar::-webkit-scrollbar {
          display: none;
        }
        .learning-tab-btn {
          color: #d1d7dc;
          font-size: 15px;
          font-weight: 700;
          padding: 12px 0;
          background: none;
          position: relative;
          white-space: nowrap;
          transition: color 0.15s;
        }
        .learning-tab-btn:hover {
          color: #ffffff;
        }
        .learning-tab-btn.active {
          color: #ffffff;
        }
        .learning-tab-btn.active::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 3px;
          background-color: #ffffff;
        }
        .my-learning-body {
          padding-top: 36px;
          padding-bottom: 60px;
        }
        .enrolled-courses-grid {
          display: flex;
          flex-wrap: wrap;
          gap: 24px;
        }
        .empty-tab-state {
          text-align: center;
          padding: 60px 20px;
          background: #f7f9fa;
          border-radius: 8px;
          border: 1px solid #d1d7dc;
        }
        .empty-tab-state h3 {
          font-size: 18px;
          margin-bottom: 8px;
        }
        .empty-tab-state p {
          color: #6a6f73;
          font-size: 14px;
        }
        .cert-item-card {
          padding: 20px;
          border: 1px solid #d1d7dc;
          border-radius: 6px;
          max-width: 500px;
          margin-top: 16px;
        }
        .cert-meta {
          font-size: 13px;
          color: #6a6f73;
          margin: 6px 0 12px 0;
        }
        .loading-spinner-wrapper {
          padding: 48px;
          text-align: center;
          font-size: 16px;
          color: #6a6f73;
        }
      `}</style>
    </div>
  );
};
