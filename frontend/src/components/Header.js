import React, {useEffect, useState} from 'react';
import './Header.css';

const Header = ({ setPage, setModalBox, isAuthenticated, cart }) => {
    const [menuOpen, setMenuOpen] = useState(false);

    const basketCount = cart.reduce((acc, item) => acc + item.quantity, 0);

    return (
        <header className="header">
            <div className="container">
                <div onClick={() => setPage("Main")} className="logo">лёд</div>

                <nav className={menuOpen ? "header__nav header__nav--open" : "header__nav"}>
                    <ul>
                        <li><a href="#contacts" onClick={() => setMenuOpen(false)}>Контакты</a></li>
                        <li><a href="#catalog" onClick={() => setMenuOpen(false)}>Каталог</a></li>
                        <li><a href="#catalog" onClick={() => setMenuOpen(false)}>Блог</a></li>
                    </ul>
                </nav>

                <a onClick={() => {
                    setPage("Basket");
                    setMenuOpen(false);
                }} className="header__basket">Корзина
                    {basketCount > 0 && <span className="basket-count"> ({basketCount})</span>}
                </a>

                {isAuthenticated ? (
                    <button
                        onClick={() => setPage("Account")}
                        className="button-reset button-accent header__login"
                    >
                        Личный кабинет
                    </button>
                ) : (
                    <button
                        onClick={() => setModalBox("Login")}
                        className="button-reset button-accent header__login"
                    >
                        Вход
                    </button>
                )}


                <button
                    className="burger"
                    onClick={() => setMenuOpen(!menuOpen)}
                    aria-label={menuOpen ? "Закрыть меню" : "Открыть меню"}
                >
                    {menuOpen ? 'x' : '☰'}
                </button>
            </div>
        </header>
    );
};

export default Header;
