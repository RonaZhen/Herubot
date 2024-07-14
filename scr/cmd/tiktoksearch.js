const axios = require("axios");

module.exports = {
  config: {
    name: "Tiksearch",
    description: "Search TikTok videos",
    usage: "[search term]",
    cooldown: 5,
    accessableby: 0,
    category: "Search",
    prefix: true
  },
  start: async function ({ api, text, react, event, reply }) {
    const query = text.join(" ");

    if (!query) {
      return reply("Please provide a search term.");
    }

    try {
      react("⏳"); // React with an hourglass emoji to indicate processing

      const response = await axios.get(`https://my-api-v1.onrender.com/api/tiksearch?search=${encodeURIComponent(query)}`);
      const results = response.data.results; // Assuming the API returns a 'results' array

      if (!results || results.length === 0) {
        return reply("No results found.");
      }

      let output = "🎵 | TikTok Search Results\n━━━━━━━━━━━━━━━━━━\n";
      results.forEach((result, index) => {
        output += `${index + 1}. ${result.title}\nLink: ${result.url}\n\n`;
      });

      react("✅"); // React with a check mark emoji to indicate success

      return reply(output);
    } catch (error) {
      console.error(`Error searching TikTok: ${error.message}`);
      return reply("Failed to search TikTok. Please try again later.");
    }
  },
  auto: async function ({ api, event, text, reply }) {
    // No auto functionality for this command
  }
};
