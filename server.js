require("dotenv").config();
const express = require("express");
const cors = require("cors");
const db = require("./db.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { authenticateToken, authorizeRole } = require("./middleware/auth.js");

const app = express();
const PORT = process.env.PORT || 3300;
const JWT_SECRET = process.env.JWT_SECRET;

// middleware
app.use(cors());
app.use(express.json());

// routes
app.get("/status", (req, res) => {
  res.json({ ok: true, service: "film-api" });
});

// auth routes
app.post("/auth/register", async (req, res, next) => {
  const { username, password } = req.body;

  if (!username || !password || password.length < 6) {
    return res
      .status(400)
      .json({ error: "Username dan password (min 6 char) harus diisi" });
  }
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const sql =
      "INSERT INTO users (username, password, role) VALUES ($1, $2, $3) RETURNING id, username";
    const result = await db.query(sql, [
      username.toLowerCase(),
      hashedPassword,
      "user",
    ]);
    res.status(201).json(result.rows[0]);
  } catch (err) {
    if (err.code === "23505") {
      // kode error unik postgresql
      return res.status(409).json({ error: "Username sudah digunakan" });
    }
    next(err);
  }
});


app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});