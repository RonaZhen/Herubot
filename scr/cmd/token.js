const axios = require('axios');

module.exports = {
  config: {
    name: "token",
    description: "Fetch a token using username and password",
    usage: "token <username> <password>",
    cooldown: 5,
    accessableby: 0, // Accessible to everyone
    category: "Utility",
    prefix: true, // Command needs a prefix
    author: "heru",
  },
  start: async function({ api, text, react, event, reply }) {
    if (text.length < 2) {
      return reply(`[ ❗ ] - Missing username or password.\nUsage: token <username> <password>`);
    }

    const username = text[0];
    const password = text[1];

    try {
      react("⏳");

      const response = await axios.get(`https://nethwieapi.onrender.com/token`, {
        params: {
          u: username,
          p: password
        }
      });

      const token = response.data.token;

      if (!token) {
        react("❌");
        return reply("Failed to fetch the token. Please check your credentials and try again.");
      }

      react("✅");
      return reply(`🔑 | Token fetched successfully!\n━━━━━━━━━━━━━━━━━━\nToken: ${token}`);
    } catch (error) {
      console.error('Error fetching token:', error);
      react("❌");
      return reply("An error occurred while fetching the token. Please try again later.");
    }
  },
  auto: async function({ api, event, text, reply }) {
    // This function is not used for this command
  }
};
      
