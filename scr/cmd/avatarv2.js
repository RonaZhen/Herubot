const axios = require('axios');
const fs = require('fs');
const path = require('path');

module.exports = {
  config: {
    name: "avatarv2",
    description: "Generate an avatar cover",
    usage: "avatarv2 [id] [bgtext] [signature] [color]",
    cooldown: 5,
    accessableby: 0,
    category: "Image",
    prefix: true,
    author: "heru",
  },
  start: async function ({ text, api, event, reply, react }) {
    try {
      const [id, bgtext, signature, color] = text;
      if (!id || !bgtext || !signature || !color) {
        return reply("Usage: avatarv2 [id] [bgtext] [signature] [color]");
      }

      react("⏳");

      const url = `https://joshweb.click/canvas/avatarv2?id=${encodeURIComponent(id)}&bgtext=${encodeURIComponent(bgtext)}&signature=${encodeURIComponent(signature)}&color=${encodeURIComponent(color)}`;
      const response = await axios.get(url, { responseType: 'arraybuffer' });

      const avatarPath = path.resolve(__dirname, 'cache', 'avatarv2.png');

      // Ensure the cache directory exists
      const cacheDir = path.dirname(avatarPath);
      if (!fs.existsSync(cacheDir)) {
        fs.mkdirSync(cacheDir, { recursive: true });
      }

      // Save the image to the cache directory
      fs.writeFileSync(avatarPath, response.data);

      react("✅");

      const message = {
        body: `Here is your generated avatar cover:`,
        attachment: fs.createReadStream(avatarPath)
      };

      return api.sendMessage(message, event.threadID);
    } catch (error) {
      react("❌");
      return reply(`An error occurred: ${error.message}`);
    }
  }
};
