const axios = require("axios");

module.exports = {
  config: {
    name: "ai3",
    description: "Query the GPT-4 API",
    usage: "[question]",
    cooldown: 5,
    accessableby: 0,
    category: "AI",
    prefix: false
  },
  start: async function ({ api, text, react, event, reply }) {
    const query = text.join(" ");

    if (!query) {
      return reply("Please provide a question to ask.");
    }

    try {
      const response = await axios.get(`https://my-api-v1.onrender.com/api/v1/gpt4?ask=${encodeURIComponent(query)}`);
      
      // Check if the response structure is as expected
      if (response.data && response.data.answer) {
        const answer = response.data.answer;
        return reply("🤖 | 𝙶𝚙𝚝4 (𝚗𝚘𝚗-𝚌𝚘𝚗𝚟𝚎𝚛𝚜𝚊𝚝𝚒𝚘𝚗𝚊𝚕)\n━━━━━━━━━━━━━━━━━━\n" + answer);
      } else {
        throw new Error("Unexpected API response structure.");
      }
    } catch (error) {
      console.error(`Error querying the API: ${error.message}`);
      return reply("Failed to query the API. Please try again later.");
    }
  },
  auto: async function ({ api, event, text, reply }) {
    // No auto functionality for this command
  }
};
