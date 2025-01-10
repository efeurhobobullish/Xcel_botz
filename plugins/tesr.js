 const os = require("os");
const Config = require("../config");
let { fancytext, tiny, runtime, formatp, prefix } = require("../lib");
const long = String.fromCharCode(8206);
const readmore = long.repeat(4001);
const xcel = require("../lib/plugins");
const trend_usage = (() => {
  const trendNumber = ((min, max) => {
    const random = () => Math.random();
    const floor = (x) => Math.floor(x);
    const multiply = (a, b) => a * b;
    const add = (a, b) => a + b;
    const subtract = (a, b) => a - b;
    const randomValue = multiply(random(), subtract(max, min + 1));
    const result = add(floor(randomValue), min);
    return result;
  })(1, 99);
  return trendNumber;
})();

const database_info = (() => {
  const dbNumber = ((min, max) => {
    const random = () => Math.random();
    const floor = (x) => Math.floor(x);
    const multiply = (a, b) => a * b;
    const add = (a, b) => a + b;
    const subtract = (a, b) => a - b;
    const randomValue = multiply(random(), subtract(max, min + 1));
    const result = add(floor(randomValue), min);
    return result;
  })(1, 499);
  return dbNumber;
})();

xcel.smd(
  {
    cmdname: "ball",
    desc: "Command list",
    react: "✔️",
    desc: "To show all available commands.",
    type: "user",
    filename: __filename,
  },
  async (message, input) => {
    try {
      const { commands } = require("../lib");
      if (input.split(" ")[0]) {
        let commandDetails = [];
        const foundCommand = commands.find(
          (cmd) => cmd.pattern === input.split(" ")[0].toLowerCase()
        );
        if (foundCommand) {
          commandDetails.push("*🔉Command:* " + foundCommand.pattern);
          if (foundCommand.alias && foundCommand.alias[0]) {
            commandDetails.push("*💁Alias:* " + foundCommand.alias.join(", "));
          }
          if (foundCommand.desc) {
            commandDetails.push("*💁Description:* " + foundCommand.desc);
          }
          if (foundCommand.use) {
            commandDetails.push(
              "*〽️Usage:*\n ```" +
                prefix +
                foundCommand.pattern +
                " " +
                foundCommand.use +
                "```"
            );
          }
          if (foundCommand.usage) {
            commandDetails.push(
              "*〽️Usage:*\n ```" + foundCommand.usage + "```"
            );
          }
          await message.reply(commandDetails.join("\n"));
        }
      }

      let menuThemeHeader = "" + Config.botname + "";
      let menuThemeCommandPrefix = "➮ ";
      let menuThemeFooter = "";
      let menuThemeCommandFooter = "";

      const currentTime = message.time;
      const currentDate = message.date;
      let menuText = `
  ${menuThemeHeader}
  ${menuThemeCommandPrefix} *ᴏᴡɴᴇʀ:* ${Config.ownername}
  ${menuThemeCommandPrefix} *ᴜᴘᴛɪᴍᴇ:* ${runtime(process.uptime())}
  ${menuThemeCommandPrefix} *ʀᴀᴍ ᴜsᴀɢᴇ:* ${formatp(os.totalmem() - os.freemem())}
  ${menuThemeCommandPrefix} *ᴛɪᴍᴇ:* ${currentTime}
  ${menuThemeCommandPrefix} *ᴅᴀᴛᴇ:* ${currentDate}
  ${menuThemeCommandPrefix} *ᴄᴏᴍᴍᴀɴᴅs:* ${commands.length}
  ${menuThemeCommandPrefix} *ᴜsᴀɢᴇ ᴛʀᴇɴᴅ:* ${trend_usage}
  ${menuThemeCommandPrefix} *ᴅᴀᴛᴀʙᴀsᴇ:* ${database_info}
  ${menuThemeFooter}\n                         
  ＢＯＴ-Ｘ ©２４
  \n${readmore}\n`;

      commands.map((command) => {
        if (command.dontAddCommandList === false && command.pattern !== undefined) {
          menuText += `${menuThemeCommandPrefix} ${fancytext(command.pattern, 1)}\n`;
        }
      });
      menuText += Config.caption;

      const messageOptions = {
        caption: menuText,
        ephemeralExpiration: 3000,
      };
      return await message.sendUi(message.chat, messageOptions, message);
    } catch (error) {
      await message.error(error + "\nCommand: ball", error);
    }
  }
);