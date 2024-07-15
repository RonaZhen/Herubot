const fs = require('fs');
const path = require('path');

module.exports = {
  config: {
    name: "delete",
    description: "Delete a specified file in the src/cmd directory",
    prefix: false,
    accessableby: 0,
    author: "heru",
  },
  start: async function ({ text, api, event, reply, react }) {
    try {
      let fileName = text.join(" ");
      if (!fileName) return reply("Missing file name!");

      // Construct the full path to the target file in the src/cmd directory
      let filePath = path.resolve(__dirname, 'src', 'cmd', fileName);

      // Check if the file exists
      fs.access(filePath, fs.constants.F_OK, (err) => {
        if (err) {
          react("❌");
          return reply("The specified file does not exist.");
        }

        // Delete the file
        fs.unlink(filePath, (err) => {
          if (err) {
            react("❌");
            return reply(`An error occurred while deleting the file: ${err.message}`);
          }

          react("✅");
          return reply(`The file at ${filePath} has been successfully deleted.`);
        });
      });

    } catch (error) {
      react("❌");
      return reply(`An error occurred: ${error.message}`);
    }
  }
};
