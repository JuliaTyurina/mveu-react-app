import React from 'react';
import './Basket.css';

const Basket = ({cart, setCart}) => {
    const handleRemoveItem = (productId) => {
        setCart(prevCart =>
            prevCart.filter(item => item._id !== productId)
        );
    };

    const handleIncreaseQuantity = (productId) => {
        setCart(prevCart =>
            prevCart.map(item =>
                item._id === productId ? {...item, quantity: item.quantity + 1} : item
            )
        );
    };

    const handleDecreaseQuantity = (productId) => {
        setCart(prevCart =>
            prevCart.map(item =>
                item._id === productId
                    ? {...item, quantity: item.quantity - 1}
                    : item
            ).filter(item => item.quantity > 0)
        );
    };

    const handleQuantityChange = (productId, newQuantity) => {
        if (newQuantity < 1) return;
        setCart(prevCart =>
            prevCart.map(item =>
                item._id === productId ? {...item, quantity: newQuantity} : item
            )
        );
    };

    const handleCheckout = async () => {
        const token = localStorage.getItem('token');
        if (!token) {
            alert("Вы должны быть авторизованы для оформления заказа");
            return;
        }

        try {
            const items = cart.map(item => ({
                productId: item._id,
                name: item.title,
                price: item.price,
                quantity: item.quantity
            }));

            const response = await fetch('http://localhost:9001/order', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({
                    items,
                    total: items.reduce((sum, item) => sum + item.price * item.quantity, 0)
                })
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error("Ошибка при оформлении заказа:", errorData);
                throw new Error(errorData.message || "Произошла ошибка при оформлении заказа");
            }

            alert("Заказ успешно оформлен!");
            setCart([]);
        } catch (err) {
            console.error("Произошла ошибка при оформлении:", err);
            alert(`Произошла ошибка: ${err.message}`);
        }
    };




    const totalPrice = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

    return (
        <div className="basket">
            <div className="container">
                <h1>Корзина</h1>
                {cart.length === 0 ? (
                    <p>Корзина пуста.</p>
                ) : (
                    <>
                        <ul className="basket__list">
                            {cart.map((item, index) => (
                                <li key={index} className="basket__item">
                                    <img src={item.image} alt={item.title} className="basket__image"/>
                                    <div>
                                        <h3>{item.title}</h3>
                                        <p>{item.price}₽ / {item.measurement}</p>
                                        <div className="quantity-controls">
                                            <button
                                                onClick={() => handleDecreaseQuantity(item._id)}
                                                className="quantity-button"
                                            >
                                                -
                                            </button>
                                            <input
                                                type="number"
                                                value={item.quantity}
                                                onChange={(e) =>
                                                    handleQuantityChange(item._id, parseInt(e.target.value, 10))
                                                }
                                                className="quantity-input"
                                            />
                                            <button
                                                onClick={() => handleIncreaseQuantity(item._id)}
                                                className="quantity-button"
                                            >
                                                +
                                            </button>
                                        </div>
                                    </div>
                                    <button onClick={() => handleRemoveItem(item._id)} className="basket__remove">
                                        x
                                    </button>
                                </li>
                            ))}
                        </ul>
                        <div className="basket__summary">
                            <p>Итого: {totalPrice}₽</p>
                            {cart.length > 0 && (
                                <button onClick={handleCheckout} className="button-reset button-accent">
                                    Оформить заказ
                                </button>
                            )}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default Basket;
