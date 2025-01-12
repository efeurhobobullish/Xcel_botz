const {
  smd,
  Config,
} = require("../lib");
const axios = require("axios");

smd(
  {
    pattern: "bing",
    category: "internet",
    desc: "Fetches information using Bing",
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

      const apiUrl = `https://api.nexoracle.com/search/bing-search?apikey=MepwBcqIM0jYN0okD&q=${encodeURIComponent(text)}`;
      const result = await axios.get(apiUrl);

      if (!result.data) {
        return await message.reply(`*_Something went wrong. Please try again later._*`);
      }

      let responseText = `* Google  Response for "${text}":*\n\n`;

      result.data.result.forEach((item) => {
        responseText += `*Title:* ${item.title}\n`;
        responseText += `*Link:* ${item.link}\n`;
        responseText += `*Description:* ${item.description}\n\n`;
      });

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
        `${e}\n\n command: bing`,
        e,
        `*_An error occurred while processing your request._*`
      );
    }
  }
);