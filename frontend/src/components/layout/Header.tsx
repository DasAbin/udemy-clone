import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Heart, ShoppingCart, Bell, ChevronDown, Globe } from 'lucide-react';
import { AccountDropdown } from './AccountDropdown';
import { User, CartItem } from '../../types';

interface HeaderProps {
  user: User | null;
  cartItems: CartItem[];
  onOpenCart?: () => void;
  onOpenLogin: () => void;
  onOpenSignup: () => void;
  onLogout: () => void;
}

export const Header: React.FC<HeaderProps> = ({ 
  user, 
  cartItems, 
  onOpenCart, 
  onOpenLogin, 
  onOpenSignup,
  onLogout 
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isAccountMenuOpen, setIsAccountMenuOpen] = useState(false);
  const [isExploreOpen, setIsExploreOpen] = useState(false);
  const navigate = useNavigate();

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <header className="udemy-header">
      <div className="header-inner">
        {/* Logo */}
        <Link to="/" className="header-logo">
          <span className="logo-udemy">udemy</span>
        </Link>

        {/* Explore Dropdown */}
        <div className="header-nav-item">
          <button 
            className="explore-btn"
            onClick={() => setIsExploreOpen(!isExploreOpen)}
          >
            Explore
            <ChevronDown size={14} className="ml-1" />
          </button>

          {isExploreOpen && (
            <div className="explore-menu-dropdown">
              <div className="explore-column">
                <Link to="/?category=Development" onClick={() => setIsExploreOpen(false)}>Development</Link>
                <Link to="/?category=Business" onClick={() => setIsExploreOpen(false)}>Business</Link>
                <Link to="/?category=Finance" onClick={() => setIsExploreOpen(false)}>Finance & Accounting</Link>
                <Link to="/?category=IT" onClick={() => setIsExploreOpen(false)}>IT & Software</Link>
                <Link to="/?category=Design" onClick={() => setIsExploreOpen(false)}>Design</Link>
                <Link to="/?category=Marketing" onClick={() => setIsExploreOpen(false)}>Marketing</Link>
              </div>
            </div>
          )}
        </div>

        {/* Subscribe */}
        <Link to="/plans" className="header-link hide-mobile">
          Subscribe
        </Link>

        {/* Search Bar */}
        <form className="header-search-form" onSubmit={handleSearchSubmit}>
          <div className="search-input-wrapper">
            <Search size={18} className="search-icon" />
            <input
              type="text"
              className="search-input"
              placeholder="Search for anything"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </form>

        {/* Right Nav Items */}
        <div className="header-right-actions">
          <Link to="/business" className="header-link hide-tablet">
            Udemy Business
          </Link>
          <Link to="/teaching" className="header-link hide-tablet">
            Teach on Udemy
          </Link>

          {/* Cart */}
          <button 
            className="header-icon-btn cart-btn" 
            onClick={onOpenCart || (() => navigate('/cart'))}
            title="Cart"
          >
            <ShoppingCart size={20} />
            {cartItems.length > 0 && (
              <span className="cart-badge">{cartItems.length}</span>
            )}
          </button>

          {/* If Logged In: Show Learning, Wishlist, Bell, Avatar */}
          {user ? (
            <>
              <Link to="/my-learning" className="header-link font-medium hide-mobile">
                My learning
              </Link>

              <Link to="/my-learning?tab=wishlist" className="header-icon-btn hide-mobile" title="Wishlist">
                <Heart size={20} />
              </Link>

              <button className="header-icon-btn hide-mobile" title="Notifications">
                <Bell size={20} />
              </button>

              <div className="user-avatar-container">
                <button
                  className="user-avatar-btn"
                  onClick={() => setIsAccountMenuOpen(!isAccountMenuOpen)}
                  title={user.name}
                >
                  <span className="avatar-text">{user.avatarInitials}</span>
                </button>

                {isAccountMenuOpen && (
                  <AccountDropdown
                    user={user}
                    onClose={() => setIsAccountMenuOpen(false)}
                    onLogout={onLogout}
                  />
                )}
              </div>
            </>
          ) : (
            /* If Logged Out: Show Log in, Sign up, Language button */
            <div className="logged-out-actions">
              <button 
                type="button" 
                className="btn-header-login" 
                onClick={onOpenLogin}
              >
                Log in
              </button>
              <button 
                type="button" 
                className="btn-header-signup" 
                onClick={onOpenSignup}
              >
                Sign up
              </button>
              <button 
                type="button" 
                className="btn-header-lang" 
                title="Change language"
              >
                <Globe size={18} />
              </button>
            </div>
          )}
        </div>
      </div>

      <style>{`
        .udemy-header {
          position: sticky;
          top: 0;
          z-index: 500;
          background: #ffffff;
          box-shadow: 0 2px 4px rgba(0,0,0,0.08), 0 4px 12px rgba(0,0,0,0.04);
          height: var(--header-height);
        }
        .header-inner {
          display: flex;
          align-items: center;
          height: 100%;
          padding: 0 24px;
          gap: 16px;
        }
        .header-logo {
          display: flex;
          align-items: center;
          margin-right: 8px;
        }
        .logo-udemy {
          font-size: 28px;
          font-weight: 800;
          letter-spacing: -0.5px;
          color: #1c1d1f;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
        }
        .header-nav-item {
          position: relative;
        }
        .explore-btn {
          font-size: 14px;
          font-weight: 500;
          color: var(--udemy-text-primary);
          display: flex;
          align-items: center;
          padding: 8px 12px;
          border-radius: 4px;
          transition: background 0.15s;
        }
        .explore-btn:hover {
          color: var(--udemy-purple-primary);
          background: #f7f9fa;
        }
        .explore-menu-dropdown {
          position: absolute;
          top: 100%;
          left: 0;
          margin-top: 8px;
          background: #fff;
          border: 1px solid #d1d7dc;
          box-shadow: var(--shadow-dropdown);
          border-radius: 4px;
          min-width: 200px;
          z-index: 1000;
          padding: 8px 0;
        }
        .explore-column a {
          display: block;
          padding: 10px 16px;
          font-size: 14px;
          color: var(--udemy-text-primary);
          transition: background 0.1s;
        }
        .explore-column a:hover {
          background: #f7f9fa;
          color: var(--udemy-purple-primary);
        }
        .header-link {
          font-size: 14px;
          color: var(--udemy-text-primary);
          padding: 8px 12px;
          border-radius: 4px;
          transition: color 0.15s;
          white-space: nowrap;
        }
        .header-link:hover {
          color: var(--udemy-purple-primary);
        }
        .header-search-form {
          flex: 1;
          max-width: 680px;
        }
        .search-input-wrapper {
          position: relative;
          display: flex;
          align-items: center;
          width: 100%;
        }
        .search-icon {
          position: absolute;
          left: 14px;
          color: #6a6f73;
          pointer-events: none;
        }
        .search-input {
          width: 100%;
          height: 48px;
          border-radius: 9999px;
          border: 1px solid #1c1d1f;
          background: #f7f9fa;
          padding: 0 16px 0 46px;
          font-size: 14px;
          color: #1c1d1f;
          outline: none;
          transition: all 0.15s ease;
        }
        .search-input:focus {
          background: #ffffff;
          border-color: #1c1d1f;
          box-shadow: 0 0 0 2px rgba(28,29,31,0.2);
        }
        .header-right-actions {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-left: auto;
        }
        .logged-out-actions {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .btn-header-login {
          height: 40px;
          padding: 0 16px;
          font-size: 14px;
          font-weight: 700;
          color: #1c1d1f;
          background: #ffffff;
          border: 1px solid #1c1d1f;
          border-radius: 4px;
          transition: background 0.15s;
        }
        .btn-header-login:hover {
          background: #f7f9fa;
        }
        .btn-header-signup {
          height: 40px;
          padding: 0 16px;
          font-size: 14px;
          font-weight: 700;
          color: #ffffff;
          background: #a435f0;
          border: 1px solid #a435f0;
          border-radius: 4px;
          transition: background 0.15s;
        }
        .btn-header-signup:hover {
          background: #8710d8;
        }
        .btn-header-lang {
          width: 40px;
          height: 40px;
          border: 1px solid #1c1d1f;
          border-radius: 4px;
          background: transparent;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #1c1d1f;
        }
        .btn-header-lang:hover {
          background: #f7f9fa;
        }
        .header-icon-btn {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #1c1d1f;
          position: relative;
          transition: background 0.15s;
        }
        .header-icon-btn:hover {
          background: #f7f9fa;
          color: var(--udemy-purple-primary);
        }
        .cart-badge {
          position: absolute;
          top: 6px;
          right: 6px;
          background: var(--udemy-purple-primary);
          color: #fff;
          font-size: 11px;
          font-weight: 700;
          width: 18px;
          height: 18px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .user-avatar-container {
          position: relative;
        }
        .user-avatar-btn {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: #1c1d1f;
          color: #ffffff;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          font-size: 14px;
          transition: transform 0.15s, box-shadow 0.15s;
        }
        .user-avatar-btn:hover {
          transform: scale(1.04);
          box-shadow: 0 0 0 2px var(--udemy-purple-primary);
        }
        @media (max-width: 1024px) {
          .hide-tablet {
            display: none !important;
          }
        }
        @media (max-width: 768px) {
          .hide-mobile {
            display: none !important;
          }
          .header-inner {
            padding: 0 12px;
            gap: 8px;
          }
          .search-input {
            height: 40px;
          }
        }
      `}</style>
    </header>
  );
};
