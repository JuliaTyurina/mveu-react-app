import React from 'react';
import './Hero.css';
import HeroImage1 from "../images/hero-1.png";
import HeroImage2 from "../images/hero-2.png";
import HeroImage3 from "../images/hero-3.png";
import HeroImage4 from "../images/hero-4.png";

const Hero = () => {
    return (
        <section className="section hero">
            <div className="container">
                <div className="hero__wrapper">
                    <div className="hero__descr">
                        <h1>
                            Свежайший пищевой лёд
                        </h1>
                        <p>
                            Идеальный лёд для баров, летних кафе, ресторанов, вечеринок и домашних chill-вечеров.
                            Производим на японском оборудовании Hoshizaki из воды, прошедшей 7 стадий очистки.
                            Чистота, форма и вкус — на высшем уровне.
                        </p>
                        <a href="#catalog" className="hero__button button-accent">В каталог</a>
                    </div>
                    <div className="hero__media">
                        <img src={HeroImage2} alt=""/>
                        <img src={HeroImage4} alt=""/>
                        <img src={HeroImage3} alt=""/>
                        <img src={HeroImage1} alt=""/>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Hero;
