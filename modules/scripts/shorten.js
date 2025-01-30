const axios = require("axios");

module.exports.config = {
  name: "shorten",
  author: "XyryllPanget",
  version: "1.0",
  description: "Shorten a long URL.",
  category: "Utility",
  adminOnly: false,
  usePrefix: false,
  cooldown: 5, // Cooldown time in seconds
};

module.exports.run = async function ({ event, args, api }) {
  if (event.type === "message") {
    const longUrl = args.join(" "); // Get the URL to shorten

    if (!longUrl) {
      return api.sendMessage("Please provide a URL to shorten.", event.senderID);
    }

    try {
      // Fetch shortened URL from TinyURL API
      const response = await axios.get(`https://tinyurl.com/api-create.php?url=${encodeURIComponent(longUrl)}`);
      const shortUrl = response.data || "Failed to shorten the URL.";

      // Send the shortened URL back to the user
      api.sendMessage(`Shortened URL: ${shortUrl}`, event.senderID);
    } catch (error) {
      console.error("Error shortening URL:", error);
      api.sendMessage("An error occurred while shortening the URL. Please try again later.", event.senderID);
    }
  }
};
