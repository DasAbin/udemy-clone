import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Star, Heart, Check } from 'lucide-react';
import { Course } from '../../types';

interface CourseCardProps {
  course: Course;
  isInCart?: boolean;
  onAddToCart?: (courseId: string) => void;
}

export const CourseCard: React.FC<CourseCardProps> = ({ course, isInCart, onAddToCart }) => {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isInCart) return;

    setIsAdding(true);
    if (onAddToCart) {
      onAddToCart(course.id);
    }
    setTimeout(() => {
      setIsAdding(false);
    }, 400);
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsWishlisted(!isWishlisted);
  };

  return (
    <div className="course-card-component">
      <Link to={`/course/${course.slug}`} className="course-card-link">
        {/* Thumbnail Wrapper */}
        <div className="card-thumb-wrapper">
          <img src={course.thumbnailUrl} alt={course.title} className="card-thumb-img" />
          
          {course.isPremium && (
            <span className="badge-premium-pill">
              <span className="premium-star">★</span> Premium
            </span>
          )}

          <button 
            type="button"
            className={`card-wishlist-btn ${isWishlisted ? 'active' : ''}`}
            onClick={handleWishlist}
            title={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
          >
            <Heart size={16} fill={isWishlisted ? '#a435f0' : 'none'} color={isWishlisted ? '#a435f0' : '#1c1d1f'} />
          </button>
        </div>

        {/* Content */}
        <div className="card-details">
          <h3 className="card-title" title={course.title}>
            {course.title}
          </h3>

          <p className="card-instructor">
            {course.instructorName}{course.instructorOrg ? `, ${course.instructorOrg}` : ''}
          </p>

          <div className="card-badge-row">
            {course.isBestseller && (
              <span className="badge badge-bestseller">Bestseller</span>
            )}
            {course.isHighestRated && (
              <span className="badge badge-highest-rated">Highest Rated</span>
            )}
            {course.isNew && (
              <span className="badge badge-new">New</span>
            )}
            <span className="badge badge-course">Course</span>
            <div className="card-rating">
              <span className="rating-number">{course.rating}</span>
              <Star size={12} fill="#b4690e" color="#b4690e" />
            </div>
            <span className="card-ratings-count">
              {course.ratingsCount.toLocaleString()} ratings
            </span>
          </div>

          <div className="card-price-container">
            <span className="price-bold">₹{course.price.toFixed(2)}</span>
            <span className="price-strikethrough">₹{course.originalPrice.toFixed(2)}</span>
          </div>
        </div>
      </Link>

      <div className="card-cta-container">
        <button
          type="button"
          className={`btn-cart-action ${isInCart ? 'in-cart' : ''}`}
          onClick={handleAddToCart}
          disabled={isInCart || isAdding}
        >
          {isInCart ? (
            <>
              <Check size={14} className="mr-1" /> Added
            </>
          ) : isAdding ? (
            'Adding...'
          ) : (
            'Add to cart'
          )}
        </button>
      </div>

      <style>{`
        .course-card-component {
          background: #ffffff;
          display: flex;
          flex-direction: column;
          position: relative;
          width: 100%;
          min-width: 220px;
          height: 100%;
        }
        .course-card-link {
          display: flex;
          flex-direction: column;
          flex: 1;
        }
        .card-thumb-wrapper {
          position: relative;
          width: 100%;
          aspect-ratio: 16 / 9;
          overflow: hidden;
          background: #f0f2f5;
          border-radius: 2px;
        }
        .card-thumb-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.2s ease;
        }
        .course-card-component:hover .card-thumb-img {
          transform: scale(1.03);
        }
        .badge-premium-pill {
          position: absolute;
          top: 8px;
          left: 8px;
          background: #6a2cc8;
          color: #ffffff;
          font-size: 11px;
          font-weight: 700;
          padding: 3px 8px;
          border-radius: 4px;
          display: flex;
          align-items: center;
          gap: 4px;
          z-index: 2;
        }
        .premium-star {
          font-size: 10px;
        }
        .card-wishlist-btn {
          position: absolute;
          top: 8px;
          right: 8px;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.95);
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1px solid rgba(0, 0, 0, 0.1);
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.15);
          transition: transform 0.15s, background 0.15s;
          z-index: 2;
        }
        .card-wishlist-btn:hover {
          background: #ffffff;
          transform: scale(1.08);
        }
        .card-details {
          padding-top: 10px;
          display: flex;
          flex-direction: column;
          flex: 1;
        }
        .card-title {
          font-size: 14px;
          font-weight: 700;
          color: #2d2f31;
          line-height: 1.35;
          margin-bottom: 4px;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          min-height: 38px;
        }
        .card-instructor {
          font-size: 12px;
          color: #6a6f73;
          margin-bottom: 6px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .card-badge-row {
          display: flex;
          align-items: center;
          gap: 6px;
          flex-wrap: wrap;
          margin-bottom: 6px;
          font-size: 12px;
        }
        .card-rating {
          display: flex;
          align-items: center;
          gap: 2px;
          font-weight: 700;
          color: #b4690e;
        }
        .rating-number {
          font-size: 12px;
        }
        .card-ratings-count {
          font-size: 12px;
          color: #6a6f73;
        }
        .card-price-container {
          display: flex;
          align-items: baseline;
          gap: 8px;
          margin-bottom: 10px;
        }
        .price-bold {
          font-size: 16px;
          font-weight: 700;
          color: #2d2f31;
        }
        .price-strikethrough {
          font-size: 13px;
          color: #6a6f73;
          text-decoration: line-through;
        }
        .card-cta-container {
          margin-top: auto;
        }
        .btn-cart-action {
          width: 100%;
          height: 36px;
          border-radius: 4px;
          border: 1px solid #a435f0;
          color: #a435f0;
          background: #ffffff;
          font-weight: 700;
          font-size: 13px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.15s ease;
        }
        .btn-cart-action:hover:not(:disabled) {
          background: #f3e8fd;
        }
        .btn-cart-action.in-cart {
          background: #1f9d55;
          color: #ffffff;
          border-color: #1f9d55;
        }
        .mr-1 {
          margin-right: 4px;
        }
      `}</style>
    </div>
  );
};
