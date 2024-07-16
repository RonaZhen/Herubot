const axios = require('axios');

module.exports = {
  config: {
    name: "aniai",
    description: "Get a response from various Anime AI characters",
    usage: "aniai [character] [query]",
    cooldown: 5,
    accessableby: 0,
    category: "Entertainment",
    prefix: false,
    author: "heru",
  },
  start: async function({ text, api, event, reply, react }) {
    try {
      if (text.length < 2) {
        const availableCharacters = [
          "Gojo",
          "Deku",
          "Sukuna",
          "Rimuru",
          "Cid",
          "Luffy",
          "Rudeus",
          "Ichigo",
          "Naruto",
          "Boruto"
        ];
        const characterList = availableCharacters.map(character => `- ${character}`).join("\n");

        return reply(`Usage: aniai [character] [query]\n\nAvailable characters:\n${characterList}\n\nExample: aniai Gojo hello`);
      }

      const [character, ...queryParts] = text;
      const query = queryParts.join(" ");
      if (!query) return reply("Missing query!");

      if (character.toLowerCase() === "clear") {
        return reply("Conversation cleared.");
      }

      react("⏳");

      let url = "";
      switch (character.toLowerCase()) {
        case "gojo":
          url = `https://joshweb.click/pai/gojo?q=${encodeURIComponent(query)}&uid=${event.senderID}`;
          break;
        case "deku":
          url = `https://joshweb.click/pai/deku?q=${encodeURIComponent(query)}&uid=${event.senderID}`;
          break;
        case "sukuna":
          url = `https://joshweb.click/pai/sukuna?q=${encodeURIComponent(query)}&uid=${event.senderID}`;
          break;
        case "rimuru":
          url = `https://joshweb.click/pai/rimuru?q=${encodeURIComponent(query)}&uid=${event.senderID}`;
          break;
        case "cid":
          url = `https://joshweb.click/pai/cid?q=${encodeURIComponent(query)}&uid=${event.senderID}`;
          break;
        case "luffy":
          url = `https://joshweb.click/pai/luffy?q=${encodeURIComponent(query)}&uid=${event.senderID}`;
          break;
        case "rudeus":
          url = `https://joshweb.click/pai/rudeus?q=${encodeURIComponent(query)}&uid=${event.senderID}`;
          break;
        case "ichigo":
          url = `https://joshweb.click/pai/ichigo?q=${encodeURIComponent(query)}&uid=${event.senderID}`;
          break;
        case "naruto":
          url = `https://joshweb.click/pai/naruto?q=${encodeURIComponent(query)}&uid=${event.senderID}`;
          break;
        case "boruto":
          url = `https://joshweb.click/pai/boruto?q=${encodeURIComponent(query)}&uid=${event.senderID}`;
          break;
        default:
          react("❌");
          return reply("Invalid character! Available characters: Gojo, Deku, Sukuna, Rimuru, Cid, Luffy, Rudeus, Ichigo, Naruto, Boruto");
      }

      const startTime = Date.now();
      const response = await axios.get(url);
      const endTime = Date.now();

      const result = response.data.response || response.data.result;

      if (!result) {
        react("❌");
        return reply("The AI response was undefined. Please try again.");
      }

      const responseTime = (endTime - startTime) / 1000; // in seconds
      react("✅");

      return reply(`🤖 | ${character.toUpperCase()} Response\n━━━━━━━━━━━━━━━━━━\n${result}\n━━━━━━━━━━━━━━━━━━\n⏰ Response Time: ${responseTime.toFixed(2)} seconds\nType "${character.toLowerCase()} clear" if you want to clear the conversation with aniai.`);
    } catch (error) {
      react("❌");
      return reply(`An error occurred: ${error.message}`);
    }
  }
};
