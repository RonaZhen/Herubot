const axios = require('axios');

module.exports = {
  config: {
    name: "cookie",
    description: "Get your appstate without extension",
    usage: "[email] [password]",
    cooldown: 3,
    accessableby: 0,
    category: "Utility",
    prefix: true,
    author: "heru",
  },
  start: async function ({ api, event, text, reply, react }) {
    // Check if both email and password are provided
    if (text.length !== 2) {
      return reply("Please provide both email and password.\n\nExample: appstate [email] [password]");
    }

    const [email, password] = text.map(arg => arg.trim());

    react("⏳");

    try {
      const response = await axios.get(`https://my-api-v1.onrender.com/api/appstate?email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`);
      const userData = response.data;

      react("✅");
      reply(JSON.stringify(userData, null, 4));
    } catch (error) {
      console.error("Error fetching appstate:", error);
      react("❌");
      reply("An error occurred while fetching appstate. Please change your password and try again.");
    }
  }
};
