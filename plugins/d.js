const {
  updateProfilePicture,
  parsedJid
} = require("../lib");
const {
  sck,
  smd,
  sck1,
  jsonformat,
  botpic,
  TelegraPh,
  RandomXP,
  send,
  Config,
  tlang,
  warndb,
  sleep,
  getAdmin,
  getBuffer,
  prefix
} = require("../lib");
const {
  Sticker,
  createSticker,
  StickerTypes
} = require("wa-sticker-formatter");
const sᴜʜᴀɪʟ_ᴍᴅ = require("../lib/plugins");

cmd({
  'pattern': "demote",
  'alias':['d'],
  'desc': "Demotes replied/quoted user from group",
  'category': 'gc',
  'filename': __filename,
  'use': '<quote|reply|number>'
}, async _0x118677 => {
  try {
    if (!_0x118677.isGroup) {
      return _0x118677.reply(tlang().group);
    }
    if (!_0x118677.isBotAdmin) {
      return await _0x118677.reply("*_I'm Not Admin In This Group, Idiot_*");
    }
    if (!_0x118677.isAdmin) {
      return _0x118677.reply(tlang().admin);
    }
    let _0x3ce3f1 = _0x118677.mentionedJid[0x0] ? _0x118677.mentionedJid[0x0] : _0x118677.reply_message ? _0x118677.reply_message.sender : false;
    if (!_0x3ce3f1) {
      return await _0x118677.reply("*Uhh dear, reply/mention an User*");
    }
    if (_0x118677.checkBot(_0x3ce3f1)) {
      return await _0x118677.reply("*_Huh, I can't demote my creator!!_*");
    }
    try {
      await _0x118677.bot.groupParticipantsUpdate(_0x118677.chat, [_0x3ce3f1], "demote");
      await _0x118677.reply("*_User demote sucessfully!!_*");
    } catch (_0x5e7b02) {
      await _0x118677.reply("*_Can,t demote user, try it manually, Sorry!!_*");
    }
  } catch (_0x307b66) {
    await _0x118677.error(_0x307b66 + "\n\ncommand: demote", _0x307b66);
  }
});
smd({
  'pattern': "del",
  'alias': ['bin', 'dlt'],
  'desc': "Deletes message of any user",
  'category': "owner",
  'filename': __filename,
  'use': "<quote/reply message.>"
}, async _0x320d81 => {
  try {
    if (!_0x320d81.reply_message) {
      return _0x320d81.reply("*_Please reply to a message!!!_*");
    }
    let _0x3776d3 = _0x320d81.reply_message;
    if (_0x3776d3 && _0x3776d3.fromMe && _0x320d81.isCreator) {
      return _0x3776d3["delete"]();
    } else {
      if (_0x3776d3 && _0x320d81.isGroup) {
        if (!_0x320d81.isBotAdmin) {
          return _0x320d81.reply("*I can't delete messages without getting Admin Role.*");
        }
        if (!_0x320d81.isAdmin) {
          return _0x320d81.reply(tlang().admin);
        }
        await _0x3776d3["delete"]();
      } else {
        return await _0x320d81.reply(tlang().owner);
      }
    }
  } catch (_0x4ac639) {
    await _0x320d81.error(_0x4ac639 + "\n\ncommand: del", _0x4ac639);
  }
});
