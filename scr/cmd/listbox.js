module.exports = {
  config: {
    name: "listbox",
    description: "Retrieve names and IDs of groups containing the bot",
    usage: "allbox",
    cooldown: 5,
    accessableby: 0,
    category: "Utility",
    prefix: false,
    author: "heru",
  },

  start: async function ({ api, event, reply }) {
    try {
      let num = 0;
      let box = "";

      // Fetch up to 100 threads in the INBOX category
      api.getThreadList(100, null, ["INBOX"], (err, list) => {
        if (err) {
          console.error("Error fetching thread list:", err);
          return reply("Failed to fetch thread list. Please try again later.");
        }

        list.forEach(info => {
          if (info.isGroup && info.isSubscribed) {
            box += `${++num}. ${info.name} - ${info.threadID}\n`;
          }
        });

        // Send the list of groups containing the bot back to the user
        return reply(box);
      });
    } catch (error) {
      console.error("Error processing command:", error.message);
      return reply("An error occurred while processing the command.");
    }
  }
};
