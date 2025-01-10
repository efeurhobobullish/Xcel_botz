const os = require("os");

const fs = require("fs");

const Config = require("../config");

let {

  fancytext,

  tlang,

  tiny,

  runtime,

  formatp,

  prefix,

  smd,

  commands,

} = require("../lib");

const long = String.fromCharCode(8206);

const readmore = long.repeat(4001);

const xcel = require("../lib/plugins");

const { exec } = require("child_process");

const translatte = require("translatte");
xcel.cmd(

  {

    pattern: "list",

    desc: "list menu",

    category: "user",

    react: "🥀",

  },

  async (message) => {

    try {

      const { commands } = require("../lib");

      let listMessage = 
\n


➮ʀᴜɴᴛɪᴍᴇ - ${runtime(process.uptime())} 

➮ᴅᴀᴛᴇ - ${message.date} 

➮ɴᴏᴡ ᴛɪᴍᴇ - ${message.time} 
      
➮Oᴡɴᴇʀ - ${Config.ownername} 

➮Nᴜᴍ - ${owner.split(",")[0]} 

➮Mᴇᴍᴏ - ${formatp(os.totalmem() - os.freemem())} 

      \n *xᴄᴇʟ_ʙᴏᴛ*\n\n ${readmore} 





`;

      for (let i = 0; i < commands.length; i++) {

        if (commands[i].pattern === undefined) {

          continue;

        }

        listMessage += `*${i + 1} ${fancytext(commands[i].pattern, 1)}*\n`;

        listMessage += `  ${fancytext(commands[i].desc, 1)}\n`;

      }

      return await message.sendUi(message.chat, {

        caption: listMessage + Config.caption,

      });

    } catch (error) {

      await message.error(error + "\nCommand:list", error);

    }

  }

);