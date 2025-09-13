import React, { useEffect, useState } from 'react';
import './Account.css';

const Account = ({ setIsAuthenticated, setPage }) => {
    const [userData, setUserData] = useState(null);
    const [editMode, setEditMode] = useState(false);
    const [formData, setFormData] = useState({ login: '', email: '' });
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const fetchUserData = async () => {
            const token = localStorage.getItem('token');
            if (!token) return;

            try {
                const userRes = await fetch('http://localhost:9001/me', {
                    headers: { Authorization: `Bearer ${token}` }
                });

                if (!userRes.ok) throw new Error("Ошибка при получении данных пользователя");
                const userData = await userRes.json();

                const ordersRes = await fetch('http://localhost:9001/orders', {
                    headers: { Authorization: `Bearer ${token}` }
                });

                if (!ordersRes.ok) throw new Error("Ошибка при получении заказов");
                const ordersData = await ordersRes.json();

                setUserData(userData);
                setFormData({ login: userData.login, email: userData.email });
                setOrders(ordersData);
            } catch (err) {
                console.error(err);
            }
        };

        fetchUserData();
    }, []);


    const handleLogout = () => {
        localStorage.removeItem('token');
        setIsAuthenticated(false);
        setPage('Main');
    };

    const handleSave = async () => {
        const token = localStorage.getItem('token');
        try {
            const response = await fetch('http://localhost:9001/me', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(formData)
            });

            if (!response.ok) throw new Error("Ошибка при сохранении");

            const updatedUser = await response.json();
            setUserData(updatedUser);
            setEditMode(false);
        } catch (err) {
            console.error(err);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    return (
        <div className="account">
            <div className="container">
                <h1>Личный кабинет</h1>
                {userData ? (
                    <>
                        {editMode ? (
                            <>
                                <p>
                                    Логин: <input type="text" name="login" value={formData.login} onChange={handleChange} />
                                </p>
                                <p>
                                    Email: <input type="email" name="email" value={formData.email} onChange={handleChange} />
                                </p>
                                <button onClick={handleSave} className="button-reset button-accent">Сохранить</button>
                                <button onClick={() => setEditMode(false)} className="button-reset">Отмена</button>
                            </>
                        ) : (
                            <>
                                <p>Логин: <strong>{userData.login}</strong></p>
                                <p>Email: <strong>{userData.email}</strong></p>
                                <button onClick={() => setEditMode(true)} className="button-reset">Редактировать</button>
                            </>
                        )}
                    </>
                ) : (
                    <p>Загрузка данных...</p>
                )}
                <button className="button-reset button-accent" onClick={handleLogout}>Выйти</button>

                <h2>Мои заказы</h2>
                {orders.length > 0 ? (
                    <ul className="order-list">
                        {orders.map(order => (
                            <li key={order._id} className="order-item">
                                <p><strong>Заказ №{order._id}</strong></p>
                                <p>Дата: {new Date(order.createdAt).toLocaleString('ru-RU', {
                                    day: '2-digit',
                                    month: '2-digit',
                                    year: 'numeric',
                                    hour: '2-digit',
                                    minute: '2-digit'
                                })}</p>
                                <p>Статус: В обработке</p>
                                <ul>
                                    {order.items.map((item, index) => (
                                        <li key={index}>
                                            {item.name} — {item.quantity} шт. × {item.price} ₽
                                        </li>
                                    ))}
                                </ul>
                                <p><strong>Итого: {order.total} ₽</strong></p>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>У вас пока нет заказов.</p>
                )}


            </div>
        </div>
    );
};

export default Account;
