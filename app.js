require('dotenv/config');
const express = require('express');
const session = require("express-session");
const app = express();
const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

app.use(session({
    secret: "3f8e4b6f7a9c2d4e8b5f1a2b3c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Set to true if using HTTPS
}));

const homeRouter = require("./routers/home");
const findRouter = require("./routers/find");
const loginBankRouter = require("./routers/login_bank");
const loginDonorRouter = require("./routers/login_donor");
const signupBankRouter = require("./routers/signup_bank");
const signupDonorRouter = require("./routers/signup_donor");
const dashboardRouter = require("./routers/dashboard");


app.use('/', homeRouter);
app.use('/find-donor', findRouter);
app.use('/login-bank', loginBankRouter);
app.use('/login-donor', loginDonorRouter);
app.use('/signup-bank', signupBankRouter);
app.use('/signup-donor', signupDonorRouter);
app.use('/dashboard', dashboardRouter);


app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});
