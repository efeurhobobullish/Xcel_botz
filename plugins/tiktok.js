const {
  smd,
  Config,
} = require("../lib");
const axios = require("axios");

smd(  // WM
  {
    pattern: "ttdl",
    category: "downloader",
    desc: "Fetches TikTok video download link.",
    use: "<url>",
    filename: __filename,
  },
  async (message, text) => {
    try {
      if (!text) {
        return message.reply(
          `*_Please provide a TikTok video URL, ${message.isCreator ? "Buddy" : "Idiot"}!!_*`
        );
      }

      const apiUrl = `https://api.nexoracle.com/downloader/tiktok-wm?apikey=MepwBcqIM0jYN0okD&url=${encodeURIComponent(text)}`;
      const result = await axios.get(apiUrl);

      if (!result.data) {
        return await message.reply(`*_Something went wrong. Please try again later._*`);
      }

      const data = result.data.result;

      await message.bot.sendMessage(
        message.jid,
        {
          video: { url: data.url },
          caption: `ᴛɪᴋᴛᴏᴋ ᴠɪᴅ ᴡɪᴛʜ ᴡᴍᴋ` +
                   `*Title:* ${data.title}\n`,
          fileName: "tiktok_video.mp4",
          mimetype: "video/mp4"
        },
        { quoted: message }
      );
    } catch (e) {
      return await message.error(
        `${e}\n\n command: ttdl`,
        e,
        `*_An error occurred while processing your request._*`
      );
    }
  }
);

smd(
  {
    pattern: "t",
    category: "downloader",
    desc: "Fetches TikTok video download link.",
    use: "<url>",
    filename: __filename,
  },
  async (message, text) => {
    try {
      if (!text) {
        return message.reply(
          `*_Please provide a TikTok video URL, ${message.isCreator ? "Buddy" : "Idiot"}!!_*`
        );
      }

      const apiUrl = `https://api.nexoracle.com/downloader/tiktok-nowm?apikey=MepwBcqIM0jYN0okD&url=${encodeURIComponent(text)}`;
      const result = await axios.get(apiUrl);

      if (!result.data) {
        return await message.reply(`*_Something went wrong. Please try again later._*`);
      }

      const data = result.data.result;

      await message.bot.sendMessage(
        message.jid,
        {
          video: { url: data.url },
          caption: `ᴛɪᴋᴛᴏᴋ ᴠɪᴅ ᴡɪᴛʜᴏᴜᴛ ᴡᴍᴋ\n*Title:* ${data.title}\n`,
          fileName: "tiktok_video.mp4",
          mimetype: "video/mp4"
        },
        { quoted: message }
      );
    } catch (e) {
      return await message.error(
        `${e}\n\n command: t`,
        e,
        `*_An error occurred while processing your request._*`
      );
    }
  }
);