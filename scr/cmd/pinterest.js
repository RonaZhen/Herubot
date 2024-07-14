const axios = require('axios');

module.exports = {
  config: {
    name: "pinterest",
    description: "Search images on Pinterest",
    usage: "[search query]",
    cooldown: 5,
    accessableby: 0,
    category: "Image",
    prefix: true
  },
  start: async function ({ api, event, text, reply }) {
    const query = text.join(" ").trim();

    if (!query) {
      return reply("Please provide a search query.");
    }

    try {
      const response = await axios.get(`https://my-api-v1.onrender.com/api/pinterest`, {
        params: {
          search: encodeURIComponent(query)
        }
      });

      // Assuming the API returns an array of image URLs
      const images = response.data.images;

      if (images.length === 0) {
        return reply("No images found for your query.");
      }

      // Format the response to send multiple images
      let message = "📌 Pinterest Image Search Results:\n\n";
      images.forEach((imageUrl, index) => {
        message += `${index + 1}. ${imageUrl}\n`;
      });

      return reply(message);
    } catch (error) {
      console.error(`Error searching Pinterest: ${error.message}`);
      return reply("Failed to search Pinterest. Please try again later.");
    }
  },
  auto: async function ({ api, event, reply }) {
    // No auto functionality for this command
  }
};
