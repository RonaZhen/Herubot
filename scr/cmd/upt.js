const axios = require("axios");

module.exports.start = async function ({ text, reply }) {
  const avatarId = Math.floor(Math.random() * 800) + 1;
  const time = process.uptime();
  const hours = Math.floor(time / (60 * 60));
  const minutes = Math.floor((time % (60 * 60)) / 60);
  const seconds = Math.floor(time % 60);
  const id = text[0] || "4";
  const botname = "Herubot"; // Replace with your bot's name
  const owner = "Jay Mar"; // Replace with the owner's name
  const res = (await axios.get(`https://joshweb.click` + `/canvas/uptime?id=${id}&instag=herurona&ghub=Heru&fb=Jay Mar&hours=${hours}&minutes=${minutes}&seconds=${seconds}&botname=${botname}`, {
    responseType: "stream"
  })).data;
  
  return reply({
    body: `⌛: ${hours}:${minutes}:${seconds}\nCharacter ID: ${id}\nBot name: ${botname}\nHours: ${hours}\nMinutes: ${minutes}\nSeconds: ${seconds}\nOwner: ${owner}`,
    attachment: res
  });
};

module.exports.config = {
  name: "upt",
  prefix: false,
  accessibleby: 0,
  description: "Upt",
  credits: "Deku",
  category: "system",
};
               
