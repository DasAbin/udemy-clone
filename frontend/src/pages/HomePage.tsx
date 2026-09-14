import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import { CourseCard } from '../components/common/CourseCard';
import { PublicHero } from '../components/home/PublicHero';
import { User, Course, CartItem } from '../types';

interface HomePageProps {
  user: User | null;
  courses: Course[];
  cartItems: CartItem[];
  onAddToCart: (courseId: string) => void;
  onOpenLogin: () => void;
  onOpenSignup: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({ 
  user, 
  courses, 
  cartItems, 
  onAddToCart,
  onOpenLogin,
  onOpenSignup 
}) => {
  const row1Ref = useRef<HTMLDivElement>(null);
  const row2Ref = useRef<HTMLDivElement>(null);
  const row3Ref = useRef<HTMLDivElement>(null);
  const publicRowRef = useRef<HTMLDivElement>(null);
  const [selectedTopic, setSelectedTopic] = useState('Python');

  const scrollRow = (ref: React.RefObject<HTMLDivElement>, direction: 'left' | 'right') => {
    if (ref.current) {
      const scrollAmount = direction === 'left' ? -600 : 600;
      ref.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const [popularTab, setPopularTab] = useState<'popular' | 'trending'>('popular');

  const isInCart = (courseId: string) => cartItems.some(i => i.courseId === courseId);

  // Grouping courses
  const recommendedCourses = courses.slice(1, 6);
  const viewedCourses = courses.slice(6, 11);
  const backendPopularCourses = courses.slice(11, 16);

  // Sort public popular courses to prominently show the courses from the user screenshots
  const prioritySlugs = [
    'the-complete-web-development-bootcamp',
    'complete-web-development-course',
    'the-complete-javascript-course',
    'fastapi-the-complete-course-2026',
    'angular-the-complete-guide',
    'coding-with-ai-planning-to-production',
    'the-ultimate-react-course-2025',
    'spring-5-with-spring-boot-2'
  ];

  const publicPopularCourses = [
    ...courses.filter(c => prioritySlugs.includes(c.slug)),
    ...courses.filter(c => !prioritySlugs.includes(c.slug))
  ];

  // If user is LOGGED IN -> render personalized homepage
  if (user) {
    return (
      <div className="udemy-home-page">
        <div className="page-container">
          {/* User Welcome Banner */}
          <section className="welcome-banner">
            <div className="welcome-avatar-circle">
              {user.avatarInitials}
            </div>
            <div className="welcome-content">
              <h1 className="welcome-title">Welcome back, {user.firstName}</h1>
              <div className="welcome-subtitle-row">
                <span className="welcome-occupation">{user.headline || 'Manager, Software Development'}</span>
                <Link to="/user/edit-profile" className="edit-occupation-link">
                  Edit occupation and interests
                </Link>
              </div>
            </div>
          </section>

          {/* Section 1: What to learn next / Recommended for you */}
          <section className="home-course-section">
            <h2 className="main-section-heading">What to learn next</h2>
            <h3 className="subsection-heading">Recommended for you</h3>

            <div className="carousel-wrapper">
              <button 
                className="carousel-nav-btn prev-btn" 
                onClick={() => scrollRow(row1Ref, 'left')}
                title="Previous"
              >
                <ChevronLeft size={20} />
              </button>

              <div className="course-carousel-row" ref={row1Ref}>
                {recommendedCourses.map((course) => (
                  <div className="carousel-card-item" key={course.id}>
                    <CourseCard
                      course={course}
                      isInCart={isInCart(course.id)}
                      onAddToCart={onAddToCart}
                    />
                  </div>
                ))}
              </div>

              <button 
                className="carousel-nav-btn next-btn" 
                onClick={() => scrollRow(row1Ref, 'right')}
                title="Next"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </section>

          {/* Section 2: Because you viewed ... */}
          <section className="home-course-section">
            <h3 className="viewed-section-heading">
              Because you viewed “<Link to={`/course/spring-5-with-spring-boot-2`} className="link-purple">Master Java Full Stack Development with Spring Boot + React</Link>”
            </h3>

            <div className="carousel-wrapper">
              <button 
                className="carousel-nav-btn prev-btn" 
                onClick={() => scrollRow(row2Ref, 'left')}
                title="Previous"
              >
                <ChevronLeft size={20} />
              </button>

              <div className="course-carousel-row" ref={row2Ref}>
                {viewedCourses.map((course) => (
                  <div className="carousel-card-item" key={course.id}>
                    <CourseCard
                      course={course}
                      isInCart={isInCart(course.id)}
                      onAddToCart={onAddToCart}
                    />
                  </div>
                ))}
              </div>

              <button 
                className="carousel-nav-btn next-btn" 
                onClick={() => scrollRow(row2Ref, 'right')}
                title="Next"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </section>

          {/* Section 3: Popular for Back End Web Developers */}
          <section className="home-course-section">
            <div className="popular-header-row">
              <h3 className="popular-title">
                Popular for Back End Web Developers
              </h3>
              <Link to="/user/edit-profile" className="edit-occupation-link">
                Edit occupation
              </Link>
            </div>

            <div className="inspired-tag-row">
              <span className="badge badge-new">New</span>
              <span className="inspired-text">Inspired by your selections</span>
            </div>

            <div className="carousel-wrapper">
              <button 
                className="carousel-nav-btn prev-btn" 
                onClick={() => scrollRow(row3Ref, 'left')}
                title="Previous"
              >
                <ChevronLeft size={20} />
              </button>

              <div className="course-carousel-row" ref={row3Ref}>
                {backendPopularCourses.map((course) => (
                  <div className="carousel-card-item" key={course.id}>
                    <CourseCard
                      course={course}
                      isInCart={isInCart(course.id)}
                      onAddToCart={onAddToCart}
                    />
                  </div>
                ))}
              </div>

              <button 
                className="carousel-nav-btn next-btn" 
                onClick={() => scrollRow(row3Ref, 'right')}
                title="Next"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </section>
        </div>

        <style>{`
          .udemy-home-page {
            padding-top: 32px;
            padding-bottom: 60px;
          }
          .welcome-banner {
            display: flex;
            align-items: center;
            gap: 24px;
            margin-bottom: 40px;
          }
          .welcome-avatar-circle {
            width: 72px;
            height: 72px;
            border-radius: 50%;
            background: #1c1d1f;
            color: #ffffff;
            font-weight: 700;
            font-size: 26px;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-shrink: 0;
          }
          .welcome-title {
            font-size: 28px;
            font-weight: 700;
            color: #1c1d1f;
            line-height: 1.2;
            margin-bottom: 6px;
          }
          .welcome-subtitle-row {
            display: flex;
            align-items: center;
            gap: 16px;
            font-size: 14px;
          }
          .welcome-occupation {
            color: #2d2f31;
          }
          .edit-occupation-link {
            color: #5624d0;
            font-weight: 700;
            text-decoration: underline;
          }
          .edit-occupation-link:hover {
            color: #401b9c;
          }
          .home-course-section {
            margin-bottom: 48px;
          }
          .main-section-heading {
            font-size: 24px;
            font-weight: 700;
            color: #1c1d1f;
            margin-bottom: 16px;
          }
          .subsection-heading {
            font-size: 19px;
            font-weight: 700;
            color: #1c1d1f;
            margin-bottom: 16px;
          }
          .viewed-section-heading {
            font-size: 19px;
            font-weight: 700;
            color: #1c1d1f;
            margin-bottom: 20px;
          }
          .popular-header-row {
            display: flex;
            align-items: baseline;
            gap: 12px;
            margin-bottom: 8px;
          }
          .popular-title {
            font-size: 19px;
            font-weight: 700;
            color: #1c1d1f;
          }
          .inspired-tag-row {
            display: flex;
            align-items: center;
            gap: 8px;
            margin-bottom: 16px;
          }
          .inspired-text {
            font-size: 12px;
            color: #6a6f73;
          }
          .carousel-wrapper {
            position: relative;
          }
          .course-carousel-row {
            display: flex;
            gap: 16px;
            overflow-x: auto;
            scroll-behavior: smooth;
            padding-bottom: 8px;
            scrollbar-width: none;
          }
          .course-carousel-row::-webkit-scrollbar {
            display: none;
          }
          .carousel-card-item {
            flex: 0 0 calc(20% - 13px);
            min-width: 220px;
            max-width: 260px;
          }
          .carousel-nav-btn {
            position: absolute;
            top: 36%;
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
            transition: background 0.15s;
          }
          .carousel-nav-btn:hover {
            background: #f7f9fa;
          }
          .prev-btn { left: -20px; }
          .next-btn { right: -20px; }
          @media (max-width: 1200px) {
            .carousel-card-item { flex: 0 0 calc(25% - 12px); }
          }
          @media (max-width: 900px) {
            .carousel-card-item { flex: 0 0 calc(33.33% - 11px); }
            .prev-btn, .next-btn { display: none; }
          }
          @media (max-width: 600px) {
            .carousel-card-item { flex: 0 0 calc(50% - 8px); }
          }
        `}</style>
      </div>
    );
  }

  // If user is LOGGED OUT -> render the General Public Landing Page matching the user's screenshot!
  return (
    <div className="udemy-public-home">
      {/* Public Hero Carousel & 3D Feature Cards */}
      <PublicHero onOpenLogin={onOpenLogin} onOpenSignup={onOpenSignup} />

      {/* "A broad selection of courses" Section */}
      <section className="public-courses-selection">
        <div className="page-container">
          <h2 className="selection-title">A broad selection of courses</h2>
          <p className="selection-sub">
            Choose from over 220,000 online video courses with new additions published every month
          </p>

          {/* Topic Pills */}
          <div className="topic-tabs-bar">
            {['Python', 'Microsoft Excel', 'Web Development', 'JavaScript', 'Data Science', 'Amazon AWS'].map(topic => (
              <button
                key={topic}
                className={`topic-tab-pill ${selectedTopic === topic ? 'active' : ''}`}
                onClick={() => setSelectedTopic(topic)}
              >
                {topic}
              </button>
            ))}
          </div>

          {/* Subtabs matching image.png (Most popular / Trending) */}
          <div className="popular-subtabs-row">
            <button
              className={`popular-subtab-btn ${popularTab === 'popular' ? 'active' : ''}`}
              onClick={() => setPopularTab('popular')}
            >
              Most popular
            </button>
            <button
              className={`popular-subtab-btn ${popularTab === 'trending' ? 'active' : ''}`}
              onClick={() => setPopularTab('trending')}
            >
              Trending
            </button>
          </div>

          {/* Popular Courses Carousel */}
          <div className="carousel-wrapper">
            <button 
              className="carousel-nav-btn prev-btn" 
              onClick={() => scrollRow(publicRowRef, 'left')}
              title="Previous"
            >
              <ChevronLeft size={20} />
            </button>

            <div className="course-carousel-row" ref={publicRowRef}>
              {publicPopularCourses.map((course) => (
                <div className="carousel-card-item" key={course.id}>
                  <CourseCard
                    course={course}
                    isInCart={isInCart(course.id)}
                    onAddToCart={onAddToCart}
                  />
                </div>
              ))}
            </div>

            <button 
              className="carousel-nav-btn next-btn" 
              onClick={() => scrollRow(publicRowRef, 'right')}
              title="Next"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </section>

      <style>{`
        .udemy-public-home {
          padding-bottom: 60px;
        }
        .public-courses-selection {
          margin-top: 48px;
        }
        .selection-title {
          font-size: 28px;
          font-weight: 800;
          color: #1c1d1f;
          margin-bottom: 8px;
        }
        .selection-sub {
          font-size: 16px;
          color: #6a6f73;
          margin-bottom: 24px;
        }
        .topic-tabs-bar {
          display: flex;
          gap: 12px;
          margin-bottom: 24px;
          overflow-x: auto;
          padding-bottom: 8px;
        }
        .topic-tab-pill {
          padding: 8px 16px;
          font-size: 14px;
          font-weight: 700;
          color: #2d2f31;
          border-radius: 9999px;
          border: 1px solid #d1d7dc;
          background: #ffffff;
          transition: all 0.15s;
          white-space: nowrap;
        }
        .topic-tab-pill:hover {
          background: #f7f9fa;
          border-color: #1c1d1f;
        }
        .topic-tab-pill.active {
          background: #1c1d1f;
          color: #ffffff;
          border-color: #1c1d1f;
        }
        .popular-subtabs-row {
          display: flex;
          gap: 24px;
          border-bottom: 1px solid #d1d7dc;
          margin-bottom: 24px;
        }
        .popular-subtab-btn {
          padding: 8px 4px 12px 4px;
          font-size: 16px;
          font-weight: 700;
          color: #6a6f73;
          background: none;
          border: none;
          border-bottom: 2px solid transparent;
          cursor: pointer;
          transition: all 0.15s;
        }
        .popular-subtab-btn:hover {
          color: #1c1d1f;
        }
        .popular-subtab-btn.active {
          color: #1c1d1f;
          border-bottom: 2px solid #1c1d1f;
        }
        .carousel-wrapper {
          position: relative;
        }
        .course-carousel-row {
          display: flex;
          gap: 16px;
          overflow-x: auto;
          scroll-behavior: smooth;
          padding-bottom: 8px;
          scrollbar-width: none;
        }
        .course-carousel-row::-webkit-scrollbar {
          display: none;
        }
        .carousel-card-item {
          flex: 0 0 calc(25% - 12px);
          min-width: 250px;
          max-width: 290px;
        }
        .carousel-nav-btn {
          position: absolute;
          top: 36%;
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
          transition: background 0.15s;
        }
        .carousel-nav-btn:hover {
          background: #f7f9fa;
        }
        .prev-btn { left: -20px; }
        .next-btn { right: -20px; }
        @media (max-width: 1200px) {
          .carousel-card-item { flex: 0 0 calc(25% - 12px); }
        }
        @media (max-width: 900px) {
          .carousel-card-item { flex: 0 0 calc(33.33% - 11px); }
          .prev-btn, .next-btn { display: none; }
        }
        @media (max-width: 600px) {
          .carousel-card-item { flex: 0 0 calc(50% - 8px); }
        }
      `}</style>
    </div>
  );
};
