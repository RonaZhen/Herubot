const axios = require("axios");
const fs = require("fs");
const path = require("path");

module.exports = {
  config: {
    name: "fbcover",
    accessableby: 0,
    author: "heru",
    description: "Generate a Facebook cover image",
    usage: "[name] [subname] [sdt] [address] [email] [uid] [color]",
    prefix: false
  },
  start: async function ({ api, event, text, reply }) {
    // Check if the user provided the required parameters
    if (text.length < 7) {
      return reply("Please provide all required parameters: [name] [subname] [sdt] [address] [email] [uid] [color]");
    }

    const [name, subname, sdt, address, email, uid, color] = text;

    try {
      const response = await axios.get(`https://joshweb.click/canvas/fbcover`, {
        params: { name, subname, sdt, address, email, uid, color },
        responseType: "arraybuffer" // To handle image data
      });

      const cacheDir = path.join(__dirname, "cache");
      if (!fs.existsSync(cacheDir)) {
        fs.mkdirSync(cacheDir);
      }

      const imagePath = path.join(cacheDir, "cover.png");
      fs.writeFileSync(imagePath, response.data);

      return api.sendMessage({
        body: "Generated cover image:",
        attachment: fs.createReadStream(imagePath)
      }, event.threadID, event.messageID);
    } catch (error) {
      console.error(`Error generating cover image: ${error.message}`);
      return reply("Failed to generate the cover image. Please try again later.");
    }
  },
  auto: async function ({ api, event, text, reply }) {
    // No auto functionality for this command
  }
};
