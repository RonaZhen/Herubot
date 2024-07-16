const axios = require('axios');

module.exports = {
  config: {
    name: "useragent",
    description: "Fetch a random user agent",
    usage: "useragent",
    cooldown: 5,
    accessableby: 0, // Accessible to everyone
    category: "Utility",
    prefix: true, // Command needs a prefix
    author: "heru",
  },
  start: async function({ api, text, react, event, reply }) {
    try {
      react("⏳");

      const response = await axios.get(`https://nethwieapi.onrender.com/useragent`);
      const userAgent = response.data;

      if (!userAgent) {
        react("❌");
        return reply("Failed to fetch a user agent. Please try again.");
      }

      react("✅");
      return reply(`📱 | Random User Agent\n━━━━━━━━━━━━━━━━━━\n${userAgent}`);
    } catch (error) {
      console.error('Error fetching user agent:', error);
      react("❌");
      return reply("An error occurred while fetching the user agent. Please try again later.");
    }
  },
  auto: async function({ api, event, text, reply }) {
    // This function is not used for this command
  }
};
      
