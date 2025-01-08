const { gpt } = require("gpti");
const axios = require("axios");

module.exports.config = {
  name: "music",
  author: "XyryllPanget",
  version: "1.0",
  category: "AI",
  description: "Search and play music from YouTube",
  adminOnly: false,
  usePrefix: false,
  cooldown: 10,
};

module.exports.run = async function ({ event, args }) {
  if (event.type === "message") {
    let query = args.join(" ");
    if (!query) {
      return api.sendMessage("Please provide a song name or keyword to search.", event.sender.id);
    }

    try {
      // Fetch audio URL using the API
      const response = await axios.get(`https://dlvc.vercel.app/yt-audio?search=${encodeURIComponent(query)}`);
      if (response.data.url) {
        const audioUrl = response.data.url;
        api.sendMessage(`Here is your music: ${audioUrl}`, event.sender.id);
      } else {
        api.sendMessage("Sorry, I couldn't find the audio for your search.", event.sender.id);
      }
    } catch (err) {
      console.error(err);
      api.sendMessage("An error occurred while fetching the music.", event.sender.id);
    }
  }
};
