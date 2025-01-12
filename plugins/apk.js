/*const {
  smd,
  Config,
} = require("../lib");
const axios = require("axios");

smd(
  {
    pattern: "apk",
    category: "downloader",
    desc: "Fetches APK download link.",
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

      const apiUrl = `https://api.nexoracle.com/downloader/apk?apikey=MepwBcqIM0jYN0okD&q=${encodeURIComponent(text)}`;
      const result = await axios.get(apiUrl);

      if (!result.data) {
        return await message.reply(`*_Something went wrong. Please try again later._*`);
      }

      const data = result.data.result;

      let responseText = `*📦 APK Download Link for "${text}":*\n\n`;
      responseText += `*App Name:* ${data.name}\n`;
      responseText += `*Last Updated:* ${data.lastup}\n`;
      responseText += `*Package Name:* ${data.package}\n`;
      responseText += `*Size:* ${data.size}\n`;
      responseText += `*Icon:* ${data.icon}\n`;
      responseText += `*Download Link:* ${data.dllink}\n`;
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
        `${e}\n\n command: apk`,
        e,
        `*_An error occurred while processing your request._*`
      );
    }
  }
); 
/*