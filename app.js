const express = require("express");
const cors = require("cors");
const fs = require("fs");

const app = express();
const PORT = process.env.PORT || 3000;

const path = require("path");

// Middleware to enable CORS
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// Endpoint to serve model.json
app.get("/model.json", (req, res) => {
  fs.readFile("model.json", "utf8", (err, data) => {
    if (err) {
      console.error("Error reading model.json:", err);
      res.status(500).send("Internal Server Error");
      return;
    }
    res.json(JSON.parse(data));
  });
});

app.get("/group1-shard1of3.bin", (req, res) => {
  const filePath = path.join(__dirname, "group1-shard1of3.bin");
  res.sendFile(filePath);
});

app.get("/group1-shard2of3.bin", (req, res) => {
  const filePath = path.join(__dirname, "group1-shard2of3.bin");
  res.sendFile(filePath);
});

app.get("/group1-shard3of3.bin", (req, res) => {
  const filePath = path.join(__dirname, "group1-shard3of3.bin");
  res.sendFile(filePath);
});

// Error handling middleware for CORS errors
app.use((err, req, res, next) => {
  if (err.name === "UnauthorizedError") {
    res.status(401).json({ error: "Unauthorized" });
  } else {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Start the server
app.listen(3000, () => {
  console.log(`Server is running on 3000`);
});
