const axios = require("axios");
const fs = require("fs");
const path = require("path");

module.exports = {
  config: {
    name: "imgur",
    description: "Convert a photo into an Imgur link",
    usage: "[reply with photo]",
    cooldown: 5,
    accessableby: 0,
    category: "Utilities",
    prefix: true
  },
  start: async function ({ api, event, react, reply }) {
    // Check if the message is a reply to another message with an attachment
    if (event.type !== "message_reply" || !event.messageReply.attachments || event.messageReply.attachments.length === 0) {
      return reply("Please reply to a photo to convert it into an Imgur link.");
    }

    const attachment = event.messageReply.attachments[0];
    if (attachment.type !== "photo") {
      return reply("Please reply to a photo to convert it into an Imgur link.");
    }

    const photoUrl = attachment.url;

    try {
      react("⏳"); // React with an hourglass emoji to indicate processing

      const response = await axios.get(`https://my-api-v1.onrender.com/api/imgur?link=${encodeURIComponent(photoUrl)}`);
      const imgurLink = response.data.link;

      react("✅"); // React with a check mark emoji to indicate success

      return reply(`Here is your Imgur link: ${imgurLink}`);
    } catch (error) {
      console.error(`Error uploading to Imgur: ${error.message}`);
      return reply("Failed to upload the photo to Imgur. Please try again later.");
    }
  },
  auto: async function ({ api, event, text, reply }) {
    // No auto functionality for this command
  }
};
