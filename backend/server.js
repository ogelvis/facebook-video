require("dotenv").config();

const express = require("express");
const cors = require("cors");
const fetchVideo = require("./fetchVideo");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

app.post("/api/fetch", async (req, res) => {
  try {
    const { url } = req.body;
    const data = await fetchVideo(url);
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 10000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});