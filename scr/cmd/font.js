const axios = require("axios");

module.exports = {
  config: {
    name: "font",
    description: "Generate fancy text using a custom font or list available fonts",
    usage: "[text | list]",
    accessableby: 0, // 0 is for everyone, 1 is for bot owner/admin
    author: "heru",
    prefix: true
  },
  start: async function ({ text, reply, event }) {
    const query = text.join(" ");

    if (!query || query === "list") {
      try {
        const response = await axios.get(`https://joshweb.click/api/font`);
        const fonts = response.data.fonts;

        if (fonts.length === 0) {
          return reply("No fonts available.");
        }

        let fontList = "Available Fonts:\n";
        fonts.forEach((font, index) => {
          fontList += `${index + 1}. ${font}\n`;
        });

        return reply(`🔠 | 𝙵𝚘𝚗𝚝 𝙻𝚒𝚜𝚝\n━━━━━━━━━━━━━━━━━━\n${fontList}`);
      } catch (error) {
        console.error(`Error fetching available fonts: ${error.message}`);
        return reply("Failed to fetch available fonts. Please try again later.");
      }
    } else {
      try {
        const response = await axios.get(`https://joshweb.click/api/font?q=${encodeURIComponent(query)}`);
        const generatedText = response.data.result;

        return reply(`🔠 | 𝙵𝚘𝚗𝚝 𝙶𝚎𝚗𝚎𝚛𝚊𝚝𝚘𝚛\n━━━━━━━━━━━━━━━━━━\n${generatedText}`);
      } catch (error) {
        console.error(`Error generating font text: ${error.message}`);
        return reply("Failed to generate font text. Please try again later.");
      }
    }
  }
};
