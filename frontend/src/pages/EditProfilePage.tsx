import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Bold, Italic, Check, AlertCircle } from 'lucide-react';
import { api } from '../services/api';
import { User } from '../types';

interface EditProfilePageProps {
  user: User | null;
  onUserUpdate: (updated: User) => void;
}

export const EditProfilePage: React.FC<EditProfilePageProps> = ({ user, onUserUpdate }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentTab = searchParams.get('tab') || 'profile';

  const [firstName, setFirstName] = useState(user?.firstName || '');
  const [lastName, setLastName] = useState(user?.lastName || '');
  const [headline, setHeadline] = useState(user?.headline || '');
  const [biography, setBiography] = useState(user?.biography || '');
  const [language, setLanguage] = useState(user?.language || 'English (US)');
  const [website, setWebsite] = useState(user?.website || '');
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');

  useEffect(() => {
    if (user) {
      setFirstName(user.firstName);
      setLastName(user.lastName);
      setHeadline(user.headline);
      setBiography(user.biography);
      setLanguage(user.language);
      setWebsite(user.website);
    }
  }, [user]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaveStatus('saving');
    try {
      const res = await api.updateUser({
        firstName,
        lastName,
        headline,
        biography,
        language,
        website
      });
      onUserUpdate(res.user);
      setSaveStatus('saved');
      setTimeout(() => setSaveStatus('idle'), 3000);
    } catch (err) {
      setSaveStatus('error');
    }
  };

  const navItems = [
    { key: 'view-public', label: 'View public profile', link: user?.name ? `/user/${encodeURIComponent(user.name.toLowerCase().replace(/\s+/g, '-'))}` : '/user/profile' },
    { key: 'profile', label: 'Profile' },
    { key: 'photo', label: 'Photo' },
    { key: 'security', label: 'Account Security' },
    { key: 'subscriptions', label: 'Subscriptions' },
    { key: 'payment', label: 'Payment methods' },
    { key: 'privacy', label: 'Privacy' },
    { key: 'notifications', label: 'Notification Preferences' },
    { key: 'api', label: 'API clients' },
    { key: 'close', label: 'Close account' }
  ];

  const maxHeadlineChars = 60;
  const charsLeft = maxHeadlineChars - headline.length;

  return (
    <div className="edit-profile-page">
      <div className="page-container profile-layout">
        {/* Left Sidebar */}
        <aside className="profile-sidebar">
          <div className="profile-sidebar-user">
            <div className="profile-avatar-circle">
              {user?.avatarInitials || (user?.name ? user.name[0].toUpperCase() : 'U')}
            </div>
            <h3 className="profile-user-name">{user?.name || 'My Profile'}</h3>
          </div>

          <nav className="profile-nav-list">
            {navItems.map((item) => {
              if (item.link) {
                return (
                  <Link key={item.key} to={item.link} className="profile-nav-link">
                    {item.label}
                  </Link>
                );
              }
              const isActive = currentTab === item.key;
              return (
                <button
                  key={item.key}
                  className={`profile-nav-btn ${isActive ? 'active' : ''}`}
                  onClick={() => setSearchParams({ tab: item.key })}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>
        </aside>

        {/* Right Main Form Container */}
        <main className="profile-main-content">
          {currentTab === 'profile' ? (
            <div className="profile-card-form">
              <header className="profile-header">
                <h1 className="profile-main-title">Public profile</h1>
                <p className="profile-main-sub">Add information about yourself</p>
              </header>

              <form onSubmit={handleSave} className="edit-form-body">
                {/* Basics Section */}
                <div className="form-section">
                  <h3 className="section-label">Basics:</h3>
                  
                  <div className="input-group">
                    <input
                      type="text"
                      className="form-input"
                      placeholder="First Name"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                  </div>

                  <div className="input-group">
                    <input
                      type="text"
                      className="form-input"
                      placeholder="Last Name"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                    />
                  </div>

                  <div className="input-group headline-group">
                    <input
                      type="text"
                      className="form-input"
                      placeholder="Headline"
                      maxLength={60}
                      value={headline}
                      onChange={(e) => setHeadline(e.target.value)}
                    />
                    <span className="char-counter">{charsLeft >= 0 ? charsLeft : 0}</span>
                  </div>
                  <span className="input-hint">
                    Add a professional headline like, "Instructor at Udemy" or "Architect."
                  </span>
                </div>

                {/* Biography Section */}
                <div className="form-section">
                  <h3 className="section-label">Biography</h3>
                  
                  <div className="rich-toolbar">
                    <button type="button" className="toolbar-btn font-bold" title="Bold">
                      <Bold size={16} />
                    </button>
                    <button type="button" className="toolbar-btn font-italic" title="Italic">
                      <Italic size={16} />
                    </button>
                  </div>

                  <textarea
                    className="form-textarea"
                    rows={4}
                    placeholder="Biography"
                    value={biography}
                    onChange={(e) => setBiography(e.target.value)}
                  />
                  <span className="input-hint">
                    Links and coupon codes are not permitted in this section.
                  </span>
                </div>

                {/* Language Select */}
                <div className="form-section">
                  <select
                    className="form-select"
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                  >
                    <option value="English (US)">English (US)</option>
                    <option value="English (UK)">English (UK)</option>
                    <option value="Hindi">हिन्दी (Hindi)</option>
                    <option value="Spanish">Español</option>
                  </select>
                </div>

                {/* Links Section */}
                <div className="form-section">
                  <h3 className="section-label">Links:</h3>
                  <div className="input-group">
                    <input
                      type="text"
                      className="form-input"
                      placeholder="Website (http(s)://..)"
                      value={website}
                      onChange={(e) => setWebsite(e.target.value)}
                    />
                  </div>
                </div>

                {/* Save CTA and Feedback */}
                <div className="form-actions-row">
                  <button type="submit" className="btn btn-dark" disabled={saveStatus === 'saving'}>
                    {saveStatus === 'saving' ? 'Saving...' : 'Save'}
                  </button>

                  {saveStatus === 'saved' && (
                    <span className="status-badge success">
                      <Check size={16} /> Your changes have been successfully saved.
                    </span>
                  )}
                  {saveStatus === 'error' && (
                    <span className="status-badge error">
                      <AlertCircle size={16} /> Could not save changes. Please try again.
                    </span>
                  )}
                </div>
              </form>
            </div>
          ) : (
            <div className="profile-card-form">
              <h2 className="profile-main-title">{navItems.find(n => n.key === currentTab)?.label}</h2>
              <p className="profile-main-sub">Manage your preferences for this section.</p>
              <div className="dummy-settings-box">
                <p className="text-secondary">Settings for {currentTab} are up to date.</p>
              </div>
            </div>
          )}
        </main>
      </div>

      <style>{`
        .edit-profile-page {
          padding: 40px 0 80px 0;
          background: #ffffff;
        }
        .profile-layout {
          display: flex;
          gap: 48px;
        }
        .profile-sidebar {
          width: 260px;
          flex-shrink: 0;
        }
        .profile-sidebar-user {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding-bottom: 24px;
        }
        .profile-avatar-circle {
          width: 120px;
          height: 120px;
          border-radius: 50%;
          background: #1c1d1f;
          color: #ffffff;
          font-size: 40px;
          font-weight: 700;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 16px;
        }
        .profile-user-name {
          font-size: 16px;
          font-weight: 700;
          color: #1c1d1f;
        }
        .profile-nav-list {
          display: flex;
          flex-direction: column;
        }
        .profile-nav-btn, .profile-nav-link {
          display: block;
          width: 100%;
          text-align: left;
          padding: 10px 16px;
          font-size: 14px;
          color: #2d2f31;
          border-radius: 4px;
          transition: background 0.15s;
        }
        .profile-nav-btn:hover, .profile-nav-link:hover {
          background: #f7f9fa;
        }
        .profile-nav-btn.active {
          background: #e4e8eb;
          font-weight: 700;
        }
        .profile-main-content {
          flex: 1;
          max-width: 680px;
        }
        .profile-card-form {
          border: 1px solid #d1d7dc;
          border-radius: 4px;
          padding: 32px;
        }
        .profile-header {
          text-align: center;
          padding-bottom: 24px;
          border-bottom: 1px solid #d1d7dc;
          margin-bottom: 24px;
        }
        .profile-main-title {
          font-size: 24px;
          font-weight: 700;
          color: #1c1d1f;
          margin-bottom: 6px;
        }
        .profile-main-sub {
          font-size: 14px;
          color: #6a6f73;
        }
        .form-section {
          margin-bottom: 24px;
        }
        .section-label {
          font-size: 14px;
          font-weight: 700;
          color: #1c1d1f;
          margin-bottom: 8px;
        }
        .input-group {
          margin-bottom: 12px;
          position: relative;
        }
        .headline-group {
          display: flex;
          align-items: center;
        }
        .headline-group .form-input {
          padding-right: 40px;
        }
        .char-counter {
          position: absolute;
          right: 12px;
          font-size: 13px;
          color: #6a6f73;
        }
        .form-input {
          width: 100%;
          height: 44px;
          border: 1px solid #d1d7dc;
          border-radius: 4px;
          padding: 0 16px;
          color: #1c1d1f;
          outline: none;
        }
        .form-input:focus, .form-textarea:focus, .form-select:focus {
          border-color: #1c1d1f;
        }
        .input-hint {
          font-size: 12px;
          color: #6a6f73;
          margin-top: 4px;
          display: block;
        }
        .rich-toolbar {
          display: flex;
          border: 1px solid #d1d7dc;
          border-bottom: none;
          background: #f7f9fa;
          padding: 4px 8px;
        }
        .toolbar-btn {
          padding: 6px 10px;
          border-radius: 4px;
          color: #2d2f31;
        }
        .toolbar-btn:hover {
          background: #e4e8eb;
        }
        .form-textarea {
          width: 100%;
          border: 1px solid #d1d7dc;
          border-radius: 0 0 4px 4px;
          padding: 12px 16px;
          color: #1c1d1f;
          outline: none;
          resize: vertical;
        }
        .form-select {
          width: 100%;
          height: 44px;
          border: 1px solid #d1d7dc;
          border-radius: 4px;
          padding: 0 16px;
          color: #1c1d1f;
          background: #ffffff;
        }
        .form-actions-row {
          display: flex;
          align-items: center;
          gap: 16px;
          margin-top: 32px;
        }
        .status-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 13px;
          font-weight: 500;
        }
        .status-badge.success {
          color: #1f9d55;
        }
        .status-badge.error {
          color: #b32d0f;
        }
        .dummy-settings-box {
          padding: 24px;
          background: #f7f9fa;
          border-radius: 4px;
          margin-top: 16px;
        }
        @media (max-width: 800px) {
          .profile-layout {
            flex-direction: column;
          }
          .profile-sidebar {
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
};
