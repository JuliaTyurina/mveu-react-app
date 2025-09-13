import React, {useState} from 'react';

const Login = ({setModalBox, setIsAuthenticated}) => {
    const [message, setMessage] = useState("");

    const Log = async () => {
        const login = document.getElementById('login').value;
        const password = document.getElementById('password').value;
        const data = { login, password };

        const api = "http://localhost:9001/login";

        try {
            const response = await fetch(api, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            });

            const result = await response.json();
            setMessage(result.message || "Успешный вход");

            if (result.token) {
                localStorage.setItem('token', result.token);
                setIsAuthenticated(true);
            }


            setTimeout(() => {
                setModalBox("null");
            }, 1500);

        } catch (error) {
            console.error("Ошибка при входе:", error);
            setMessage("Ошибка подключения к серверу");
        }
    };



    const handleSubmit = (e) => {
        e.preventDefault();
        Log();
    }

    return (
        <>
            <h2>Вход</h2>
            <form onSubmit={handleSubmit}>
                <input id="login" type="text" placeholder="Логин" required/>
                <input id="password" type="password" placeholder="Пароль" required/>
                <button type="submit" className="button-reset button-accent">Войти</button>
                <p onClick={() => setModalBox("Registration")}>Регистрация</p>
            </form>
            {message && <p style={{ color: 'green', marginTop: '10px' }}>{message}</p>}

        </>
    );
}

export default Login;
