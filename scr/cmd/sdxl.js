const axios = require('axios');
const fs = require('fs');
const path = require('path');

module["exports"] = class {
  static config = {
    name: "sdxl",
    description: "Generate an image using SDXL in various styles",
    prefix: false,
    accessableby: 0,
    author: "heru",
  };

  static async start({ text, api, event, reply, react }) {
    try {
      if (text.length < 2) {
        return reply("Usage: sdxl [style] [prompt]\nAvailable styles: anime, fantasy, pencil, digital, vintage, 3d, cyberpunk, manga, realistic, demonic, heavenly, comic, robotic");
      }

      const [style, ...promptParts] = text;
      const prompt = promptParts.join(" ");
      if (!prompt) return reply("Please provide a prompt for the image generation.");

      const styles = {
        "anime": 1,
        "fantasy": 2,
        "pencil": 3,
        "digital": 4,
        "vintage": 5,
        "3d": 6,
        "cyberpunk": 7,
        "manga": 8,
        "realistic": 9,
        "demonic": 10,
        "heavenly": 11,
        "comic": 12,
        "robotic": 13
      };

      if (!styles.hasOwnProperty(style.toLowerCase())) {
        return reply("Invalid style! Available styles: anime, fantasy, pencil, digital, vintage, 3d, cyberpunk, manga, realistic, demonic, heavenly, comic, robotic");
      }

      react("⏳");

      const url = `https://joshweb.click/sdxl/list?style=${styles[style.toLowerCase()]}&prompt=${encodeURIComponent(prompt)}`;
      const response = await axios.get(url, { responseType: 'arraybuffer' });
      const imageBuffer = Buffer.from(response.data, 'binary');

      const dir = path.join(__dirname, '/cache');
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }

      const imagePath = path.join(dir, 'generate.png');
      fs.writeFileSync(imagePath, imageBuffer);

      react("✅");
      return reply(`Image generated and saved to ${imagePath}`, event.threadID, () => {
        api.sendMessage({
          body: `Here is your image based on the style: ${style}\nPrompt: ${prompt}`,
          attachment: fs.createReadStream(imagePath)
        }, event.threadID);
      });

    } catch (error) {
      react("❌");
      return reply(`An error occurred: ${error.message}`);
    }
  }
};
    
