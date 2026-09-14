import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import { ReceiptModal } from '../components/commerce/ReceiptModal';
import { InvoiceModal } from '../components/commerce/InvoiceModal';
import { api } from '../services/api';
import { Order } from '../types';

export const PurchaseHistoryPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeTab = searchParams.get('tab') || 'purchases';
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedReceiptOrder, setSelectedReceiptOrder] = useState<Order | null>(null);
  const [selectedInvoiceOrder, setSelectedInvoiceOrder] = useState<Order | null>(null);

  useEffect(() => {
    const fetchPurchases = async () => {
      try {
        const data = await api.getPurchases();
        setOrders(data.orders);
      } catch (err) {
        console.error('Error fetching purchases:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchPurchases();
  }, []);

  const tabs = [
    { key: 'purchases', label: 'Purchases' },
    { key: 'subscriptions', label: 'Subscriptions' },
    { key: 'refunds', label: 'Refunds' }
  ];

  return (
    <div className="purchase-history-page">
      <div className="page-container">
        <h1 className="purchase-history-title">Purchase history</h1>

        {/* Tab Row */}
        <div className="purchase-tabs-bar">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              className={`purchase-tab-btn ${activeTab === tab.key ? 'active' : ''}`}
              onClick={() => setSearchParams({ tab: tab.key })}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Main Content */}
        <div className="purchase-content-wrapper">
          {loading ? (
            <div className="loading-text">Loading purchase history...</div>
          ) : activeTab === 'purchases' ? (
            <div className="purchases-table-container">
              {/* Header */}
              <div className="purchases-header-row">
                <div className="col-item"></div>
                <div className="col-date">Date</div>
                <div className="col-total">Total price</div>
                <div className="col-type">Payment type</div>
                <div className="col-actions"></div>
              </div>

              {/* Rows */}
              {orders.map((order) => (
                <div key={order.id} className="purchase-data-row">
                  <div className="col-item item-title-cell">
                    <ShoppingCart size={18} className="cart-icon-mr" />
                    <Link to={`/course/${order.courseId}`} className="purchase-course-link">
                      {order.courseTitle}
                    </Link>
                  </div>

                  <div className="col-date date-cell">
                    {order.date}
                  </div>

                  <div className="col-total total-cell font-bold">
                    ₹{order.totalPrice.toFixed(2)}
                  </div>

                  <div className="col-type type-cell">
                    {order.paymentType}
                  </div>

                  <div className="col-actions actions-cell">
                    <Link
                      to={`/dashboard/cart-receipt/${order.orderNumber}`}
                      className="btn-history-outline"
                      style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}
                    >
                      Receipt
                    </Link>
                    <button
                      className="btn-history-outline"
                      onClick={() => setSelectedInvoiceOrder(order)}
                    >
                      Invoice
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="empty-history-state">
              <p className="text-secondary">No {activeTab} recorded for this account.</p>
            </div>
          )}
        </div>
      </div>

      {/* Receipt Modal */}
      {selectedReceiptOrder && (
        <ReceiptModal
          order={selectedReceiptOrder}
          onClose={() => setSelectedReceiptOrder(null)}
        />
      )}

      {/* Invoice Modal */}
      {selectedInvoiceOrder && (
        <InvoiceModal
          order={selectedInvoiceOrder}
          onClose={() => setSelectedInvoiceOrder(null)}
        />
      )}

      <style>{`
        .purchase-history-page {
          padding-top: 40px;
          padding-bottom: 80px;
          min-height: 75vh;
        }
        .purchase-history-title {
          font-size: 32px;
          font-weight: 700;
          color: #1c1d1f;
          margin-bottom: 24px;
        }
        .purchase-tabs-bar {
          display: flex;
          gap: 24px;
          border-bottom: 1px solid #d1d7dc;
          margin-bottom: 32px;
        }
        .purchase-tab-btn {
          font-size: 14px;
          font-weight: 700;
          color: #6a6f73;
          padding-bottom: 12px;
          position: relative;
          transition: color 0.15s;
        }
        .purchase-tab-btn:hover {
          color: #1c1d1f;
        }
        .purchase-tab-btn.active {
          color: #1c1d1f;
        }
        .purchase-tab-btn.active::after {
          content: '';
          position: absolute;
          bottom: -1px;
          left: 0;
          right: 0;
          height: 2px;
          background: #1c1d1f;
        }
        .purchases-table-container {
          width: 100%;
        }
        .purchases-header-row {
          display: flex;
          align-items: center;
          padding: 12px 0;
          font-size: 14px;
          font-weight: 700;
          color: #2d2f31;
          border-bottom: 1px solid #d1d7dc;
        }
        .purchase-data-row {
          display: flex;
          align-items: center;
          padding: 24px 0;
          border-bottom: 1px solid #f2f3f5;
          font-size: 14px;
        }
        .col-item {
          flex: 2.5;
        }
        .col-date {
          flex: 1;
        }
        .col-total {
          flex: 1;
        }
        .col-type {
          flex: 1.2;
        }
        .col-actions {
          flex: 1.2;
          display: flex;
          justify-content: flex-end;
          gap: 12px;
        }
        .item-title-cell {
          display: flex;
          align-items: center;
          gap: 12px;
          padding-right: 16px;
        }
        .cart-icon-mr {
          color: #2d2f31;
          flex-shrink: 0;
        }
        .purchase-course-link {
          color: #5624d0;
          font-weight: 600;
          line-height: 1.35;
        }
        .purchase-course-link:hover {
          color: #401b9c;
          text-decoration: underline;
        }
        .date-cell, .type-cell {
          color: #2d2f31;
        }
        .total-cell {
          color: #1c1d1f;
        }
        .btn-history-outline {
          border: 1px solid #5624d0;
          color: #5624d0;
          background: #ffffff;
          font-size: 14px;
          font-weight: 700;
          padding: 8px 18px;
          border-radius: 4px;
          transition: background 0.15s;
        }
        .btn-history-outline:hover {
          background: #f3e8fd;
        }
        .empty-history-state {
          padding: 48px;
          text-align: center;
        }
        .loading-text {
          padding: 32px;
          color: #6a6f73;
        }
        @media (max-width: 850px) {
          .purchases-header-row {
            display: none;
          }
          .purchase-data-row {
            flex-direction: column;
            align-items: flex-start;
            gap: 12px;
          }
          .col-actions {
            width: 100%;
            justify-content: flex-start;
          }
        }
      `}</style>
    </div>
  );
};
