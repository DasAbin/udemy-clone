import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Download, Share2, Star } from 'lucide-react';
import { api } from '../services/api';
import { CertificateData } from '../types';

export const CertificatePage: React.FC = () => {
  const { certificateId = 'UC-48d475b3-3dd7-443d-bfef-ab611f8f1937' } = useParams();
  const [cert, setCert] = useState<CertificateData | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    // Attempt fetch from backend
    api.getCertificate(certificateId).then(res => {
      if (res && res.certificate) {
        setCert(res.certificate);
      }
    }).catch(() => {
      // Fallback default matching Screenshot 2026-09-14 114257.png
      setCert({
        certificateNumber: 'UC-48d475b3-3dd7-443d-bfef-ab611f8f1937',
        studentName: 'Vivek singh',
        courseTitle: 'Java Spring Framework, Spring Boot, Spring AI - Gen AI',
        instructorName: 'Navin Reddy, Telusko Edutech',
        totalHours: 55,
        totalLectures: 500,
        issuedDate: 'March 26, 2026',
        verificationUrl: 'ude.my/UC-48d475b3-3dd7-443d-bfef-ab611f8f1937',
        referenceNumber: '0004',
        pdfUrl: '/certificates/UC-48d475b3-3dd7-443d-bfef-ab611f8f1937.pdf'
      });
    });
  }, [certificateId]);

  const certificateData: CertificateData = cert || {
    certificateNumber: 'UC-48d475b3-3dd7-443d-bfef-ab611f8f1937',
    studentName: 'Vivek singh',
    courseTitle: 'Java Spring Framework, Spring Boot, Spring AI - Gen AI',
    instructorName: 'Navin Reddy, Telusko Edutech',
    totalHours: 55,
    totalLectures: 500,
    issuedDate: 'March 26, 2026',
    verificationUrl: 'ude.my/UC-48d475b3-3dd7-443d-bfef-ab611f8f1937',
    referenceNumber: '0004',
    pdfUrl: '/certificates/UC-48d475b3-3dd7-443d-bfef-ab611f8f1937.pdf'
  };

  const handleDownload = () => {
    // Open or download the uploaded PDF
    const link = document.createElement('a');
    link.href = certificateData.pdfUrl || '/certificates/UC-48d475b3-3dd7-443d-bfef-ab611f8f1937.pdf';
    link.download = `${certificateData.certificateNumber}.pdf`;
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="certificate-page-wrap">
      <div className="certificate-inner-container">
        {/* Left Column: Official Certificate Document & Disclaimer */}
        <div className="cert-main-column">
          <div className="cert-card-frame" id="certificate-print-area">
            {/* Top Brand & Metadata */}
            <div className="cert-card-header">
              <div className="udemy-cert-logo">
                <span className="caret-accent">^</span>
                <span className="logo-word">udemy</span>
              </div>

              <div className="cert-meta-info">
                <p>Certificate no: {certificateData.certificateNumber}</p>
                <p>Certificate url: {certificateData.verificationUrl}</p>
                <p>Reference Number: {certificateData.referenceNumber || '0004'}</p>
              </div>
            </div>

            {/* Certificate Body */}
            <div className="cert-card-body">
              <span className="cert-kicker">CERTIFICATE OF COMPLETION</span>
              <h1 className="cert-title-big">{certificateData.courseTitle}</h1>
              <p className="cert-instructor-line">
                Instructors <strong>{certificateData.instructorName}</strong>
              </p>

              <div className="cert-recipient-block">
                <h2 className="recipient-name-big">{certificateData.studentName}</h2>
                <div className="cert-stats-row">
                  <p className="cert-stat-item">
                    Date <strong>{certificateData.issuedDate}</strong>
                  </p>
                  <p className="cert-stat-item">
                    Length <strong>{certificateData.totalHours} total hours</strong>
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Verification Paragraph under card */}
          <div className="cert-verification-statement">
            <p>
              This certificate above verifies that{' '}
              <span className="purple-text">{certificateData.studentName}</span> successfully completed the course{' '}
              <span className="purple-text">{certificateData.courseTitle}</span> on 03/26/2026 as taught by{' '}
              <span className="purple-text">{certificateData.instructorName}</span> on Udemy. The certificate indicates
              the entire course was completed as validated by the student. The course length represents the total hours of
              the videos and article lectures of the course at the time of most recent completion.
            </p>
          </div>
        </div>

        {/* Right Column: Recipient & About Course Sidebar */}
        <div className="cert-sidebar-column no-print">
          {/* Certificate Recipient */}
          <div className="sidebar-section">
            <h3 className="sidebar-heading">Certificate Recipient:</h3>
            <div className="recipient-badge-flex">
              <div className="avatar-circle">VS</div>
              <span className="recipient-display-name">{certificateData.studentName}</span>
            </div>
          </div>

          {/* About the Course */}
          <div className="sidebar-section mt-6">
            <h3 className="sidebar-heading">About the Course:</h3>
            
            <div className="course-card-widget">
              <img
                src="/images/thumbnails/spring-framework-navin.png"
                alt={certificateData.courseTitle}
                className="widget-course-thumb"
              />

              <h4 className="widget-course-title">{certificateData.courseTitle}</h4>
              <p className="widget-course-instructor">{certificateData.instructorName}</p>

              <div className="widget-rating-row">
                <span className="rating-score">4.5</span>
                <div className="stars-flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={14} fill="#b4690e" color="#b4690e" />
                  ))}
                </div>
                <span className="rating-count">(45,750)</span>
              </div>

              <div className="widget-stats-line">
                55 total hours · 500 lectures
              </div>

              <div className="widget-price-line">
                ₹3,639.00
              </div>

              <div className="widget-badge-wrap">
                <span className="badge-bestseller">Bestseller</span>
              </div>

              {/* Action Buttons */}
              <div className="widget-buttons-row">
                <button className="btn-cert-action" onClick={handleDownload}>
                  <Download size={16} />
                  <span>Download</span>
                </button>
                <button className="btn-cert-action" onClick={handleShare}>
                  <Share2 size={16} />
                  <span>{copied ? 'Copied!' : 'Share'}</span>
                </button>
              </div>

              <div className="widget-update-link">
                <a href="#update">
                  <span className="purple-text font-bold">Update your certificate</span> with your correct name or preferred language
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .certificate-page-wrap {
          background-color: #ffffff;
          min-height: 85vh;
          padding: 40px 24px 80px 24px;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif;
          color: #2d2f31;
        }
        .certificate-inner-container {
          max-width: 1200px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1fr 340px;
          gap: 48px;
          align-items: start;
        }
        .cert-card-frame {
          background: #ffffff;
          border: 1px solid #d1d7dc;
          padding: 48px 56px;
          box-shadow: 0 4px 16px rgba(0,0,0,0.06);
          position: relative;
        }
        .cert-card-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 48px;
        }
        .udemy-cert-logo {
          display: inline-flex;
          align-items: baseline;
          position: relative;
        }
        .caret-accent {
          color: #a435f0;
          font-size: 36px;
          font-weight: 900;
          position: absolute;
          left: 2px;
          top: -14px;
        }
        .logo-word {
          font-size: 40px;
          font-weight: 800;
          color: #1c1d1f;
          letter-spacing: -2px;
        }
        .cert-meta-info {
          text-align: right;
          font-size: 11px;
          color: #6a6f73;
          line-height: 1.4;
        }
        .cert-kicker {
          display: block;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 1.5px;
          color: #6a6f73;
          margin-bottom: 12px;
        }
        .cert-title-big {
          font-size: 40px;
          font-weight: 800;
          color: #1c1d1f;
          line-height: 1.15;
          margin-bottom: 16px;
          letter-spacing: -0.5px;
        }
        .cert-instructor-line {
          font-size: 14px;
          color: #2d2f31;
          margin-bottom: 48px;
        }
        .cert-instructor-line strong {
          color: #1c1d1f;
        }
        .recipient-name-big {
          font-size: 44px;
          font-weight: 800;
          color: #1c1d1f;
          margin-bottom: 16px;
          letter-spacing: -0.5px;
        }
        .cert-stats-row {
          display: flex;
          gap: 32px;
          font-size: 13px;
          color: #2d2f31;
        }
        .cert-stat-item strong {
          color: #1c1d1f;
        }
        .cert-verification-statement {
          margin-top: 32px;
          font-size: 13px;
          line-height: 1.65;
          color: #2d2f31;
        }
        .purple-text {
          color: #5624d0;
        }
        .sidebar-heading {
          font-size: 15px;
          font-weight: 700;
          color: #1c1d1f;
          margin-bottom: 12px;
        }
        .recipient-badge-flex {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .avatar-circle {
          width: 40px;
          height: 40px;
          background-color: #1c1d1f;
          color: #ffffff;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          font-size: 14px;
        }
        .recipient-display-name {
          font-size: 14px;
          font-weight: 700;
          color: #1c1d1f;
        }
        .mt-6 {
          margin-top: 28px;
        }
        .course-card-widget {
          display: flex;
          flex-direction: column;
        }
        .widget-course-thumb {
          width: 100%;
          border-radius: 4px;
          object-fit: cover;
          margin-bottom: 12px;
          border: 1px solid #d1d7dc;
        }
        .widget-course-title {
          font-size: 14px;
          font-weight: 700;
          color: #1c1d1f;
          line-height: 1.35;
          margin-bottom: 4px;
        }
        .widget-course-instructor {
          font-size: 12px;
          color: #6a6f73;
          margin-bottom: 6px;
        }
        .widget-rating-row {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 12px;
          margin-bottom: 4px;
        }
        .rating-score {
          font-weight: 700;
          color: #b4690e;
        }
        .stars-flex {
          display: flex;
          gap: 1px;
        }
        .rating-count {
          color: #6a6f73;
        }
        .widget-stats-line {
          font-size: 12px;
          color: #6a6f73;
          margin-bottom: 6px;
        }
        .widget-price-line {
          font-size: 15px;
          font-weight: 700;
          color: #1c1d1f;
          margin-bottom: 8px;
        }
        .badge-bestseller {
          background-color: #eceb98;
          color: #3d3c0a;
          font-weight: 700;
          font-size: 11px;
          padding: 3px 8px;
          border-radius: 2px;
          display: inline-block;
          margin-bottom: 16px;
        }
        .widget-buttons-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10px;
          margin-bottom: 16px;
        }
        .btn-cert-action {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          border: 1px solid #5624d0;
          color: #5624d0;
          background: #ffffff;
          padding: 8px 12px;
          font-size: 13px;
          font-weight: 700;
          border-radius: 4px;
          cursor: pointer;
          transition: background 0.15s;
        }
        .btn-cert-action:hover {
          background: #f3e8fd;
        }
        .widget-update-link {
          font-size: 12px;
          line-height: 1.4;
        }
        .widget-update-link a {
          color: #2d2f31;
          text-decoration: none;
        }
        .widget-update-link a:hover {
          text-decoration: underline;
        }
        @media (max-width: 900px) {
          .certificate-inner-container {
            grid-template-columns: 1fr;
          }
        }
        @media print {
          .no-print {
            display: none !important;
          }
          .certificate-page-wrap {
            padding: 0;
          }
          .cert-card-frame {
            border: none;
            box-shadow: none;
            padding: 24px;
          }
        }
      `}</style>
    </div>
  );
};
