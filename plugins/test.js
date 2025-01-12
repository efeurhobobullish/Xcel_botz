const {
  smd,
  Config,
} = require("../lib");
const axios = require("axios");

smd(
  {
    pattern: "ss",
    category: "internet",
    desc: "Fetches a screenshot of a website using the provided URL.",
    use: "<url>",
    filename: __filename,
  },
  async (message, text) => {
    try {
      if (!text) {
        return message.reply(
          `*_Please provide a website URL, ${message.isCreator ? "Buddy" : "Idiot"}!!_*`
        );
      }

      const apiUrl = `https://pup-git-main-excels-projects-0d9275b7.vercel.app/ss?url=${encodeURIComponent(text)}`;
      const result = await axios.get(apiUrl);

      if (!result.data) {
        return await message.reply(`*_Something went wrong. Please try again later._*`);
      }

      const imageUrl = result.data.url;

      await message.bot.sendMessage(
        message.jid,
        {
          image: { url: imageUrl },
          caption: `Screenshot of the website: ${text}\n\n${Config.caption}`,
        },
        { quoted: message }
      );
    } catch (e) {
      return await message.error(
        `${e}\n\n command: ss`,
        e,
        `*_An error occurred while processing your request._*`
      );
    }
  }
);