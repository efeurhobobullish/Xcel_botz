const {
  smd,
  Config,
} = require("../lib");

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
        return await message.send("need a url");
      }

      const screenshotUrl = `https://pup-git-main-excels-projects-0d9275b7.vercel.app/ss?url=${encodeURIComponent(text)}`;

      await message.bot.sendMessage(
        message.jid,
        {
          image: { url: screenshotUrl },
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