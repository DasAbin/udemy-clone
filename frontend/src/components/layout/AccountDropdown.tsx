import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Globe, LogOut } from 'lucide-react';
import { User } from '../../types';

interface AccountDropdownProps {
  user: User | null;
  onClose: () => void;
  onLogout: () => void;
}

export const AccountDropdown: React.FC<AccountDropdownProps> = ({ user, onClose, onLogout }) => {
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        onClose();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  const handleLogoutClick = () => {
    onLogout();
    onClose();
  };

  return (
    <div className="account-dropdown-menu" ref={dropdownRef}>
      {/* Header Profile Info */}
      <Link to="/user/edit-profile" className="account-dropdown-header" onClick={onClose}>
        <div className="account-dropdown-avatar">
          {user?.avatarInitials || (user?.name ? user.name[0].toUpperCase() : 'U')}
        </div>
        <div className="account-dropdown-info">
          <div className="account-user-name">{user?.name || 'Student'}</div>
          <div className="account-user-email">{user?.email || 'student@example.com'}</div>
        </div>
      </Link>

      <div className="dropdown-divider" />

      {/* Section 1 */}
      <div className="dropdown-section">
        <Link to="/my-learning" onClick={onClose} className="dropdown-item">My learning</Link>
        <Link to="/cart" onClick={onClose} className="dropdown-item">My cart</Link>
        <Link to="/my-learning?tab=wishlist" onClick={onClose} className="dropdown-item">Wishlist</Link>
        <Link to="/teaching" onClick={onClose} className="dropdown-item">Teach on Udemy</Link>
      </div>

      <div className="dropdown-divider" />

      {/* Section 2 */}
      <div className="dropdown-section">
        <Link to="/notifications" onClick={onClose} className="dropdown-item">Notifications</Link>
        <Link to="/messages" onClick={onClose} className="dropdown-item">Messages</Link>
      </div>

      <div className="dropdown-divider" />

      {/* Section 3 */}
      <div className="dropdown-section">
        <Link to="/user/edit-profile" onClick={onClose} className="dropdown-item">Account settings</Link>
        <Link to="/user/edit-profile?tab=payment" onClick={onClose} className="dropdown-item">Payment methods</Link>
        <Link to="/dashboard/purchase-history?tab=subscriptions" onClick={onClose} className="dropdown-item">Subscriptions</Link>
        <div className="dropdown-item" onClick={onClose}>Udemy credits</div>
        <Link to="/dashboard/purchase-history" onClick={onClose} className="dropdown-item">Purchase history</Link>
      </div>

      <div className="dropdown-divider" />

      {/* Section 4 */}
      <div className="dropdown-section">
        <div className="dropdown-item flex-between">
          <span>Language</span>
          <span className="language-badge">
            English <Globe size={14} className="ml-1" />
          </span>
        </div>
      </div>

      <div className="dropdown-divider" />

      {/* Section 5 */}
      <div className="dropdown-section">
        <Link 
          to={user?.name ? `/user/${encodeURIComponent(user.name.toLowerCase().replace(/\s+/g, '-'))}` : '/user/profile'} 
          onClick={onClose} 
          className="dropdown-item"
        >
          Public profile
        </Link>
        <Link to="/user/edit-profile" onClick={onClose} className="dropdown-item">Edit profile</Link>
      </div>

      <div className="dropdown-divider" />

      {/* Section 6: Log Out */}
      <div className="dropdown-section">
        <button type="button" onClick={handleLogoutClick} className="dropdown-item logout-btn">
          <LogOut size={14} className="mr-2" /> Log out
        </button>
      </div>

      <style>{`
        .account-dropdown-menu {
          position: absolute;
          top: calc(100% + 12px);
          right: 0;
          width: 270px;
          background: #ffffff;
          border: 1px solid #d1d7dc;
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.16);
          border-radius: 4px;
          z-index: 1000;
          padding: 8px 0;
          color: #2d2f31;
          animation: dropdownSlide 0.15s ease;
        }
        @keyframes dropdownSlide {
          from { opacity: 0; transform: translateY(-6px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .account-dropdown-header {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px 16px;
          transition: background 0.15s;
        }
        .account-dropdown-header:hover {
          background-color: #f7f9fa;
        }
        .account-dropdown-avatar {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          background: #1c1d1f;
          color: #fff;
          font-weight: 700;
          font-size: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .account-user-name {
          font-size: 15px;
          font-weight: 700;
          color: #1c1d1f;
          line-height: 1.2;
        }
        .account-user-email {
          font-size: 12px;
          color: #6a6f73;
          margin-top: 4px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          max-width: 170px;
        }
        .dropdown-divider {
          height: 1px;
          background-color: #d1d7dc;
          margin: 6px 0;
        }
        .dropdown-section {
          padding: 4px 0;
        }
        .dropdown-item {
          display: flex;
          align-items: center;
          width: 100%;
          padding: 8px 16px;
          font-size: 14px;
          color: #2d2f31;
          cursor: pointer;
          transition: background 0.1s, color 0.1s;
          text-align: left;
        }
        .dropdown-item:hover {
          background-color: #f7f9fa;
          color: var(--udemy-purple-primary);
        }
        .logout-btn {
          color: #b32d0f;
          font-weight: 600;
        }
        .logout-btn:hover {
          color: #d90429;
          background: #fdf2f2;
        }
        .flex-between {
          justify-content: space-between;
        }
        .language-badge {
          display: inline-flex;
          align-items: center;
          font-size: 13px;
          color: #6a6f73;
        }
        .ml-1 { margin-left: 4px; }
        .mr-2 { margin-right: 8px; }
      `}</style>
    </div>
  );
};
