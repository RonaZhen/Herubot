module["exports"] = class {
  static config = {
    name: "linerai",
    description: "Query the Liner AI API",
    prefix: false,
    accessableby: 0,
    author: "heru",
  };

  static async start({ api, text, react, event, reply }) {
    const axios = require("axios");
    const prompt = text.join(" ");

    if (!prompt) {
      return reply("Please provide a prompt to ask.");
    }

    try {
      react("⏳");
      const response = await axios.get(`https://my-api-v1.onrender.com/api/liner?prompt=${encodeURIComponent(prompt)}`);
      
      // Check if the response structure is as expected
      if (response.data && response.data.answer) {
        const result = response.data.answer;
        react('🤍');
        return reply("🤍 | 𝙻𝚒𝚗𝚎𝚛𝚊𝚒 𝚁𝚎𝚜𝚙𝚘𝚗𝚜𝚎\n━━━━━━━━━━━━━━━━━━\n" + answer);
      } else {
        throw new Error("Unexpected API response structure.");
      }
    } catch (error) {
      console.error(`Error querying the API: ${error.message}`);
      return reply("Failed to query the API. Please try again later.");
    }
  }
};
