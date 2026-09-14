import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { TopPromoBanner } from './components/layout/TopPromoBanner';
import { Header } from './components/layout/Header';
import { SubNav } from './components/layout/SubNav';
import { Footer } from './components/layout/Footer';
import { AuthModal } from './components/auth/AuthModal';
import { HomePage } from './pages/HomePage';
import { MyLearningPage } from './pages/MyLearningPage';
import { CoursePlayerPage } from './pages/CoursePlayerPage';
import { EditProfilePage } from './pages/EditProfilePage';
import { PublicProfilePage } from './pages/PublicProfilePage';
import { PurchaseHistoryPage } from './pages/PurchaseHistoryPage';
import { CourseDetailPage } from './pages/CourseDetailPage';
import { CartPage } from './pages/CartPage';
import { ReceiptPage } from './pages/ReceiptPage';
import { CertificatePage } from './pages/CertificatePage';
import { CheckoutExpressPage } from './pages/CheckoutExpressPage';
import { api } from './services/api';
import { User, Course, CartItem } from './types';

const AppContent: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [courses, setCourses] = useState<Course[]>([]);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [cartTotal, setCartTotal] = useState<number>(0);
  const [showAuthModal, setShowAuthModal] = useState<boolean>(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  const location = useLocation();

  const isPlayerPage = location.pathname.includes('/learn/lecture') || location.pathname.endsWith('/learn');
  const isCheckoutPage = location.pathname.includes('/payment/checkout');

  useEffect(() => {
    // Check authenticated user
    api.getUser().then(res => setUser(res.user)).catch(() => setUser(null));
    // Load all courses
    api.getCourses().then(res => setCourses(res.courses)).catch(err => console.error(err));
    // Load cart
    api.getCart().then(res => {
      setCartItems(res.items);
      setCartTotal(res.total);
    }).catch(err => console.error(err));
  }, []);

  const handleOpenLogin = () => {
    setAuthMode('login');
    setShowAuthModal(true);
  };

  const handleOpenSignup = () => {
    setAuthMode('signup');
    setShowAuthModal(true);
  };

  const handleLogout = async () => {
    try {
      await api.logout();
      setUser(null);
    } catch (err) {
      console.error('Error logging out:', err);
    }
  };

  const handleAddToCart = async (courseId: string) => {
    try {
      const res = await api.addToCart(courseId);
      setCartItems(res.items);
      setCartTotal(res.total);
    } catch (err) {
      console.error('Error adding to cart:', err);
    }
  };

  const handleRemoveFromCart = async (courseId: string) => {
    try {
      const res = await api.removeFromCart(courseId);
      setCartItems(res.items);
      setCartTotal(res.total);
    } catch (err) {
      console.error('Error removing from cart:', err);
    }
  };

  const handleClearCart = () => {
    setCartItems([]);
    setCartTotal(0);
  };

  return (
    <div className="udemy-app-root">
      {/* Top Countdown Promo Banner matching Screenshot */}
      {!isPlayerPage && !isCheckoutPage && <TopPromoBanner />}

      {/* Header */}
      {!isPlayerPage && !isCheckoutPage && (
        <>
          <Header 
            user={user} 
            cartItems={cartItems}
            onOpenLogin={handleOpenLogin}
            onOpenSignup={handleOpenSignup}
            onLogout={handleLogout}
          />
          {location.pathname === '/' && <SubNav />}
        </>
      )}

      {/* Main App Routes */}
      <Routes>
        <Route
          path="/"
          element={
            <HomePage
              user={user}
              courses={courses}
              cartItems={cartItems}
              onAddToCart={handleAddToCart}
              onOpenLogin={handleOpenLogin}
              onOpenSignup={handleOpenSignup}
            />
          }
        />
        <Route path="/my-learning" element={<MyLearningPage />} />
        <Route path="/course/:slug/learn/lecture/:lectureId" element={<CoursePlayerPage />} />
        <Route path="/course/:slug/learn" element={<CoursePlayerPage />} />
        <Route
          path="/user/edit-profile"
          element={<EditProfilePage user={user} onUserUpdate={(u) => setUser(u)} />}
        />
        <Route
          path="/user/vivek-singh"
          element={<PublicProfilePage user={user} courses={courses} />}
        />
        <Route
          path="/user/vivek-pratap-singh-101"
          element={<PublicProfilePage user={user} courses={courses} />}
        />
        <Route
          path="/user/:username"
          element={<PublicProfilePage user={user} courses={courses} />}
        />
        <Route
          path="/dashboard/purchase-history"
          element={<PurchaseHistoryPage />}
        />
        <Route
          path="/dashboard/cart-receipt/:orderId"
          element={<ReceiptPage />}
        />
        <Route
          path="/dashboard/cart-receipt/AD-666D4B735A484B686B71694659673D3D"
          element={<ReceiptPage />}
        />
        <Route
          path="/certificate/:certificateId"
          element={<CertificatePage />}
        />
        <Route
          path="/ude.my/:certificateId"
          element={<CertificatePage />}
        />
        <Route
          path="/payment/checkout/express/:courseId"
          element={<CheckoutExpressPage />}
        />
        <Route
          path="/payment/checkout/express/course/:courseId"
          element={<CheckoutExpressPage />}
        />
        <Route
          path="/payment/checkout/express"
          element={<CheckoutExpressPage />}
        />
        <Route
          path="/course/:slug"
          element={<CourseDetailPage cartItems={cartItems} onAddToCart={handleAddToCart} />}
        />
        <Route
          path="/cart"
          element={
            <CartPage
              cartItems={cartItems}
              cartTotal={cartTotal}
              onRemoveFromCart={handleRemoveFromCart}
              onClearCart={handleClearCart}
            />
          }
        />
      </Routes>

      {/* Footer */}
      {!isPlayerPage && !isCheckoutPage && <Footer />}

      {/* Auth Modal (Login / Signup / Demo Switcher) */}
      {showAuthModal && (
        <AuthModal
          initialMode={authMode}
          onClose={() => setShowAuthModal(false)}
          onSuccess={(u) => setUser(u)}
        />
      )}
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
};

export default App;
