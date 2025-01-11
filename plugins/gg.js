const {
  smd,
  Config,
} = require("../lib");
const axios = require("axios");

smd(
  {
    pattern: "gg",
    category: "internet",
    desc: "Fetches information using Google AI.",
    use: "<query>",
    filename: __filename,
  },
  async (message, text) => {
    try {
      if (!text) {
        return message.reply(
          `*_Please provide a query, ${message.isCreator ? "Buddy" : "Idiot"}!!_*`
        );
      }

      const apiUrl = `https://api.nexoracle.com/search/google?apikey=MepwBcqIM0jYN0okD&q=${encodeURIComponent(text)}`;
      const result = await axios.get(apiUrl);

      if (!result.data) {
        return await message.reply(`*_Something went wrong. Please try again later._*`);
      }

      let responseText = `*🌱 Google  Response for "${text}":*\n\n`;
      responseText += result.data.data.data; // Adjust based on actual API response structure
      responseText += `\n\n${Config.caption}`;

      message.bot.sendUi(
        message.jid,
        { caption: responseText },
        { quoted: message },
        "text",
        "true"
      );
    } catch (e) {
      return await message.error(
        `${e}\n\n command: gg`,
        e,
        `*_An error occurred while processing your request._*`
      );
    }
  }
);