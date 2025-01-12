const {
  smd,
  Config,
} = require("../lib");
const axios = require("axios");

smd(
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

      let responseText = `*📹 TikTok Video Info for "${text}":*\n\n`;
      responseText += `*Title:* ${data.title}\n`;
      responseText += `*Region:* ${data.region}\n`;
      responseText += `*Duration:* ${data.duration} seconds\n`;
      responseText += `*Author:*\n  - *Username:* ${data.author.username}\n  - *Nickname:* ${data.author.nickname}\n  - *Avatar:* ${data.author.avatar}\n`;
      responseText += `*Metrics:*\n  - *Play Count:* ${data.metrics.play_count}\n  - *Comment Count:* ${data.metrics.comment_count}\n  - *Share Count:* ${data.metrics.share_count}\n  - *Download Count:* ${data.metrics.download_count}\n`;
      responseText += `*Thumbnail:* ${data.thumbnail}\n`;
      responseText += `*Download Link:* ${data.url}\n`;
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
        `${e}\n\n command: ttdl`,
        e,
        `*_An error occurred while processing your request._*`
      );
    }
  }
);