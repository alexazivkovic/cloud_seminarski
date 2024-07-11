const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql2");
const axios = require("axios");
const cors = require("cors");

const app = express();
const port = 3000;
app.use(cors());
app.use(bodyParser.json());

// MySQL connection setup
const connection = mysql.createConnection({
  host: "mysql-server",
  user: "root",
  password: "mypassword",
  database: "swfavorites",
});

connection.connect((err) => {
  if (err) throw err;
  console.log("Connected to the database.");

  const createTableSql = `
      CREATE TABLE IF NOT EXISTS orders (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        adr VARCHAR(100) NOT NULL,
        tel VARCHAR(100) NOT NULL,
        pizza VARCHAR(100) NOT NULL,
        size VARCHAR(100) NOT NULL
      )
    `;

  connection.query(createTableSql, (err, result) => {
    if (err) throw err;
    console.log("Table 'orders' is ready.");
  });
});

// Endpoint to get
app.get("/orders", (req, res) => {
  connection.query("SELECT * FROM orders", (error, results) => {
    if (error) throw error;
    res.json(results);
  });
});

// Endpoint to add
app.post("/orders", (req, res) => {
  const { name, adr, tel, pizza, size } = req.body;
  if (!(name && adr && tel && pizza && size)) {
    throw Error;
  }
  const query =
    "INSERT INTO orders (name, adr, tel, pizza, size) VALUES (?, ?, ?, ?, ?)";
  connection.query(query, [name, adr, tel, pizza, size], (error, results) => {
    if (error) throw error;
    res.status(201).send(`Favorite added with ID: ${results.insertId}`);
    console.log("zahtev upisan");
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
