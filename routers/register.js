const express = require("express");
const sqlite3 = require("sqlite3").verbose();

const router = express.Router();

// Connect to SQLite database
const db = new sqlite3.Database("./database.db", sqlite3.OPEN_READWRITE, (err) => {
        if (err) console.error("Database connection failed:", err);
    });


router.get("/", (req, res) => {
        res.render("register");
    });


module.exports = router;

