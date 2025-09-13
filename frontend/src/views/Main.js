import React, { useEffect, useState } from 'react';
import './Main.css';
import Products from "../sections/Products";
import ProductCard from "../components/ProductCard";
import Hero from "../sections/Hero";

const Main = ({ cart, setCart }) => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetch("http://localhost:9001/products")
            .then(res => res.json())
            .then(data => {
                setProducts(data.data);
            })
            .catch(err => console.error("Ошибка загрузки товаров:", err));
    }, []);

    const addToCart = (product) => {
        setCart((prevCart) => {
            const existingItem = prevCart.find(item => item._id === product._id);
            if (existingItem) {
                return prevCart.map(item =>
                    item._id === product._id ? { ...item, quantity: item.quantity + 1 } : item
                );
            } else {
                return [...prevCart, { ...product, quantity: 1 }];
            }
        });
    };

    return (
        <div className="main">
            <Hero />
            <Products>
                {products.map(product => (
                    <ProductCard
                        key={product._id}
                        product={product}
                        addToCart={addToCart}
                    />
                ))}
            </Products>
        </div>
    );
};

export default Main;
