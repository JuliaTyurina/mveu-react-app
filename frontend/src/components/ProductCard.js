import React from 'react';
import './ProductCard.css';

const ProductCard = ({ product, addToCart }) => {
    const { title, price, measurement, image } = product;

    return (
        <article className="product-card">
            <img src={image} alt="Фото товара"/>
            <h3>{title}</h3>
            <div>
                <span>{price}₽</span> / <span>{measurement}</span>
            </div>
            <button
                className="button-reset button-accent"
                onClick={() => addToCart(product)}
            >
                В корзину
            </button>
        </article>
    );
};

export default ProductCard;
