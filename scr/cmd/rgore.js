module.exports = {
  config: {
    name: "rgore",
    description: "Fetch a random gore image",
    prefix: true,
    usage: "rgore",
    accessableby: 0,
    author: "heru",
    cooldown: 5,
  },
  start: async function ({ api, event, react, reply }) {
    const axios = require('axios');

    try {
      react("⏳");
      const response = await axios.get('https://joshweb.click/api/randgre');
      const imageUrl = response.data.image;

      if (!imageUrl) {
        return reply("Failed to fetch a random gore image.");
      }

      react('❤️');
      return reply({ body: "Here is your random gore image:", attachment: [imageUrl] });
    } catch (error) {
      console.error(error);
      return reply("An error occurred while fetching the random gore image.");
    }
  }
};
