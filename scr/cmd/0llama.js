module["exports"] = class {
  static config = {
    name: "llama",
    description: "Talk to LLaMA AI",
    prefix: false,
    accessableby: 0,
    author: "Deku",
  };
  static async start({ reply, text, react }) {
    const { get } = require("axios");
    try {
      let ask = text.join(" ");
      if (!ask) return reply("Missing prompt!");
      react("⏳");
      const rest = (
        await get("https://joshweb.click" + "/api/llama-3-70b?q=" + encodeURI(ask))
      ).data;
      react("✅");
      return reply("🦙 | 𝙻𝚕𝚊𝚖𝚊 𝚁𝚎𝚜𝚙𝚘𝚗𝚜𝚎\n━━━━━━━━━━━━━━━━━━\n" + rest.result);
    } catch (e) {
      return reply(e.message);
    }
  }
};
