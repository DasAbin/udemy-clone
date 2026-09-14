import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Lock, Shield, Sparkles, CheckCircle2, QrCode } from 'lucide-react';
import { api } from '../services/api';

export const CheckoutExpressPage: React.FC = () => {
  const { courseId = 'c_spring_darby_01' } = useParams();
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'cards' | 'netbanking' | 'wallets'>('upi');
  const [country, setCountry] = useState('India');
  const [state, setState] = useState('Uttar Pradesh');
  const [isProcessing, setIsProcessing] = useState(false);
  const [showQrModal, setShowQrModal] = useState(false);

  // Prices matching Screenshot 2026-09-14 114826.png
  const originalPrice = 4229.00;
  const subtotal = 4229.00;
  const gst = 761.22;
  const total = 4990.22;

  const handleProceed = () => {
    if (paymentMethod === 'upi') {
      setShowQrModal(true);
    } else {
      completePurchase();
    }
  };

  const completePurchase = async () => {
    setIsProcessing(true);
    try {
      await api.addToCart('c_spring_darby_01');
      const order = await api.checkout('₹4,229.00 UPI');
      setShowQrModal(false);
      navigate('/dashboard/cart-receipt/AD-666D4B735A484B686B71694659673D3D');
    } catch (err) {
      console.error('Checkout failed:', err);
      navigate('/dashboard/cart-receipt/AD-666D4B735A484B686B71694659673D3D');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="checkout-express-page">
      {/* Express Minimal Header */}
      <header className="checkout-header">
        <div className="checkout-header-inner">
          <Link to="/" className="checkout-logo">
            udemy
          </Link>
          <Link to="/" className="checkout-cancel-link">
            Cancel
          </Link>
        </div>
      </header>

      {/* Main Content Grid */}
      <main className="checkout-body">
        <div className="checkout-grid">
          {/* Left Column: Billing, Payment & Order Details */}
          <div className="checkout-left-col">
            <h1 className="checkout-main-title">Checkout</h1>

            {/* Billing Address Section */}
            <section className="checkout-section">
              <h2 className="section-title">Billing address</h2>
              <div className="address-fields-grid">
                <div className="form-group">
                  <label className="form-label">Country</label>
                  <select
                    className="form-select"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                  >
                    <option value="India">India</option>
                    <option value="United States">United States</option>
                    <option value="United Kingdom">United Kingdom</option>
                    <option value="Canada">Canada</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">State / Union Territory</label>
                  <select
                    className="form-select"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                  >
                    <option value="Uttar Pradesh">Uttar Pradesh</option>
                    <option value="Delhi">Delhi</option>
                    <option value="Karnataka">Karnataka</option>
                    <option value="Maharashtra">Maharashtra</option>
                    <option value="Tamil Nadu">Tamil Nadu</option>
                  </select>
                </div>
              </div>
              <p className="tax-compliance-note">
                Udemy is required by law to collect applicable transaction taxes for purchases made in certain tax jurisdictions.
              </p>
            </section>

            {/* Payment Method Section */}
            <section className="checkout-section">
              <div className="payment-header-row">
                <h2 className="section-title">Payment method</h2>
                <div className="secure-encrypted-tag">
                  <span>Secure and encrypted</span>
                  <Lock size={14} />
                </div>
              </div>

              <div className="payment-options-box">
                {/* UPI Option */}
                <div
                  className={`payment-option-row ${paymentMethod === 'upi' ? 'selected' : ''}`}
                  onClick={() => setPaymentMethod('upi')}
                >
                  <div className="option-label-flex">
                    <input
                      type="radio"
                      name="paymentMethod"
                      checked={paymentMethod === 'upi'}
                      onChange={() => setPaymentMethod('upi')}
                      className="payment-radio"
                    />
                    <span className="upi-badge-text">UPI</span>
                    <span className="method-name font-bold">UPI</span>
                  </div>

                  {paymentMethod === 'upi' && (
                    <div className="upi-expanded-info">
                      <p className="upi-desc">
                        After generating the QR code you can use your preferred UPI app to complete the payment.
                      </p>
                      <p className="upi-action-instruction">
                        Click the "Proceed" button to generate a QR code for UPI payment.
                      </p>
                    </div>
                  )}
                </div>

                {/* Cards Option */}
                <div
                  className={`payment-option-row ${paymentMethod === 'cards' ? 'selected' : ''}`}
                  onClick={() => setPaymentMethod('cards')}
                >
                  <div className="option-label-flex">
                    <input
                      type="radio"
                      name="paymentMethod"
                      checked={paymentMethod === 'cards'}
                      onChange={() => setPaymentMethod('cards')}
                      className="payment-radio"
                    />
                    <span className="method-name font-bold">Cards</span>
                  </div>
                  <div className="card-icons-row">
                    <span className="card-tag visa">VISA</span>
                    <span className="card-tag mc">MC</span>
                    <span className="card-tag amex">AMEX</span>
                    <span className="card-tag rupay">RuPay</span>
                  </div>
                </div>

                {/* Net Banking */}
                <div
                  className={`payment-option-row ${paymentMethod === 'netbanking' ? 'selected' : ''}`}
                  onClick={() => setPaymentMethod('netbanking')}
                >
                  <div className="option-label-flex">
                    <input
                      type="radio"
                      name="paymentMethod"
                      checked={paymentMethod === 'netbanking'}
                      onChange={() => setPaymentMethod('netbanking')}
                      className="payment-radio"
                    />
                    <span className="method-name font-bold">Net Banking</span>
                  </div>
                </div>

                {/* Mobile Wallets */}
                <div
                  className={`payment-option-row ${paymentMethod === 'wallets' ? 'selected' : ''}`}
                  onClick={() => setPaymentMethod('wallets')}
                >
                  <div className="option-label-flex">
                    <input
                      type="radio"
                      name="paymentMethod"
                      checked={paymentMethod === 'wallets'}
                      onChange={() => setPaymentMethod('wallets')}
                      className="payment-radio"
                    />
                    <span className="method-name font-bold">Mobile Wallets</span>
                  </div>
                </div>
              </div>
            </section>

            {/* Order Details Section */}
            <section className="checkout-section">
              <h2 className="section-title">Order details (1 course)</h2>
              <div className="order-detail-card">
                <img
                  src="/images/thumbnails/spring-boot-darby.png"
                  alt="Spring Boot 4, Spring 7 & Hibernate for Beginners"
                  className="order-detail-thumb"
                />
                <span className="order-detail-title">
                  Spring Boot 4, Spring 7 & Hibernate for Beginners
                </span>
                <span className="order-detail-price font-bold">
                  ₹4,229.00
                </span>
              </div>
            </section>
          </div>

          {/* Right Column: Order Summary & Guarantee */}
          <div className="checkout-right-col">
            <div className="order-summary-card">
              <h2 className="summary-card-title">Order summary</h2>

              <div className="summary-price-line">
                <span className="line-lbl">Original Price:</span>
                <span className="line-val">₹{originalPrice.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
              </div>

              <div className="summary-price-line">
                <span className="line-lbl font-bold">Subtotal:</span>
                <span className="line-val font-bold">₹{subtotal.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
              </div>

              <div className="summary-price-line">
                <span className="line-lbl">GST (18%):</span>
                <span className="line-val">+₹{gst.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
              </div>

              <div className="summary-total-row">
                <span className="total-lbl font-bold">Total (1 course):</span>
                <span className="total-val font-bold">₹{total.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
              </div>

              <p className="gst-included-text">Applicable GST is included in your total.</p>

              <p className="terms-disclaimer">
                By completing your purchase, you agree to these{' '}
                <a href="#terms" className="purple-link">Terms of Use</a>.
              </p>

              <button
                className="btn-proceed-lock"
                onClick={handleProceed}
                disabled={isProcessing}
              >
                <Lock size={16} />
                <span>{isProcessing ? 'Processing...' : 'Proceed'}</span>
              </button>

              {/* 30-Day Guarantee */}
              <div className="guarantee-box">
                <h3 className="guarantee-title">30-Day Money-Back Guarantee</h3>
                <p className="guarantee-desc">
                  Not satisfied? Get a full refund within 30 days. Simple and straightforward!
                </p>
              </div>

              {/* Tap into Success Badge */}
              <div className="social-proof-box">
                <div className="proof-header">
                  <Sparkles size={16} className="text-purple" />
                  <span className="proof-title">Tap into Success Now</span>
                </div>
                <p className="proof-text">
                  Join 8 people in your country who've recently enrolled in this course within last 24 hours.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* QR Code UPI Modal Simulator */}
      {showQrModal && (
        <div className="modal-overlay" onClick={() => setShowQrModal(false)}>
          <div className="qr-modal-dialog" onClick={(e) => e.stopPropagation()}>
            <div className="qr-modal-header">
              <h3>Scan QR Code to Pay</h3>
              <button className="qr-close-btn" onClick={() => setShowQrModal(false)}>✕</button>
            </div>
            <div className="qr-modal-body">
              <div className="qr-code-placeholder">
                <QrCode size={180} color="#1c1d1f" />
              </div>
              <p className="qr-amount-text">Amount: <strong>₹{total.toFixed(2)}</strong></p>
              <p className="qr-upi-id">UPI ID: <strong>udemy.india@icici</strong></p>
              <button className="btn-simulate-complete" onClick={completePurchase}>
                <CheckCircle2 size={16} /> Simulate Successful Payment
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .checkout-express-page {
          background-color: #ffffff;
          min-height: 100vh;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif;
          color: #2d2f31;
        }
        .checkout-header {
          border-bottom: 1px solid #d1d7dc;
          padding: 16px 0;
        }
        .checkout-header-inner {
          max-width: 1140px;
          margin: 0 auto;
          padding: 0 24px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .checkout-logo {
          font-size: 28px;
          font-weight: 800;
          color: #1c1d1f;
          text-decoration: none;
          letter-spacing: -1px;
        }
        .checkout-cancel-link {
          color: #5624d0;
          font-weight: 700;
          font-size: 14px;
          text-decoration: none;
        }
        .checkout-cancel-link:hover {
          color: #401b9c;
        }
        .checkout-body {
          max-width: 1140px;
          margin: 0 auto;
          padding: 40px 24px 80px 24px;
        }
        .checkout-grid {
          display: grid;
          grid-template-columns: 1fr 400px;
          gap: 64px;
          align-items: start;
        }
        .checkout-main-title {
          font-size: 28px;
          font-weight: 700;
          color: #1c1d1f;
          margin-bottom: 32px;
        }
        .checkout-section {
          margin-bottom: 40px;
        }
        .section-title {
          font-size: 18px;
          font-weight: 700;
          color: #1c1d1f;
          margin-bottom: 16px;
        }
        .address-fields-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
          margin-bottom: 12px;
        }
        .form-group {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .form-label {
          font-size: 13px;
          font-weight: 700;
          color: #2d2f31;
        }
        .form-select {
          border: 1px solid #1c1d1f;
          padding: 10px 14px;
          border-radius: 4px;
          font-size: 14px;
          background-color: #ffffff;
          cursor: pointer;
        }
        .tax-compliance-note {
          font-size: 11px;
          color: #6a6f73;
          line-height: 1.45;
        }
        .payment-header-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 16px;
        }
        .secure-encrypted-tag {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 12px;
          font-weight: 600;
          color: #6a6f73;
        }
        .payment-options-box {
          border: 1px solid #d1d7dc;
          border-radius: 4px;
          overflow: hidden;
        }
        .payment-option-row {
          padding: 16px 20px;
          border-bottom: 1px solid #d1d7dc;
          cursor: pointer;
          transition: background 0.15s;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .payment-option-row:last-child {
          border-bottom: none;
        }
        .payment-option-row.selected {
          background-color: #f7f9fa;
        }
        .option-label-flex {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .payment-radio {
          accent-color: #1c1d1f;
          width: 18px;
          height: 18px;
        }
        .upi-badge-text {
          font-size: 11px;
          font-weight: 800;
          background: #e4e8eb;
          padding: 2px 6px;
          border-radius: 2px;
        }
        .method-name {
          font-size: 14px;
          color: #1c1d1f;
        }
        .upi-expanded-info {
          padding-left: 30px;
          font-size: 12px;
          color: #595f65;
          line-height: 1.5;
        }
        .upi-desc {
          margin-bottom: 6px;
        }
        .upi-action-instruction {
          color: #2d2f31;
        }
        .card-icons-row {
          display: flex;
          gap: 6px;
          padding-left: 30px;
        }
        .card-tag {
          font-size: 10px;
          font-weight: 700;
          padding: 2px 6px;
          border: 1px solid #d1d7dc;
          border-radius: 2px;
          background: #ffffff;
        }
        .order-detail-card {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          padding: 12px;
          border: 1px solid #d1d7dc;
          border-radius: 4px;
        }
        .order-detail-thumb {
          width: 64px;
          height: 38px;
          object-fit: cover;
          border-radius: 2px;
        }
        .order-detail-title {
          flex: 1;
          font-size: 14px;
          font-weight: 700;
          color: #1c1d1f;
        }
        .order-detail-price {
          font-size: 14px;
          color: #1c1d1f;
        }
        .order-summary-card {
          border: 1px solid #d1d7dc;
          border-radius: 4px;
          padding: 24px;
          background: #ffffff;
        }
        .summary-card-title {
          font-size: 20px;
          font-weight: 700;
          color: #1c1d1f;
          margin-bottom: 20px;
        }
        .summary-price-line {
          display: flex;
          justify-content: space-between;
          font-size: 14px;
          margin-bottom: 10px;
          color: #2d2f31;
        }
        .summary-total-row {
          display: flex;
          justify-content: space-between;
          font-size: 18px;
          padding-top: 14px;
          border-top: 1px solid #d1d7dc;
          margin-top: 12px;
          margin-bottom: 8px;
          color: #1c1d1f;
        }
        .gst-included-text {
          font-size: 11px;
          color: #6a6f73;
          margin-bottom: 16px;
        }
        .terms-disclaimer {
          font-size: 11px;
          color: #6a6f73;
          line-height: 1.4;
          margin-bottom: 20px;
        }
        .purple-link {
          color: #5624d0;
          text-decoration: underline;
        }
        .btn-proceed-lock {
          width: 100%;
          background-color: #a435f0;
          color: #ffffff;
          border: none;
          padding: 14px 0;
          font-size: 16px;
          font-weight: 700;
          border-radius: 4px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          transition: background 0.15s;
          margin-bottom: 24px;
        }
        .btn-proceed-lock:hover {
          background-color: #8710d8;
        }
        .guarantee-box {
          border-top: 1px solid #f2f3f5;
          padding-top: 16px;
          margin-bottom: 16px;
        }
        .guarantee-title {
          font-size: 14px;
          font-weight: 700;
          color: #1c1d1f;
          margin-bottom: 4px;
        }
        .guarantee-desc {
          font-size: 12px;
          color: #6a6f73;
          line-height: 1.4;
        }
        .social-proof-box {
          background-color: #f7f9fa;
          border-radius: 4px;
          padding: 14px;
        }
        .proof-header {
          display: flex;
          align-items: center;
          gap: 6px;
          margin-bottom: 6px;
        }
        .text-purple {
          color: #a435f0;
        }
        .proof-title {
          font-size: 13px;
          font-weight: 700;
          color: #1c1d1f;
        }
        .proof-text {
          font-size: 12px;
          color: #6a6f73;
          line-height: 1.4;
        }
        .font-bold {
          font-weight: 700;
        }
        .qr-modal-dialog {
          background: #ffffff;
          border-radius: 8px;
          padding: 28px;
          max-width: 360px;
          width: 100%;
          text-align: center;
        }
        .qr-modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
        }
        .qr-close-btn {
          border: none;
          background: transparent;
          font-size: 18px;
          cursor: pointer;
        }
        .qr-code-placeholder {
          display: flex;
          justify-content: center;
          margin-bottom: 16px;
        }
        .qr-amount-text {
          font-size: 16px;
          margin-bottom: 4px;
        }
        .qr-upi-id {
          font-size: 12px;
          color: #6a6f73;
          margin-bottom: 20px;
        }
        .btn-simulate-complete {
          width: 100%;
          background: #1f9d55;
          color: #ffffff;
          border: none;
          padding: 12px;
          font-size: 14px;
          font-weight: 700;
          border-radius: 4px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
        }
        @media (max-width: 860px) {
          .checkout-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
};
