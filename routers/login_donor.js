const express = require("express");
const sqlite3 = require("sqlite3").verbose();

const router = express.Router();

// Connect to SQLite database
const db = new sqlite3.Database("./database.db", sqlite3.OPEN_READWRITE, (err) => {
    if (err) console.error("Database connection failed:", err);
});

// Render login page
router.get("/", (req, res) => {
    res.render("login_donor", { error: null });
});

router.post("/", (req, res) => {
    const { username, password } = req.body;

    const query = "SELECT * FROM BloodDonor WHERE username = ? AND password = ?";
    db.get(query, [username, password], (err, user) => {
        if (err) {
            console.error("Database error:", err.message);
            return res.render("login_donor", { error: "An error occurred. Please try again." });
        }
        if (!user) {
            return res.render("login_donor", { error: "Invalid username or password." });
        }

        req.session.user = user; // Store user in session
        console.log(user)
        res.redirect("/dashboard-donor");
    });
});

module.exports = router;
