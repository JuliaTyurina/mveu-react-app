import React, { useState } from 'react';

const Registration = ({ setModalBox }) => {
    const [message, setMessage] = useState("");

    const Reg = () => {
        const email = document.getElementById('email').value;
        const login = document.getElementById('login').value;
        const password = document.getElementById('password').value;
        const data = { email, login, password };

        const api = "http://localhost:9001/registration";

        fetch(api, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
            .then(result => result.json())
            .then((result) => {
                setMessage(result.message || "Регистрация прошла успешно");
                setTimeout(() => {
                    setModalBox("null");
                }, 1500);
            })
            .catch(error => {
                console.error("Ошибка при регистрации:", error);
                setMessage("Ошибка подключения к серверу");
            });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        Reg();
    }

    return (
        <>
            <h2>Регистрация</h2>
            <form onSubmit={handleSubmit}>
                <input id="email" type="email" placeholder="Почта" required />
                <input id="login" type="text" placeholder="Логин" required />
                <input id="password" type="password" placeholder="Пароль" required />
                <button type="submit" className="button-reset button-accent">Зарегистрироваться</button>
                <p onClick={() => setModalBox("Login")}>Вход</p>
            </form>
            {message && <p style={{ color: 'green', marginTop: '10px' }}>{message}</p>}
        </>
    );
}

export default Registration;
