import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Star, Check, PlayCircle, Globe, Award, ShieldCheck } from 'lucide-react';
import { api } from '../services/api';
import { Course, CartItem } from '../types';

interface CourseDetailPageProps {
  cartItems: CartItem[];
  onAddToCart: (courseId: string) => void;
}

export const CourseDetailPage: React.FC<CourseDetailPageProps> = ({ cartItems, onAddToCart }) => {
  const { slug } = useParams();
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!slug) return;
    api.getCourseBySlug(slug).then(res => {
      setCourse(res.course);
      setLoading(false);
    }).catch(() => {
      setLoading(false);
    });
  }, [slug]);

  if (loading) {
    return <div className="page-container" style={{ padding: '60px 0' }}>Loading course details...</div>;
  }

  if (!course) {
    return (
      <div className="page-container" style={{ padding: '60px 0' }}>
        <h2>Course not found</h2>
        <Link to="/" className="link-purple">Return to Home</Link>
      </div>
    );
  }

  const isInCart = cartItems.some(i => i.courseId === course.id);
  const isEnrolled = course.slug === 'spring-5-with-spring-boot-2' || course.id === 'c_spring_boot_01';

  return (
    <div className="course-detail-page">
      {/* Dark Hero Banner */}
      <section className="detail-hero-banner">
        <div className="page-container detail-hero-inner">
          <div className="hero-left-col">
            <div className="breadcrumbs">
              <span>Development</span> &gt; <span>Programming Languages</span> &gt; <span>Java</span>
            </div>

            <h1 className="hero-course-title">{course.title}</h1>
            <p className="hero-course-sub">{course.subtitle}</p>

            <div className="hero-meta-row">
              {course.isBestseller && <span className="badge badge-bestseller">Bestseller</span>}
              <div className="hero-rating">
                <span className="rating-num font-bold">{course.rating}</span>
                <Star size={14} fill="#e59819" color="#e59819" />
              </div>
              <span className="meta-text">({course.ratingsCount.toLocaleString()} ratings)</span>
              <span className="meta-text">{course.studentsCount.toLocaleString()} students</span>
            </div>

            <div className="hero-instructor-line">
              Created by <span className="instructor-link">{course.instructorName}</span>
            </div>

            <div className="hero-lang-row">
              <Globe size={16} />
              <span>English</span>
              <Award size={16} className="ml-3" />
              <span>Certificate of completion included</span>
            </div>
          </div>

          {/* Floating Purchase Box */}
          <div className="floating-buy-card">
            <div className="buy-card-media">
              <img src={course.thumbnailUrl} alt={course.title} className="buy-card-img" />
              <div className="media-overlay">
                <PlayCircle size={48} className="preview-play-icon" />
                <span className="preview-label">Preview this course</span>
              </div>
            </div>

            <div className="buy-card-body">
              <div className="buy-price-row">
                <span className="buy-price-curr font-bold">₹{course.price.toFixed(2)}</span>
                <span className="buy-price-orig">₹{course.originalPrice.toFixed(2)}</span>
                <span className="buy-discount-tag">85% off</span>
              </div>

              {isEnrolled ? (
                <button
                  className="btn btn-primary btn-full-width"
                  onClick={() => navigate(`/course/${course.slug}/learn/lecture/lec_122`)}
                >
                  Go to Course
                </button>
              ) : (
                <div className="buy-cta-group">
                  <button
                    className="btn btn-primary btn-full-width"
                    onClick={() => onAddToCart(course.id)}
                    disabled={isInCart}
                  >
                    {isInCart ? 'In Cart' : 'Add to cart'}
                  </button>
                  <button
                    className="btn btn-white btn-full-width mt-2"
                    onClick={() => {
                      if (!isInCart) onAddToCart(course.id);
                      navigate('/cart');
                    }}
                  >
                    Buy now
                  </button>
                </div>
              )}

              <div className="money-back-note">30-Day Money-Back Guarantee</div>

              <div className="course-includes-list">
                <div className="includes-title font-bold">This course includes:</div>
                <ul>
                  <li>{course.totalHours} hours on-demand video</li>
                  <li>Full lifetime access</li>
                  <li>Access on mobile and TV</li>
                  <li>Certificate of completion</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Syllabus / What you will learn */}
      <main className="page-container detail-main-section">
        <div className="detail-content-left">
          <div className="what-learn-box">
            <h2 className="box-title">What you'll learn</h2>
            <div className="learn-grid">
              <div className="learn-item"><Check size={16} className="check-icon" /> Master Spring Boot 3 & Java Microservices</div>
              <div className="learn-item"><Check size={16} className="check-icon" /> Setup PostgreSQL databases and JDBC connection pools</div>
              <div className="learn-item"><Check size={16} className="check-icon" /> Secure applications with Spring Security & OAuth2</div>
              <div className="learn-item"><Check size={16} className="check-icon" /> Integrate Generative AI LLMs with Spring AI</div>
            </div>
          </div>
        </div>
      </main>

      <style>{`
        .course-detail-page {
          background: #ffffff;
          padding-bottom: 80px;
        }
        .detail-hero-banner {
          background: #1c1d1f;
          color: #ffffff;
          padding: 40px 0 48px 0;
        }
        .detail-hero-inner {
          display: flex;
          position: relative;
          gap: 40px;
        }
        .hero-left-col {
          flex: 1;
          max-width: 720px;
        }
        .breadcrumbs {
          font-size: 13px;
          color: #c0c4fc;
          margin-bottom: 16px;
        }
        .hero-course-title {
          font-size: 32px;
          font-weight: 700;
          line-height: 1.25;
          margin-bottom: 12px;
        }
        .hero-course-sub {
          font-size: 17px;
          line-height: 1.4;
          color: #ffffff;
          margin-bottom: 16px;
        }
        .hero-meta-row {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 12px;
          flex-wrap: wrap;
        }
        .hero-rating {
          display: flex;
          align-items: center;
          gap: 4px;
          color: #e59819;
        }
        .meta-text {
          font-size: 14px;
          color: #ffffff;
        }
        .hero-instructor-line {
          font-size: 14px;
          margin-bottom: 16px;
        }
        .instructor-link {
          color: #c0c4fc;
          text-decoration: underline;
        }
        .hero-lang-row {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 14px;
          color: #ffffff;
        }
        .floating-buy-card {
          width: 340px;
          position: absolute;
          right: 24px;
          top: 24px;
          background: #ffffff;
          border: 1px solid #d1d7dc;
          border-radius: 4px;
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
          overflow: hidden;
          z-index: 10;
        }
        .buy-card-media {
          position: relative;
          width: 100%;
          aspect-ratio: 16 / 9;
          cursor: pointer;
        }
        .buy-card-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .media-overlay {
          position: absolute;
          inset: 0;
          background: rgba(0, 0, 0, 0.4);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          color: #ffffff;
        }
        .preview-play-icon {
          margin-bottom: 8px;
        }
        .preview-label {
          font-size: 13px;
          font-weight: 700;
        }
        .buy-card-body {
          padding: 24px;
          color: #2d2f31;
        }
        .buy-price-row {
          display: flex;
          align-items: baseline;
          gap: 12px;
          margin-bottom: 20px;
        }
        .buy-price-curr {
          font-size: 28px;
          color: #1c1d1f;
        }
        .buy-price-orig {
          font-size: 16px;
          color: #6a6f73;
          text-decoration: line-through;
        }
        .buy-discount-tag {
          font-size: 14px;
          color: #2d2f31;
        }
        .btn-full-width {
          width: 100%;
          height: 48px;
          font-size: 16px;
        }
        .money-back-note {
          font-size: 12px;
          color: #6a6f73;
          text-align: center;
          margin: 12px 0 20px 0;
        }
        .course-includes-list {
          border-top: 1px solid #e4e8eb;
          padding-top: 16px;
          font-size: 13px;
        }
        .includes-title {
          margin-bottom: 10px;
        }
        .course-includes-list ul {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .detail-main-section {
          padding-top: 40px;
        }
        .detail-content-left {
          max-width: 720px;
        }
        .what-learn-box {
          border: 1px solid #d1d7dc;
          border-radius: 4px;
          padding: 24px;
        }
        .box-title {
          font-size: 22px;
          font-weight: 700;
          color: #1c1d1f;
          margin-bottom: 16px;
        }
        .learn-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
        }
        .learn-item {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          font-size: 14px;
          color: #2d2f31;
        }
        .check-icon {
          color: #1c1d1f;
          flex-shrink: 0;
          margin-top: 2px;
        }
        .ml-3 {
          margin-left: 12px;
        }
        .mt-2 {
          margin-top: 8px;
        }
        @media (max-width: 992px) {
          .floating-buy-card {
            position: static;
            width: 100%;
            margin-top: 24px;
          }
          .detail-hero-inner {
            flex-direction: column;
          }
          .learn-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
};
