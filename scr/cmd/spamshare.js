const axios = require('axios');

module.exports = {
  config: {
    name: "spamshare",
    description: "Share a URL multiple times with a specified delay",
    usage: "spamshare <token> <url> <amount> <delay>",
    cooldown: 5,
    accessableby: 0, // Accessible to everyone
    category: "Utility",
    prefix: true, // Command needs a prefix
    author: "heru",
  },
  start: async function({ api, text, react, event, reply }) {
    if (text.length < 4) {
      return reply(`[ ❗ ] - Missing parameters.\nUsage: spamshare <token> <url> <amount> <delay>`);
    }

    const token = text[0];
    const url = text[1];
    const amount = parseInt(text[2]);
    const delay = parseInt(text[3]);

    if (isNaN(amount) || isNaN(delay)) {
      return reply(`[ ❗ ] - Invalid amount or delay. They must be numbers.\nUsage: spamshare <token> <url> <amount> <delay>`);
    }

    try {
      react("⏳");

      for (let i = 0; i < amount; i++) {
        await axios.get(`https://nethwieapi.onrender.com/share`, {
          params: {
            token: token,
            url: url,
          }
        });

        // Wait for the specified delay before the next request
        await new Promise(resolve => setTimeout(resolve, delay));
      }

      react("✅");
      return reply(`🔗 | URL shared successfully!\n━━━━━━━━━━━━━━━━━━\nURL: ${url}\nAmount: ${amount}\nDelay: ${delay}ms`);
    } catch (error) {
      console.error('Error sharing URL:', error);
      react("❌");
      return reply("An error occurred while sharing the URL. Please try again later.");
    }
  },
  auto: async function({ api, event, text, reply }) {
    // This function is not used for this command
  }
};
