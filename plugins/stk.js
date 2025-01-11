const axios = require("axios");
const fs = require("fs-extra");
const util = require("util");
const {
  StickerTypes
} = require("wa-sticker-formatter");
const fetch = require("node-fetch");
const {
  fancytext,
  smdBuffer,
  getBuffer,
  listall,
  prefix,
  smd,
  TelegraPh,
  Config
} = require("../lib");
async function generateSticker(_0x43a996, _0x5c979b, _0x116cae = {
  pack: Config.packname,
  author: Config.author
}, _0x5b1252 = true) {
  try {
    const {
      Sticker: _0x92981e,
      createSticker: _0x1a1a97,
      StickerTypes: _0x5f17c1
    } = require("wa-sticker-formatter");
    let _0x54c67c = new _0x92981e(_0x5c979b, {
      ..._0x116cae
    });
    return await _0x43a996.bot.sendMessage(_0x43a996.chat, {
      sticker: await _0x54c67c.toBuffer()
    }, {
      quoted: _0x43a996,
      messageId: _0x43a996.bot.messageId()
    });
  } catch (_0x32ee71) {
    if (_0x5b1252) {
      await _0x43a996.error(_0x32ee71 + "\n\nfileName: generateSticker->s.js\n");
    }
  }
}
let mtypes = ["imageMessage", "videoMessage", "stickerMessage"];
smd({
  cmdname: "stk",
  alias: ["s"],
  info: "Makes sticker of replied image/video.",
  type: "stk",
  filename: __filename,
  use: "<reply to any image/video.>"
}, async _0x5f0a63 => {
  try {
    let _0x4a2c9b = mtypes.includes(_0x5f0a63.mtype) ? _0x5f0a63 : _0x5f0a63.reply_message;
    if (_0x4a2c9b && mtypes.includes(_0x4a2c9b?.mtype || "need_Media")) {
      let _0x313fc1 = await _0x4a2c9b.download();
      let _0x37d0ee = {
        pack: Config.packname,
        author: Config.author,
        type: StickerTypes.FULL,
        quality: 10
      };
      await generateSticker(_0x5f0a63, _0x313fc1, _0x37d0ee);
      return _0x313fc1 = false;
    } else {
      return _0x5f0a63.reply("*_Uhh Dear, Reply to image/video!!_*");
    }
  } catch (_0xb1d121) {
    return await _0x5f0a63.error(_0xb1d121 + "\n\ncmdName: sticker\n");
  }
});
smd({
  cmdname: "take",
  info: "Makes sticker of replied image/video.",
  type: "stk",
  filename: __filename,
  use: "<reply to sticker.>"
}, async (_0x471740, _0x3febcd) => {
  try {
    let _0xad98fb = _0x471740.reply_message;
    if (!_0xad98fb || _0xad98fb?.mtype != "stickerMessage") {
      return await _0x471740.reply("*Uhh Please, Reply to sticker*");
    }
    let _0x44d3dd = _0x3febcd.split("|");
    let _0x47c982 = _0x44d3dd[0]?.trim() !== "" ? _0x44d3dd[0] : _0x471740.pushName;
    let _0x20f704 = _0x44d3dd[1] && _0x44d3dd[1] !== "" ? _0x44d3dd[1] : "BOT-X";
    let _0x3ab776 = await _0xad98fb.download();
    let _0x3d0871 = {
      pack: _0x47c982,
      author: _0x20f704,
      type: StickerTypes.FULL,
      quality: 10
    };
    await generateSticker(_0x471740, _0x3ab776, _0x3d0871);
    return _0x3ab776 = false;
  } catch (_0x2529d4) {
    return await _0x471740.error(_0x2529d4 + "\n\ncmdName: take\n");
  }
});


