import React from 'react';
import './Footer.css';

const Footer = ({setPage}) => {
    return (
        <footer className="footer" id="contacts">
            <div className="container">
                <div className="footer__wrapper">
                    <div onClick={() => setPage("Main")} className="logo">лёд</div>

                    <div className="footer__section">
                        <p className="footer__section-title">
                            Контакты
                        </p>
                        <address className="footer__contacts">
                            <ul>
                                <li><a href="tel:+7999999999" className="footer__contacts-link">+7 (999) 999-999</a>
                                </li>
                                <li><a href="https://t.me/yuliatyurina"
                                       className="footer__contacts-link">@YuliaTyurina</a>
                                </li>
                                <li><a href="mailto:juliosoctober@gmail.com"
                                       className="footer__contacts-link">juliosoctober@gmail.com</a></li>
                            </ul>
                        </address>
                    </div>

                    <div className="footer__section">
                        <p className="footer__section-title">
                            Компания
                        </p>
                        <nav className="footer__nav">
                            <ul>
                                <li><a href="#" className="footer__nav-link">Каталог</a></li>
                                <li><a href="#" className="footer__nav-link">Контакты</a></li>
                                <li><a href="#" className="footer__nav-link">Блог</a></li>
                            </ul>
                        </nav>
                    </div>

                    <div className="map">
                        <iframe
                            src="https://yandex.ru/map-widget/v1/?um=constructor%3Ad20af0a3d347c55f1d10214e07ba2bed7bfbb88881f8428613362d170b8a9721&amp;source=constructor"
                            width="100%" height="240" frameBorder="0"></iframe>
                    </div>

                </div>
                <div className="footer__info">
                    <a href="#" className="privacy-policy">Политика конфидециальности</a>
                    <p> 2025 © IceShake</p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
