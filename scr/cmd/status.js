const os = require('os');
const { performance } = require('perf_hooks');
const { execSync } = require('child_process');

module.exports = {
  config: {
    name: "status",
    description: "Displays the bot's system status",
    usage: "status",
    cooldown: 5,
    accessableby: 0,
    category: "Utility",
    prefix: true,
    author: "heru",
  },
  start: async function({ reply }) {
    try {
      // Get current time
      const currentTime = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });

      // Get bot uptime
      const uptime = os.uptime();
      const uptimeHours = Math.floor(uptime / 3600);
      const uptimeMinutes = Math.floor((uptime % 3600) / 60);
      const uptimeSeconds = Math.floor(uptime % 60);

      // Get total users (mock data)
      const totalUsers = 1213;

      // Get GC count (mock data)
      const gcCount = 13;

      // Get RAM usage
      const ramUsage = Math.round(process.memoryUsage().rss / 1024 / 1024);

      // Get ping
      const pingStart = performance.now();
      const pingEnd = performance.now();
      const ping = Math.round(pingEnd - pingStart);

      // Get bot maintainer
      const botMaintainer = "heru dev";

      // Construct the status message
      const statusMessage = `
━𝖡𝖮𝖳 𝖲𝖸𝖲𝖳𝖤𝖬 𝖲𝖳𝖠𝖳𝖲━

🕒 ＴＩＭＥ : ${currentTime} -
🏃 𝖮𝖭𝖫𝖨𝖭𝖤 𝖲𝖳𝖠𝖳𝖲 : ${uptimeHours} hours, ${uptimeMinutes} minutes, ${uptimeSeconds} seconds

👥 𝖳𝖮𝖳𝖠𝖫 𝖴𝖲𝖤𝖱𝖲 : ${totalUsers}
🔄 𝖦𝖢 𝖢𝖮𝖴𝖭𝖳 : ${gcCount}
🧠 𝖱𝖠𝖬 𝖴𝖲𝖠𝖦𝖤 : ${ramUsage} MB
📶 𝖯𝖨𝖭𝖦 : ${ping}ms
👷 𝖡𝖮𝖳 𝖬𝖠𝖨𝖭𝖳𝖠𝖨𝖭𝖤𝖱 : ${botMaintainer}
      `;

      return reply(statusMessage);
    } catch (error) {
      return reply(`An error occurred: ${error.message}`);
    }
  }
};
