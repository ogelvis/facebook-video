const axios = require("axios");

async function fetchVideo(url) {
  const options = {
    method: "GET",
    url: "https://facebook-videos-reels-downloader.p.rapidapi.com/get-video-info",
    params: { url },
    headers: {
      "x-rapidapi-key": process.env.RAPID_API_KEY,
      "x-rapidapi-host": "facebook-videos-reels-downloader.p.rapidapi.com"
    }
  };

  const response = await axios.request(options);
  return response.data;
}

module.exports = fetchVideo;