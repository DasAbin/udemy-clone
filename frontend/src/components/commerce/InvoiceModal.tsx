import React from 'react';
import { X, Printer, Download } from 'lucide-react';
import { Order } from '../../types';

interface InvoiceModalProps {
  order: Order;
  onClose: () => void;
}

export const InvoiceModal: React.FC<InvoiceModalProps> = ({ order, onClose }) => {
  const handlePrint = () => {
    window.print();
  };

  const invoiceNumber = order.invoiceNumber || 'IN2026-02-3848672';
  const invoiceDate = '26/02/2026';
  const taxableValue = (order.subtotal || 397.46).toFixed(2);
  const igstValue = (order.tax || 71.54).toFixed(2);
  const totalAmount = (order.totalPrice || 469.00).toFixed(2);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-dialog invoice-dialog" onClick={(e) => e.stopPropagation()}>
        <div className="invoice-modal-bar no-print">
          <span className="modal-bar-title">Official Tax Invoice</span>
          <div className="modal-bar-actions">
            <button className="btn-modal-print" onClick={handlePrint}>
              <Printer size={16} /> Print / Save PDF
            </button>
            <button className="invoice-close-btn" onClick={onClose} title="Close">
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Exact Tax Invoice Document matching Screenshot 2026-09-14 113931.png */}
        <div className="tax-invoice-sheet" id="invoice-print-area">
          {/* Header */}
          <div className="sheet-top-row">
            <div className="sheet-brand">
              <div className="udemy-svg-logo">
                <span className="logo-accent">^</span>
                <span className="logo-text">udemy</span>
              </div>
            </div>

            <div className="sheet-meta-right">
              <span className="meta-original">ORIGINAL FOR RECIPIENT</span>
              <h1 className="meta-doc-title">TAX INVOICE</h1>
              <p className="meta-code-line">Invoice #: {invoiceNumber}</p>
              <p className="meta-code-line">Invoice date: {invoiceDate}</p>
            </div>
          </div>

          <div className="sheet-rule" />

          {/* Supplier & Recipient 2-Column Grid */}
          <div className="sheet-parties-grid">
            <div className="party-col supplier">
              <h3 className="party-heading">Supplier details:</h3>
              <p className="party-bold">Udemy India LLP</p>
              <p className="party-line">10th Floor, ResCowork 07, Tower B,</p>
              <p className="party-line">Unitech Cyber Park, Sector 39,</p>
              <p className="party-line">Gurgaon, Haryana, India, 122003</p>
              <p className="party-line tax-id-mt">GSTIN: 06AAFFU9763M1ZE</p>
              <p className="party-line">PAN no. AAFFU9763M</p>
            </div>

            <div className="party-col recipient">
              <h3 className="party-heading">Recipient details:</h3>
              <p className="party-bold">{order.customerName || 'Student Name'}</p>
              <p className="party-line">{order.customerEmail || 'student@example.com'}</p>
              <p className="party-line">Uttar Pradesh, 09, UP, India</p>
            </div>
          </div>

          {/* Line Items Table */}
          <table className="tax-table">
            <thead>
              <tr>
                <th className="th-desc">Description</th>
                <th className="th-hsn">HSN Code</th>
                <th className="th-qty text-center">Quantity</th>
                <th className="th-num text-right">Taxable Value</th>
                <th className="th-num text-center">CGST (0%)</th>
                <th className="th-num text-center">SGST/UGST (0%)</th>
                <th className="th-num text-right">IGST (18%)</th>
                <th className="th-num text-right">Total Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr className="tax-data-row">
                <td className="td-desc">{order.courseTitle || 'Java Spring Framework, Spring Boot, Spring AI - Gen AI'}</td>
                <td className="td-hsn">9984 33</td>
                <td className="td-qty text-center">1.0</td>
                <td className="td-num text-right">{taxableValue}</td>
                <td className="td-num text-center"></td>
                <td className="td-num text-center"></td>
                <td className="td-num text-right">{igstValue}</td>
                <td className="td-num text-right">{totalAmount}</td>
              </tr>
              <tr className="tax-total-row">
                <td className="td-total-lbl font-bold">Total</td>
                <td colSpan={2}></td>
                <td className="td-num font-bold text-right">{taxableValue}</td>
                <td colSpan={2}></td>
                <td className="td-num font-bold text-right">{igstValue}</td>
                <td className="td-num font-bold text-right">INR {totalAmount}</td>
              </tr>
            </tbody>
          </table>

          {/* Disclaimer Footer */}
          <div className="sheet-footer-note">
            <em>This is a system generated invoice and does not require a signature or a digital signature</em>
          </div>
        </div>
      </div>

      <style>{`
        .invoice-dialog {
          max-width: 880px;
          padding: 0;
          background: #f7f9fa;
          overflow: hidden;
          border-radius: 6px;
        }
        .invoice-modal-bar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 12px 24px;
          background: #2d2f31;
          color: #ffffff;
        }
        .modal-bar-title {
          font-size: 14px;
          font-weight: 700;
        }
        .modal-bar-actions {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .btn-modal-print {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: #a435f0;
          color: #ffffff;
          border: none;
          padding: 6px 14px;
          font-size: 13px;
          font-weight: 700;
          border-radius: 4px;
          cursor: pointer;
        }
        .btn-modal-print:hover {
          background: #8710d8;
        }
        .invoice-close-btn {
          color: #ffffff;
          background: transparent;
          border: none;
          cursor: pointer;
        }
        .tax-invoice-sheet {
          background: #ffffff;
          padding: 40px 48px;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif;
          color: #2d2f31;
          margin: 16px;
          border: 1px solid #d1d7dc;
          box-shadow: 0 2px 8px rgba(0,0,0,0.06);
        }
        .sheet-top-row {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
        }
        .udemy-svg-logo {
          display: inline-flex;
          align-items: baseline;
          position: relative;
        }
        .logo-accent {
          color: #a435f0;
          font-size: 32px;
          font-weight: 900;
          line-height: 1;
          position: absolute;
          left: 1px;
          top: -12px;
        }
        .logo-text {
          font-size: 36px;
          font-weight: 800;
          color: #1c1d1f;
          letter-spacing: -1.5px;
        }
        .sheet-meta-right {
          text-align: right;
        }
        .meta-original {
          display: block;
          font-size: 11px;
          color: #9da3a8;
          letter-spacing: 0.5px;
          margin-bottom: 4px;
        }
        .meta-doc-title {
          font-size: 30px;
          font-weight: 700;
          color: #8c9398;
          letter-spacing: 1px;
          margin-bottom: 8px;
        }
        .meta-code-line {
          font-size: 12px;
          color: #595f65;
          margin-bottom: 3px;
        }
        .sheet-rule {
          height: 1px;
          background: #e4e8eb;
          margin: 28px 0 24px 0;
        }
        .sheet-parties-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 40px;
          margin-bottom: 32px;
          font-size: 13px;
          line-height: 1.45;
        }
        .party-heading {
          font-size: 16px;
          font-weight: 700;
          color: #1c1d1f;
          margin-bottom: 8px;
        }
        .party-bold {
          font-weight: 600;
          color: #2d2f31;
        }
        .party-line {
          color: #595f65;
        }
        .tax-id-mt {
          margin-top: 6px;
        }
        .tax-table {
          width: 100%;
          border-collapse: collapse;
          font-size: 13px;
          margin-bottom: 48px;
        }
        .tax-table th {
          background: #f7f9fa;
          padding: 10px 8px;
          border-bottom: 1px solid #d1d7dc;
          color: #1c1d1f;
          font-size: 12px;
          font-weight: 700;
          text-align: left;
        }
        .tax-table td {
          padding: 12px 8px;
          color: #2d2f31;
        }
        .tax-data-row td {
          border-bottom: 1px solid #e4e8eb;
        }
        .td-desc {
          max-width: 260px;
        }
        .td-hsn {
          white-space: nowrap;
        }
        .tax-total-row td {
          border-top: 1px solid #d1d7dc;
          border-bottom: 1px solid #d1d7dc;
          padding: 12px 8px;
          background: #fdfdfd;
        }
        .sheet-footer-note {
          font-size: 12px;
          color: #6a6f73;
          margin-top: 32px;
        }
        .text-center {
          text-align: center;
        }
        .text-right {
          text-align: right;
        }
        .font-bold {
          font-weight: 700;
        }
        @media print {
          .no-print {
            display: none !important;
          }
          .tax-invoice-sheet {
            margin: 0;
            border: none;
            box-shadow: none;
            padding: 20px;
          }
        }
      `}</style>
    </div>
  );
};
