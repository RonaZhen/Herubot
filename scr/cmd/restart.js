const { exec } = require('child_process');

module.exports = {
  config: {
    name: "restart",
    description: "Restart all functions or the bot",
    prefix: false,
    accessableby: 0,
    author: "heru",
  },
  start: async function ({ text, api, event, reply, react }) {
    try {
      react("🔄");
      reply("Restarting...");

      // Restart command, adjust this based on your bot's environment
      exec("pm2 restart all", (error, stdout, stderr) => {
        if (error) {
          react("❌");
          return reply(`An error occurred: ${error.message}`);
        }
        if (stderr) {
          react("❌");
          return reply(`Standard error: ${stderr}`);
        }
        react("✅");
        return reply("Bot has been successfully restarted.");
      });
    } catch (error) {
      react("❌");
      return reply(`An error occurred: ${error.message}`);
    }
  }
};
