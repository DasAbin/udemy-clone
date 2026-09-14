import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, ShieldCheck, Check } from 'lucide-react';
import { api } from '../services/api';
import { CartItem } from '../types';

interface CartPageProps {
  cartItems: CartItem[];
  cartTotal: number;
  onRemoveFromCart: (courseId: string) => void;
  onClearCart: () => void;
}

export const CartPage: React.FC<CartPageProps> = ({ cartItems, cartTotal, onRemoveFromCart, onClearCart }) => {
  const [paymentMethod, setPaymentMethod] = useState('₹469.00 UPI');
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const navigate = useNavigate();

  const handleCheckout = async () => {
    setIsProcessing(true);
    try {
      await api.checkout(paymentMethod);
      setIsProcessing(false);
      setIsSuccess(true);
      onClearCart();
      setTimeout(() => {
        navigate('/dashboard/purchase-history');
      }, 1500);
    } catch (err) {
      setIsProcessing(false);
      alert('Checkout failed, please try again');
    }
  };

  return (
    <div className="udemy-cart-page">
      <div className="page-container">
        <h1 className="cart-page-title">Shopping Cart</h1>
        <p className="cart-items-count-text">{cartItems.length} Course{cartItems.length !== 1 ? 's' : ''} in Cart</p>

        {cartItems.length === 0 ? (
          <div className="empty-cart-box">
            <img 
              src="https://s.udemycdn.com/error_page/error-desktop-v1.jpg" 
              alt="Empty cart" 
              className="empty-cart-img"
              onError={(e) => (e.currentTarget.style.display = 'none')}
            />
            <h3 className="empty-cart-title">Your cart is empty. Keep shopping to find a course!</h3>
            <Link to="/" className="btn btn-primary mt-3">Keep shopping</Link>
          </div>
        ) : (
          <div className="cart-main-grid">
            {/* Left Column: Cart Items */}
            <div className="cart-items-list">
              {cartItems.map(({ course }) => (
                <div key={course.id} className="cart-item-card">
                  <img src={course.thumbnailUrl} alt={course.title} className="cart-item-thumb" />
                  
                  <div className="cart-item-info">
                    <Link to={`/course/${course.slug}`} className="cart-item-title font-bold">
                      {course.title}
                    </Link>
                    <div className="cart-item-instructor">By {course.instructorName}</div>
                    <div className="cart-item-badges">
                      {course.isBestseller && <span className="badge badge-bestseller">Bestseller</span>}
                      <span className="text-secondary text-xs">{course.totalHours} total hours</span>
                    </div>
                  </div>

                  <div className="cart-item-actions">
                    <button 
                      className="btn-remove-item"
                      onClick={() => onRemoveFromCart(course.id)}
                      title="Remove"
                    >
                      <Trash2 size={16} />
                      <span>Remove</span>
                    </button>
                  </div>

                  <div className="cart-item-pricing">
                    <div className="cart-price font-bold">₹{course.price.toFixed(2)}</div>
                    <div className="cart-orig-price">₹{course.originalPrice.toFixed(2)}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Right Column: Order Summary */}
            <aside className="cart-summary-col">
              <div className="summary-card">
                <h3 className="summary-title">Total:</h3>
                <div className="summary-price-bold">₹{cartTotal.toFixed(2)}</div>
                
                <button 
                  className="btn-checkout-cta" 
                  onClick={() => setShowCheckoutModal(true)}
                >
                  Checkout
                </button>

                <div className="promotions-box">
                  <h4 className="promotions-title">Promotions</h4>
                  <div className="coupon-form">
                    <input type="text" placeholder="Enter Coupon" className="coupon-input" defaultValue="KEEPLEARNING" />
                    <button type="button" className="btn btn-primary btn-sm">Apply</button>
                  </div>
                </div>

                <div className="guarantee-note">
                  <ShieldCheck size={20} className="text-success" />
                  <span>30-Day Money-Back Guarantee</span>
                </div>
              </div>
            </aside>
          </div>
        )}
      </div>

      {/* Checkout Payment Modal */}
      {showCheckoutModal && (
        <div className="modal-overlay" onClick={() => setShowCheckoutModal(false)}>
          <div className="modal-dialog checkout-dialog" onClick={(e) => e.stopPropagation()}>
            <h2 className="checkout-modal-title">Complete Checkout</h2>
            <p className="checkout-modal-sub">Select your preferred payment method:</p>

            <div className="payment-options-list">
              <label className={`payment-option ${paymentMethod.includes('UPI') ? 'selected' : ''}`}>
                <input
                  type="radio"
                  name="payment"
                  value="₹469.00 UPI"
                  checked={paymentMethod.includes('UPI')}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                <div className="option-label-info">
                  <strong>UPI (Google Pay, PhonePe, Paytm)</strong>
                  <span>Instant verification via UPI ID / QR</span>
                </div>
              </label>

              <label className={`payment-option ${paymentMethod.includes('Card') ? 'selected' : ''}`}>
                <input
                  type="radio"
                  name="payment"
                  value="Credit / Debit Card"
                  checked={paymentMethod.includes('Card')}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                <div className="option-label-info">
                  <strong>Credit / Debit Card</strong>
                  <span>Visa, Mastercard, RuPay</span>
                </div>
              </label>
            </div>

            <div className="checkout-summary-row">
              <span>Total to Pay:</span>
              <strong className="text-purple font-bold">₹{cartTotal.toFixed(2)}</strong>
            </div>

            {isSuccess ? (
              <div className="checkout-success-msg">
                <Check size={20} />
                <span>Payment successful! Redirecting to your purchase history...</span>
              </div>
            ) : (
              <div className="checkout-dialog-actions">
                <button 
                  className="btn btn-primary" 
                  disabled={isProcessing}
                  onClick={handleCheckout}
                >
                  {isProcessing ? 'Processing Payment...' : 'Pay & Enroll Now'}
                </button>
                <button 
                  className="btn btn-white" 
                  onClick={() => setShowCheckoutModal(false)}
                >
                  Cancel
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      <style>{`
        .udemy-cart-page {
          padding: 40px 0 80px 0;
          min-height: 70vh;
        }
        .cart-page-title {
          font-size: 32px;
          font-weight: 700;
          color: #1c1d1f;
          margin-bottom: 8px;
        }
        .cart-items-count-text {
          font-size: 14px;
          color: #6a6f73;
          margin-bottom: 24px;
        }
        .empty-cart-box {
          border: 1px solid #d1d7dc;
          border-radius: 8px;
          padding: 60px 24px;
          text-align: center;
        }
        .empty-cart-title {
          font-size: 18px;
          color: #2d2f31;
          margin-bottom: 16px;
        }
        .cart-main-grid {
          display: flex;
          gap: 48px;
          align-items: flex-start;
        }
        .cart-items-list {
          flex: 1;
          display: flex;
          flex-direction: column;
          border-top: 1px solid #d1d7dc;
        }
        .cart-item-card {
          display: flex;
          align-items: flex-start;
          gap: 16px;
          padding: 16px 0;
          border-bottom: 1px solid #d1d7dc;
        }
        .cart-item-thumb {
          width: 120px;
          aspect-ratio: 16 / 9;
          object-fit: cover;
          border-radius: 2px;
        }
        .cart-item-info {
          flex: 1;
        }
        .cart-item-title {
          font-size: 15px;
          color: #1c1d1f;
          line-height: 1.35;
          margin-bottom: 4px;
          display: block;
        }
        .cart-item-title:hover {
          color: #5624d0;
        }
        .cart-item-instructor {
          font-size: 12px;
          color: #6a6f73;
          margin-bottom: 6px;
        }
        .cart-item-badges {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .cart-item-actions {
          padding: 0 16px;
        }
        .btn-remove-item {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 13px;
          color: #5624d0;
          font-weight: 500;
        }
        .btn-remove-item:hover {
          color: #b32d0f;
        }
        .cart-item-pricing {
          text-align: right;
          min-width: 90px;
        }
        .cart-price {
          font-size: 16px;
          color: #a435f0;
        }
        .cart-orig-price {
          font-size: 13px;
          color: #6a6f73;
          text-decoration: line-through;
        }
        .cart-summary-col {
          width: 320px;
        }
        .summary-card {
          border: 1px solid #d1d7dc;
          border-radius: 8px;
          padding: 24px;
        }
        .summary-title {
          font-size: 16px;
          color: #6a6f73;
          margin-bottom: 4px;
        }
        .summary-price-bold {
          font-size: 32px;
          font-weight: 800;
          color: #1c1d1f;
          margin-bottom: 16px;
        }
        .btn-checkout-cta {
          width: 100%;
          height: 48px;
          background: #a435f0;
          color: #ffffff;
          font-size: 16px;
          font-weight: 700;
          border-radius: 4px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background 0.15s;
          margin-bottom: 24px;
        }
        .btn-checkout-cta:hover {
          background: #8710d8;
        }
        .promotions-title {
          font-size: 14px;
          margin-bottom: 8px;
        }
        .coupon-form {
          display: flex;
          gap: 8px;
          margin-bottom: 20px;
        }
        .coupon-input {
          flex: 1;
          height: 38px;
          border: 1px solid #d1d7dc;
          border-radius: 4px;
          padding: 0 10px;
        }
        .guarantee-note {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 12px;
          color: #6a6f73;
          border-top: 1px solid #e4e8eb;
          padding-top: 16px;
        }
        .checkout-dialog {
          max-width: 500px;
          padding: 24px;
        }
        .checkout-modal-title {
          font-size: 20px;
          font-weight: 700;
          margin-bottom: 6px;
        }
        .checkout-modal-sub {
          font-size: 14px;
          color: #6a6f73;
          margin-bottom: 20px;
        }
        .payment-options-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
          margin-bottom: 24px;
        }
        .payment-option {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px 16px;
          border: 1px solid #d1d7dc;
          border-radius: 6px;
          cursor: pointer;
        }
        .payment-option.selected {
          border-color: #5624d0;
          background: #f3e8fd;
        }
        .option-label-info {
          display: flex;
          flex-direction: column;
          font-size: 13px;
        }
        .option-label-info span {
          color: #6a6f73;
          font-size: 12px;
        }
        .checkout-summary-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 18px;
          margin-bottom: 24px;
          border-top: 1px dashed #d1d7dc;
          padding-top: 16px;
        }
        .checkout-dialog-actions {
          display: flex;
          justify-content: flex-end;
          gap: 12px;
        }
        .checkout-success-msg {
          display: flex;
          align-items: center;
          gap: 8px;
          background: #eef9f2;
          color: #1f9d55;
          padding: 12px 16px;
          border-radius: 4px;
          font-size: 14px;
          font-weight: 600;
        }
        @media (max-width: 850px) {
          .cart-main-grid {
            flex-direction: column;
          }
          .cart-summary-col {
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
};
