const axios = require('axios');

module.exports = {
  config: {
    name: "ai",
    description: "Get a response from various AI models",
    usage: "ai [model] [query]",
    cooldown: 5,
    accessableby: 0,
    category: "Entertainment",
    prefix: false,
    author: "heru",
  },
  start: async function({ text, api, event, reply, react }) {
    try {
      if (text.length < 2) {
        const availableModels = [
          "gpt4o",
          "gemma",
          "mixtral",
          "catgpt",
          "blackbox",
          "gptweb",
          "palm2",
          "nemotron",
          "gpt41",
          "gpt42",
          "atom",
          "meta",
          "mistral",
          "claude"
        ];
        const modelList = availableModels.map(model => `- ${model}`).join("\n");

        return reply(`Usage: ai [model] [query]\n\nAvailable models:\n${modelList}\n\nExample: ai gpt4o hello`);
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
        case "blackbox":
          url = `https://my-api-v1.onrender.com/api/blackbox?prompt=${encodeURIComponent(query)}`;
          break;
        case "gptweb":
          url = `https://joshweb.click/gptweb?prompt=${encodeURIComponent(query)}`;
          break;
        case "palm2":
          url = `https://joshweb.click/api/palm2?q=${encodeURIComponent(query)}`;
          break;
        case "nemotron":
          url = `https://joshweb.click/api/nemotron?q=${encodeURIComponent(query)}`;
          break;
        case "gpt41":
          url = `https://my-api-v1.onrender.com/api/v1/gpt4?ask=${encodeURIComponent(query)}`;
          break;
        case "gpt42":
          url = `https://my-api-v1.onrender.com/api/v2/gpt4?query=${encodeURIComponent(query)}`;
          break;
        case "atom":
          url = `https://hiroshi-rest-api.replit.app/ai/atom?ask=${encodeURIComponent(query)}`;
          break;
        case "meta":
          url = `https://hiroshi-rest-api.replit.app/ai/llama?ask=${encodeURIComponent(query)}`;
          break;
        case "mistral":
          url = `https://hiroshi-rest-api.replit.app/ai/mistral8x7B?ask=${encodeURIComponent(query)}`;
          break;
        case "claude":
          url = `https://hiroshi-rest-api.replit.app/ai/claude?ask=${encodeURIComponent(query)}`;
          break;
        default:
          react("❌");
          return reply("Invalid model! Available models: gpt4o, gemma, mixtral, catgpt, blackbox, gptweb, palm2, nemotron, gpt41, gpt42, atom, meta, mistral, claude");
      }

      const startTime = Date.now();
      const response = await axios.get(url);
      const endTime = Date.now();

      let result;
      if (model.toLowerCase() === "blackbox") {
        result = response.data.result; // Specific handling for blackbox response
      } else {
        result = response.data.response || response.data.result;
      }

      if (!result) {
        react("❌");
        return reply("The AI response was undefined. Please try again.");
      }

      const responseTime = (endTime - startTime) / 1000; // in seconds
      react("✅");

      return reply(`🤖 | ${model.toUpperCase()} 𝐌𝐨𝐝𝐞𝐥 𝐑𝐞𝐬𝐩𝐨𝐧𝐬𝐞\n━━━━━━━━━━━━━━━━━━\n${result}\n━━━━━━━━━━━━━━━━━━\n⏰ 𝐑𝐞𝐬𝐩𝐨𝐧𝐬𝐞 𝐓𝐢𝐦𝐞: ${responseTime.toFixed(2)} seconds`);
    } catch (error) {
      react("❌");
      return reply(`An error occurred: ${error.message}`);
    }
  }
};
