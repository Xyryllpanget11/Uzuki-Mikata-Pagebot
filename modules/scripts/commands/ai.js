const axios = require("axios");

const models = {
  aidetectorv1: "https://kaiz-apis.gleeze.com/api/aidetector?q=",
  aidetectorv2: "https://kaiz-apis.gleeze.com/api/aidetector-v2?q=",
  bertai: "https://kaiz-apis.gleeze.com/api/bert-ai?q=",
  blackbox: "https://kaiz-apis.gleeze.com/api/blackbox?ask=",
  chippai: "https://kaiz-apis.gleeze.com/api/chipp-ai?ask=",
  codestralv1: "https://kaiz-apis.gleeze.com/api/codestral-latest?q=",
  codestralv2: "https://kaiz-apis.gleeze.com/api/codestral-mamba?q=",
  deepseekv1: "https://kaiz-apis.gleeze.com/api/deepseek-r1?ask=",
  deepseekv2: "https://kaiz-apis.gleeze.com/api/deepseek-v3?ask=",
  geminivision: "https://kaiz-apis.gleeze.com/api/gemini-vision?q=",
  copilot: "https://kaiz-apis.gleeze.com/api/github-copilot?ask=",
  gpt3: "https://kaiz-apis.gleeze.com/api/gpt-3.5?q=",
  gpt4: "https://kaiz-apis.gleeze.com/api/gpt-4o?ask=",
  gpt4o: "https://kaiz-apis.gleeze.com/api/gpt-4o-pro?ask=",
  gpt4mini: "https://kaiz-apis.gleeze.com/api/gpt4o-mini?ask=",
  ministrallarge: "https://kaiz-apis.gleeze.com/api/mistral-large?q=",
  ministalsmall: "https://kaiz-apis.gleeze.com/api/mistral-small?q=",
  mixtral8xb: "https://kaiz-apis.gleeze.com/api/mixtral-8x22b?q=",
  mixtral8xS: "https://kaiz-apis.gleeze.com/api/mixtral-8x7b?q=",
  pixtral2b: "https://kaiz-apis.gleeze.com/api/pixtral-12b?q=",
  qwen2xc: "https://kaiz-apis.gleeze.com/api/qwen2.5-72b?ask=",
  claude: "https://kaiz-apis.gleeze.com/api/claude3-haiku?ask=",
  o3: "https://kaiz-apis.gleeze.com/api/o3-mini?ask=",
};

module.exports.config = {
  name: "model",
  author: "Aljur Pogoy", // You can change the credits if needed
  version: "1.0",
  category: "AI",
  description: "Use different AI models",
  adminOnly: false,
  usePrefix: false,
  cooldown: 3,
};

module.exports.run = async function ({ event, args, api }) {
  const { threadID, senderID, type, messageReply } = event;

  if (!args[1]) {
    let modelList = Object.keys(models).join("\n");
    return api.sendMessage(
      `📌 Available AI Models:\n\n${modelList}\n\n💡 Usage: model <model_name> <prompt>`,
      threadID
    );
  }

  const model = args[0].toLowerCase();
  const prompt = args.slice(1).join(" ");

  if (!models[model]) {
    return api.sendMessage(
      `❌ Invalid AI model!\nUse /model to see available models.`,
      threadID
    );
  }

  let finalPrompt = prompt;

  if (type === "message_reply" && messageReply) {
    finalPrompt = `Message: "${prompt}"\n\nReplying to: ${messageReply.body}`;
  }

  if (!finalPrompt) {
    return api.sendMessage(
      `⚠️ Please provide a prompt!\nUsage: /model ${model} <your question>`,
      threadID
    );
  }

  try {
    const response = await axios.get(
      `${models[model]}${encodeURIComponent(finalPrompt)}&uid=${senderID}`
    );
    const replyText = response.data.reply || response.data.result || "No response.";

    return api.sendMessage(
      `🤖 ${model.toUpperCase()} AI Response:\n${replyText}`,
      threadID
    );
  } catch (error) {
    return api.sendMessage(
      `❌ Error fetching response!\n${error.message}`,
      threadID
    );
  }
};
