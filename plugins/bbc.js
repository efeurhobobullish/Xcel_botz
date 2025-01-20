const {
  smd,
  Config,
} = require("../lib");
const axios = require("axios");

smd(
  {
    pattern: "bbc",
    category: "internet",
    desc: "Fetches latest news from BBC.",
    use: "",
    filename: __filename,
  },
  async (message) => {
    try {
      const apiUrl = `https://api.nexoracle.com/news/bbc?apikey=MepwBcqIM0jYN0okD`;
      const result = await axios.get(apiUrl);

      if (!result.data || !result.data.result) {
        return await message.reply(`*_Something went wrong. Please try again later._*`);
      }

      const newsArticles = result.data.result;

      for (const item of newsArticles) {
        let responseText = `*Title:* ${item.title}\n`;
        responseText += `*Description:* ${item.description}\n`;
        responseText += `*Link:* ${item.url}\n\n`;
        
        // Sending the message with an image if available
        await message.bot.sendMessage(
          message.jid,
          {
            image: { url: item.urlToImage },
            caption: responseText,
          },
          { quoted: message }
        );
      }

    } catch (e) {
      return await message.error(
        `${e}\n\n command: bbc`,
        e,
        `*_An error occurred while processing your request._*`
      );
    }
  }
);