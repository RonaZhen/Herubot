module.exports = {
  config: {
    name: "spamleave",
    description: "Automatically leave the group chat if spam is detected",
    usage: "No usage needed, it works automatically.",
    cooldown: 0,
    accessableby: 0,
    category: "Moderation",
    prefix: false,
    author: "heru",
  },
  start: async function ({ api, event, reply, react }) {
    try {
      // This is a place to add spam detection logic. For demonstration, 
      // we're using a simple spam threshold.
      const spamThreshold = 5; // Number of messages within the threshold time
      const thresholdTime = 5000; // Time window in milliseconds
      const senderID = event.senderID;

      if (!global.spamTracker) {
        global.spamTracker = {};
      }

      if (!global.spamTracker[senderID]) {
        global.spamTracker[senderID] = [];
      }

      const now = Date.now();
      global.spamTracker[senderID] = global.spamTracker[senderID].filter(time => now - time <= thresholdTime);
      global.spamTracker[senderID].push(now);

      if (global.spamTracker[senderID].length > spamThreshold) {
        react("🚫");
        await reply("Don't spam please, I will leave!!");

        // Leave the group chat
        setTimeout(async () => {
          await api.removeUserFromGroup(api.getCurrentUserID(), event.threadID);
        }, 1000);
        return;
      }

      // Clean up old entries to prevent memory leak
      for (let user in global.spamTracker) {
        global.spamTracker[user] = global.spamTracker[user].filter(time => now - time <= thresholdTime);
      }

    } catch (error) {
      console.error("Error detecting spam:", error.message);
      return reply("An error occurred while detecting spam.");
    }
  }
};
