const axios = require("axios");

module["exports"] = class {
  static config = {
    name: "ai3",
    description: "Query the GPT-4 API",
    usage: "[question]",
    cooldown: 5,
    accessableby: 0,
    category: "AI",
    prefix: false,
    author: "heru"
  };

  static async start({ api, text, react, event, reply }) {
    const query = text.join(" ");

    if (!query) {
      return reply("Please provide a question to ask.");
    }

    try {
      react("⏳");
      const response = await axios.get(`https://my-api-v1.onrender.com/api/v1/gpt4?ask=${encodeURIComponent(query)}`);

      // Check if the response structure is as expected
      if (response.data && response.data.response) {
        const answer = response.data.response;
        react('✅');
        return reply("🤖 | 𝙶𝚙𝚝4 (𝚗𝚘𝚗-𝚌𝚘𝚗𝚟𝚎𝚛𝚜𝚊𝚝𝚒𝚘𝚗𝚊𝚕)\n━━━━━━━━━━━━━━━━━━\n" + response);
      } else {
        throw new Error("Unexpected API response structure.");
      }
    } catch (error) {
      console.error(`Error querying the API: ${error.message}`);
      return reply("Failed to query the API. Please try again later.");
    }
  }

  static async auto({ api, event, text, reply }) {
    // No auto functionality for this command
  }
};
