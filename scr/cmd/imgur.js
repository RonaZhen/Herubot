const axios = require('axios');

module.exports = {
  config: {
    name: "imgur",
    description: "Upload images to Imgur",
    usage: "imgur reply image, video, png, jpg",
    cooldown: 0,
    accessableby: 0,
    category: "Utility",
    prefix: false,
    author: "heru"
  },

  start: async function ({ api, event, reply }) {
    const clientId = "fc9369e9aea767c";
    const imgur = new Imgur(clientId);
    const uploadedLinks = [];

    // Check if the message is a reply and has attachments
    if (event.type !== "message_reply" || event.messageReply.attachments.length === 0) {
      return reply("Please reply with the photo/video/gif that you need to upload.");
    }

    try {
      for (const { url } of event.messageReply.attachments) {
        const uploadedLink = await imgur.uploadImage(url);
        uploadedLinks.push(uploadedLink);
      }

      const successCount = uploadedLinks.length;
      const failedCount = event.messageReply.attachments.length - successCount;

      // Prepare the response message with uploaded links
      const message = `Uploaded successfully ${successCount} image(s)\nFailed to upload: ${failedCount}\nImage link:\n${uploadedLinks.join("\n")}`;

      // Send the message back to the user
      return reply(message);

    } catch (error) {
      console.error("Error uploading image to Imgur:", error.message);
      return reply("Failed to upload image to Imgur. Please try again later.");
    }
  }
};

class Imgur {
  constructor(clientId) {
    this.clientId = clientId;
    this.client = axios.create({
      baseURL: "https://api.imgur.com/3/",
      headers: {
        Authorization: `Client-ID ${this.clientId}`
      }
    });
  }

  async uploadImage(url) {
    try {
      const response = await this.client.post("image", { image: url });
      return response.data.data.link;
    } catch (error) {
      console.error("Error uploading image:", error.message);
      throw new Error("Failed to upload image to Imgur");
    }
  }
          }
