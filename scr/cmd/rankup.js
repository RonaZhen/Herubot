module.exports = {
  config: {
    name: "rankup",
    description: "Automatically level up users based on activity",
    usage: "rankup on/off",
    cooldown: 0,
    accessableby: 0,
    category: "Utility",
    prefix: false,
    author: "heru",
  },

  start: async function ({ text, api, event, reply, react }) {
    try {
      const command = text[0];
      const senderID = event.senderID;

      if (!global.userLevels) {
        global.userLevels = {};
      }

      if (command === "on") {
        global.userLevels[senderID] = {
          messages: 0,
          level: 1,
          enabled: true
        };
        return reply("Rankup feature is now enabled.");
      } else if (command === "off") {
        delete global.userLevels[senderID];
        return reply("Rankup feature is now disabled.");
      }

      // Check if rankup feature is enabled for the user
      if (!global.userLevels[senderID] || !global.userLevels[senderID].enabled) {
        return reply("Rankup feature is currently disabled. Use 'rankup on' to enable it.");
      }

      // Increment message count and check for level up
      global.userLevels[senderID].messages++;
      const currentLevel = global.userLevels[senderID].level;

      if (global.userLevels[senderID].messages >= 10 * currentLevel) {
        global.userLevels[senderID].level++;
        const newLevel = global.userLevels[senderID].level;

        // Notify the user with mention
        const message = `Congratulations <@${senderID}>! Your level has increased to ${newLevel} 🎉`;
        await api.sendMessage({
          body: message,
          mentions: [{
            tag: senderID,
            id: senderID,
          }]
        }, event.threadID, event.messageID);

        react("😲");
      }

    } catch (error) {
      console.error("Error processing rankup command:", error.message);
      return reply("An error occurred while processing the rankup command.");
    }
  }
};
