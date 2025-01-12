const moment = require('moment-timezone')
const {fetchJson,smd, tlang,send, getBuffer, prefix, Config ,groupdb } = require('../lib')
let gis = require("async-g-i-s");
const axios = require('axios')
const fetch = require('node-fetch')

const { shazam } = require('../lib')
let yts = require("secktor-pack");

smd({
  pattern: "thazam",
  alias :["thazam"],
  category: "internet",
  react:"🎶", 
  desc: "Finds info about song",
  filename: __filename,
},
async(message) => {
  try {
    let mime = message.reply_message ? message.reply_message.mtype : ''
    if (!/audio/.test(mime)) {
      return message.reply(`Where's the audio, buddy?`);
    }
    let buff = await message.reply_message.download();
    let data = await shazam(buff);
    if (!data || !data.status) return message.send(data);
    let h =`*TITLE: _${data.title}_* \n*ARTIST: _${data.artists}_*\n *ALBUM:* _${data.album}_ `;

    await message.bot.sendUi(message.jid, { caption: h }, { quoted : message }, "text", 'true' );
  } catch (e) {
    return await message.error(`${e}\n\n command: thazam`, e, `*_Didn't get any results, Sorry!_*`)
  }
});