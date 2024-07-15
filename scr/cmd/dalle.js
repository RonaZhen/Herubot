const axios = require('axios');
const fs = require('fs');
const path = require('path');

module["exports"] = class {
  static config = {
    name: "dalle",
    description: "Generate a random image using DALL-E",
    prefix: false,
    accessableby: 0,
    author: "heru",
  };

  static async start({ text, api, event, reply, react }) {
    try {
      const prompt = text.join(" ");
      if (!prompt) return reply("Please provide a prompt for the image generation.");

      react("⏳");

      const url = `https://joshweb.click/dalle?prompt=${encodeURIComponent(prompt)}`;
      const response = await axios.get(url, { responseType: 'arraybuffer' });
      const imageBuffer = Buffer.from(response.data, 'binary');

      const dir = path.join(__dirname, '/cache');
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }

      const imagePath = path.join(dir, 'dalle.png');
      fs.writeFileSync(imagePath, imageBuffer);

      react("✅");
      return reply(`Image generated and saved to ${imagePath}`, event.threadID, () => {
        api.sendMessage({
          body: `Here is your image based on the prompt: ${prompt}`,
          attachment: fs.createReadStream(imagePath)
        }, event.threadID);
      });

    } catch (error) {
      react("❌");
      return reply(`An error occurred: ${error.message}`);
    }
  }
};
        
