const express = require("express");
const sqlite3 = require("sqlite3").verbose();

const router = express.Router();

// Connect to SQLite database
const db = new sqlite3.Database("./database.db", sqlite3.OPEN_READWRITE, (err) => {
    if (err) console.error("Database connection failed:", err);
});

router.get("/", (req, res) => {
    if (!req.session.user) {
        return res.redirect("/login-bank");
    }

    const bank = req.session.user; // Get bank details from session
    console.log("Dashboard loaded for:", bank); // Debugging log

    res.render("dashboard_bank", { user: bank, inventory: bank.inventory });
});

// Handle logout
router.get("/logout", (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error("Logout error:", err);
        }
        res.redirect("/login-bank");
    });
});

module.exports = router;
