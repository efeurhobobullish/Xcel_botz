const {
  smd,
  Config,
} = require("../lib");
const axios = require("axios");

smd(
  {
    pattern: "lyrics",
    category: "search",
    desc: "Fetches song lyrics.",
    use: "<query>",
    filename: __filename,
  },
  async (message, text) => {
    try {
      if (!text) {
        return message.reply(
          `*_Please provide a song title or artist name, ${message.isCreator ? "Buddy" : "Idiot"}!!_*`
        );
      }

      const apiUrl = `https://api.nexoracle.com/search/lyrics?apikey=MepwBcqIM0jYN0okD&q=${encodeURIComponent(text)}`;
      const result = await axios.get(apiUrl);

      if (!result.data) {
        return await message.reply(`*_Something went wrong. Please try again later._*`);
      }

      const data = result.data.result;

      let responseText = `*🎶 Lyrics for "${text}":*\n\n`;
      responseText += `*Title:* ${data.title}\n`;
      responseText += `*Artist:* ${data.artist}\n`;
      responseText += `*Lyrics:* ${data.lyrics}\n`;
      responseText += `\n\n${Config.caption}`;

      await message.bot.sendMessage(
        message.jid,
        {
          image: { url: data.image },
          caption: responseText
        },
        { quoted: message }
      );

    } catch (e) {
      return await message.error(
        `${e}\n\n command: lyrics`,
        e,
        `*_An error occurred while processing your request._*`
      );
    }
  }
);