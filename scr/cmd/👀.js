module.exports = {
  config: {
    name: "autoseen",
    description: "Automatically mark messages as seen.",
    usage: "",
    cooldown: 0, // No cooldown needed
    accessableby: 0, // Accessible to everyone
    category: "Utility",
    prefix: true, // Command needs a prefix
  },
  start: async function({ api, event }) {
    // Mark the message as seen
    api.markAsRead(event.threadID);
  },
  auto: async function({ api, event }) {
    // This function is empty as there's no need for auto replies in this command
  }
};
                   
