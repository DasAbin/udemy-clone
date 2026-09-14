import React, { useState } from 'react';
import { Clock } from 'lucide-react';

export const SchedulerCard: React.FC = () => {
  const [isDismissed, setIsDismissed] = useState(false);
  const [showModal, setShowModal] = useState(false);

  if (isDismissed) return null;

  return (
    <div className="scheduler-card">
      <div className="scheduler-icon-wrapper">
        <Clock size={28} className="scheduler-icon" />
      </div>

      <div className="scheduler-content">
        <h4 className="scheduler-title">Schedule learning time</h4>
        <p className="scheduler-text">
          Learning a little each day adds up. Research shows that students who make learning a habit are more likely to reach their goals. Set time aside to learn and get reminders using your learning scheduler.
        </p>

        <div className="scheduler-actions">
          <button className="btn-scheduler-primary" onClick={() => setShowModal(true)}>
            Get started
          </button>
          <button className="btn-scheduler-dismiss" onClick={() => setIsDismissed(true)}>
            Dismiss
          </button>
        </div>
      </div>

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-dialog scheduler-dialog" onClick={(e) => e.stopPropagation()}>
            <h3 className="dialog-title">Learning Reminder Setup</h3>
            <p className="dialog-desc">Select when you would like to reserve time to learn:</p>
            <div className="scheduler-form">
              <label className="form-label">Days of the week:</label>
              <div className="days-selector">
                {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => (
                  <button key={day} className="day-pill active" type="button">{day}</button>
                ))}
              </div>
              <label className="form-label mt-3">Daily Duration:</label>
              <select className="scheduler-select" defaultValue="30">
                <option value="15">15 minutes / day</option>
                <option value="30">30 minutes / day (Recommended)</option>
                <option value="60">60 minutes / day</option>
              </select>
            </div>
            <div className="dialog-actions">
              <button className="btn btn-primary" onClick={() => setShowModal(false)}>Save Schedule</button>
              <button className="btn btn-white" onClick={() => setShowModal(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .scheduler-card {
          background: #ffffff;
          border: 1px solid #d1d7dc;
          border-radius: 8px;
          padding: 24px 32px;
          display: flex;
          align-items: flex-start;
          gap: 20px;
          margin-bottom: 32px;
          box-shadow: var(--shadow-sm);
        }
        .scheduler-icon-wrapper {
          color: #1c1d1f;
          margin-top: 2px;
        }
        .scheduler-content {
          flex: 1;
        }
        .scheduler-title {
          font-size: 16px;
          font-weight: 700;
          color: #1c1d1f;
          margin-bottom: 6px;
        }
        .scheduler-text {
          font-size: 14px;
          color: #2d2f31;
          line-height: 1.45;
          margin-bottom: 16px;
          max-width: 820px;
        }
        .scheduler-actions {
          display: flex;
          align-items: center;
          gap: 16px;
        }
        .btn-scheduler-primary {
          border: 1px solid #5624d0;
          color: #5624d0;
          background: #ffffff;
          font-weight: 700;
          font-size: 14px;
          padding: 8px 16px;
          border-radius: 4px;
          transition: background 0.15s;
        }
        .btn-scheduler-primary:hover {
          background: #f3e8fd;
        }
        .btn-scheduler-dismiss {
          color: #5624d0;
          font-weight: 700;
          font-size: 14px;
          background: transparent;
          transition: color 0.15s;
        }
        .btn-scheduler-dismiss:hover {
          color: #401b9c;
        }
        .scheduler-dialog {
          padding: 24px;
        }
        .dialog-title {
          font-size: 18px;
          font-weight: 700;
          margin-bottom: 8px;
        }
        .dialog-desc {
          font-size: 14px;
          color: #6a6f73;
          margin-bottom: 16px;
        }
        .days-selector {
          display: flex;
          gap: 8px;
          margin-top: 6px;
          flex-wrap: wrap;
        }
        .day-pill {
          padding: 6px 12px;
          border: 1px solid #5624d0;
          border-radius: 9999px;
          background: #f3e8fd;
          color: #5624d0;
          font-weight: 600;
          font-size: 12px;
        }
        .scheduler-select {
          width: 100%;
          height: 40px;
          border: 1px solid #d1d7dc;
          border-radius: 4px;
          padding: 0 12px;
          margin-top: 6px;
        }
        .dialog-actions {
          margin-top: 24px;
          display: flex;
          gap: 12px;
          justify-content: flex-end;
        }
        .mt-3 {
          margin-top: 12px;
          display: block;
        }
      `}</style>
    </div>
  );
};