smd({
  cmdname: "wallpaper",
  info: "To get Random wallpaper Pics",
  type: "internet",
  filename: __filename
}, async _0x5c07ae => {
  try {
    const _0x2b9570 = await (await fetch("https://api.unsplash.com/photos/random?client_id=72utkjatCBC-PDcx7-Kcvgod7-QOFAm2fXwEeW8b8cc"))?.json();
    const _0x4cf39c = _0x2b9570?.urls?.regular || false;
    if (_0x4cf39c) {
      await _0x5c07ae.sendUi(_0x5c07ae.jid, {
        caption: "*HERE IS YOUR WALLPAPER*"
      }, {
        quoted: _0x5c07ae
      }, "image", _0x4cf39c);
    } else {
      await _0x5c07ae.send("*_Request Failed, Wallpaper not be fetched!_*");
    }
  } catch (_0x27f4a6) {
    return await _0x5c07ae.error(_0x27f4a6 + "\n\ncmdName: wallpaper\n");
  }
});
smd({
  pattern: "emix",
  desc: "Mixes two emojies.",
  category: "stk",
  use: "<query>",
  filename: __filename
}, async (_0x46e4d3, _0x5dee47) => {
  try {
    let _0x466701 = _0x5dee47.split(",")[0] || false;
    let _0x503ec0 = _0x5dee47.split(",")[1] || false;
    if (!_0x5dee47 || !_0x466701 || !_0x503ec0) {
      return _0x46e4d3.reply("Example : " + prefix + "emix 😅,🤔");
    }
    const _0xe1140e = await fetch("https://tenor.googleapis.com/v2/featured?key=AIzaSyAyimkuYQYF_FXVALexPuGQctUWRURdCYQ&contentfilter=high&media_filter=png_transparent&component=proactive&collection=emoji_kitchen_v5&q=" + _0x466701 + "_" + _0x503ec0);
    const _0x41bce8 = await _0xe1140e?.json();
    if (!_0x41bce8 || _0x41bce8?.locale == "") {
      return _0x46e4d3.send("*_Can't create mixture, try other emojies_*");
    } else {
      let _0x39bbd1 = await smdBuffer(_0x41bce8.results[0].url);
      let _0x4c55c4 = {
        pack: Config.packname,
        author: Config.author,
        type: StickerTypes.FULL,
        quality: 70
      };
      await generateSticker(_0x46e4d3, _0x39bbd1, _0x4c55c4);
      return _0x39bbd1 = false;
    }
  } catch (_0x4bf070) {
    _0x46e4d3.error(_0x4bf070 + "\n\ncmdName: emix");
  }
});
smd({
  pattern: "quotely",
  desc: "Makes Sticker of quoted text.",
  alias: ["q"],
  category: "stk",
  use: "<reply to any message.>",
  filename: __filename
}, async (_0xa1cfa2, _0x4ec923) => {
  try {
    let _0x5a2037 = _0xa1cfa2.reply_message ? _0xa1cfa2.reply_message : _0xa1cfa2 && _0x4ec923 ? _0xa1cfa2 : false;
    let _0x8d0e84 = _0xa1cfa2.reply_message ? _0xa1cfa2.reply_message.text : _0x4ec923;
    if (!_0x5a2037 || !_0x8d0e84) {
      return _0xa1cfa2.reply("*_Please quote/reply to any message!!!_*");
    }
    let _0x3dfb6c = await _0xa1cfa2.getpp(_0x5a2037.sender);
    let _0x242a85 = ["#FFFFFF", "#000000"];
    let _0x4c5cf1 = _0x4ec923 === "white" ? _0x242a85[0] : _0x4ec923 === "black" ? _0x242a85[1] : _0x242a85[Math.floor(Math.random() * _0x242a85.length)];
    let _0x27251d = _0xa1cfa2.bot.getName(_0x5a2037.sender);
    let _0x345fab = {
      type: "quote",
      format: "png",
      backgroundColor: _0x4c5cf1,
      width: 512,
      height: 512,
      scale: 3,
      messages: [{
        avatar: true,
        from: {
          first_name: _0x27251d,
          language_code: "en",
          name: _0x27251d,
          photo: {
            url: _0x3dfb6c
          }
        },
        text: _0x8d0e84,
        replyMessage: {}
      }]
    };
    let _0x51ed20 = await axios.post("https://bot.lyo.su/quote/generate", _0x345fab);
    if (!_0x51ed20 || _0x51ed20.status !== 200 || !_0x51ed20.data || !_0x51ed20.data.ok) {
      return await _0xa1cfa2.send("*_Can't create quote sticker!_*");
    }
    let _0x3dabe8 = Buffer.alloc(_0x51ed20.data.result.image.length, _0x51ed20.data.result.image, "base64");
    try {
      await _0xa1cfa2.send(_0x3dabe8, {
        packname: Config.packname,
        author: "BOT-X"
      }, "sticker");
    } catch (_0x5763ea) {
      console.log("error in quotely : ", _0x5763ea);
      let _0x4dda08 = {
        pack: Config.packname,
        author: Config.author,
        type: StickerTypes.FULL,
        quality: 70
      };
      return await generateSticker(_0xa1cfa2, _0x3dabe8, _0x4dda08);
    }
  } catch (_0x5094b6) {
    return await _0xa1cfa2.error(_0x5094b6 + "\n\ncmdName: emix", _0x5094b6);
  }
});