const axios = require('axios');

let isActive = false;
let intervalId = null;

module.exports = {
  config: {
    name: "autosendbible",
    description: "Automatically send a Bible verse every 10 minutes",
    usage: "autosendbible on/off",
    cooldown: 0,
    accessableby: 0,
    category: "Religious",
    prefix: true,
    author: "heru",
  },
  start: async function ({ api, event, text, reply, react }) {
    const command = text[0]?.toLowerCase();

    if (!command) {
      return reply("Please specify 'on' or 'off'.");
    }

    if (command === "on") {
      if (isActive) {
        return reply("Auto Bible verse sender is already active.");
      }
      isActive = true;
      react("⏳");

      try {
        // Send an initial Bible verse
        await sendBibleVerse(api, event);

        // Set an interval to send a Bible verse every 10 minutes (600000 milliseconds)
        intervalId = setInterval(async () => {
          await sendBibleVerse(api, event);
        }, 600000);

        react("✅");
        reply("Auto Bible verse sender started. You will receive a new verse every 10 minutes.");
      } catch (error) {
        console.error("Error starting auto Bible verse sender:", error.message);
        react("❌");
        isActive = false;
        reply("An error occurred while starting the auto Bible verse sender.");
      }
    } else if (command === "off") {
      if (!isActive) {
        return reply("Auto Bible verse sender is not active.");
      }
      isActive = false;
      clearInterval(intervalId);
      react("✅");
      reply("Auto Bible verse sender stopped.");
    } else {
      reply("Invalid command. Please specify 'on' or 'off'.");
    }
  }
};

// Function to send a Bible verse
async function sendBibleVerse(api, event) {
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
  } catch (error) {
    console.error('Error fetching Bible verse:', error.message);
  }
        }
