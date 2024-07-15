const axios = require('axios');
const fs = require('fs');
const path = require('path');

module["exports"] = class {
  static config = {
    name: "spamleave",
    description: "Automatically leave the group chat if spam is detected",
    usage: "spamleave on/off",
    cooldown: 0,
    accessableby: 0,
    category: "Moderation",
    prefix: false,
    author: "heru",
  };

  static async start({ text, api, event, reply, react }) {
    try {
      const command = text[0];
      const senderID = event.senderID;

      if (!global.spamSettings) {
        global.spamSettings = {
          enabled: false,
          threshold: 10,
          timeWindow: 5000,
          tracker: {}
        };
      }

      if (command === "on") {
        global.spamSettings.enabled = true;
        return reply("Spam detection is now enabled.");
      } else if (command === "off") {
        global.spamSettings.enabled = false;
        return reply("Spam detection is now disabled.");
      }

      if (!global.spamSettings.enabled) return;

      if (!global.spamSettings.tracker[senderID]) {
        global.spamSettings.tracker[senderID] = [];
      }

      const now = Date.now();
      global.spamSettings.tracker[senderID] = global.spamSettings.tracker[senderID].filter(time => now - time <= global.spamSettings.timeWindow);
      global.spamSettings.tracker[senderID].push(now);

      if (global.spamSettings.tracker[senderID].length > global.spamSettings.threshold) {
        react("🚫");
        await reply("You've been spamming, I will leave the chat now.");

        // Leave the group chat
        setTimeout(async () => {
          await api.removeUserFromGroup(api.getCurrentUserID(), event.threadID);
        }, 1000);
        return;
      }

      // Clean up old entries to prevent memory leak
      for (let user in global.spamSettings.tracker) {
        global.spamSettings.tracker[user] = global.spamSettings.tracker[user].filter(time => now - time <= global.spamSettings.timeWindow);
      }

    } catch (error) {
      console.error("Error detecting spam:", error.message);
      return reply("An error occurred while detecting spam.");
    }
  }
};
                                        
