module.exports = {
  config: {
    name: "findsong",
    description: "Find a song by its lyrics",
    prefix: false,
    accessableby: 0,
    author: "heru",
  },
  start: async function ({ text, api, event, reply, react }) {
    const { get } = require("axios");
    try {
      let lyrics = text.join(" ");
      if (!lyrics) return reply("Missing lyrics!");

      react("⏳");
      const response = await get(`https://joshweb.click/api/findsong?lyrics=${encodeURI(lyrics)}`);
      const result = response.data;

      if (!result || !result.song) {
        react("❌");
        return reply("The song could not be found. Please try again.");
      }

      react("✅");
      return reply(`🎵 | Song Found\n━━━━━━━━━━━━━━━━━━\nTitle: ${result.song.title}\nArtist: ${result.song.artist}`);
    } catch (error) {
      react("❌");
      return reply(`An error occurred: ${error.message}`);
    }
  }
};
      
