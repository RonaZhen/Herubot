const axios = require("axios");
const fs = require("fs");
const path = require("path");

const styleList = {
    "1": "anime",
    "2": "fantasy",
    "3": "pencil",
    "4": "digital",
    "5": "vintage",
    "6": "3d (render)",
    "7": "cyberpunk",
    "8": "manga",
    "9": "realistic",
    "10": "demonic",
    "11": "heavenly",
    "12": "comic",
    "13": "robotic"
};

module["exports"] = class {
  static config = {
    name: "sdxl",
    description: "Generate images using SDXL",
    usage: "<prompt> <style>",
    cooldown: 5,
    accessableby: 0,
    category: "Entertainment",
    prefix: false,
    author: "chill",
  };

  static async start({ api, event, text, reply, react }) {
    if (text.length < 2) {
      return reply(`[ ❗ ] - Missing prompt or style for the SDXL command. Usage: sdxl <prompt> <style>\n\nAvailable styles:\n${Object.entries(styleList).map(([key, value]) => `${key}: ${value}`).join("\n")}`);
    }

    const prompt = text.slice(0, -1).join(" ");
    const style = text[text.length - 1];

    if (!Object.keys(styleList).includes(style)) {
      return reply(`[ ❗ ] - Invalid style. Please choose a valid style number from 1 to 13.\n\nAvailable styles:\n${Object.entries(styleList).map(([key, value]) => `${key}: ${value}`).join("\n")}`);
    }

    react("⏳");
    reply("Generating image, please wait...");

    try {
      const response = await axios.get('https://joshweb.click/sdxl', {
        params: {
          q: prompt,
          style: style
        },
        responseType: 'arraybuffer'
      });

      const imagePath = path.join(__dirname, "cache/sdxl_image.png");
      fs.writeFileSync(imagePath, response.data);

      const userInfo = await api.getUserInfo(event.senderID);
      const requesterName = userInfo[event.senderID].name;

      api.sendMessage({
        body: `Here is the image you requested:\n\nPrompt: ${prompt}\nStyle: ${styleList[style]}\n\nRequested by: ${requesterName}`,
        attachment: fs.createReadStream(imagePath)
      }, event.threadID, () => {
        fs.unlinkSync(imagePath);
        react("✅");
      });
    } catch (error) {
      console.error("API request error:", error);
      react("❌");
      reply("An error occurred while processing your request.");
    }
  }
};
    
