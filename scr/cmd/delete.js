const fs = require("fs");
const path = require("path");

const adminID = "100077070762554"; // Replace with your actual admin user ID

module.exports = {
  config: {
    name: "delete",
    description: "Delete a specified file",
    usage: "[filename]",
    cooldown: 5,
    accessableby: 1, // Assuming 1 means accessible only to admin
    category: "Utility", // Example category
    prefix: true
  },
  start: async function ({ api, event, text, reply }) {
    const senderID = event.senderID;
    
    // Check if the sender is the admin
    if (senderID !== adminID) {
      return reply("You do not have permission to use this command.");
    }

    const filename = text.join(" ").trim();

    if (!filename) {
      return reply("Please specify the file you want to delete, e.g., !delete ai.js");
    }

    const filePath = path.join(process.cwd(), filename);

    // Check if the file exists
    fs.access(filePath, fs.constants.F_OK, (err) => {
      if (err) {
        return reply(`File not found: ${filename}`);
      }

      // Attempt to delete the file
      fs.unlink(filePath, (err) => {
        if (err) {
          console.error(`Error deleting file: ${err.message}`);
          return reply(`Failed to delete file: ${filename}`);
        }

        return reply(`Successfully deleted file: ${filename}`);
      });
    });
  },
  auto: async function ({ api, event, reply }) {
    // No auto functionality for this command
  }
};
