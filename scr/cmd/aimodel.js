const axios = require('axios');

module.exports = {
  config: {
    name: "aimodel",
    description: "Interact with various AI conversational models",
    usage: "aimodel [model] [query]",
    cooldown: 5,
    accessableby: 0,
    category: "AI",
    prefix: false,
    author: "heru"
  },
  start: async function({ text, api, event, reply, react }) {
    try {
      if (text.length < 2) {
        const availableModels = [
          "deepseek",
          "german",
          "llama3",
          "neural",
          "openchat",
          "openhermes",
          "phi2",
          "qwen",
          "hermes2",
          "starling",
          "nemotron",
          "wizardlm",
          "capilot"
        ];
        const modelList = availableModels.map(model => `- ${model}`).join("\n");

        return reply(`Usage: aimodel [model] [query]\n\nAvailable models:\n${modelList}\n\nExample: aimodel deepseek hello`);
      }

      const [model, ...queryParts] = text;
      const query = queryParts.join(" ");
      if (!query) return reply("Missing query!");

      react("⏳");

      let url = "";
      const uid = event.senderID; // Assuming the user ID is event.senderID
      switch (model.toLowerCase()) {
        case "deepseek":
          url = `https://joshweb.click/ai/deepseek-coder?q=${encodeURIComponent(query)}&uid=${uid}`;
          break;
        case "german":
          url = `https://joshweb.click/ai/discolm-german?q=${encodeURIComponent(query)}&uid=${uid}`;
          break;
        case "llama3":
          url = `https://joshweb.click/ai/llama-3-8b?q=${encodeURIComponent(query)}&uid=${uid}`;
          break;
        case "neural":
          url = `https://joshweb.click/ai/neural-chat-7b?q=${encodeURIComponent(query)}&uid=${uid}`;
          break;
        case "openchat":
          url = `https://joshweb.click/ai/openchat-3.5?q=${encodeURIComponent(query)}&uid=${uid}`;
          break;
        case "openhermes":
          url = `https://joshweb.click/ai/openhermes-2.5?q=${encodeURIComponent(query)}&uid=${uid}`;
          break;
        case "phi2":
          url = `https://joshweb.click/ai/phi-2?q=${encodeURIComponent(query)}&uid=${uid}`;
          break;
        case "qwen":
          url = `https://joshweb.click/ai/qwen1.5-14b?q=${encodeURIComponent(query)}&uid=${uid}`;
          break;
        case "hermes2":
          url = `https://joshweb.click/ai/hermes-2-pro?q=${encodeURIComponent(query)}&uid=${uid}`;
          break;
        case "starling":
          url = `https://joshweb.click/ai/starling-lm-7b?q=${encodeURIComponent(query)}&uid=${uid}`;
          break;
        case "nemotron":
          url = `https://joshweb.click/ai/nemotron?q=${encodeURIComponent(query)}&uid=${uid}`;
          break;
        case "wizardlm":
          url = `https://joshweb.click/ai/wizardlm?q=${encodeURIComponent(query)}&uid=${uid}`;
          break;
        case "capilot":
          url = `https://joshweb.click/api/copilot?prompt=${encodeURIComponent(query)}&uid=${uid}`;
          break;
        default:
          react("❌");
          return reply("Invalid model! Available models: deepseek, german, llama3, neural, openchat, openhermes, phi2, qwen, hermes2, starling, nemotron, wizardlm, capilot");
      }

      const startTime = Date.now();
      const response = await axios.get(url);
      const result = response.data.response || response.data.result;
      const endTime = Date.now();
      const responseTime = ((endTime - startTime) / 1000).toFixed(2);

      if (!result) {
        react("❌");
        return reply("The AI response was undefined. Please try again.");
      }

      react("✅");
      return reply(`🤖 | ${model.toUpperCase()} 𝐑𝐞𝐬𝐩𝐨𝐧𝐬𝐞\n━━━━━━━━━━━━━━━━━━\n${result}\n━━━━━━━━━━━━━━━━━━\n⏰ 𝐑𝐞𝐬𝐩𝐨𝐧𝐬𝐞 𝐓𝐢𝐦𝐞: ${responseTime}s\n━━━━━━━━━━━━━━━━━━\nType "${model.toUpperCase()} clear" if you want to clear the conversation with aimodel.`);
    } catch (error) {
      react("❌");
      return reply(`An error occurred: ${error.message}`);
    }
  },
  auto: async function({ api, event, text, reply }) {
    // This function is not used for this command
  }
};
