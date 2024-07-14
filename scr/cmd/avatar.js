const axios = require("axios");
const fs = require("fs");

module.exports = {
  config: {
    name: "avatar",
    description: "Generate an avatar cover",
    usage: "[id] [bgname] [signature] [color]",
    cooldown: 5,
    accessableby: 0,
    category: "Image",
    prefix: true
  },
  start: async function ({ api, text, react, event, reply }) {
    // Check if the user provided the required parameters
    if (text.length < 4) {
      return reply("Please provide all required parameters: [id] [bgname] [signature] [color]");
    }

    const [id, bgname, signature, color] = text;

    try {
      react("⏳"); // React with an hourglass emoji to indicate processing

      const response = await axios.get(`https://joshweb.click/canvas/avatar`, {
        params: {
          id,
          bgname,
          signature,
          color
        },
        responseType: 'arraybuffer' // Ensure we get the image data
      });

      const imagePath = __dirname + "/cache/avatar.png";
      fs.writeFileSync(imagePath, response.data);

      react("✅"); // React with a check mark emoji to indicate success

      return api.sendMessage({
        body: "Here is your generated avatar cover:",
        attachment: fs.createReadStream(imagePath)
      }, event.threadID, event.messageID);
    } catch (error) {
      console.error(`Error generating avatar cover: ${error.message}`);
      return reply("Failed to generate the avatar cover. Please try again later.");
    }
  },
  auto: async function ({ api, event, text, reply }) {
    // No auto functionality for this command
  }
};
