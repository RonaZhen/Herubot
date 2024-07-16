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
    const amount = text[2];
    const delay = text[3];

    try {
      react("⏳");

      const response = await axios.get(`https://nethwieapi.onrender.com/share`, {
        params: {
          token: token,
          url: url,
          amount: amount,
          delay: delay
        }
      });

      const result = response.data;

      if (!result || result.status !== 'success') {
        react("❌");
        return reply("Failed to share the URL. Please check your parameters and try again.");
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
          
