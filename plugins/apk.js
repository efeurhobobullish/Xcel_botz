const {
  smd,
  Config,
} = require("../lib");
const axios = require("axios");
const fs = require('fs');
const path = require('path');

smd(
  {
    pattern: "lapk",
    category: "downloader",
    desc: "Fetches and downloads APK file.",
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
      const apkUrl = data.dllink;
      const fileName = `${data.name}.apk`;
      const filePath = path.join(__dirname, fileName);

      const response = await axios({
        url: apkUrl,
        method: 'GET',
        responseType: 'stream'
      });

      const writer = fs.createWriteStream(filePath);

      response.data.pipe(writer);

      writer.on('finish', async () => {
        await message.bot.sendMessage(
          message.jid,
          {
            document: { url: filePath },
            caption: `*ᴀᴘᴋ ᴅʟ:*\n\n*App Name:* ${data.name}\n*Size:* ${data.size}\n`,
            fileName: fileName,
            mimetype: "application/vnd.android.package-archive"
          },
          { quoted: message }
        );

        fs.unlinkSync(filePath); // Clean up the file after sending
      });

      writer.on('error', (err) => {
        throw err;
      });

    } catch (e) {
      return await message.error(
        `${e}\n\n command: lapk`,
        e,
        `*_An error occurred while processing your request._*`
      );
    }
  }
);