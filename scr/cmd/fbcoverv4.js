const axios = require('axios');
const fs = require('fs');
const path = require('path');

module.exports = {
  config: {
    name: "fbcoverv4",
    description: "Generate a Facebook cover",
    usage: "fbcoverv4 [name] [id] [subname] [colorname] [colorsub]",
    cooldown: 5,
    accessableby: 0,
    category: "Image",
    prefix: true,
    author: "heru",
  },
  start: async function ({ text, api, event, reply, react }) {
    try {
      const [name, id, subname, colorname, colorsub] = text;
      if (!name || !id || !subname || !colorname || !colorsub) {
        return reply("Usage: fbcoverv4 [name] [id] [subname] [colorname] [colorsub]");
      }

      react("⏳");

      const url = `https://joshweb.click/canvas/fbcoverv4?name=${encodeURIComponent(name)}&id=${encodeURIComponent(id)}&subname=${encodeURIComponent(subname)}&colorname=${encodeURIComponent(colorname)}&colorsub=${encodeURIComponent(colorsub)}`;
      const response = await axios.get(url, { responseType: 'arraybuffer' });

      const coverPath = path.resolve(__dirname, 'cache', 'cover.png');

      // Ensure the cache directory exists
      const cacheDir = path.dirname(coverPath);
      if (!fs.existsSync(cacheDir)) {
        fs.mkdirSync(cacheDir, { recursive: true });
      }

      // Save the image to the cache directory
      fs.writeFileSync(coverPath, response.data);

      react("✅");

      const message = {
        body: `Here is your generated Facebook cover:`,
        attachment: fs.createReadStream(coverPath)
      };

      return api.sendMessage(message, event.threadID);
    } catch (error) {
      react("❌");
      return reply(`An error occurred: ${error.message}`);
    }
  }
};
