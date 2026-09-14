import React from 'react';
import { Flame, Info } from 'lucide-react';
import { StreakInfo } from '../../types';

interface StreakCardProps {
  streak: StreakInfo;
}

export const StreakCard: React.FC<StreakCardProps> = ({ streak }) => {
  return (
    <div className="streak-card">
      <div className="streak-left">
        <h3 className="streak-title">Start a new streak</h3>
        <p className="streak-subtitle">
          Learning a little each day adds up. Go after your goals!
        </p>
      </div>

      <div className="streak-right">
        {/* Streak Flame */}
        <div className="streak-stat-item">
          <div className="flame-icon-wrapper">
            <Flame size={28} className="flame-icon" />
          </div>
          <div className="streak-stat-text">
            <div className="streak-number">{streak.currentStreakWeeks} <span className="streak-unit">weeks</span></div>
            <div className="streak-label">Current streak</div>
          </div>
        </div>

        {/* Circular Progress & Goals */}
        <div className="streak-circle-group">
          {/* Custom SVG Dual Progress Ring */}
          <div className="ring-container">
            <svg className="ring-svg" width="60" height="60" viewBox="0 0 60 60">
              <circle
                cx="30"
                cy="30"
                r="24"
                stroke="#e4e8eb"
                strokeWidth="5"
                fill="none"
              />
              <circle
                cx="30"
                cy="30"
                r="24"
                stroke="#1f9d55"
                strokeWidth="5"
                fill="none"
                strokeDasharray="150"
                strokeDashoffset="20"
                strokeLinecap="round"
              />
            </svg>
          </div>

          <div className="streak-goals">
            <div className="goal-row">
              <span className="dot dot-amber">●</span>
              <span className="goal-text font-bold">{streak.courseMinutesWatched}/{streak.courseMinutesGoal} course min</span>
              <Info size={14} className="info-icon" />
            </div>
            <div className="goal-row">
              <span className="dot dot-green">●</span>
              <span className="goal-text font-bold">{streak.visitsCount}/{streak.visitsGoal} visit</span>
              <span className="date-range-text">{streak.dateRange}</span>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .streak-card {
          background: #ffffff;
          border: 1px solid #d1d7dc;
          border-radius: 8px;
          padding: 24px 32px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 24px;
          box-shadow: var(--shadow-sm);
        }
        .streak-left {
          max-width: 420px;
        }
        .streak-title {
          font-size: 20px;
          font-weight: 700;
          color: #1c1d1f;
          margin-bottom: 8px;
        }
        .streak-subtitle {
          font-size: 14px;
          color: #2d2f31;
          line-height: 1.4;
        }
        .streak-right {
          display: flex;
          align-items: center;
          gap: 48px;
        }
        .streak-stat-item {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .flame-icon-wrapper {
          color: #6a6f73;
        }
        .flame-icon {
          color: #6a6f73;
        }
        .streak-number {
          font-size: 22px;
          font-weight: 700;
          color: #1c1d1f;
          line-height: 1;
        }
        .streak-unit {
          font-size: 15px;
          font-weight: 500;
        }
        .streak-label {
          font-size: 13px;
          color: #6a6f73;
          margin-top: 4px;
        }
        .streak-circle-group {
          display: flex;
          align-items: center;
          gap: 16px;
        }
        .ring-container {
          position: relative;
          width: 60px;
          height: 60px;
        }
        .ring-svg {
          transform: rotate(-90deg);
        }
        .streak-goals {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .goal-row {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 13px;
        }
        .dot-amber {
          color: #b4690e;
          font-size: 12px;
        }
        .dot-green {
          color: #1f9d55;
          font-size: 12px;
        }
        .goal-text {
          color: #1c1d1f;
        }
        .info-icon {
          color: #6a6f73;
          cursor: pointer;
        }
        .date-range-text {
          color: #6a6f73;
          font-size: 12px;
          margin-left: 4px;
        }
        @media (max-width: 900px) {
          .streak-card {
            flex-direction: column;
            align-items: flex-start;
            gap: 20px;
            padding: 20px;
          }
          .streak-right {
            gap: 24px;
            flex-wrap: wrap;
          }
        }
      `}</style>
    </div>
  );
};
