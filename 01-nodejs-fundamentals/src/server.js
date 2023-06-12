const express = require("express");

/**
 * Tipos de paramentos
 *
 * Route Params => /:id
 * Query Params => /?username=Talismar
 * Body Params => Into Body
 */

// Initialize the express engine
const app = express();

// Middleware - Trabalhando em uma aplicação do tipo JSON
app.use(express.json());

// Take a port 3000 for running server.
const port = 3000;

// Handling '/' Request
app.get("/", (req, res) => {
  return res.json([{ username: "Talismar" }]);
});

app.post("/users", (req, res) => {
  return res.json(["Curso 1", "Curso 2"]);
});

app.put("/courses/:id", (req, res) => {
  return res.json(["Curso 6", "Curso 7"]);
});

// Server setup
app.listen(port, () => {
  console.log(`http://localhost:${port}/`);
});
