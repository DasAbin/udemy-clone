import React from 'react';
import { Award, Download, Printer, X } from 'lucide-react';
import { CertificateData } from '../../types';

interface CertificateModalProps {
  certificate: CertificateData;
  onClose: () => void;
}

export const CertificateModal: React.FC<CertificateModalProps> = ({ certificate, onClose }) => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-dialog certificate-dialog" onClick={(e) => e.stopPropagation()}>
        <div className="cert-modal-header">
          <div className="cert-modal-title">
            <Award size={24} className="text-purple" />
            <span>Course Certificate</span>
          </div>
          <button className="cert-close-btn" onClick={onClose} title="Close">
            <X size={20} />
          </button>
        </div>

        {/* Printable Certificate Frame */}
        <div className="certificate-frame print-section" id="certificate-print-area">
          <div className="cert-border-inner">
            <div className="cert-top-logo">
              <span className="cert-logo-text">udemy</span>
              <span className="cert-badge-tag">CERTIFICATE OF COMPLETION</span>
            </div>

            <div className="cert-body">
              <p className="cert-awarded-text">This is to certify that</p>
              <h2 className="cert-student-name">{certificate.studentName}</h2>
              <p className="cert-text">
                successfully completed <strong>{certificate.totalHours} total hours</strong> of
              </p>
              <h3 className="cert-course-title">{certificate.courseTitle}</h3>
              <p className="cert-instructor-text">
                online course taught by <strong>{certificate.instructorName}</strong>
              </p>
            </div>

            <div className="cert-footer-row">
              <div className="cert-col-left">
                <div className="cert-date">{certificate.issuedDate}</div>
                <div className="cert-sub">Date of Completion</div>
              </div>

              <div className="cert-col-center">
                <div className="cert-seal">
                  <Award size={36} color="#5624d0" />
                </div>
              </div>

              <div className="cert-col-right">
                <div className="cert-no">{certificate.certificateNumber}</div>
                <div className="cert-sub">Certificate Reference Number</div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Controls */}
        <div className="cert-modal-actions">
          <button className="btn btn-outline" onClick={handlePrint}>
            <Printer size={16} className="mr-2" /> Print Certificate
          </button>
          <button className="btn btn-primary" onClick={handlePrint}>
            <Download size={16} className="mr-2" /> Download (PDF)
          </button>
        </div>
      </div>

      <style>{`
        .certificate-dialog {
          max-width: 820px;
          padding: 24px;
        }
        .cert-modal-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-bottom: 16px;
          border-bottom: 1px solid #d1d7dc;
          margin-bottom: 20px;
        }
        .cert-modal-title {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 18px;
          font-weight: 700;
        }
        .cert-close-btn {
          color: #6a6f73;
          padding: 4px;
        }
        .cert-close-btn:hover {
          color: #1c1d1f;
        }
        .certificate-frame {
          background: #ffffff;
          border: 12px solid #2d2f31;
          padding: 24px;
          position: relative;
          box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        }
        .cert-border-inner {
          border: 2px solid #a435f0;
          padding: 32px 24px;
          text-align: center;
        }
        .cert-top-logo {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          margin-bottom: 20px;
        }
        .cert-logo-text {
          font-size: 32px;
          font-weight: 800;
          color: #1c1d1f;
          letter-spacing: -0.5px;
        }
        .cert-badge-tag {
          font-size: 12px;
          letter-spacing: 3px;
          font-weight: 700;
          color: #5624d0;
        }
        .cert-body {
          margin-bottom: 32px;
        }
        .cert-awarded-text {
          font-size: 14px;
          color: #6a6f73;
          margin-bottom: 8px;
        }
        .cert-student-name {
          font-size: 28px;
          font-weight: 800;
          color: #1c1d1f;
          margin-bottom: 16px;
          font-family: 'Merriweather', serif;
        }
        .cert-text {
          font-size: 14px;
          color: #6a6f73;
          margin-bottom: 8px;
        }
        .cert-course-title {
          font-size: 20px;
          font-weight: 700;
          color: #1c1d1f;
          margin-bottom: 12px;
          max-width: 600px;
          margin-left: auto;
          margin-right: auto;
        }
        .cert-instructor-text {
          font-size: 14px;
          color: #6a6f73;
        }
        .cert-footer-row {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          padding-top: 24px;
          border-top: 1px dashed #d1d7dc;
        }
        .cert-date, .cert-no {
          font-size: 13px;
          font-weight: 700;
          color: #1c1d1f;
        }
        .cert-sub {
          font-size: 11px;
          color: #6a6f73;
          margin-top: 4px;
        }
        .cert-modal-actions {
          display: flex;
          justify-content: flex-end;
          gap: 12px;
          margin-top: 24px;
        }
        .mr-2 {
          margin-right: 8px;
        }
        @media print {
          body * {
            visibility: hidden;
          }
          #certificate-print-area, #certificate-print-area * {
            visibility: visible;
          }
          #certificate-print-area {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
};
