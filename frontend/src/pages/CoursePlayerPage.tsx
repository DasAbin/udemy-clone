import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  Trophy, Share2, MoreVertical, Play, Pause, ChevronLeft, ChevronRight, 
  Check, ChevronDown, Sparkles, X, Search, Star, FolderDown
} from 'lucide-react';
import { CertificateModal } from '../components/player/CertificateModal';
import { api } from '../services/api';
import { Lecture, Section, CertificateData } from '../types';

export const CoursePlayerPage: React.FC = () => {
  const { slug = 'spring-5-with-spring-boot-2', lectureId } = useParams();
  const [sections, setSections] = useState<Section[]>([]);
  const [courseTitle, setCourseTitle] = useState('Java Spring Framework, Spring Boot, Spring AI - Gen AI');
  const [currentLecture, setCurrentLecture] = useState<Lecture | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeRightTab, setActiveRightTab] = useState<'content' | 'ai'>('content');
  const [activeBottomTab, setActiveBottomTab] = useState('overview');
  const [openResourcesLecId, setOpenResourcesLecId] = useState<string | null>(null);
  const [certificate, setCertificate] = useState<CertificateData | null>(null);
  const [showCertificateModal, setShowCertificateModal] = useState(false);
  const [showCertificateDropdown, setShowCertificateDropdown] = useState(false);
  const [aiQuery, setAiQuery] = useState('');
  const [aiChat, setAiChat] = useState<{ role: string; text: string }[]>([
    { role: 'assistant', text: 'Hello Vivek! I am your AI learning tutor for Spring Boot & Microservices. What questions do you have about this lecture?' }
  ]);

  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const loadCurriculum = async () => {
      try {
        const data = await api.getCurriculum(slug);
        setSections(data.sections);
        setCourseTitle(data.courseTitle);

        // Find initial lecture
        const allLectures: Lecture[] = [];
        data.sections.forEach(s => allLectures.push(...s.lectures));
        const target = allLectures.find(l => l.id === lectureId) || allLectures[2] || allLectures[0];
        setCurrentLecture(target);
      } catch (err) {
        console.error('Error loading curriculum:', err);
      }
    };
    loadCurriculum();

    // Preload certificate
    api.getCertificate(slug).then(res => setCertificate(res.certificate)).catch(() => {});
  }, [slug, lectureId]);

  const togglePlay = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
        setIsPlaying(true);
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    } else {
      setIsPlaying(!isPlaying);
    }
  };

  const handleToggleLectureCompletion = async (lec: Lecture) => {
    try {
      const res = await api.toggleLecture('c_spring_boot_01', lec.id);
      // Update local state
      setSections(prevSections =>
        prevSections.map(sec => ({
          ...sec,
          lectures: sec.lectures.map(l =>
            l.id === lec.id ? { ...l, isCompleted: res.isCompleted } : l
          )
        }))
      );
      if (currentLecture && currentLecture.id === lec.id) {
        setCurrentLecture({ ...currentLecture, isCompleted: res.isCompleted });
      }
    } catch (err) {
      console.error('Error toggling lecture completion:', err);
    }
  };

  const handlePrevLecture = () => {
    const allLecs = sections.flatMap(s => s.lectures);
    const currentIndex = allLecs.findIndex(l => l.id === currentLecture?.id);
    if (currentIndex > 0) {
      setCurrentLecture(allLecs[currentIndex - 1]);
      setIsPlaying(true);
    }
  };

  const handleNextLecture = () => {
    const allLecs = sections.flatMap(s => s.lectures);
    const currentIndex = allLecs.findIndex(l => l.id === currentLecture?.id);
    if (currentIndex < allLecs.length - 1) {
      setCurrentLecture(allLecs[currentIndex + 1]);
      setIsPlaying(true);
    }
  };

  const handleSendAiQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!aiQuery.trim()) return;

    const userText = aiQuery;
    setAiChat(prev => [...prev, { role: 'user', text: userText }]);
    setAiQuery('');

    setTimeout(() => {
      let reply = `In PostgreSQL & JDBC with Spring, connection pooling is handled via HikariCP by default. When configuring data sources, ensure your 'spring.datasource.url' specifies 'jdbc:postgresql://localhost:5432/dbname'.`;
      if (userText.toLowerCase().includes('statement')) {
        reply = `PreparedStatements pre-compile SQL queries on the database server, providing enhanced execution speed for batch queries and total protection against SQL Injection vulnerabilities.`;
      }
      setAiChat(prev => [...prev, { role: 'assistant', text: reply }]);
    }, 600);
  };

  return (
    <div className="course-player-container">
      {/* Top Black Navigation Bar */}
      <header className="player-navbar">
        <div className="player-nav-left">
          <Link to="/" className="player-logo">
            udemy
          </Link>
          <div className="player-title-divider" />
          <span className="player-course-title">{courseTitle}</span>
        </div>

        <div className="player-nav-right">
          {/* Get Course Certificate Dropdown matching Screenshot 2026-09-14 114401.png */}
          <div className="certificate-nav-wrapper">
            <button 
              className="btn-certificate-nav"
              onClick={() => setShowCertificateDropdown(!showCertificateDropdown)}
            >
              <Trophy size={18} className="trophy-icon" />
              <span>Get course certificate</span>
              <ChevronDown size={14} />
            </button>

            {showCertificateDropdown && (
              <div className="certificate-trophy-popover">
                <div className="popover-progress-text">563 of 563 complete.</div>
                <Link
                  to="/certificate/UC-48d475b3-3dd7-443d-bfef-ab611f8f1937"
                  className="btn-get-certificate-purple"
                  onClick={() => setShowCertificateDropdown(false)}
                >
                  Get certificate
                </Link>
              </div>
            )}
          </div>

          {/* Share */}
          <button className="btn-player-icon" title="Share">
            <Share2 size={18} />
            <span className="btn-label">Share</span>
          </button>

          {/* More Options */}
          <button className="btn-player-icon" title="Options">
            <MoreVertical size={18} />
          </button>
        </div>
      </header>

      {/* Main Player Stage + Sidebar */}
      <div className="player-workspace">
        {/* Left Video Player & Tabs */}
        <div className="player-main-col">
          {/* Black Video Player Box */}
          <div className="video-stage">
            <video
              ref={videoRef}
              src={currentLecture?.videoUrl || 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'}
              className="html5-video"
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
              controls
            />

            {/* Prev Video Chevron */}
            <button className="video-floating-nav prev" onClick={handlePrevLecture} title="Previous lecture">
              <ChevronLeft size={24} />
            </button>

            {/* Big Play Overlay (when paused) */}
            {!isPlaying && (
              <button className="big-play-btn" onClick={togglePlay} title="Play lecture">
                <Play size={40} fill="#ffffff" color="#ffffff" className="play-icon-center" />
              </button>
            )}

            {/* Next Video Chevron */}
            <button className="video-floating-nav next" onClick={handleNextLecture} title="Next lecture">
              <ChevronRight size={24} />
            </button>
          </div>

          {/* Course Tabs Under Video */}
          <div className="player-bottom-tabs-bar">
            <button className="tab-search-icon" title="Search in course">
              <Search size={18} />
            </button>

            {['Overview', 'Q&A', 'Notes', 'Announcements', 'Reviews', 'Learning tools'].map(tab => (
              <button
                key={tab}
                className={`player-bottom-tab ${activeBottomTab.toLowerCase() === tab.toLowerCase() ? 'active' : ''}`}
                onClick={() => setActiveBottomTab(tab.toLowerCase())}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Tab Content Section */}
          <div className="player-tab-content-pane">
            {activeBottomTab === 'overview' && (
              <div className="overview-content">
                <h2 className="overview-heading">
                  Master Java, Spring and Spring Boot, Spring Security, Spring AI, Docker and Microservices with Telusko
                </h2>

                <div className="overview-meta-row">
                  <div className="meta-rating">
                    <span className="font-bold">4.5</span>
                    <Star size={14} fill="#b4690e" color="#b4690e" />
                  </div>
                  <span className="meta-item">45,696 ratings</span>
                  <span className="meta-item">291,681 Students</span>
                  <span className="meta-item">55 hours Total</span>
                </div>

                <div className="lecture-now-playing">
                  <h3>Now Playing: {currentLecture?.title}</h3>
                  <p className="lecture-desc">
                    In this hands-on session, you will follow step-by-step instructions to configure your environment, test the connection, and run queries with JDBC drivers.
                  </p>
                </div>
              </div>
            )}

            {activeBottomTab === 'q&a' && (
              <div className="qa-pane">
                <h3>Questions & Answers</h3>
                <p className="text-secondary">Have a question? Ask your instructor or explore answers from fellow learners.</p>
                <button className="btn btn-outline btn-sm mt-3" onClick={() => setActiveRightTab('ai')}>
                  Ask AI Assistant
                </button>
              </div>
            )}

            {activeBottomTab !== 'overview' && activeBottomTab !== 'q&a' && (
              <div className="generic-tab-pane">
                <h3>{activeBottomTab.toUpperCase()}</h3>
                <p className="text-secondary">Explore study resources, community discussions, and updates for this course.</p>
              </div>
            )}
          </div>
        </div>

        {/* Right Collapsible Curriculum Sidebar */}
        {isSidebarOpen && (
          <aside className="player-curriculum-sidebar">
            {/* Sidebar Tabs */}
            <div className="sidebar-tab-header">
              <button
                className={`sidebar-tab-btn ${activeRightTab === 'content' ? 'active' : ''}`}
                onClick={() => setActiveRightTab('content')}
              >
                Course content
              </button>
              <button
                className={`sidebar-tab-btn ${activeRightTab === 'ai' ? 'active' : ''}`}
                onClick={() => setActiveRightTab('ai')}
              >
                <Sparkles size={14} className="sparkle-icon" /> AI Assistant
              </button>

              <button 
                className="sidebar-close-btn" 
                onClick={() => setIsSidebarOpen(false)}
                title="Collapse sidebar"
              >
                <X size={18} />
              </button>
            </div>

            {/* Tab 1: Course Content */}
            {activeRightTab === 'content' && (
              <div className="curriculum-lecture-list">
                {sections.map(section => (
                  <div key={section.id} className="curriculum-section-group">
                    <div className="section-title-bar">
                      <span className="section-name">{section.title}</span>
                    </div>

                    <div className="lectures-container">
                      {section.lectures.map(lec => {
                        const isCurrent = currentLecture?.id === lec.id;
                        const isResOpen = openResourcesLecId === lec.id;

                        return (
                          <div 
                            key={lec.id} 
                            className={`lecture-item-row ${isCurrent ? 'current-active' : ''}`}
                            onClick={() => {
                              setCurrentLecture(lec);
                              setIsPlaying(true);
                            }}
                          >
                            {/* Checkbox */}
                            <button
                              className={`lecture-checkbox ${lec.isCompleted ? 'checked' : ''}`}
                              onClick={(e) => {
                                e.stopPropagation();
                                handleToggleLectureCompletion(lec);
                              }}
                              title={lec.isCompleted ? 'Mark as incomplete' : 'Mark as complete'}
                            >
                              {lec.isCompleted && <Check size={14} strokeWidth={3} />}
                            </button>

                            {/* Lecture Info */}
                            <div className="lecture-info-col">
                              <div className="lecture-title-text">{lec.title}</div>
                              <div className="lecture-duration-row">
                                <Play size={10} className="duration-play-icon" />
                                <span>{lec.durationMinutes}min</span>
                              </div>
                            </div>

                            {/* Resources Dropdown Button */}
                            {lec.hasResources && (
                              <div className="resources-btn-container" onClick={(e) => e.stopPropagation()}>
                                <button
                                  className="btn-resources"
                                  onClick={() => setOpenResourcesLecId(isResOpen ? null : lec.id)}
                                >
                                  <FolderDown size={14} />
                                  <span>Resources</span>
                                  <ChevronDown size={12} />
                                </button>

                                {isResOpen && (
                                  <div className="resources-menu-popover">
                                    <a 
                                      href="#download" 
                                      className="res-link"
                                      onClick={(e) => {
                                        e.preventDefault();
                                        alert(`Downloading source code archive for: ${lec.title}`);
                                      }}
                                    >
                                      📄 postgres-setup-guide.sql
                                    </a>
                                    <a 
                                      href="#download" 
                                      className="res-link"
                                      onClick={(e) => {
                                        e.preventDefault();
                                        alert(`Downloading presentation slides for: ${lec.title}`);
                                      }}
                                    >
                                      📊 lecture-slides.pdf
                                    </a>
                                  </div>
                                )}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Tab 2: AI Assistant */}
            {activeRightTab === 'ai' && (
              <div className="ai-assistant-container">
                <div className="ai-messages-area">
                  {aiChat.map((msg, i) => (
                    <div key={i} className={`ai-msg ${msg.role}`}>
                      <div className="ai-bubble">
                        {msg.role === 'assistant' && <Sparkles size={14} className="mb-1 text-purple" />}
                        <p>{msg.text}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <form className="ai-input-bar" onSubmit={handleSendAiQuestion}>
                  <input
                    type="text"
                    className="ai-text-input"
                    placeholder="Ask AI about this lecture..."
                    value={aiQuery}
                    onChange={(e) => setAiQuery(e.target.value)}
                  />
                  <button type="submit" className="btn btn-primary btn-sm">
                    Ask
                  </button>
                </form>
              </div>
            )}
          </aside>
        )}
      </div>

      {/* Certificate Modal */}
      {showCertificateModal && certificate && (
        <CertificateModal
          certificate={certificate}
          onClose={() => setShowCertificateModal(false)}
        />
      )}

      <style>{`
        .course-player-container {
          display: flex;
          flex-direction: column;
          min-height: 100vh;
          background: #ffffff;
        }
        .player-navbar {
          background: #1c1d1f;
          height: 56px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 16px;
          color: #ffffff;
          z-index: 100;
        }
        .player-nav-left {
          display: flex;
          align-items: center;
          gap: 16px;
          overflow: hidden;
        }
        .player-logo {
          font-size: 22px;
          font-weight: 800;
          color: #ffffff;
          letter-spacing: -0.5px;
        }
        .player-title-divider {
          width: 1px;
          height: 24px;
          background: #3e4143;
        }
        .player-course-title {
          font-size: 14px;
          font-weight: 600;
          color: #ffffff;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .player-nav-right {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .btn-certificate-nav {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          color: #ffffff;
          font-size: 13px;
          font-weight: 600;
          padding: 6px 12px;
          border-radius: 4px;
          background: rgba(255, 255, 255, 0.1);
          transition: background 0.15s;
        }
        .btn-certificate-nav:hover {
          background: rgba(255, 255, 255, 0.2);
        }
        .certificate-nav-wrapper {
          position: relative;
        }
        .certificate-trophy-popover {
          position: absolute;
          top: calc(100% + 8px);
          right: 0;
          width: 240px;
          background: #ffffff;
          border-radius: 8px;
          box-shadow: 0 4px 20px rgba(0,0,0,0.25);
          padding: 16px;
          z-index: 999;
          border: 1px solid #d1d7dc;
        }
        .popover-progress-text {
          font-size: 13px;
          font-weight: 700;
          color: #2d2f31;
          margin-bottom: 12px;
          text-align: left;
        }
        .btn-get-certificate-purple {
          display: block;
          width: 100%;
          text-align: center;
          background: #a435f0;
          color: #ffffff;
          padding: 10px 0;
          font-size: 14px;
          font-weight: 700;
          border-radius: 4px;
          text-decoration: none;
          transition: background 0.15s;
        }
        .btn-get-certificate-purple:hover {
          background: #8710d8;
        }
        .trophy-icon {
          color: #c0c4fc;
        }
        .btn-player-icon {
          display: flex;
          align-items: center;
          gap: 6px;
          color: #ffffff;
          font-size: 13px;
          padding: 6px 10px;
          border-radius: 4px;
        }
        .btn-player-icon:hover {
          background: rgba(255, 255, 255, 0.1);
        }
        .player-workspace {
          display: flex;
          flex: 1;
        }
        .player-main-col {
          flex: 1;
          display: flex;
          flex-direction: column;
          background: #ffffff;
          overflow-y: auto;
        }
        .video-stage {
          background: #000000;
          position: relative;
          aspect-ratio: 16 / 9;
          max-height: 520px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .html5-video {
          width: 100%;
          height: 100%;
          object-fit: contain;
        }
        .video-floating-nav {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          width: 44px;
          height: 44px;
          border-radius: 4px;
          background: rgba(45, 47, 49, 0.85);
          color: #ffffff;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 10;
          transition: background 0.15s;
        }
        .video-floating-nav:hover {
          background: rgba(164, 53, 240, 0.9);
        }
        .video-floating-nav.prev {
          left: 12px;
        }
        .video-floating-nav.next {
          right: 12px;
        }
        .big-play-btn {
          position: absolute;
          width: 80px;
          height: 80px;
          border-radius: 50%;
          background: rgba(45, 47, 49, 0.8);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: transform 0.15s;
        }
        .big-play-btn:hover {
          transform: scale(1.1);
          background: #a435f0;
        }
        .play-icon-center {
          margin-left: 6px;
        }
        .player-bottom-tabs-bar {
          display: flex;
          align-items: center;
          gap: 16px;
          border-bottom: 1px solid #d1d7dc;
          padding: 0 24px;
          overflow-x: auto;
        }
        .tab-search-icon {
          color: #6a6f73;
          padding: 12px 8px;
        }
        .player-bottom-tab {
          padding: 16px 8px;
          font-size: 14px;
          font-weight: 700;
          color: #6a6f73;
          position: relative;
          white-space: nowrap;
        }
        .player-bottom-tab:hover {
          color: #1c1d1f;
        }
        .player-bottom-tab.active {
          color: #1c1d1f;
        }
        .player-bottom-tab.active::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 2px;
          background: #1c1d1f;
        }
        .player-tab-content-pane {
          padding: 24px;
          max-width: 900px;
        }
        .overview-heading {
          font-size: 22px;
          font-weight: 700;
          color: #1c1d1f;
          margin-bottom: 12px;
        }
        .overview-meta-row {
          display: flex;
          align-items: center;
          gap: 16px;
          font-size: 13px;
          color: #2d2f31;
          margin-bottom: 24px;
        }
        .meta-rating {
          display: flex;
          align-items: center;
          gap: 4px;
          color: #b4690e;
        }
        .lecture-now-playing {
          padding: 16px;
          background: #f7f9fa;
          border-radius: 6px;
          border: 1px solid #e4e8eb;
        }
        .lecture-now-playing h3 {
          font-size: 15px;
          margin-bottom: 6px;
        }
        .lecture-desc {
          font-size: 13px;
          color: #6a6f73;
        }
        .player-curriculum-sidebar {
          width: 380px;
          border-left: 1px solid #d1d7dc;
          display: flex;
          flex-direction: column;
          background: #ffffff;
          height: calc(100vh - 56px);
          position: sticky;
          top: 56px;
        }
        .sidebar-tab-header {
          display: flex;
          align-items: center;
          border-bottom: 1px solid #d1d7dc;
          padding: 0 16px;
          background: #ffffff;
        }
        .sidebar-tab-btn {
          padding: 14px 12px;
          font-size: 14px;
          font-weight: 700;
          color: #6a6f73;
          position: relative;
          display: flex;
          align-items: center;
          gap: 6px;
        }
        .sidebar-tab-btn.active {
          color: #1c1d1f;
        }
        .sidebar-tab-btn.active::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 2px;
          background: #1c1d1f;
        }
        .sparkle-icon {
          color: #a435f0;
        }
        .sidebar-close-btn {
          margin-left: auto;
          color: #6a6f73;
          padding: 6px;
        }
        .curriculum-lecture-list {
          flex: 1;
          overflow-y: auto;
        }
        .section-title-bar {
          background: #f7f9fa;
          padding: 12px 16px;
          font-size: 13px;
          font-weight: 700;
          color: #1c1d1f;
          border-bottom: 1px solid #e4e8eb;
        }
        .lecture-item-row {
          display: flex;
          align-items: flex-start;
          padding: 12px 16px;
          gap: 12px;
          border-bottom: 1px solid #f2f3f5;
          cursor: pointer;
          transition: background 0.1s;
        }
        .lecture-item-row:hover {
          background: #f7f9fa;
        }
        .lecture-item-row.current-active {
          background: #f3e8fd;
        }
        .lecture-checkbox {
          width: 18px;
          height: 18px;
          border: 1px solid #2d2f31;
          border-radius: 2px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-top: 2px;
          background: #ffffff;
          flex-shrink: 0;
        }
        .lecture-checkbox.checked {
          background: #5624d0;
          border-color: #5624d0;
          color: #ffffff;
        }
        .lecture-info-col {
          flex: 1;
        }
        .lecture-title-text {
          font-size: 13px;
          font-weight: 500;
          color: #2d2f31;
          line-height: 1.35;
          margin-bottom: 4px;
        }
        .lecture-duration-row {
          display: flex;
          align-items: center;
          gap: 4px;
          font-size: 11px;
          color: #6a6f73;
        }
        .btn-resources {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          font-size: 11px;
          font-weight: 600;
          color: #5624d0;
          border: 1px solid #5624d0;
          padding: 4px 8px;
          border-radius: 4px;
          background: #ffffff;
        }
        .btn-resources:hover {
          background: #f3e8fd;
        }
        .resources-btn-container {
          position: relative;
        }
        .resources-menu-popover {
          position: absolute;
          top: 100%;
          right: 0;
          margin-top: 4px;
          background: #ffffff;
          border: 1px solid #d1d7dc;
          box-shadow: var(--shadow-dropdown);
          border-radius: 4px;
          min-width: 200px;
          z-index: 20;
          padding: 6px 0;
        }
        .res-link {
          display: block;
          padding: 8px 12px;
          font-size: 12px;
          color: #2d2f31;
        }
        .res-link:hover {
          background: #f7f9fa;
          color: #a435f0;
        }
        .ai-assistant-container {
          display: flex;
          flex-direction: column;
          height: 100%;
          padding: 16px;
        }
        .ai-messages-area {
          flex: 1;
          overflow-y: auto;
          display: flex;
          flex-direction: column;
          gap: 12px;
          padding-bottom: 12px;
        }
        .ai-msg.user {
          align-self: flex-end;
        }
        .ai-msg.user .ai-bubble {
          background: #5624d0;
          color: #ffffff;
        }
        .ai-msg.assistant {
          align-self: flex-start;
        }
        .ai-msg.assistant .ai-bubble {
          background: #f7f9fa;
          border: 1px solid #e4e8eb;
          color: #2d2f31;
        }
        .ai-bubble {
          padding: 10px 14px;
          border-radius: 8px;
          font-size: 13px;
          line-height: 1.4;
          max-width: 280px;
        }
        .ai-input-bar {
          display: flex;
          gap: 8px;
          border-top: 1px solid #e4e8eb;
          padding-top: 12px;
        }
        .ai-text-input {
          flex: 1;
          height: 36px;
          border: 1px solid #d1d7dc;
          border-radius: 4px;
          padding: 0 10px;
        }
        @media (max-width: 900px) {
          .player-curriculum-sidebar {
            width: 100%;
            height: auto;
            position: relative;
            top: 0;
          }
          .player-workspace {
            flex-direction: column;
          }
        }
      `}</style>
    </div>
  );
};
