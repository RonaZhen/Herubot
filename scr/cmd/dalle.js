const axios = require("axios");
const fs = require("fs");
const path = require("path");

module["exports"] = class {
  static config = {
    name: "dalle",
    description: "Generate images using DALL-E",
    usage: "[prompt]",
    cooldown: 5,
    accessableby: 0,
    category: "Entertainment",
    prefix: false,
    author: "heru",
  };

  static async start({ api, event, text, reply, react }) {
    const command = text[0];

    if (command === "list") {
      try {
        react("⏳");
        const response = await axios.get("https://joshweb.click/dalle/prompts");
        const prompts = response.data.prompts;

        if (!prompts || prompts.length === 0) {
          react("❌");
          return reply("No available prompts found.");
        }

        let promptList = "Available Prompts:\n\n";
        prompts.forEach((prompt, index) => {
          promptList += `${index + 1}. ${prompt}\n`;
        });

        react("✅");
        return reply(promptList);
      } catch (error) {
        console.error("Error fetching prompts:", error);
        react("❌");
        return reply("An error occurred while fetching the prompts.");
      }
    } else {
      let prompt = text.join(" ");
      if (!prompt) {
        react("❌");
        return reply("[ ❗ ] - Missing prompt for the DALL-E command");
      }

      react("⏳");
      reply("Generating image, please wait...");

      try {
        const response = await axios.get(`https://joshweb.click/dalle?prompt=${encodeURIComponent(prompt)}`, { responseType: 'arraybuffer' });
        const imagePath = path.join(__dirname, "cache/dalle_image.png");

        fs.writeFileSync(imagePath, response.data);

        const userInfo = await api.getUserInfo(event.senderID);
        const requesterName = userInfo[event.senderID].name;

        api.sendMessage({
          body: `Here is the image you requested:\n\nPrompt: ${prompt}\n\nRequested by: ${requesterName}`,
          attachment: fs.createReadStream(imagePath)
        }, event.threadID, () => {
          fs.unlinkSync(imagePath);
          react("✅");
        });
      } catch (error) {
        console.error("Error in DALL-E command:", error);
        react("❌");
        reply("An error occurred while processing your request.");
      }
    }
  }
};
