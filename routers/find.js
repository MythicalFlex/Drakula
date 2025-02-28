const express = require('express');
const router = express.Router();
const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("./database.db", sqlite3.OPEN_READWRITE, (err) => {
        if (err) console.error("Database connection failed:", err);
    });

// router.get('/', (req, res) => {
//   db.all('SELECT * FROM BloodDonor', [], (err, rows) => {
//     if (err) {
//       console.error(err.message);
//       return res.status(500).json({ error: err.message });
//     }
//     res.json({ donors: rows });
//   });
// });

router.get("/", (req, res) => {
      res.render("find");
  });

module.exports = router;
