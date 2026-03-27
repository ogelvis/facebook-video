require("dotenv").config();

const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

app.post("/api/fetch", async (req, res) => {
  try {
    const { url } = req.body;

    const response = await axios.get(
      "https://facebook-videos-reels-downloader.p.rapidapi.com/get-video-info",
      {
        params: { url },
        headers: {
          "Content-Type": "application/json",
          "x-rapidapi-host": "facebook-videos-reels-downloader.p.rapidapi.com",
          "x-rapidapi-key": process.env.RAPIDAPI_KEY,
        },
      }
    );

    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 10000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```

Then add your key to `.env` file:
```
RAPIDAPI_KEY=4ef6d33dccmsh848c2bbd0370aebp158a80jsn766540bcec50