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
  host: "mysql-server", //ovde staviti naziv mysql servera u mrezi
  user: "novi",
  password: "novi",
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
    console.log("Table 'favorites' is ready.");
  });
});

// Endpoint to get all favorites
app.get("/orders", (req, res) => {
  connection.query("SELECT * FROM favorites", (error, results) => {
    if (error) throw error;
    res.json(results);
  });
});

// Endpoint to add a favorite
app.post("/orders", (req, res) => {
  const { name, adr, tel, pizza, size } = req.body;
  const query =
    "INSERT INTO orders (name, adr, tel, pizza, size) VALUES (?, ?, ?, ?, ?)";
  connection.query(query, [name, adr, tel, pizza, size], (error, results) => {
    if (error) throw error;
    res.status(201).send(`Favorite added with ID: ${results.insertId}`);
  });
});

// Endpoint to delete a favorite
app.delete("/orders/:id", (req, res) => {
  const { id } = req.params;
  const query = "DELETE FROM favorites WHERE id = ?";
  connection.query(query, [id], (error, results) => {
    if (error) throw error;
    res.send(`Favorite with ID ${id} deleted.`);
  });
});

// Endpoint to update a favorite
app.put("/orders/:id", (req, res) => {
  const { id } = req.params;
  const { name, type, url } = req.body;
  const query = "UPDATE favorites SET name = ?, type = ?, url = ? WHERE id = ?";
  connection.query(query, [name, type, url, id], (error, results) => {
    if (error) throw error;
    res.send(`Favorite with ID ${id} updated.`);
  });
});

// Endpoint to fetch episodes from an external API
app.get("/episodes", async (req, res) => {
  try {
    const response = await axios.get("https://rickandmortyapi.com/api/episode");
    res.status(200).json({ episodes: response.data });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong." });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
