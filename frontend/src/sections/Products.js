import React from 'react';
import './Products.css';

const Products = ({children}) => {
    return (
        <section className="section products" id="catalog">
            <div className="container">
                <h2 className="section-title">
                    Каталог
                </h2>
                <div className="products__wrapper">
                    {children}
                </div>
            </div>
        </section>
    );
}

export default Products;
