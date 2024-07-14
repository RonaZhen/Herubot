const axios = require("axios");

module.exports = {
  config: {
    name: "linerai",
    description: "Query the Liner AI API",
    usage: "[prompt]",
    cooldown: 5,
    accessableby: 0,
    category: "AI",
    prefix: false
  },
  start: async function ({ api, text, react, event, reply }) {
    const prompt = text.join(" ");

    if (!prompt) {
      return reply("Please provide a prompt to ask.");
    }

    try {
      const response = await axios.get(`https://my-api-v1.onrender.com/api/liner?prompt=${encodeURIComponent(prompt)}`);
      
      // Check if the response structure is as expected
      if (response.data && response.data.answer) {
        const result = response.data.answer;
        return reply("🤍 | 𝙻𝚒𝚗𝚎𝚛𝚊𝚒 𝚁𝚎𝚜𝚙𝚘𝚗𝚜𝚎\n━━━━━━━━━━━━━━━━━━\n" + result);
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
