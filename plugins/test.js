const {
  smd,
  Config,
} = require("../lib");
const axios = require("axios");

smd(
  {
    pattern: "gimg",
    category: "downloader",
    desc: "Fetches images based on the search term provided.",
    use: "<search term>",
    filename: __filename,
  },
  async (message, text) => {
    try {
      if (!text) {
        return message.reply(
          `*_Please provide a search term, ${message.isCreator ? "Buddy" : "Idiot"}!!_*`
        );
      }

      const apiUrl = `https://www.freepik.com/api/regular/search?locale=en&term=${encodeURIComponent(text)}`;
      const result = await axios.get(apiUrl);

      if (!result.data || !result.data.items || result.data.items.length === 0) {
        return await message.reply(`*_Something went wrong or no images found. Please try again later._*`);
      }

      const data = result.data.items[0]; // Fetch the first image result

      await message.bot.sendMessage(
        message.jid,
        {
          image: { url: data.preview.url },
          caption: `Image for search term: ${text}\n*Title:* ${data.name}\n*Link:* ${data.url}\n`,
        },
        { quoted: message }
      );
    } catch (e) {
      return await message.error(
        `${e}\n\n command: gimg`,
        e,
        `*_An error occurred while processing your request._*`
      );
    }
  }
);