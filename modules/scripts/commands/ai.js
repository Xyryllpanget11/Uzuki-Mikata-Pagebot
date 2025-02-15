const axios = require('axios');

module.exports.config = {
  name: "ai",
  author: "Kaizenji and XyryllPanget",
  version: "1.0",
  category: "AI",
  description: "Chat with GPT models.",
  adminOnly: false,
  usePrefix: true,
  cooldown: 3,
};

const apiEndpoints = {
  gpt3: "https://kaiz-apis.gleeze.com/api/gpt-3.5?q=",
  gpt4: "https://kaiz-apis.gleeze.com/api/gpt-4o?ask=",
  gpt4o: "https://kaiz-apis.gleeze.com/api/gpt-4o-pro?ask=",
  gpt4mini: "https://kaiz-apis.gleeze.com/api/gpt4o-mini?ask="
};

module.exports.run = async function ({ event, args }) {
  if (event.type === "message") {
    let model = args.shift();
    let prompt = args.join(" ");
    let uid = event.sender.id;
    let webSearch = "off"; // Default web search option

    if (!apiEndpoints[model]) {
      return api.sendMessage("Invalid model! Use: gpt3, gpt4, gpt4o, gpt4mini.", event.sender.id);
    }

    if (!prompt) {
      return api.sendMessage("Please provide a prompt.", event.sender.id);
    }

    try {
      let response = await axios.get(`${apiEndpoints[model]}${encodeURIComponent(prompt)}&uid=${uid}&webSearch=${webSearch}`);
      if (response.data.error) {
        return api.sendMessage(response.data.error, event.sender.id);
      }
      api.sendMessage(response.data.reply, event.sender.id);
    } catch (error) {
      console.log(error);
      api.sendMessage("Error fetching response. Please check if the API is available and try again later.", event.sender.id);
    }
  } else if (event.type === "message_reply") {
    let model = "gpt4"; // Default model for replies
    let prompt = `Message: "${args.join(" ")}"
\nReplying to: ${event.message.reply_to.text}`;
    let uid = event.sender.id;
    let webSearch = "off";

    if (!prompt) {
      return api.sendMessage("Please provide a prompt.", event.sender.id);
    }

    try {
      let response = await axios.get(`${apiEndpoints[model]}${encodeURIComponent(prompt)}&uid=${uid}&webSearch=${webSearch}`);
      if (response.data.error) {
        return api.sendMessage(response.data.error, event.sender.id);
      }
      api.sendMessage(response.data.reply, event.sender.id);
    } catch (error) {
      console.log(error);
      api.sendMessage("Error fetching response. Please check if the API is available and try again later.", event.sender.id);
    }
  }
};
