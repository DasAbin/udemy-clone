import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Printer } from 'lucide-react';
import { api } from '../services/api';

export const ReceiptPage: React.FC = () => {
  const { orderId = 'AD-666D4B735A484B686B71694659673D3D' } = useParams();
  const [receiptData, setReceiptData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReceipt = async () => {
      try {
        let currentUser: any = null;
        try {
          const userRes = await api.getUser();
          currentUser = userRes.user;
        } catch (e) {
          // ignore
        }

        const res = await api.getReceiptByOrderNumber(orderId);
        if (res && res.receipt) {
          setReceiptData({
            ...res.receipt,
            customerName: currentUser?.name || res.receipt.customerName || 'Customer'
          });
        } else {
          setReceiptData({
            orderNumber: 'AD-666D4B735A484B686B71694659673D3D',
            date: 'Feb. 27, 2026',
            customerName: currentUser?.name || 'Customer',
            courseTitle: 'Java Spring Framework, Spring Boot, Spring AI - Gen AI',
            couponCode: 'MT260223G1B',
            subtotal: 397.46,
            tax: 71.54,
            totalPrice: 469.00,
            supplierName: 'Udemy India LLP',
            supplierAddress: '10th Floor, ResCowork 07, Tower B, Unitech Cyber Park, Sector 39\nGurgaon, Haryana, India, 122003',
            supplierWebsite: 'udemy.com'
          });
        }
      } catch (err) {
        setReceiptData({
          orderNumber: 'AD-666D4B735A484B686B71694659673D3D',
          date: 'Feb. 27, 2026',
          customerName: 'Customer',
          courseTitle: 'Java Spring Framework, Spring Boot, Spring AI - Gen AI',
          couponCode: 'MT260223G1B',
          subtotal: 397.46,
          tax: 71.54,
          totalPrice: 469.00,
          supplierName: 'Udemy India LLP',
          supplierAddress: '10th Floor, ResCowork 07, Tower B, Unitech Cyber Park, Sector 39\nGurgaon, Haryana, India, 122003',
          supplierWebsite: 'udemy.com'
        });
      } finally {
        setLoading(false);
      }
    };
    fetchReceipt();
  }, [orderId]);

  if (loading) {
    return (
      <div className="page-container" style={{ padding: '60px 0', textAlign: 'center' }}>
        <p>Loading receipt...</p>
      </div>
    );
  }

  const r = receiptData;

  return (
    <div className="receipt-page-container">
      <div className="page-container receipt-content-wrap">
        <div className="receipt-header-actions">
          <h1 className="receipt-main-title">Receipt</h1>
          <button className="btn-print-receipt no-print" onClick={() => window.print()}>
            <Printer size={16} /> Print
          </button>
        </div>

        <p className="receipt-date-sub">Receipt - {r.date}</p>

        {/* Company & Order Top Grid */}
        <div className="receipt-top-grid">
          <div className="supplier-col">
            <h3 className="supplier-name">{r.supplierName}</h3>
            <p className="supplier-line">10th Floor, ResCowork 07, Tower B, Unitech Cyber Park, Sector 39</p>
            <p className="supplier-line">Gurgaon, Haryana, India, 122003</p>
            <a href="https://www.udemy.com" className="supplier-link">udemy.com</a>
          </div>

          <div className="order-meta-col">
            <p className="order-meta-line"><span className="meta-lbl">Date:</span> {r.date}</p>
            <p className="order-meta-line"><span className="meta-lbl">Order #:</span> {r.orderNumber}</p>
          </div>
        </div>

        {/* Sold To */}
        <div className="sold-to-row">
          <span className="sold-to-lbl">Sold To:</span> {r.customerName}
        </div>

        {/* Line Items Table */}
        <div className="receipt-table-wrapper">
          <table className="receipt-table">
            <thead>
              <tr>
                <th className="th-item">Item</th>
                <th className="th-ordered">Ordered</th>
                <th className="th-coupon">Coupon Codes</th>
                <th className="th-qty text-center">Quantity</th>
                <th className="th-price text-right">Price</th>
                <th className="th-amount text-right">Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr className="item-row">
                <td className="td-item">{r.courseTitle}</td>
                <td className="td-ordered">{r.date}</td>
                <td className="td-coupon">{r.couponCode || 'MT260223G1B'}</td>
                <td className="td-qty text-center">1</td>
                <td className="td-price text-right">₹{Number(r.totalPrice).toFixed(2)}</td>
                <td className="td-amount text-right">₹{Number(r.totalPrice).toFixed(2)}</td>
              </tr>
              <tr className="summary-row subtotal-row">
                <td colSpan={4}></td>
                <td className="summary-lbl text-right">Subtotal</td>
                <td className="summary-val text-right">₹{Number(r.subtotal).toFixed(2)}</td>
              </tr>
              <tr className="summary-row tax-row">
                <td colSpan={4}></td>
                <td className="summary-lbl text-right">Tax*</td>
                <td className="summary-val text-right">₹{Number(r.tax).toFixed(2)}</td>
              </tr>
              <tr className="summary-row total-row">
                <td colSpan={4}></td>
                <td className="summary-lbl font-bold text-right">Total Paid</td>
                <td className="summary-val font-bold text-right">₹{Number(r.totalPrice).toFixed(2)}</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Footnotes */}
        <div className="receipt-footnotes">
          <p className="tax-note">*For any users charged VAT, the Tax amount is calculated on the Subtotal, not the Total Amount.</p>
          <p className="support-note">
            If you have any questions about this receipt please contact our <a href="#" className="purple-link">support team</a>.
          </p>
        </div>
      </div>

      {/* Teach the World Online Banner */}
      <div className="teach-online-banner no-print">
        <div className="page-container banner-inner-flex">
          <div className="banner-text-block">
            <h2 className="banner-title">Teach the world online</h2>
            <p className="banner-sub">Create an online video course, reach students across the globe, and earn money</p>
          </div>
          <Link to="/teaching" className="btn-teach-udemy">
            Teach on Udemy
          </Link>
        </div>
      </div>

      <style>{`
        .receipt-page-container {
          background-color: #ffffff;
          min-height: 80vh;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
          color: #2d2f31;
        }
        .receipt-content-wrap {
          max-width: 960px;
          margin: 0 auto;
          padding: 48px 24px 64px 24px;
        }
        .receipt-header-actions {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 8px;
        }
        .receipt-main-title {
          font-size: 32px;
          font-weight: 700;
          color: #1c1d1f;
          letter-spacing: -0.2px;
        }
        .btn-print-receipt {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          border: 1px solid #d1d7dc;
          background: #ffffff;
          padding: 8px 16px;
          font-size: 14px;
          font-weight: 600;
          border-radius: 4px;
          cursor: pointer;
          color: #2d2f31;
          transition: background 0.15s;
        }
        .btn-print-receipt:hover {
          background: #f7f9fa;
        }
        .receipt-date-sub {
          font-size: 14px;
          color: #1c1d1f;
          font-weight: 700;
          margin-bottom: 36px;
        }
        .receipt-top-grid {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 32px;
          font-size: 13px;
          line-height: 1.5;
        }
        .supplier-name {
          font-size: 15px;
          font-weight: 700;
          color: #1c1d1f;
          margin-bottom: 6px;
        }
        .supplier-line {
          color: #2d2f31;
          margin-bottom: 2px;
        }
        .supplier-link {
          color: #5624d0;
          text-decoration: none;
          display: inline-block;
          margin-top: 4px;
        }
        .supplier-link:hover {
          text-decoration: underline;
        }
        .order-meta-col {
          text-align: left;
          font-size: 13px;
        }
        .order-meta-line {
          margin-bottom: 4px;
          color: #2d2f31;
        }
        .meta-lbl {
          font-weight: 400;
          color: #2d2f31;
        }
        .sold-to-row {
          font-size: 13px;
          color: #2d2f31;
          margin-bottom: 24px;
          padding-top: 8px;
        }
        .sold-to-lbl {
          font-weight: 400;
          color: #2d2f31;
        }
        .receipt-table-wrapper {
          width: 100%;
          margin-bottom: 24px;
          border-top: 1px solid #d1d7dc;
        }
        .receipt-table {
          width: 100%;
          border-collapse: collapse;
          font-size: 13px;
        }
        .receipt-table th {
          font-size: 13px;
          font-weight: 700;
          color: #1c1d1f;
          text-align: left;
          padding: 12px 10px;
          border-bottom: 1px solid #d1d7dc;
        }
        .receipt-table td {
          padding: 12px 10px;
          color: #2d2f31;
        }
        .item-row td {
          border-bottom: 1px solid #d1d7dc;
        }
        .td-item {
          max-width: 320px;
        }
        .text-center {
          text-align: center;
        }
        .text-right {
          text-align: right;
        }
        .summary-row td {
          padding: 6px 10px;
        }
        .subtotal-row td {
          padding-top: 12px;
        }
        .total-row td {
          border-top: 1px solid #d1d7dc;
          padding-top: 8px;
          padding-bottom: 12px;
          color: #1c1d1f;
        }
        .font-bold {
          font-weight: 700;
        }
        .receipt-footnotes {
          margin-top: 24px;
          font-size: 12px;
          color: #6a6f73;
          line-height: 1.6;
        }
        .tax-note {
          margin-bottom: 24px;
        }
        .support-note {
          color: #2d2f31;
        }
        .purple-link {
          color: #5624d0;
          text-decoration: underline;
        }
        .teach-online-banner {
          background-color: #2d2f31;
          color: #ffffff;
          padding: 32px 0;
          margin-top: 48px;
        }
        .banner-inner-flex {
          display: flex;
          justify-content: space-between;
          align-items: center;
          max-width: 960px;
          margin: 0 auto;
          padding: 0 24px;
        }
        .banner-title {
          font-size: 18px;
          font-weight: 700;
          margin-bottom: 6px;
        }
        .banner-sub {
          font-size: 13px;
          color: #d1d7dc;
        }
        .btn-teach-udemy {
          border: 1px solid #ffffff;
          color: #ffffff;
          background: transparent;
          font-weight: 700;
          font-size: 14px;
          padding: 10px 18px;
          border-radius: 4px;
          text-decoration: none;
          transition: background 0.15s, color 0.15s;
        }
        .btn-teach-udemy:hover {
          background: #ffffff;
          color: #1c1d1f;
        }
        @media print {
          .no-print {
            display: none !important;
          }
          .receipt-page-container {
            padding: 0;
          }
        }
      `}</style>
    </div>
  );
};
