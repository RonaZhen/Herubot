const axios = require('axios');

module.exports = {
  config: {
    name: 'appstate',
    description: 'Retrieve app state from a provided email and password',
    usage: '[email] [password]',
    cooldown: 3,
    accessableby: 0, // Accessible to everyone (adjust as needed)
    category: 'Utility', // Example category
    prefix: true
  },
  start: async function ({ api, event, text, reply, react }) {
    // Check if both email and password are provided
    if (text.length < 2) {
      return reply('Please provide both email and password.');
    }

    const email = text[0];
    const password = text.slice(1).join(' ');

    react('⏳ Fetching app state, please wait...');

    try {
      // Make API request to fetch app state
      const response = await axios.get(`https://joshweb.click/getcookie?email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`);
      
      // Example assuming response contains a 'state' property
      const appState = response.data.state;

      // Example response message
      const message = `🔐 App state retrieved successfully:\n${appState}`;

      api.sendMessage(message, event.threadID);
      react('✅'); // React with success emoji
    } catch (error) {
      console.error('Error fetching app state:', error.message);
      reply('An error occurred while fetching app state.');
    }
  }
};
