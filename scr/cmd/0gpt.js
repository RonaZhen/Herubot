module.exports = {
  config: {
    name: "gpt",
    description: "Get a response from GPT-4",
    prefix: false,
    accessableby: 0,
    author: "heru",
  },
  start: async function ({ text, api, event, reply, react }) {
    const { get } = require("axios");
    try {
      let query = text.join(" ");
      if (!query) return reply("Missing query!");

      react("⏳");
      const r = await get(`https://my-api-v1.onrender.com/api/v2/gpt4?query=${encodeURI(query)}`);
      const result = r.data.response;

      if (!result) {
        react("❌");
        return reply("The AI response was undefined. Please try again.");
      }

      react("✅");
      return reply(`🤖 | 𝙶𝚙𝚝4 𝚁𝚎𝚜𝚙𝚘𝚗𝚜𝚎\n━━━━━━━━━━━━━━━━━━\n${result}`);
    } catch (error) {
      react("❌");
      return reply(`An error occurred: ${error.message}`);
    }
  }
};
