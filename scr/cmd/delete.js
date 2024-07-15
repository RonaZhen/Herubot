const fs = require('fs');
const path = require('path');

module.exports = {
  config: {
    name: "delete",
    description: "Delete a specified file",
    prefix: false,
    accessableby: 0,
    author: "heru",
  },
  start: async function ({ text, api, event, reply, react }) {
    try {
      let filePath = text.join(" ");
      if (!filePath) return reply("Missing file path!");

      // Resolve the absolute path to avoid any potential issues
      filePath = path.resolve(filePath);

      // Check if the file exists
      if (!fs.existsSync(filePath)) {
        react("❌");
        return reply("The specified file does not exist.");
      }

      // Delete the file
      fs.unlinkSync(filePath);

      react("✅");
      return reply(`The file at ${filePath} has been successfully deleted.`);
    } catch (error) {
      react("❌");
      return reply(`An error occurred: ${error.message}`);
    }
  }
};
              
