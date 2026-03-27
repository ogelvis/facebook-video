require("dotenv").config();

const express = require("express");
const cors = require("cors");
const fb = require('@mrnima/facebook-downloader');

console.log("fb exports:", fb);
console.log("typeof fb:", typeof fb);
console.log("typeof fb.default:", typeof fb.default);

const fbDownloader = typeof fb === 'function' ? fb : 
                     typeof fb.default === 'function' ? fb.default :
                     typeof fb.fbDownloader === 'function' ? fb.fbDownloader :
                     Object.values(fb).find(v => typeof v === 'function');

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

app.post("/api/fetch", async (req, res) => {
  try {
    const { url } = req.body;
    const result = await fbDownloader(url);

    if (!result.success) {
      return res.status(500).json({ error: "Failed to fetch video" });
    }

    res.json({
      title: result.title,
      thumbnail: result.thumbnail,
      sd: result.download.sd,
      hd: result.download.hd,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 10000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});