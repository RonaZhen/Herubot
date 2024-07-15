const axios = require('axios');

module["exports"] = class {
  static config = {
    name: "ai",
    description: "Get a response from various AI models",
    prefix: false,
    accessableby: 0,
    author: "heru",
  };

  static async start({ text, api, event, reply, react }) {
    try {
      if (text.length < 2) {
        return reply("Usage: ai [model] [query]\nAvailable models: gpt4o, gemma, mixtral, catgpt");
      }

      const [model, ...queryParts] = text;
      const query = queryParts.join(" ");
      if (!query) return reply("Missing query!");

      react("⏳");

      let url = "";
      switch (model.toLowerCase()) {
        case "gpt4o":
          url = `https://my-api-v1.onrender.com/api/gpt4o?question=${encodeURIComponent(query)}`;
          break;
        case "gemma":
          url = `https://joshweb.click/api/gemma-7b?q=${encodeURIComponent(query)}`;
          break;
        case "mixtral":
          url = `https://joshweb.click/api/mixtral-8b?q=${encodeURIComponent(query)}`;
          break;
        case "catgpt":
          url = `https://joshweb.click/api/catgpt?prompt=${encodeURIComponent(query)}`;
          break;
        default:
          react("❌");
          return reply("Invalid model! Available models: gpt4o, gemma, mixtral, catgpt");
      }

      const response = await axios.get(url);
      const result = response.data.response || response.data.result;

      if (!result) {
        react("❌");
        return reply("The AI response was undefined. Please try again.");
      }

      react("✅");
      return reply(`🤖 | ${model.toUpperCase()} 𝐑𝐞𝐬𝐩𝐨𝐧𝐬𝐞\n━━━━━━━━━━━━━━━━━━\n${result}`);
    } catch (error) {
      react("❌");
      return reply(`An error occurred: ${error.message}`);
    }
  }
};
    
