import React, { useState } from 'react';
import { X, Sparkles, LogIn, UserPlus } from 'lucide-react';
import { api } from '../../services/api';
import { User } from '../../types';

interface AuthModalProps {
  initialMode?: 'login' | 'signup';
  onClose: () => void;
  onSuccess: (user: User) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ initialMode = 'login', onClose, onSuccess }) => {
  const [mode, setMode] = useState<'login' | 'signup'>(initialMode);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setIsLoading(true);

    try {
      if (mode === 'login') {
        if (!email.trim()) {
          setErrorMsg('Please enter your email address.');
          setIsLoading(false);
          return;
        }
        if (!password.trim()) {
          setErrorMsg('Please enter your password.');
          setIsLoading(false);
          return;
        }
        const res = await api.login(email.trim(), password.trim());
        if (res.user) {
          onSuccess(res.user);
          onClose();
        } else {
          setErrorMsg(res.message || 'Login failed.');
        }
      } else {
        if (!name.trim()) {
          setErrorMsg('Please enter your full name.');
          setIsLoading(false);
          return;
        }
        if (!email.trim()) {
          setErrorMsg('Please enter your email address.');
          setIsLoading(false);
          return;
        }
        if (!password.trim() || password.length < 4) {
          setErrorMsg('Please enter a password with at least 4 characters.');
          setIsLoading(false);
          return;
        }
        const res = await api.signup(name.trim(), email.trim(), password.trim());
        if (res.user) {
          onSuccess(res.user);
          onClose();
        } else {
          setErrorMsg(res.message || 'Signup failed.');
        }
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'Authentication error.');
    } finally {
      setIsLoading(false);
    }
  };

  const isNoAccountError = errorMsg.toLowerCase().includes('no account found') || errorMsg.toLowerCase().includes('sign up first');
  const isExistingAccountError = errorMsg.toLowerCase().includes('already exists');

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-dialog auth-dialog" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="auth-header">
          <h2 className="auth-title">
            {mode === 'login' ? 'Log in to your account' : 'Sign up and start learning'}
          </h2>
          <button className="auth-close-btn" onClick={onClose} title="Close">
            <X size={20} />
          </button>
        </div>

        <p style={{ margin: '0 24px 16px', color: '#6a6f73', fontSize: '13px' }}>
          {mode === 'login'
            ? 'Enter your email and password to log in. You must sign up first before logging in.'
            : 'Create your account to access your personalized learning dashboard, invoices, and certificates.'}
        </p>

        {errorMsg && (
          <div className="auth-error-alert">
            <div>{errorMsg}</div>
            {isNoAccountError && (
              <div style={{ marginTop: '8px' }}>
                <button
                  type="button"
                  className="auth-switch-action-btn"
                  onClick={() => {
                    setMode('signup');
                    setErrorMsg('');
                  }}
                >
                  Create account now with this email →
                </button>
              </div>
            )}
            {isExistingAccountError && (
              <div style={{ marginTop: '8px' }}>
                <button
                  type="button"
                  className="auth-switch-action-btn"
                  onClick={() => {
                    setMode('login');
                    setErrorMsg('');
                  }}
                >
                  Switch to Log in →
                </button>
              </div>
            )}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="auth-form-body">
          {mode === 'signup' && (
            <div className="auth-input-group">
              <label className="auth-label">Full Name</label>
              <input
                type="text"
                className="auth-input"
                placeholder="Full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
          )}

          <div className="auth-input-group">
            <label className="auth-label">Email</label>
            <input
              type="email"
              className="auth-input"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="auth-input-group">
            <label className="auth-label">Password</label>
            <input
              type="password"
              className="auth-input"
              placeholder={mode === 'signup' ? 'Create a password (min 4 chars)' : 'Enter your password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary auth-submit-btn"
            disabled={isLoading}
          >
            {isLoading ? (
              'Processing...'
            ) : mode === 'login' ? (
              <>
                <LogIn size={16} className="mr-2" /> Log in
              </>
            ) : (
              <>
                <UserPlus size={16} className="mr-2" /> Sign up
              </>
            )}
          </button>
        </form>

        {/* Footer Toggle */}
        <div className="auth-footer-toggle">
          {mode === 'login' ? (
            <p>
              Don't have an account?{' '}
              <button
                type="button"
                className="toggle-auth-link"
                onClick={() => {
                  setMode('signup');
                  setErrorMsg('');
                }}
              >
                Sign up
              </button>
            </p>
          ) : (
            <p>
              Already have an account?{' '}
              <button
                type="button"
                className="toggle-auth-link"
                onClick={() => {
                  setMode('login');
                  setErrorMsg('');
                }}
              >
                Log in
              </button>
            </p>
          )}
        </div>
      </div>

      <style>{`
        .auth-dialog {
          max-width: 440px;
          padding: 32px;
          border-radius: 8px;
        }
        .auth-header {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          margin-bottom: 20px;
        }
        .auth-title {
          font-size: 20px;
          font-weight: 700;
          color: #1c1d1f;
          line-height: 1.3;
        }
        .auth-close-btn {
          color: #6a6f73;
          padding: 4px;
        }
        .auth-close-btn:hover {
          color: #1c1d1f;
        }
        .auth-divider-text {
          position: relative;
          text-align: center;
          margin: 16px 0;
        }
        .auth-divider-text::before {
          content: '';
          position: absolute;
          left: 0;
          top: 50%;
          right: 0;
          height: 1px;
          background: #d1d7dc;
        }
        .auth-divider-text span {
          position: relative;
          background: #ffffff;
          padding: 0 12px;
          font-size: 12px;
          color: #6a6f73;
        }
        .auth-error-alert {
          background: #fdf2f2;
          border: 1px solid #f98080;
          color: #9b1c1c;
          padding: 12px 14px;
          border-radius: 6px;
          font-size: 13px;
          margin-bottom: 16px;
          line-height: 1.4;
        }
        .auth-switch-action-btn {
          background: #a435f0;
          color: #ffffff;
          border: none;
          padding: 6px 12px;
          border-radius: 4px;
          font-size: 12px;
          font-weight: 700;
          cursor: pointer;
          transition: background 0.2s;
        }
        .auth-switch-action-btn:hover {
          background: #8710d8;
        }
        .auth-form-body {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .auth-input-group {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .auth-label {
          font-size: 12px;
          font-weight: 700;
          color: #1c1d1f;
        }
        .auth-input {
          height: 44px;
          border: 1px solid #1c1d1f;
          border-radius: 4px;
          padding: 0 14px;
          font-size: 14px;
          color: #1c1d1f;
          outline: none;
        }
        .auth-input:focus {
          box-shadow: 0 0 0 2px rgba(164, 53, 240, 0.4);
          border-color: #a435f0;
        }
        .auth-submit-btn {
          width: 100%;
          height: 48px;
          font-size: 16px;
          font-weight: 700;
          margin-top: 8px;
        }
        .auth-footer-toggle {
          margin-top: 24px;
          text-align: center;
          font-size: 14px;
          color: #2d2f31;
          border-top: 1px solid #e4e8eb;
          padding-top: 16px;
        }
        .toggle-auth-link {
          color: #5624d0;
          font-weight: 700;
          text-decoration: underline;
        }
        .toggle-auth-link:hover {
          color: #401b9c;
        }
        .mr-1 { margin-right: 4px; }
        .mr-2 { margin-right: 8px; }
      `}</style>
    </div>
  );
};
