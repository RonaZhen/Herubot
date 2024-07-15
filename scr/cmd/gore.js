const axios = require("axios");
const fs = require("fs");
const path = require("path");

module.exports = {
  config: {
    name: "gore",
    description: "Send a random gore video",
    usage: "[randomgore]",
    cooldown: 5,
    accessableby: 0, // Accessible to everyone
    category: "Entertainment",
    prefix: false,
    author: "chill",
  },

  async run({ api, event, reply, react }) {
    try {
      react("⏳");
      reply("⏱️ | Fetching a random gore video, please wait...");

      const response = await axios.get('https://joshweb.click/api/randgre');
      const goreData = response.data.result;

      if (!goreData || Object.keys(goreData).length === 0) {
        react("❌");
        return reply("No gore videos found.");
      }

      const { title = "Unknown Title", source = "Unknown Source", view = "Unknown Views", comment = "Unknown Comments", vote = "Unknown Votes", video1: videoUrl } = goreData;

      if (!videoUrl) {
        react("❌");
        return reply("No valid gore video found.");
      }

      const message = `Title: ${title}\nSource: ${source}\nViews: ${view}\nComments: ${comment}\nVotes: ${vote}`;
      const filePath = path.join(__dirname, 'cache/gore_video.mp4');
      const writer = fs.createWriteStream(filePath);

      const videoResponse = await axios({
        method: 'get',
        url: videoUrl,
        responseType: 'stream'
      });

      videoResponse.data.pipe(writer);

      writer.on('finish', () => {
        api.sendMessage(
          { body: message, attachment: fs.createReadStream(filePath) },
          event.threadID,
          () => {
            fs.unlinkSync(filePath);
            react("✅");
          }
        );
      });

      writer.on('error', (error) => {
        console.error('Error downloading video:', error);
        react("❌");
        reply("An error occurred while downloading the video.");
      });

    } catch (error) {
      console.error('Error processing request:', error);
      react("❌");
      reply("An error occurred while processing the request.");
    }
  }
};
      
