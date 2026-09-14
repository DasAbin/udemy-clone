import React from 'react';
import { X, Printer, CheckCircle } from 'lucide-react';
import { Order } from '../../types';

interface ReceiptModalProps {
  order: Order;
  onClose: () => void;
}

export const ReceiptModal: React.FC<ReceiptModalProps> = ({ order, onClose }) => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-dialog receipt-dialog" onClick={(e) => e.stopPropagation()}>
        <div className="receipt-modal-header">
          <div className="header-brand">
            <span className="receipt-logo">udemy</span>
            <span className="receipt-tag">PAYMENT RECEIPT</span>
          </div>
          <button className="receipt-close-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div className="receipt-body print-section" id="receipt-print-area">
          <div className="receipt-status-banner">
            <CheckCircle size={20} className="text-success" />
            <span>Transaction Successful</span>
          </div>

          <div className="receipt-meta-grid">
            <div className="receipt-meta-col">
              <span className="meta-label">Order Number</span>
              <span className="meta-val font-bold">{order.orderNumber}</span>
            </div>
            <div className="receipt-meta-col">
              <span className="meta-label">Date of Payment</span>
              <span className="meta-val">{order.date}</span>
            </div>
            <div className="receipt-meta-col">
              <span className="meta-label">Payment Method</span>
              <span className="meta-val">{order.paymentType}</span>
            </div>
            <div className="receipt-meta-col">
              <span className="meta-label">Transaction Reference</span>
              <span className="meta-val">{order.transactionRef}</span>
            </div>
          </div>

          <div className="receipt-items-table">
            <div className="table-header-row">
              <span>Item Description</span>
              <span className="text-right">Amount</span>
            </div>
            <div className="table-data-row">
              <span className="item-title">{order.courseTitle}</span>
              <span className="item-amount font-bold">₹{order.totalPrice.toFixed(2)}</span>
            </div>
          </div>

          <div className="receipt-summary-box">
            <div className="summary-line">
              <span>Subtotal:</span>
              <span>₹{order.subtotal.toFixed(2)}</span>
            </div>
            <div className="summary-line">
              <span>GST (18% Included):</span>
              <span>₹{order.tax.toFixed(2)}</span>
            </div>
            <div className="summary-line total font-bold">
              <span>Total Paid:</span>
              <span>₹{order.totalPrice.toFixed(2)}</span>
            </div>
          </div>
        </div>

        <div className="receipt-actions">
          <button className="btn btn-outline" onClick={handlePrint}>
            <Printer size={16} className="mr-2" /> Print Receipt
          </button>
          <button className="btn btn-primary" onClick={onClose}>
            Done
          </button>
        </div>
      </div>

      <style>{`
        .receipt-dialog {
          max-width: 540px;
          padding: 24px;
        }
        .receipt-modal-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-bottom: 16px;
          border-bottom: 1px solid #d1d7dc;
          margin-bottom: 20px;
        }
        .header-brand {
          display: flex;
          align-items: baseline;
          gap: 12px;
        }
        .receipt-logo {
          font-size: 26px;
          font-weight: 800;
          color: #1c1d1f;
        }
        .receipt-tag {
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 1.5px;
          color: #5624d0;
        }
        .receipt-status-banner {
          display: flex;
          align-items: center;
          gap: 8px;
          background: #eef9f2;
          color: #1f9d55;
          padding: 10px 16px;
          border-radius: 4px;
          font-weight: 600;
          font-size: 14px;
          margin-bottom: 20px;
        }
        .receipt-meta-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
          margin-bottom: 24px;
          font-size: 13px;
        }
        .meta-label {
          display: block;
          color: #6a6f73;
          font-size: 11px;
          margin-bottom: 4px;
        }
        .meta-val {
          color: #1c1d1f;
          word-break: break-all;
        }
        .receipt-items-table {
          border: 1px solid #d1d7dc;
          border-radius: 4px;
          margin-bottom: 20px;
        }
        .table-header-row {
          display: flex;
          justify-content: space-between;
          background: #f7f9fa;
          padding: 10px 14px;
          font-size: 12px;
          font-weight: 700;
          color: #2d2f31;
          border-bottom: 1px solid #d1d7dc;
        }
        .table-data-row {
          display: flex;
          justify-content: space-between;
          padding: 12px 14px;
          font-size: 13px;
        }
        .item-title {
          max-width: 320px;
          color: #2d2f31;
        }
        .receipt-summary-box {
          display: flex;
          flex-direction: column;
          gap: 8px;
          border-top: 1px dashed #d1d7dc;
          padding-top: 16px;
          font-size: 13px;
        }
        .summary-line {
          display: flex;
          justify-content: space-between;
          color: #6a6f73;
        }
        .summary-line.total {
          font-size: 16px;
          color: #1c1d1f;
          padding-top: 8px;
          border-top: 1px solid #d1d7dc;
        }
        .receipt-actions {
          display: flex;
          justify-content: flex-end;
          gap: 12px;
          margin-top: 24px;
        }
        .text-right {
          text-align: right;
        }
        .mr-2 {
          margin-right: 8px;
        }
      `}</style>
    </div>
  );
};
