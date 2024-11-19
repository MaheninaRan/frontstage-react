import React from 'react';
import './productcard.css';

function ProductCard({ imageSrc, description, rating, price, discount, news, onEdit, forDelete }) {
  const formatNumber = (number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  };

  return (
    <div className="product-card">
      {discount && <div className="discount-badge">-{discount}%</div>}
      {news && <div className="new-badge">Nouveau</div>}
      <div className="product-image">
        <img src={imageSrc} alt={description} />
      </div>
      <div className="product-info">
        <p className="product-description text-center">{description}</p>

        <div className="product-pricing">
          {discount ? (
            <>
              <div className="original-price">{formatNumber(price)} Ar</div>
              <div className="discounted-price price">{formatNumber(price - (price * discount) / 100)} Ar</div>
            </>
          ) : (
            <div className="price">{formatNumber(price)} Ar</div>
          )}
        </div>
        <div className="button-action-container d-flex justify-content-center align-items-center">
          <button className="edit" onClick={onEdit}>
            <i className="fas fa-edit"></i>Modifier
          </button>
          <button className="delete" onClick={forDelete}>
            <i className="fas fa-trash"></i>Supprimer
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
