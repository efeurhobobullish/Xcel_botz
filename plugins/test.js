const {
  smd,
  Config,
} = require("../lib");
const axios = require("axios");

smd(
  {
    pattern: "fbdl",
    category: "downloader",
    desc: "Fetches Facebook video download link.",
    use: "<url>",
    filename: __filename,
  },
  async (message, text) => {
    try {
      if (!text) {
        return message.reply(
          `*_Please provide a Facebook video URL, ${message.isCreator ? "Buddy" : "Idiot"}!!_*`
        );
      }

      const apiUrl = `https://api.nexoracle.com/downloader/facebook?apikey=MepwBcqIM0jYN0okD&url=${encodeURIComponent(text)}`;
      const result = await axios.get(apiUrl);

      if (!result.data) {
        return await message.reply(`*_Something went wrong. Please try again later._*`);
      }

      const data = result.data.result;

      await message.bot.sendMessage(
        message.jid,
        {
          video: { url: data.sd },
          caption: `*Facebook Video Info:*\n\n` +
                   `*Title:* ${data.title}\n` +
                   `*Description:* ${data.desc}\n` +
                   
          fileName: "facebook_video.mp4",
          mimetype: "video/mp4"
        },
        { quoted: message }
      );
    } catch (e) {
      return await message.error(
        `${e}\n\n command: fbdl`,
        e,
        `*_An error occurred while processing your request._*`
      );
    }
  }
);