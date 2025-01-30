const axios = require("axios");

module.exports.config = {
  name: "summarize",
  author: "XyryllPanget",
  version: "1.0",
  description: "Summarize long texts or articles.",
  category: "Utility",
  adminOnly: false,
  usePrefix: false,
  cooldown: 5, // Cooldown time in seconds
};

module.exports.run = async function ({ event, args, api }) {
  if (event.type === "message") {
    const textToSummarize = args.join(" "); 

    if (!textToSummarize) {
      return api.sendMessage("Please provide text to summarize.", event.senderID);
    }

    try {
      //api key dito beh wag tanga
      const response = await axios.post(
        "https://api-inference.huggingface.co/models/facebook/bart-large-cnn",
        { inputs: textToSummarize },
        {
          headers: { Authorization: "Bearer YOUR_HUGGINGFACE_API_KEY" }
        }
      );
      
      const summary = response.data[0]?.summary_text || "Could not generate a summary.";
      
      api.sendMessage(`Summary: ${summary}`, event.senderID);
    } catch (error) {
      console.error("Error summarizing text:", error);
      api.sendMessage("An error occurred while summarizing the text. Please try again later.", event.senderID);
    }
  }
};
