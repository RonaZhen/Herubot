module.exports.start = async function ({ text, reply }) {
  const axios = require("axios")
  const time = process.uptime();
  const hours = Math.floor(time / (60 * 60));
  const minutes = Math.floor((time % (60 * 60)) / 60);
  const seconds = Math.floor(time % 60);
  const id = text[0] || "4"
  const res = (await axios.get("https://joshweb.click" + `/canvas/uptime?id=${id}&instag=herurona&ghub=Heru&fb=Jay Mar &hours=${hours}&minutes=${minutes}&seconds=${seconds}&botname=Herubot`, {
    responseType: "stream"
  })).data;
  return reply({body: "⌛:" + hours + ":" + minutes + ":" + seconds + "\nCharacter ID: " + id, attachment: res});
};
module.exports.config = {
  name: "upt",
  prefix: false,
  accessibleby: 0,
  description: "Upt",
  credits: "Deku",
  category: "system",
};
