module.exports = {
  config: {
    name: "ping",
    description: "Check the bot's ping in milliseconds",
    prefix: true,
    accessableby: 0,
    author: "heru",
  },
  start: async function ({ api, event, reply, react }) {
    try {
      const startTime = Date.now();
      react("⏳");

      const response = await new Promise((resolve) => {
        api.sendMessage("Pinging...", event.threadID, (err, messageInfo) => {
          if (err) return reply("An error occurred while pinging.");
          resolve(messageInfo);
        });
      });

      const endTime = Date.now();
      const ping = endTime - startTime;

      react("✅");
      reply(`Pong! The ping is ${ping}ms.`);
    } catch (error) {
      react("❌");
      return reply(`An error occurred: ${error.message}`);
    }
  }
};
