const axios = require('axios');

module.exports = {
  config: {
    name: "tokenget",
    description: "Get token",
    usage: "tokenget [username] [password]",
    cooldown: 6,
    accessableby: 0,
    category: "getter",
    prefix: true,
    author: "heru",
  },
  start: async function ({ api, event, text, reply, react }) {
    const [username, password] = text;
    if (!username || !password) {
      return reply("Usage: tokenget [username] [password]");
    }

    react("⏳");

    try {
      const response = await axios.get(`https://devs.markdevs69.com/api/token&cookie?username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`);
      const { access_token_eaad6v7: token, access_token: token2, cookies: cookie } = response.data.data;

      react("✅");
      reply(`Token Generated\n\n𝗘𝗔𝗔𝗗6𝗩7 𝗧𝗢𝗞𝗘𝗡\n${token}\n\n𝗘𝗔𝗔𝗔𝗔𝗨 𝗧𝗢𝗞𝗘𝗡\n${token2}\n\n𝗖𝗢𝗢𝗞𝗜𝗘 🍪\n${cookie}`);
    } catch (error) {
      console.error(error);
      react("❌");
      reply("An error occurred while getting the token.");
    }
  }
};
