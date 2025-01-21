const {
  smd,
  Config,
} = require("../lib");
const axios = require("axios");

smd(
  {
    pattern: "dictionary",
    category: "internet",
    desc: "Fetches definitions from the dictionary.",
    use: "<word>",
    filename: __filename,
  },
  async (message, text) => {
    try {
      if (!text) {
        return message.reply(
          `*_Please provide a word to look up, ${message.isCreator ? "Buddy" : "Idiot"}!!_*`
        );
      }

      const apiUrl = `https://api.nexoracle.com/details/dictionary?apikey=MepwBcqIM0jYN0okD&q=${encodeURIComponent(text)}`;
      const result = await axios.get(apiUrl);

      if (!result.data || !result.data.result || result.data.result.length === 0) {
        return await message.reply(`*_Something went wrong. Please try again later._*`);
      }

      const definitions = result.data.result;

      let responseText = `*Definitions for "${text}":*\n\n`;

      definitions.forEach((item) => {
        responseText += `*Word:* ${item.word}\n`;
        responseText += `*Phonetic:* ${item.phonetic}\n\n`;

        item.phonetics.forEach((phonetic) => {
          responseText += `*Phonetic:* ${phonetic.text}\n`;
          responseText += `*Audio:* [Listen here](${phonetic.audio})\n`;
          responseText += `*Source URL:* ${phonetic.sourceUrl}\n`;
          responseText += `*License:* [${phonetic.license.name}](${phonetic.license.url})\n\n`;
        });
      });

      responseText += `\n\n${Config.caption}`;

      await message.bot.sendUi(
        message.jid,
        { caption: responseText },
        { quoted: message },
        "text",
        "true"
      );
    } catch (e) {
      return await message.error(
        `${e}\n\n command: dictionary`,
        e,
        `*_An error occurred while processing your request._*`
      );
    }
  }
);