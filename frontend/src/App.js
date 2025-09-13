import './App.css';
import Header from "./components/Header";
import Main from "./views/Main";
import Footer from "./components/Footer";
import {useEffect, useState} from "react";
import Basket from "./views/Basket";
import ModalBox from "./components/ModalBox";
import Login from "./components/Login";
import Registration from "./components/Registration";
import Account from "./views/Account";

const App = () => {
    const [page, setPage] = useState('Main')
    const [modalBox, setModalBox] = useState('none')
    const [isAuthenticated, setIsAuthenticated] = useState(() => {
        return localStorage.getItem('token') !== null;
    });

    const [cart, setCart] = useState(() => {
        const storedCart = localStorage.getItem('cart');
        return storedCart ? JSON.parse(storedCart) : [];
    });

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);


    const pages = {
        Main: <Main cart={cart} setCart={setCart}/>,
        Basket: <Basket cart={cart} setCart={setCart}/>,
        Account: <Account setIsAuthenticated={setIsAuthenticated} setPage={setPage}/>
    }

    const modalBoxes = {
        none: null,
        Login: <ModalBox setModalBox={setModalBox}><Login setModalBox={setModalBox}
                                                          setIsAuthenticated={setIsAuthenticated}/></ModalBox>,
        Registration: <ModalBox setModalBox={setModalBox}><Registration setModalBox={setModalBox}/></ModalBox>,
    }

    return (
        <div className="App">
            <Header setPage={setPage} setModalBox={setModalBox} setIsAuthenticated={setIsAuthenticated}
                    isAuthenticated={isAuthenticated} cart={cart}/>
            <main>
                {pages[page]}
            </main>
            <Footer/>
            {modalBoxes[modalBox]}
        </div>
    );
}

export default App;
