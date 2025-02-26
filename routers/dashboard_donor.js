const express = require("express");
const sqlite3 = require("sqlite3").verbose();

const router = express.Router();

// Connect to SQLite database
const db = new sqlite3.Database("./database.db", sqlite3.OPEN_READWRITE, (err) => {
    if (err) console.error("Database connection failed:", err);
});

router.get("/", (req, res) => {
    if (!req.session.user) {
        return res.redirect("/login");
    }
    res.render("dashboard_donor", { user: req.session.user });
});

// Handle logout
router.get("/logout", (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error("Logout error:", err);
        }
        res.redirect("/login-donor");
    });
});

module.exports = router;
