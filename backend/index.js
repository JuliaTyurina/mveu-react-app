const PORT = 9001
const BASE_URL = `http://localhost:${PORT}`;
const DB_URL = "mongodb://127.0.0.1:27017"

const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const {secretAccessKey} = require("./config")
const jwt = require('jsonwebtoken')
const User = require("./models/User")
const Product = require("./models/Product")
const Order = require('./models/Order');



const app = express()

app.use(cors())
app.use(express.json())

const generateAccessToken = (id) => {
    const payload = {
        id
    }
    return jwt.sign(payload, secretAccessKey, {expiresIn: "24h"})
}

app.post("/registration", async (req, res) => {
    console.log(req.body)
    const {email, login, password} = req.body
    const user = new User({email, login, password})
    await user.save()
    res.json(
        {
            message: "Вы успешно зарегистрировались."
        }
    )
})

app.post("/login", async (req, res) => {
    console.log(req.body)
    const {login, password} = req.body
    const user = await User.findOne({login})

    if(!user) {
        return res.status(400).json({message: "Пользователь не найден"})
    }

    if(user.password !== password) {
        return res.status(400).json({message: "Неверный логин или пароль"})
    }
    const token = generateAccessToken(user._id)

    res.json(
        {
            message: "Вы успешно вошли в аккаунт.",
            token: token
        }
    )
})

app.get("/products", async (req, res) => {
    const products = await Product.find()

    res.json(
        {
            data: products
        }
    )
})


app.get("/me", async (req, res) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return res.status(401).json({ message: "Нет токена" });
        }

        const token = authHeader.split(' ')[1];
        const decoded = jwt.verify(token, secretAccessKey);

        const user = await User.findById(decoded.id).select("-password");
        if (!user) {
            return res.status(404).json({ message: "Пользователь не найден" });
        }

        res.json(user);
    } catch (error) {
        return res.status(401).json({ message: "Ошибка авторизации" });
    }
});

app.put("/me", async (req, res) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return res.status(401).json({ message: "Нет токена" });
        }

        const token = authHeader.split(' ')[1];
        const decoded = jwt.verify(token, secretAccessKey);

        const { login, email } = req.body;

        const user = await User.findByIdAndUpdate(
            decoded.id,
            { login, email },
            { new: true, select: "-password" }
        );

        if (!user) {
            return res.status(404).json({ message: "Пользователь не найден" });
        }

        res.json(user);
    } catch (error) {
        res.status(500).json({ message: "Ошибка при обновлении данных" });
    }
});


app.post('/order', async (req, res) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return res.status(401).json({ message: 'Нет токена' });
        }

        const token = authHeader.split(' ')[1];
        const decoded = jwt.verify(token, secretAccessKey);

        const { items, total } = req.body;

        const order = new Order({
            userId: decoded.id,
            items,
            total
        });

        await order.save();

        res.json({ message: 'Заказ успешно оформлен' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Ошибка при оформлении заказа' });
    }
});

app.get('/orders', async (req, res) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return res.status(401).json({ message: 'Нет токена' });
        }

        const token = authHeader.split(' ')[1];
        const decoded = jwt.verify(token, secretAccessKey);

        const orders = await Order.find({ userId: decoded.id }).sort({ createdAt: -1 });

        res.json(orders);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Ошибка при получении заказов' });
    }
});




app.use('/images', express.static('public/images'))


const start = async () => {
    try {
        await mongoose.connect(DB_URL)
        app.listen(PORT, () => console.log(`Сервер запущен на ${PORT} порте`))
    } catch (e) {
        console.log(e)
    }
}

start()