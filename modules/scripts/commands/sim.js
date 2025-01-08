const axios = require("axios");

module.exports.config = {
  name: "sims",
  author: "XyryllPanget",
  version: "1.0",
  description: "Chat with SimSimi.",
  category: "Chat",
  adminOnly: false,
  usePrefix: false,
  cooldown: 5, // Cooldown time in seconds
};

module.exports.run = async function ({ event, args }) {
  if (event.type === "message") {
    const userMessage = args.join(" ");  // Get the user's message after the command

    if (!userMessage) {
      // If no message is provided after the command
      return api.sendMessage("Please provide a message for SimSimi to respond to.", event.sender.id);
    }

    try {
      // Request to the SimSimi API
      const response = await axios.post("https://api.simsimi.vn/v1/simtalk", {
        text: userMessage,
        lang: "en"  // Set language to English, change if needed
      });

      // If SimSimi returns a response
      const simSimiResponse = response.data.success === true ? response.data.message : "Sorry, I couldn't understand that.";

      // Send the response back to the user
      api.sendMessage(simSimiResponse, event.sender.id);
    } catch (error) {
      console.error("Error communicating with SimSimi API:", error);
      api.sendMessage("An error occurred while talking to SimSimi. Please try again later.", event.sender.id);
    }
  }
};
