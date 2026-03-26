const axios = require("axios");

async function fetchVideo(url) {
  if (!url) throw new Error("Video URL is required");

  const options = {
    method: "GET",
    url: "https://facebook-videos-reels-downloader.p.rapidapi.com/get-video-info",
    params: { url },
    headers: {
      "x-rapidapi-key": process.env.RAPID_API_KEY,
      "x-rapidapi-host": "facebook-videos-reels-downloader.p.rapidapi.com"
    }
  };

  try {
    const response = await axios.request(options);
    return response.data;
  } catch (err) {
    console.error("API ERROR:", err.response?.data || err.message);
    throw new Error("Failed to fetch video info");
  }
}

module.exports = fetchVideo;