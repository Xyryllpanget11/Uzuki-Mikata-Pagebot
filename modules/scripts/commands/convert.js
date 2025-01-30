const axios = require("axios");

module.exports.config = {
  name: "convert",
  author: "XyryllPanget",
  version: "1.0",
  description: "Convert units like length, weight, and temperature.",
  category: "Utility",
  adminOnly: false,
  usePrefix: false,
  cooldown: 5, 
};

module.exports.run = async function ({ event, args, api }) {
  if (event.type === "message") {
    if (args.length < 3) {
      return api.sendMessage("Usage: convert <value> <from_unit> to <to_unit>", event.senderID);
    }

    const value = parseFloat(args[0]);
    const fromUnit = args[1].toLowerCase();
    const toUnit = args[3].toLowerCase();

    if (isNaN(value)) {
      return api.sendMessage("Please provide a valid number to convert.", event.senderID);
    }

    try {
      const response = await axios.get(`https://api.api-ninjas.com/v1/convertcurrency?amount=${value}&from=${fromUnit}&to=${toUnit}`, {
        headers: { "X-Api-Key": "zuQKvkjJe51MBobbCcY4ow==mm0SVvWR9xek6fJj" }
      });
      
      const convertedValue = response.data.new_amount;
      
      api.sendMessage(`${value} ${fromUnit} is approximately ${convertedValue} ${toUnit}.`, event.senderID);
    } catch (error) {
      console.error("Error converting units:", error);
      api.sendMessage("An error occurred while converting units. Please try again later.", event.senderID);
    }
  }
};
