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

smd(

  {

    pattern: "menu",

    type: "special list",

    info: "user",

    dontAddCommandList: true,

  },

  async (message) => {

    try {

      let menuMessage = ` 

➮ʀᴜɴᴛɪᴍᴇ - ${runtime(process.uptime())} 

➮ᴅᴀᴛᴇ - ${message.date} 

➮ɴᴏᴡ ᴛɪᴍᴇ - ${message.time} 
      
➮Oᴡɴᴇʀ - ${Config.ownername} 

➮Nᴜᴍ - ${owner.split(",")[0]} 

➮Mᴇᴍᴏ - ${formatp(os.totalmem() - os.freemem())} 

      \n *xᴄᴇʟ_ʙᴏᴛ*\n\n ${readmore} 

`.trim();

      return await message.bot.sendUi(message.from, { caption: menuMessage });

    } catch (error) {

      await message.error(error + "\nCommand:menu", error);

    }

  }

);