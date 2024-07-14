const axios = require('axios');

module.exports = {
  config: {
    name: 'bible',
    description: 'Fetch a random Bible verse',
    usage: 'randombibleverse',
    cooldown: 3,
    accessableby: 0, // Assuming 0 means accessible to everyone
    category: 'Religious', // Example category
    prefix: false
  },
  start: async function ({ api, event, reply, react }) {
    react('⏳ Fetching a random Bible verse, please wait...');

    try {
      const response = await axios.get('https://joshweb.click/bible');
      const verse = response.data.verse;
      const reference = response.data.reference;

      const message = {
        body: `📖 Here is a random Bible verse for you:\n\n*${verse}*\n\n— _${reference}_`,
        mentions: [
          {
            tag: `@${event.senderID}`,
            id: event.senderID
          }
        ]
      };

      api.sendMessage(message, event.threadID);
      react('✅');
    } catch (error) {
      console.error('Error fetching Bible verse:', error.message);
      reply('An error occurred while fetching the Bible verse.');
    }
  },
  auto: async function ({ api, event, text, reply }) {
    // No auto functionality for this command
  }
};
