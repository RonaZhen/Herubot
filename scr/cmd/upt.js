module.exports.start = async function ({ text, reply }) {
  const axios = require("axios");
  const randomUID = Math.floor(Math.random() * 20) + 1; // Generates a random number between 1 and 20
  const time = process.uptime();
  const hours = Math.floor(time / (60 * 60));
  const minutes = Math.floor((time % (60 * 60)) / 60);
  const seconds = Math.floor(time % 60);

  const res = (
    await axios.get(
      `https://joshweb.click/canvas/uptime?id=${randomUID}&instag=heru&ghub=herudev&fb=Jay%20Mar&hours=${hours}&minutes=${minutes}&seconds=${seconds}&botname=Heru%20Bot`,
      {
        responseType: "stream"
      }
    )
  ).data;

  return reply({
    body: `⌛ Hours: ${hours}\nMinutes: ${minutes}\nSeconds: ${seconds}\nName: Heru Bot\nOwner: Jay Mar\nUID: ${randomUID}`,
    attachment: res
  });
};

module.exports.config = {
  name: "upt",
  prefix: false,
  accessibleby: 0,
  description: "Upt",
  credits: "Deku",
  category: "system"
};
