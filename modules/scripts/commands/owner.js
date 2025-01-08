const axios = require("axios");
const fs = require("fs");
const path = require("path");

module.exports.config = {
  name: "owner",
  author: "XyryllPanget",
  version: "1.0",
  category: "Developer",
  description: "Get owner information and a video",
  adminOnly: false,
  usePrefix: false,
  cooldown: 10,
};

module.exports.run = async function ({ event, args }) {
  try {
    const ownerInfo = {
      name: "Jhon Xyryll Samoy",
      gender: "Male",
      age: "over 69 Years ago",
      height: "Null",
      facebookLink: "https://www.facebook.com/XyryllPanget",
      nick: "XyryllPanget",
    };

    api.sendMessage("Loading owner information and video...", event.sender.id);

    try {
      // Download the video (same as before)
      const videoUrl = "https://i.imgur.com/TUIRctp.mp4"; // Replace with your Google Drive video id
      const videoResponse = await axios.get(videoUrl, { responseType: "arraybuffer" });

      const tmpFolderPath = path.join(__dirname, "tmp");
      if (!fs.existsSync(tmpFolderPath)) {
        fs.mkdirSync(tmpFolderPath);
      }

      const videoPath = path.join(tmpFolderPath, "owner_video.mp4");
      fs.writeFileSync(videoPath, Buffer.from(videoResponse.data, "binary"));

      // Construct the response message with a link to the video
      const response = `Owner Information:🧾\nName: ${ownerInfo.name}\nGender: ${ownerInfo.gender}\nAge: ${ownerInfo.age}\nHeight: ${ownerInfo.height}\nFacebook: ${ownerInfo.facebookLink}\nNick: ${ownerInfo.nick}\n\nHere's the video: ${videoUrl}`;

      // Send the message with the video link
      api.sendMessage(response, event.sender.id);

      // Delete the temporary video file after sending
      fs.unlink(videoPath, (err) => {
        if (err) {
          console.error("Error deleting file:", err);
        } else {
          console.log("File deleted successfully:", videoPath);
        }
      });

    } catch (error) {
      console.error("Error occurred:", error);
      api.sendMessage(`An error occurred: ${error.message}`, event.sender.id);
    } finally {
      api.sendMessage("Owner information and video loaded!", event.sender.id);
    }

  } catch (error) {
    console.error("Error getting owner information and video:", error);
    api.sendMessage("There was an error getting owner information and video. Please try again later.", event.sender.id);
  }
};
