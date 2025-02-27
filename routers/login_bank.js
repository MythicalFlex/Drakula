
const express = require("express");
const sqlite3 = require("sqlite3").verbose();

const router = express.Router();

// Connect to SQLite database
const db = new sqlite3.Database("./database.db", sqlite3.OPEN_READWRITE, (err) => {
    if (err) console.error("Database connection failed:", err);
});

// Render login page
router.get("/", (req, res) => {
    res.render("login_bank", { error: null });
});

router.post("/", (req, res) => {
    const { username, password } = req.body;

    const query = "SELECT * FROM BloodBank WHERE username = ? AND password = ?";
    db.get(query, [username, password], (err, bank) => {
        if (err) {
            console.error("Database error:", err.message);
            return res.render("login_bank", { error: "An error occurred. Please try again." });
        }
        if (!bank) {
            return res.render("login_bank", { error: "Invalid username or password." });
        }

        // Fetch blood inventory details for the logged-in bank
        const inventoryQuery = "SELECT * FROM BloodInventory WHERE bank_id = ?";
        db.all(inventoryQuery, [bank.bank_id], (err, inventory) => {
            if (err) {
                console.error("Database error:", err.message);
                return res.render("login_bank", { error: "An error occurred while fetching inventory." });
            }

            bank.inventory = inventory; // Attach inventory data to bank object
            req.session.user = bank; // Store bank details along with inventory in session
            console.log(bank);
            res.redirect("/dashboard-bank");
        });
    });
});

module.exports = router;
