const {
  WAConnection,
  MessageType,
  Presence,
  MessageOptions,
  Mimetype,
  WALocationMessage,
  WA_MESSAGE_STUB_TYPES,
  ReconnectMode,
  ProxyAgent,
  GroupSettingChange,
  waChatKey,
  mentionedJid,
  processTime,
} = require("@adiwajshing/baileys");
const qrcode = require("qrcode-terminal");
const moment = require("moment-timezone");
const fs = require("fs");
const crypto = require("crypto");
const base64Img = require("base64-img");
const fetch = require("node-fetch");
const { color, bgcolor } = require("./lib/color");
const { donasi } = require("./lib/donasi");
const { fetchJson } = require("./lib/fetcher");
const { recognize } = require("./lib/ocr");
const { cara } = require("./src/cara");
const { iklan1 } = require("./src/iklan");
const { exec } = require("child_process");
const {
  wait,
  simih,
  getBuffer,
  h2k,
  generateMessageID,
  getGroupAdmins,
  getRandom,
  banner,
  start,
  info,
  success,
  close,
} = require("./lib/functions");
const speed = require("performance-now");
const brainly = require("brainly-scraper");
const ffmpeg = require("fluent-ffmpeg");
const imgbb = require("imgbb-uploader");
const cd = 4.32e7;
const { nad } = require("./language");
const vcard =
  "BEGIN:VCARD\n" +
  "VERSION:3.0\n" +
  "FN:Andre\n" + // GANTI NAMA LU
  "ORG:OWNER BOT;\n" +
  "TEL;type=CELL;type=VOICE;waid=6282131882053:+62 821-3188-2053\n" + // GANTI NOMOR LU
  "END:VCARD";
const ngonsol = JSON.parse(fs.readFileSync("./settings/Andre.json"));
const {
  botName,
  ownerName,
  XteamKey,
  ownerNumber,
  botPrefix,
  GrupLimitz,
  UserLimitz,
  CeerTod,
} = ngonsol;
// POWERED BY andre_bot
prefix = botPrefix;
blocked = [];
limitawal = UserLimitz;
memberlimit = GrupLimitz;
cr = CeerTod;

// LOAD JSON
const _leveling = JSON.parse(fs.readFileSync("./database/group/leveling.json"));
const _level = JSON.parse(fs.readFileSync("./database/user/level.json"));
const _registered = JSON.parse(
  fs.readFileSync("./database/user/registered.json")
);
const welkom = JSON.parse(fs.readFileSync("./database/group/welkom.json"));
const nsfw = JSON.parse(fs.readFileSync("./database/group/nsfw.json"));
const samih = JSON.parse(fs.readFileSync("./database/group/simi.json"));
const event = JSON.parse(fs.readFileSync("./database/group/event.json"));
const _limit = JSON.parse(fs.readFileSync("./database/user/limit.json"));
const uang = JSON.parse(fs.readFileSync("./database/user/uang.json"));
const ban = JSON.parse(fs.readFileSync("./database/user/banned.json"));
const premium = JSON.parse(fs.readFileSync("./database/user/premium.json"));
const antilink = JSON.parse(fs.readFileSync("./database/group/antilink.json"));
/*       
]=====> LOAD MENU <=====[
*/
const { help } = require("./lib/help");
const { simple } = require("./database/menu/simple");
const { gabut } = require("./database/menu/gabut");
const { groupm } = require("./database/menu/group");
const { download } = require("./database/menu/download");
const { dompet } = require("./database/menu/dompet");
const { random } = require("./database/menu/random");
const { other } = require("./database/menu/other");
const { owb } = require("./database/menu/owb");
const { maker } = require("./database/menu/maker");
const { sound } = require("./database/menu/sound");
/*
]=====> FUNCTION <=====[
*/

function kyun(seconds) {
  function pad(s) {
    return (s < 10 ? "0" : "") + s;
  }
  var hours = Math.floor(seconds / (60 * 60));
  var minutes = Math.floor((seconds % (60 * 60)) / 60);
  var seconds = Math.floor(seconds % 60);

  //return pad(hours) + ':' + pad(minutes) + ':' + pad(seconds)
  return `${pad(hours)} H ${pad(minutes)} M ${pad(seconds)} S`;
}
/*
]=====> SCAN QR <=====[
*/

const andre_bot = new WAConnection();
andre_bot.logger.level = "warn";
console.log(banner.string);
andre_bot.on("qr", (qr) => {
  qrcode.generate(qr, { small: true });
  console.log(
    color("[", "white"),
    color("!", "red"),
    color("]", "white"),
    color(" SUBSCRIBE YT RUDESPLOIT")
  );
});

andre_bot.on("credentials-updated", () => {
  fs.writeFileSync(
    "./Andre.json",
    JSON.stringify(andre_bot.base64EncodedAuthInfo(), null, "\t")
  );
  info("2", "ingfokan cuyy...");
});
fs.existsSync("./Andre.json") && andre_bot.loadAuthInfo("./Andre.json");
andre_bot.on("connecting", () => {
  start("2", "Andre Bot Connecting...");
});
andre_bot.on("open", () => {
  success("2", "Andre Bot Connected");
});
andre_bot.connect({ timeoutMs: 30 * 1000 });

andre_bot.on('group-participants-update', async (anu) => {
		if (!welkom.includes(anu.jid)) return
		try {
			const mdata = await andre_bot.groupMetadata(anu.jid)
			console.log(anu)
			if (anu.action == 'add') {
				num = anu.participants[0]
				try {
					ppimg = await andre_bot.getProfilePicture(`${anu.participants[0].split('@')[0]}@c.us`)
				} catch {
					ppimg = 'https://i0.wp.com/www.gambarunik.id/wp-content/uploads/2019/06/Top-Gambar-Foto-Profil-Kosong-Lucu-Tergokil-.jpg'
				}
				teks = `[ *WELCOME IN GC ${mdata.subject}* ] \n___________________________\n@${num.split('@')[0]} Intro/Dikick!!! \n➸ Nama : \n➸ Umur : \n➸ Askot : \n➸ Gender : \n➸ Udah Punya Doi/Blm: \n➸ Pap Muka dumlu!!! \n➸ Instagram? \n𝐒𝐚𝐯𝐞 𝐍𝐨𝐦𝐨𝐫 𝐀𝐃𝐌𝐈𝐍! \n *___________________________*\nJangan jadi kutu lomcat sayang!!`
				let buff = await getBuffer(ppimg)
				andre_bot.sendMessage(mdata.id, buff, MessageType.image, {caption: teks, contextInfo: {"mentionedJid": [num]}})
			} else if (anu.action == 'remove') {
				num = anu.participants[0]
				try {
					ppimg = await baby.getProfilePicture(`${num.split('@')[0]}@c.us`)
				} catch {
					ppimg = 'https://i0.wp.com/www.gambarunik.id/wp-content/uploads/2019/06/Top-Gambar-Foto-Profil-Kosong-Lucu-Tergokil-.jpg'
				}
				teks = `SELAMAT TINGGAL... @${num.split('@')[0]}👋* \n_Jasamu akan saya kubur dalam dalam_`
				let buff = await getBuffer(ppimg)
				andre_bot.sendMessage(mdata.id, buff, MessageType.image, {caption: teks, contextInfo: {"mentionedJid": [num]}})
			}
		} catch (e) {
			console.log('Error : %s', color(e, 'red'))
		}
	})
	

andre_bot.on("CB:Blocklist", (json) => {
  if (blocked.length > 2) return;
  for (let i of json[1].blocklist) {
    blocked.push(i.replace("c.us", "s.whatsapp.net"));
  }
});

andre_bot.on("message-new", async (mek) => {
  try {
    if (!mek.message) return;
    if (mek.key && mek.key.remoteJid == "status@broadcast") return;
    if (mek.key.fromMe) return;
    global.prefix;
    global.blocked;
    const content = JSON.stringify(mek.message);
    const from = mek.key.remoteJid;
    const type = Object.keys(mek.message)[0];
    const {
      text,
      extendedText,
      contact,
      location,
      liveLocation,
      image,
      video,
      sticker,
      document,
      audio,
      product,
    } = MessageType;
    const time = moment.tz("Asia/Jakarta").format("DD/MM HH:mm:ss");
    const timi = moment.tz("Asia/Jakarta").add(30, "days").calendar();
    const timu = moment.tz("Asia/Jakarta").add(20, "days").calendar();
    body =
      type === "conversation" && mek.message.conversation.startsWith(prefix)
        ? mek.message.conversation
        : type == "imageMessage" &&
          mek.message.imageMessage.caption.startsWith(prefix)
        ? mek.message.imageMessage.caption
        : type == "videoMessage" &&
          mek.message.videoMessage.caption.startsWith(prefix)
        ? mek.message.videoMessage.caption
        : type == "extendedTextMessage" &&
          mek.message.extendedTextMessage.text.startsWith(prefix)
        ? mek.message.extendedTextMessage.text
        : "";
    budy =
      type === "conversation"
        ? mek.message.conversation
        : type === "extendedTextMessage"
        ? mek.message.extendedTextMessage.text
        : "";
    var tas =
      type === "conversation" && mek.message.conversation
        ? mek.message.conversation
        : type == "imageMessage" && mek.message.imageMessage.caption
        ? mek.message.imageMessage.caption
        : type == "videoMessage" && mek.message.videoMessage.caption
        ? mek.message.videoMessage.caption
        : type == "extendedTextMessage" && mek.message.extendedTextMessage.text
        ? mek.message.extendedTextMessage.text
        : "";
    const mesejAnti = tas.slice(0).trim().split(/ +/).shift().toLowerCase();
    const command = body.slice(3).trim().split(/ +/).shift().toLowerCase();
    const args = body.trim().slice(3).split(/ +/);
    const isCmd = body.startsWith(prefix);
    const tescuk = ["0@s.whatsapp.net"];
    const isGroup = from.endsWith("@g.us");
    const q = args.join(" ");
    const botNumber = andre_bot.user.jid;
    const sender = isGroup ? mek.participant : mek.key.remoteJid;
    pushname =
      andre_bot.contacts[sender] != undefined
        ? andre_bot.contacts[sender].vname || andre_bot.contacts[sender].notify
        : undefined;
    const groupMetadata = isGroup ? await andre_bot.groupMetadata(from) : "";
    const groupName = isGroup ? groupMetadata.subject : "";
    const groupId = isGroup ? groupMetadata.jid : "";
    const groupMembers = isGroup ? groupMetadata.participants : "";
    const groupDesc = isGroup ? groupMetadata.desc : "";
    const groupAdmins = isGroup ? getGroupAdmins(groupMembers) : "";

    const isEventon = isGroup ? event.includes(from) : false;
    const isBanned = ban.includes(sender);
    const isBotGroupAdmins = groupAdmins.includes(botNumber) || false;
    const isLevelingOn = isGroup ? _leveling.includes(from) : false;
    const isGroupAdmins = groupAdmins.includes(sender) || false;
    const isWelkom = isGroup ? welkom.includes(from) : false;
    const isNsfw = isGroup ? nsfw.includes(from) : false;
    const isSimi = isGroup ? samih.includes(from) : false;
    const isAntiLink = isGroup ? antilink.includes(from) : false;
    const isOwner = ownerNumber.includes(sender);
    const isPrem = premium.includes(sender) || isOwner;
    const isImage = type === "imageMessage";
    const isUrl = (url) => {
      return url.match(
        new RegExp(
          /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)/,
          "gi"
        )
      );
    };
    const reply = (teks) => {
      andre_bot.sendMessage(from, teks, text, { quoted: mek });
    };
    const sendMess = (hehe, teks) => {
      andre_bot.sendMessage(hehe, teks, text);
    };
    const mentions = (teks, memberr, id) => {
      id == null || id == undefined || id == false
        ? andre_bot.sendMessage(from, teks.trim(), extendedText, {
            contextInfo: { mentionedJid: memberr },
          })
        : andre_bot.sendMessage(from, teks.trim(), extendedText, {
            quoted: mek,
            contextInfo: { mentionedJid: memberr },
          });
    };
    const sendImage = (teks) => {
      andre_bot.sendMessage(from, teks, image, { quoted: mek });
    };
    const costum = (pesan, tipe, target, target2) => {
      andre_bot.sendMessage(from, pesan, tipe, {
        quoted: {
          key: {
            fromMe: false,
            participant: `${target}`,
            ...(from ? { remoteJid: from } : {}),
          },
          message: { conversation: `${target2}` },
        },
      });
    };
    const sendPtt = (teks) => {
      andre_bot.sendMessage(from, audio, mp3, { quoted: mek });
    };

    /*
]=====> CHECK LIMIT BY LANN ID <=====[
*/

    /*
]=====> LIMITED BY LANN ID <=====[
*/

    // ANTI LINK GRUP
    if (tas.match(/(https?:\/\/chat.whatsapp.com)/gi)) {
      if (!isGroup) return;
      if (!isAntiLink) return;
      if (isGroupAdmins) return reply("Admin grup bebas boss :V");
      andre_bot.updatePresence(from, Presence.composing);
      var kic = `${sender.split("@")[0]}@s.whatsapp.net`;
      reply(`Woyy ${sender.split("@")[0]} Gak Boleh Share Link Group😡`);
      setTimeout(() => {
        andre_bot.groupRemove(from, [kic]).catch((e) => {
          reply(`BOT HARUS JADI ADMIN`);
        });
      }, 3000);
    }
    colors = ["red", "white", "black", "blue", "yellow", "green"];
    const isMedia = type === "imageMessage" || type === "videoMessage";
    const isQuotedImage =
      type === "extendedTextMessage" && content.includes("imageMessage");
    const isQuotedVideo =
      type === "extendedTextMessage" && content.includes("videoMessage");
    const isQuotedSticker =
      type === "extendedTextMessage" && content.includes("stickerMessage");
    if (!isGroup && isCmd)
      console.log(
        "\x1b[1;31m=\x1b[1;37m>",
        "[\x1b[1;32mAndre Bot Exec\x1b[1;37m]",
        time,
        color(command),
        "dari",
        color(sender.split("@")[0]),
        "args :",
        color(args.length)
      );
    if (!isGroup && !isCmd)
      console.log(
        "\x1b[1;31m=\x1b[1;37m>",
        "[\x1b[1;31mAe\x1b[1;37m]",
        time,
        color("Ndre ada Pesan!"),
        "dari",
        color(pushname),
        "args :",
        color(args.length)
      );
    if (isCmd && isGroup)
      console.log(
        "\x1b[1;31m=\x1b[1;37m>",
        "[\x1b[1;32mAndre Bot Exec\x1b[1;37m]",
        time,
        color(command),
        "si",
        color(sender.split("@")[0]),
        "pake bot di grup",
        color(groupName),
        "args :",
        color(args.length)
      );
    if (!isCmd && !isGroup)
      console.log(
        "\x1b[1;31m=\x1b[1;37m>",
        "[\x1b[1;31mAndre Bot Message\x1b[1;37m]",
        time,
        color("Pesan"),
        "dari",
        color(pushname),
        "di grup",
        color(groupName),
        "args :",
        color(args.length)
      );
    let authorname =
      andre_bot.contacts[from] != undefined
        ? andre_bot.contacts[from].vname || andre_bot.contacts[from].notify
        : undefined;
    if (authorname != undefined) {
    } else {
      authorname = groupName;
    }
    function addMetadata(packname, author) {
      if (!packname) packname = "andre_botBOT";
      if (!author) author = "andre_bot";
      author = author.replace(/[^a-zA-Z0-9]/g, "");
      let name = `${author}_${packname}`;
      if (fs.existsSync(`./src/stickers/${name}.exif`))
        return `./src/stickers/${name}.exif`;
      const json = {
        "sticker-pack-name": packname,
        "sticker-pack-publisher": author,
      };
      const littleEndian = Buffer.from([
        0x49,
        0x49,
        0x2a,
        0x00,
        0x08,
        0x00,
        0x00,
        0x00,
        0x01,
        0x00,
        0x41,
        0x57,
        0x07,
        0x00,
      ]);
      const bytes = [0x00, 0x00, 0x16, 0x00, 0x00, 0x00];

      let len = JSON.stringify(json).length;
      let last;

      if (len > 256) {
        len = len - 256;
        bytes.unshift(0x01);
      } else {
        bytes.unshift(0x00);
      }

      if (len < 16) {
        last = len.toString(16);
        last = "0" + len;
      } else {
        last = len.toString(16);
      }

      const buf2 = Buffer.from(last, "hex");
      const buf3 = Buffer.from(bytes);
      const buf4 = Buffer.from(JSON.stringify(json));

      const buffer = Buffer.concat([littleEndian, buf2, buf3, buf4]);

      fs.writeFile(`./src/stickers/${name}.exif`, buffer, (err) => {
        return `./src/stickers/${name}.exif`;
      });
    }
    var prema = "Free";
    if (isPrem) {
      prema = "Premium";
    }
    if (isOwner) {
      prema = "Owner";
    }
    switch (command) {
      case "help":
      case "menu":
        if (isBanned) return reply(nad.baned());
        await costum(help(pushname, prefix, botName, ownerName, sender), text);
        break;
      case "donasi":
      case "donate":
        andre_bot.sendMessage(
          from,
          donasi(pushname, prefix, botName, ownerName),
          text
        );
        break;
      case "iklan":
        andre_bot.sendMessage(
          from,
          iklan1(pushname, prefix, botName, ownerName),
          text
        );
        break;
      case "bingungcok":
        if (isBanned) return reply(nad.baned());

        andre_bot.sendMessage(
          from,
          cara(pushname, prefix, botName, ownerName),
          text
        );
        break;
      case "simplemenu":
      case "simpelmenu":
        if (isBanned) return reply(nad.baned());

        await costum(
          simple(
            pushname,
            prefix,
            botName,
            ownerName,
            getLevelingLevel,
            sender,
            _registered
          ),
          text,
          tescuk,
          cr
        );
        break;
      case "gabutmenu":
        if (isBanned) return reply(nad.baned());

        await costum(
          gabut(
            pushname,
            prefix,
            botName,
            ownerName,
            getLevelingLevel,
            sender,
            _registered
          ),
          text,
          tescuk,
          cr
        );
        break;
      case "groupmenu":
        if (isBanned) return reply(nad.baned());

        if (!isGroup) return reply(nad.groupo());
        await costum(
          groupm(
            pushname,
            prefix,
            botName,
            ownerName,
            getLevelingLevel,
            sender,
            _registered
          ),
          text,
          tescuk,
          cr
        );
        break;
      case "downloadmenu":
        if (isBanned) return reply(nad.baned());

        await costum(
          download(
            pushname,
            prefix,
            botName,
            ownerName,
            getLevelingLevel,
            sender,
            _registered
          ),
          text,
          tescuk,
          cr
        );
        break;
      case "dompetmenu":
        if (isBanned) return reply(nad.baned());

        await costum(
          dompet(
            pushname,
            prefix,
            botName,
            ownerName,
            getLevelingLevel,
            sender,
            _registered
          ),
          text,
          tescuk,
          cr
        );
        break;
      case "randommenu":
        if (isBanned) return reply(nad.baned());

        await costum(
          random(
            pushname,
            prefix,
            botName,
            ownerName,
            getLevelingLevel,
            sender,
            _registered
          ),
          text,
          tescuk,
          cr
        );
        break;
      case "makermenu":
        if (isBanned) return reply(nad.baned());

        await costum(
          maker(
            pushname,
            prefix,
            botName,
            ownerName,
            getLevelingLevel,
            sender,
            _registered
          ),
          text,
          tescuk,
          cr
        );
        break;
      case "othermenu":
        if (isBanned) return reply(nad.baned());

        await costum(
          other(
            pushname,
            prefix,
            botName,
            ownerName,
            getLevelingLevel,
            sender,
            _registered
          ),
          text,
          tescuk,
          cr
        );
        break;
      case "soundmenu":
        if (isBanned) return reply(nad.baned());

        await costum(
          sound(
            pushname,
            prefix,
            botName,
            ownerName,
            getLevelingLevel,
            sender,
            _registered
          ),
          text,
          tescuk,
          cr
        );
        break;
      case "ownermenu":
        if (isBanned) return reply(nad.baned());

        await costum(
          owb(
            pushname,
            prefix,
            botName,
            ownerName,
            getLevelingLevel,
            sender,
            _registered
          ),
          text,
          tescuk,
          cr
        );
        break;
      /*
]=====> SIMPLE MENU <=====[
*/
      case "stiker":
      case "sticker":
      case "s":
      case "stickergif":
      case "stikergif":
        if (isBanned) return reply(nad.baned());

        console.log(isMedia);

        if (
          (isMedia && !mek.message.videoMessage || isQuotedImage) &&
          args.length == 1
        ) {
          const encmedia = isQuotedImage
            ? JSON.parse(JSON.stringify(mek).replace("quotedM", "m")).message
                .extendedTextMessage.contextInfo
            : mek;
          const media = await andre_bot.downloadAndSaveMediaMessage(encmedia);
          ran = getRandom(".webp");
          await ffmpeg(`./${media}`)
            .input(media)
            .on("start", function (cmd) {
              console.log(`Started : ${cmd}`);
            })
            .on("error", function (err) {
              console.log(`Error : ${err}`);
              fs.unlinkSync(media);
              reply(nad.stikga());
            })
            .on("end", function () {
              console.log("Finish");
              exec(
                `webpmux -set exif ${addMetadata(
                  "andre_botBOT",
                  authorname
                )} ${ran} -o ${ran}`,
                async (error) => {
                  if (error) return reply(nad.stikga());
                  andre_bot.sendMessage(from, fs.readFileSync(ran), sticker, {
                    quoted: mek,
                  });
                  fs.unlinkSync(media);
                  fs.unlinkSync(ran);
                }
              );
            })
            .addOutputOptions([
              `-vcodec`,
              `libwebp`,
              `-vf`,
              `scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse`,
            ])
            .toFormat("webp")
            .save(ran);
        } else if (
          ((isMedia && mek.message.videoMessage.seconds < 11) ||
            (isQuotedVideo &&
              mek.message.extendedTextMessage.contextInfo.quotedMessage
                .videoMessage.seconds < 11)) &&
          args.length == 1
        ) {
          const encmedia = isQuotedVideo
            ? JSON.parse(JSON.stringify(mek).replace("quotedM", "m")).message
                .extendedTextMessage.contextInfo
            : mek;
          const media = await andre_bot.downloadAndSaveMediaMessage(encmedia);
          ran = getRandom(".webp");
          reply(nad.wait());
          await ffmpeg(`./${media}`)
            .inputFormat(media.split(".")[1])
            .on("start", function (cmd) {
              console.log(`Started : ${cmd}`);
            })
            .on("error", function (err) {
              console.log(`Error : ${err}`);
              fs.unlinkSync(media);
              tipe = media.endsWith(".mp4") ? "video" : "gif";
              reply(` Gagal, pada saat mengkonversi ${tipe} ke stiker`);
            })
            .on("end", function () {
              console.log("Finish");
              exec(
                `webpmux -set exif ${addMetadata(
                  "ANDRE - BOT",
                  authorname
                )} ${ran} -o ${ran}`,
                async (error) => {
                  if (error) return reply(nad.stikga());
                  andre_bot.sendMessage(from, fs.readFileSync(ran), sticker, {
                    quoted: mek,
                  });
                  fs.unlinkSync(media);
                  fs.unlinkSync(ran);
                }
              );
            })
            .addOutputOptions([
              `-vcodec`,
              `libwebp`,
              `-vf`,
              `scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse`,
            ])
            .toFormat("webp")
            .save(ran);
        } else {
          reply(
            `Kirim gambar/video/gif dengan caption \n${prefix}sticker (durasi sticker video 1-9 detik)`
          );
        }
        break;
      case "runtime":
        uptime = process.uptime();
        run = `「 *RUNTIME* 」\n${kyun(uptime)}`;
        andre_bot.sendMessage(from, run, text, {
          quoted: {
            key: {
              fromMe: false,
              participant: `0@s.whatsapp.net`,
              ...(from ? { remoteJid: from } : {}),
            },
            message: { conversation: `ANDRE BOT VERIFIED` },
          },
        });
        break;
      case "nulis":
        if (isBanned) return reply(nad.baned());

        if (args.length < 2)
          return reply(`Teksnya mana ngab? Contoh : ${prefix}nulis halo pack`);
        nul = body.slice(7);
        reply("「❗」WAIT BRO GUE NULIS DUMLU YAKAN");
        tak = await getBuffer(
          `https://api.zeks.xyz/api/nulis?text=${nul}&apikey=apivinz`
        );
        andre_bot.sendMessage(from, tak, image, {
          quoted: mek,
          caption: "Lebih baik nulis sendiri ya ngab :*",
        });

        break;
      case "nuliskiri":
      case "tuliskiri":
        if (isBanned) return reply(nad.baned());

        if (args.length < 2)
          return reply(
            `Teksnya mana ngab? Contoh : ${prefix}nulis1 Zakaria baik hati`
          );
        teksNulis = body.slice(11);
        reply("「❗」WAIT BRO GUE NULIS DUMLU YAKAN");
        buff = await getBuffer(
          `https://api.xteam.xyz/magernulis2?text=${teksNulis}&APIKEY=${XteamKey}`
        );
        andre_bot.sendMessage(from, buff, image, {
          quoted: mek,
          caption: "Lebih baik nulis sendiri ya ngab :*",
        });
        break;
      case "nuliskanan":
      case "tuliskanan":
        if (isBanned) return reply(nad.baned());

        if (args.length < 2)
          return reply(
            `Teksnya mana ngab? Contoh : ${prefix}nulis2 andre_bot Bot`
          );
        laysha = body.slice(12);
        reply("「❗」WAIT BRO GUE NULIS DUMLU YAKAN");
        buff = await getBuffer(
          `https://api.xteam.xyz/magernulis3?text=${laysha}&APIKEY=${XteamKey}`
        );
        andre_bot.sendMessage(from, buff, image, {
          quoted: mek,
          caption: "Lebih baik nulis sendiri ya ngab :*",
        });
        break;
      case "quotes":
        andre_bot.updatePresence(from, Presence.composing);
        if (isBanned) return reply(nad.baned());

        data = fs.readFileSync("./src/quote.json");
        jsonData = JSON.parse(data);
        randIndex = Math.floor(Math.random() * jsonData.length);
        randKey = jsonData[randIndex];
        randQuote = "" + randKey.quote + "\n\n_By: " + randKey.by + "_";
        andre_bot.sendMessage(from, randQuote, text, { quoted: mek });

        break;
      case "pornhub":
        if (isBanned) return reply(nad.baned());

        var gh = body.slice(11);
        var porn = gh.split("&")[0];
        var hub = gh.split("&")[1];
        if (args.length < 2)
          return reply(`「❗」Contoh : ${prefix}pornhub ANDRE & Hub`);
        reply(nad.wait());
        alan = await getBuffer(
          `https://api.zeks.xyz/api/phlogo?text1=${porn}&text2=${hub}&apikey=apivinz`
        );
        andre_bot.sendMessage(from, alan, image, { quoted: mek });

        break;
      case "logogaming":
        if (isBanned) return reply(nad.baned());

        var gh = body.slice(14);
        var porn = gh.split("&")[0];
        var hub = gh.split("&")[1];
        if (args.length < 2)
          return reply(
            `「❗」Contoh : ${prefix}logogaming Andre & G-A-M-I-N-G`
          );
        reply(nad.wait());
        alan = await getBuffer(
          `https://api.zeks.xyz/api/wolflogo?apikey=apivinz&text1=${porn}&text2=${hub}`
        );
        andre_bot.sendMessage(from, alan, image, { quoted: mek });

        break;
      case "logotiktok":
        if (isBanned) return reply(nad.baned());

        var gh = body.slice(14);
        var gli = gh.split("&")[0];
        var tch = gh.split("&")[1];
        if (args.length < 2)
          return reply(
            `「❗」Contoh : ${prefix}logotiktok Andre Bot & WhatsApp Bot Masa Kini :v`
          );
        reply(nad.wait());
        buffer = await getBuffer(
          `https://api.zeks.xyz/api/gtext?text1=${gli}&text2=${tch}&apikey=apivinz`
        );
        andre_bot.sendMessage(from, buffer, image, { quoted: mek });

        break;
      case "simi":
        if (isBanned) return reply(nad.baned());

        if (args.length < 2)
          return reply(`Mau nanya apa? Contoh : ${prefix}simi halo`);
        tefs = body.slice(7);
        anu = await fetchJson(
          `https://api.xteam.xyz/simsimi?kata=${tefs}&APIKEY=${XteamKey}`
        );
        reply(anu.jawaban);

        break;
      case "tts":
        if (isBanned) return reply(nad.baned());

        if (args.length < 2)
          return andre_bot.sendMessage(
            from,
            `Kode bahasanya mana ngab? contoh : ${prefix}tts id Halo andre_bot`,
            text,
            { quoted: mek }
          );
        const gtts = require("./lib/gtts")(args[1]);
        if (args.length < 2)
          return andre_bot.sendMessage(
            from,
            `Teksnya mana ngab | contoh : ${prefix}tts id ah yamate kudasai`,
            text,
            { quoted: mek }
          );
        dtt = body.slice(10);
        ranm = getRandom(".mp3");
        rano = getRandom(".ogg");
        dtt.length > 300
          ? reply("Teks nya terlalu panjang ngab")
          : gtts.save(ranm, dtt, function () {
              exec(
                `ffmpeg -i ${ranm} -ar 48000 -vn -c:a libopus ${rano}`,
                (err) => {
                  fs.unlinkSync(ranm);
                  buff = fs.readFileSync(rano);
                  if (err) return reply(nad.stikga());
                  andre_bot.sendMessage(from, buff, audio, {
                    quoted: mek,
                    ptt: true,
                  });
                  fs.unlinkSync(rano);
                }
              );
            });

        break;
      case "ttp": //By NOIR X andre_bot ID
        pngttp = "./temp/ttp.png";
        webpng = "./temp/ttp.webp";
        const ttptext = body.slice(7);
        fetch(`https://api.areltiyan.site/sticker_maker?text=${ttptext}`, {
          method: "GET",
        }).then(async (res) => {
          const ttptxt = await res.json();
          console.log("SUKSES");
          base64Img.img(ttptxt.base64, "temp", "ttp", function (err, filepath) {
            if (err) return console.log(err);
            exec(
              `ffmpeg -i ${pngttp} -vcodec libwebp -filter:v fps=fps=20 -lossless 1 -loop 0 -preset default -an -vsync 0 -s 512:512 ${webpng}`,
              (err) => {
                buffer = fs.readFileSync(webpng);
                andre_bot.sendMessage(from, buffer, sticker);
                fs.unlinkSync(webpng);
                fs.unlinkSync(pngttp);
              }
            );
          });
        });
        break;
      case "toimg":
        if (isBanned) return reply(nad.baned());

        if (!isQuotedSticker)
          return reply(
            "Reply atau Tag sticker yang mau dijadiin gambar ngab >_<"
          );
        reply(nad.wait());
        encmedia = JSON.parse(JSON.stringify(mek).replace("quotedM", "m"))
          .message.extendedTextMessage.contextInfo;
        media = await andre_bot.downloadAndSaveMediaMessage(encmedia);
        ran = getRandom(".png");
        exec(`ffmpeg -i ${media} ${ran}`, (err) => {
          fs.unlinkSync(media);
          if (err) return reply(nad.stikga());
          buffer = fs.readFileSync(ran);
          andre_bot.sendMessage(from, buffer, image, {
            quoted: mek,
            caption: "nih ngab [(^.^)]",
          });
          fs.unlinkSync(ran);
        });

        break;
      case "speed":
      case "ping":
        const timestamp = speed();
        const latensi = speed() - timestamp;
        andre_bot.sendMessage(from, `Speed: ${latensi.toFixed(4)} _ms_`, text, {
          quoted: mek,
        });
        break;
      case "bikinquote":
        if (isBanned) return reply(nad.baned());

        var gh = body.slice(12);
        var quote = gh.split("&")[0];
        var wm = gh.split("&")[1];
        const pref = `yang mau dijadiin quote apaan, titit?\n\ncontoh : ${prefix}bikinquote aku bukan boneka & Kata andre_bot`;
        if (args.length < 2) return reply(pref);
        reply(nad.wait());
        anu = await fetchJson(
          `https://terhambar.com/aw/qts/?kata=${quote}&author=${wm}&tipe=random`,
          { method: "get" }
        );
        buffer = await getBuffer(anu.result);
        andre_bot.sendMessage(from, buffer, image, {
          caption: "Nih ngab >_<",
          quoted: mek,
        });

        break;
      case "meme":
        if (isBanned) return reply(nad.baned());

        nganu = await fetchJson(
          `https://api.zeks.xyz/api/memeindo?apikey=apivinz`
        );
        buper = await getBuffer(nganu.result);
        andre_bot.sendMessage(from, buper, image, { quoted: mek });

        break;
      case "stalkig":
      case "igstalk":
        if (isBanned) return reply(nad.baned());

        if (args.length <= 1) {
          return reply(
            `Untuk stalking instagram otomatis via bot, penggunaan : ${prefix}igstalk <username>`
          );
        }

        tess = body.slice(11);
        anu = await fetchJson(
          `https://videfikri.com/api/igstalk/?username=${tess}`,
          { method: "get" }
        );
        console.log(anu);
        reply("「❗」Sabar Lagi Stalking IG nya ngab");
        buffer = await getBuffer(anu.result.profile_hd);
        hasil = `Akun instagram dengan user ${tess} berhasil di stalk!
*◯ Nama* : _${anu.result.full_name}_
*◯ Jumlah Follower* : _${anu.result.followers}_
*◯ Jumlah Following* : _${anu.result.following}_
*◯ Biografi* : _${anu.result.bio}_`;
        andre_bot.sendMessage(from, buffer, image, {
          quoted: mek,
          caption: hasil,
        });

        break;
      case "daftar":
        if (isBanned) return reply(nad.baned());
        if (isRegistered) return reply(nad.rediregis());
        if (!q.includes("|")) return reply(nad.wrongf());
        const namaUser = q.substring(0, q.indexOf("|") - 0);
        const umurUser = q.substring(q.lastIndexOf("|") + 1);
        const serialUser = createSerial(20);
        if (namaUser.length >= 30) return reply(`Namanya kepanjangan ngab :)`);
        if ((umurUser.length >= 3, umurUser.length <= 1))
          return reply(`Umur min 10 tahun max 40 tahun`);
        veri = sender;
        if (isGroup) {
          addRegisteredUser(sender, namaUser, umurUser, time, serialUser);
          await reply(
            nad.registered(namaUser, umurUser, serialUser, time, sender)
          );
          addATM(sender);
          addLevelingId(sender);
          console.log(
            color("[REGISTER]"),
            color(time, "yellow"),
            "Name:",
            color(namaUser, "cyan"),
            "Age:",
            color(umurUser, "cyan"),
            "Serial:",
            color(serialUser, "cyan"),
            "in",
            color(sender || groupName)
          );
        } else {
          addRegisteredUser(sender, namaUser, umurUser, time, serialUser);
          await reply(
            nad.registered(namaUser, umurUser, serialUser, time, sender)
          );
          addATM(sender);
          addLevelingId(sender);
          console.log(
            color("[REGISTER]"),
            color(time, "yellow"),
            "Name:",
            color(namaUser, "cyan"),
            "Age:",
            color(umurUser, "cyan"),
            "Serial:",
            color(serialUser, "cyan")
          );
        }
        break;
      // PREMIUM
      case "premiumlist":
        andre_bot.updatePresence(from, Presence.composing);

        iyaa = `╭─「 *JUMLAH USER PREMIUM* 」\n`;
        no = 0;
        for (let prem of premium) {
          no += 1;
          iyaa += `│「${no.toString()}」 @${prem.split("@")[0]}\n`;
        }
        iyaa += `│ Jumlah User Premium : ${premium.length}\n╰──────「 *${botName}* 」`;
        andre_bot.sendMessage(from, iyaa.trim(), extendedText, {
          quoted: mek,
          contextInfo: { mentionedJid: premium },
        });
        break;
      case "bokep":
        andre_bot.updatePresence(from, Presence.composing);
        if (isBanned) return reply(nad.baned());

        data = fs.readFileSync("./src/18.js");
        jsonData = JSON.parse(data);
        randIndex = Math.floor(Math.random() * jsonData.length);
        randKey = jsonData[randIndex];
        randBokep = await getBuffer(randKey.image);
        reply("JANGAN COMLY MULU BRO");
        randTeks = randKey.teks;
        andre_bot.sendMessage(from, randBokep, image, {
          quoted: mek,
          caption: randTeks,
        });
        break;
      case "blowjob":
        if (isBanned) return reply(nad.baned());

        if (!isGroup) return reply(nad.groupo());
        if (!isNsfw) return reply(nad.nsfwoff());
        ranp = getRandom(".gif");
        rano = getRandom(".webp");
        anu = await fetchJson(
          `https://tobz-api.herokuapp.com/api/nsfwblowjob?apikey=BotWeA`,
          { method: "get" }
        );
        if (anu.error) return reply(anu.error);
        exec(
          `wget ${anu.result} -O ${ranp} && ffmpeg -i ${ranp} -vcodec libwebp -filter:v fps=fps=15 -lossless 1 -loop 0 -preset default -an -vsync 0 -s 512:512 ${rano}`,
          (err) => {
            fs.unlinkSync(ranp);
            if (err) return reply(nad.stikga());
            buffer = fs.readFileSync(rano);
            andre_bot.sendMessage(from, buffer, sticker, { quoted: mek });
            fs.unlinkSync(rano);
          }
        );
        break;
      case "nangis":
        if (isBanned) return reply(nad.baned());

        ranp = getRandom(".gif");
        rano = getRandom(".webp");
        anu = await fetchJson(
          `https://tobz-api.herokuapp.com/api/cry?apikey=BotWeA`,
          { method: "get" }
        );
        reply("「❗」KASIH JEDA 1 MENIT HABIS INI YA ngab");
        if (anu.error) return reply(anu.error);
        exec(
          `wget ${anu.result} -O ${ranp} && ffmpeg -i ${ranp} -vcodec libwebp -filter:v fps=fps=15 -lossless 1 -loop 0 -preset default -an -vsync 0 -s 512:512 ${rano}`,
          (err) => {
            fs.unlinkSync(ranp);
            if (err) return reply(nad.stikga());
            buffer = fs.readFileSync(rano);
            andre_bot.sendMessage(from, buffer, sticker, { quoted: mek });
            fs.unlinkSync(rano);
          }
        );
        break;
      case "pussy":
        if (isBanned) return reply(nad.baned());

        ranp = getRandom(".gif");
        rano = getRandom(".webp");
        anu = await fetchJson(
          `https://api.shizukaa.xyz/api/pussy?apikey=itsmeiky633`,
          { method: "get" }
        );
        reply("「❗」KASIH JEDA 1 MENIT HABIS INI YA ngab");
        if (anu.error) return reply(anu.error);
        exec(
          `wget ${anu.url} -O ${ranp} && ffmpeg -i ${ranp} -vcodec libwebp -filter:v fps=fps=15 -lossless 1 -loop 0 -preset default -an -vsync 0 -s 512:512 ${rano}`,
          (err) => {
            fs.unlinkSync(ranp);
            if (err) return reply(nad.stikga());
            buffer = fs.readFileSync(rano);
            andre_bot.sendMessage(from, buffer, sticker, { quoted: mek });
            fs.unlinkSync(rano);
          }
        );
        break;
      case "tomp3":
        if (isBanned) return reply(nad.baned());

        andre_bot.updatePresence(from, Presence.composing);
        if (!isQuotedVideo) return reply("*Reply video nya lah-_-*");
        reply(nad.wait());
        encmedia = JSON.parse(JSON.stringify(mek).replace("quotedM", "m"))
          .message.extendedTextMessage.contextInfo;
        media = await andre_bot.downloadAndSaveMediaMessage(encmedia);
        ran = getRandom(".mp4");
        exec(`ffmpeg -i ${media} ${ran}`, (err) => {
          fs.unlinkSync(media);
          if (err) return reply("Yahh gagall um:(");
          rmln = fs.readFileSync(ran);
          andre_bot.sendMessage(from, rmln, audio, {
            mimetype: "audio/mp4",
            quoted: mek,
          });
          fs.unlinkSync(ran);
        });
        break;
      case "slowmo":
        if (isBanned) return reply(nad.baned());

        encmedia = JSON.parse(JSON.stringify(mek).replace("quotedM", "m"))
          .message.extendedTextMessage.contextInfo;
        media = await andre_bot.downloadAndSaveMediaMessage(encmedia);
        ran = getRandom(".mp3");
        exec(
          `ffmpeg -i ${media} -filter:a "atempo=0.7,asetrate=44100" ${ran}`,
          (err, stderr, stdout) => {
            fs.unlinkSync(media);
            if (err) return reply("Error!");
            uhh = fs.readFileSync(ran);
            andre_bot.sendMessage(from, uhh, audio, {
              mimetype: "audio/mp4",
              ptt: true,
              quoted: mek,
            });
            fs.unlinkSync(ran);
          }
        );
        break;

      case "tupai":
        if (isBanned) return reply(nad.baned());

        encmedia = JSON.parse(JSON.stringify(mek).replace("quotedM", "m"))
          .message.extendedTextMessage.contextInfo;
        media = await andre_bot.downloadAndSaveMediaMessage(encmedia);
        ran = getRandom(".mp3");
        exec(
          `ffmpeg -i ${media} -filter:a "atempo=0.5,asetrate=65100" ${ran}`,
          (err, stderr, stdout) => {
            fs.unlinkSync(media);
            if (err) return reply("Error!");
            hah = fs.readFileSync(ran);
            andre_bot.sendMessage(from, hah, audio, {
              mimetype: "audio/mp4",
              ptt: true,
              quoted: mek,
            });
            fs.unlinkSync(ran);
          }
        );
        break;
      case "gemok":
        if (isBanned) return reply(nad.baned());

        encmedia = JSON.parse(JSON.stringify(mek).replace("quotedM", "m"))
          .message.extendedTextMessage.contextInfo;
        media = await andre_bot.downloadAndSaveMediaMessage(encmedia);
        ran = getRandom(".mp3");
        exec(
          `ffmpeg -i ${media} -filter:a "atempo=1.6,asetrate=22100" ${ran}`,
          (err, stderr, stdout) => {
            fs.unlinkSync(media);
            if (err) return reply("Error!");
            hah = fs.readFileSync(ran);
            andre_bot.sendMessage(from, hah, audio, {
              mimetype: "audio/mp4",
              ptt: true,
              quoted: mek,
            });
            fs.unlinkSync(ran);
          }
        );
        break;
      case "ngebass":
        if (isBanned) return reply(nad.baned());

        encmedia = JSON.parse(JSON.stringify(mek).replace("quotedM", "m"))
          .message.extendedTextMessage.contextInfo;

        media = await andre_bot.downloadAndSaveMediaMessage(encmedia);
        ran = getRandom(".mp3");
        exec(
          `ffmpeg -i ${media} -af equalizer=f=94:width_type=o:width=2:g=30 ${ran}`,
          (err, stderr, stdout) => {
            fs.unlinkSync(media);
            if (err) return reply("Error!");
            hah = fs.readFileSync(ran);
            andre_bot.sendMessage(from, hah, audio, {
              mimetype: "audio/mp4",
              ptt: true,
              quoted: mek,
            });
            fs.unlinkSync(ran);
          }
        );
        break;
      case "cium":
        if (isBanned) return reply(nad.baned());

        ranp = getRandom(".gif");
        rano = getRandom(".webp");
        anu = await fetchJson(
          `https://tobz-api.herokuapp.com/api/kiss?apikey=BotWeA`,
          { method: "get" }
        );
        reply("「❗」KASIH JEDA 1 MENIT HABIS INI YA ngab");
        if (anu.error) return reply(anu.error);
        exec(
          `wget ${anu.result} -O ${ranp} && ffmpeg -i ${ranp} -vcodec libwebp -filter:v fps=fps=15 -lossless 1 -loop 0 -preset default -an -vsync 0 -s 512:512 ${rano}`,
          (err) => {
            try {
              fs.unlinkSync(ranp);
              if (err) return reply(nad.stikga());
              buffer = fs.readFileSync(rano);
              andre_bot.sendMessage(from, buffer, sticker, { quoted: mek });
              fs.unlinkSync(rano);
            } catch (e) {
              console.log(e);
            }
          }
        );
        break;
      case "wiki":
        if (args.length < 2)
          return reply(`masukan kata kunci\ncontoh : ${prefix}wiki hacker`);
        if (isBanned) return reply(nad.baned());

        anu = await fetchJson(
          `https://api.shizukaa.xyz/api/wiki?apikey=itsmeiky633&q=${body.slice(
            6
          )}`
        );
        reply(anu.result);

        break;
      case "peluk":
        if (isBanned) return reply(nad.baned());

        ranp = getRandom(".gif");
        rano = getRandom(".webp");
        anu = await fetchJson(
          `https://tobz-api.herokuapp.com/api/hug?apikey=BotWeA`,
          { method: "get" }
        );
        reply("「❗」KASIH JEDA 1 MENIT HABIS INI YA ngab");
        if (anu.error) return reply(anu.error);
        exec(
          `wget ${anu.result} -O ${ranp} && ffmpeg -i ${ranp} -vcodec libwebp -filter:v fps=fps=15 -lossless 1 -loop 0 -preset default -an -vsync 0 -s 512:512 ${rano}`,
          (err) => {
            fs.unlinkSync(ranp);
            if (err) return reply(nad.stikga());
            buffer = fs.readFileSync(rano);
            andre_bot.sendMessage(from, buffer, sticker, { quoted: mek });
            fs.unlinkSync(rano);
          }
        );
        break;
      // YTMP4
      case "ytmp4":
        if (args.length < 2) return reply("Linknya mana um?");
        if (isBanned) return reply(nad.baned());

        if (!isUrl(args[1]) && !args[1].includes("youtu"))
          return reply("URL NYA TIDAK VALID ngab");
        cie = await fetchJson(
          `https://api.zeks.xyz/api/ytmp4/2?url=${body.slice(7)}&apikey=apivinz`
        );
        if (cie.error) return reply(cie.error);
        tels = `*➸ Judul* : ${cie.result.title}\n*➸ Size* : ${cie.result.size}\n\n*[WAIT] Proses Dumlu Yakan*`;
        bufper = await getBuffer(cie.result.thumb);
        andre_bot.sendMessage(from, bufper, image, {
          quoted: mek,
          caption: tels,
        });
        bufp = await getBuffer(cie.result.link);
        andre_bot.sendMessage(from, bufp, video, {
          mimetype: "video/mp4",
          quoted: mek,
        });
        break;
      case "tiktod":
        if (args.length < 2) return reply("Linknya mana um?");
        if (isBanned) return reply(nad.baned());

        anu = await fetchJson(
          `https://api.xteam.xyz/dl/tiktok?url=${body.slice(
            8
          )}&APIKEY=${XteamKey}`
        );
        reply("[WAIT] Proses Dumlu Yakan");
        neteh = await getBuffer(anu.result.url);
        andre_bot.sendMessage(from, neteh, video, {
          mimetype: "video/mp4",
          quoted: mek,
        });

        break;
      case "hidetag5":
        if (isBanned) return reply(nad.baned());

        if (!isGroup) return reply(nad.groupo());
        var value = body.slice(10);
        var group = await andre_bot.groupMetadata(from);
        var member = group["participants"];
        var mem = [];
        member.map(async (adm) => {
          mem.push(adm.id.replace("c.us", "s.whatsapp.net"));
        });
        var options = {
          text: value,
          contextInfo: { mentionedJid: mem },
          quoted: mek,
        };
        andre_bot
          .sendMessage(from, options, text)
          .then(() => {
            andre_bot.sendMessage(from, options, text);
          })
          .then(() => {
            andre_bot.sendMessage(from, options, text);
          })
          .then(() => {
            andre_bot.sendMessage(from, options, text);
          })
          .then(() => {
            andre_bot.sendMessage(from, options, text);
          });
        break;
      case "hidetag10":
        if (isBanned) return reply(nad.baned());

        if (!isGroup) return reply(nad.groupo());
        var value = body.slice(11);
        var group = await andre_bot.groupMetadata(from);
        var member = group["participants"];
        var mem = [];
        member.map(async (adm) => {
          mem.push(adm.id.replace("c.us", "s.whatsapp.net"));
        });
        var options = {
          text: value,
          contextInfo: { mentionedJid: mem },
          quoted: mek,
        };
        andre_bot
          .sendMessage(from, options, text)
          .then(() => {
            andre_bot.sendMessage(from, options, text);
          })
          .then(() => {
            andre_bot.sendMessage(from, options, text);
          })
          .then(() => {
            andre_bot.sendMessage(from, options, text);
          })
          .then(() => {
            andre_bot.sendMessage(from, options, text);
          })
          .then(() => {
            andre_bot.sendMessage(from, options, text);
          })
          .then(() => {
            andre_bot.sendMessage(from, options, text);
          })
          .then(() => {
            andre_bot.sendMessage(from, options, text);
          })
          .then(() => {
            andre_bot.sendMessage(from, options, text);
          })
          .then(() => {
            andre_bot.sendMessage(from, options, text);
          });
        break;
      case "randomhentong":
        if (isBanned) return reply(nad.baned());

        gatauda = body.slice(15);
        reply(nad.wait());
        buffer = await getBuffer(
          `https://api.xteam.xyz/randomimage/hentai?APIKEY=${XteamKey}`
        );
        andre_bot.sendMessage(from, buffer, image, { quoted: mek });
        break;
      /*
]=====> GABUTZ MENU <=====[
*/
      case "tebakin":
        if (isBanned) return reply(nad.baned());

        anu = await fetchJson(
          `https://api.zeks.xyz/api/tebakgambar?apikey=apivinz`,
          { method: "get" }
        );
        ngebuff = await getBuffer(anu.result.soal);
        tebak = `➸ Jawaban : *${anu.result.jawaban}*`;
        setTimeout(() => {
          andre_bot.sendMessage(from, tebak, text, { quoted: mek });
        }, 30000); // 1000 = 1s,
        setTimeout(() => {
          andre_bot.sendMessage(from, "_10 Detik lagi..._", text); // ur cods
        }, 20000); // 1000 = 1s,
        setTimeout(() => {
          andre_bot.sendMessage(from, "_20 Detik lagi..._", text); // ur cods
        }, 10000); // 1000 = 1s,
        setTimeout(() => {
          andre_bot.sendMessage(from, "_30 Detik lagi..._", text); // ur cods
        }, 2500); // 1000 = 1s,
        setTimeout(() => {
          andre_bot.sendMessage(from, ngebuff, image, {
            caption: "_Tebak bro!!! gak bisa jawab donasi ya:v_",
            quoted: mek,
          }); // ur cods
        }, 0); // 1000 = 1s,

        break;
      case "bisakah":
        if (isBanned) return reply(nad.baned());

        bisakah = body.slice(3);
        const bisa = [
          "Tentu Saja Bisa! Kamu Adalah Orang Paling Homky",
          "Gak Bisa Ajg Aowkwowk",
          "Hmm Gua Gak Tau Yaa, tanya ama bapakau",
          "Ulangi Tod Gua Ga Paham",
        ];
        const keh = bisa[Math.floor(Math.random() * bisa.length)];
        andre_bot.sendMessage(
          from,
          "Pertanyaan : *" + bisakah + "*\n\nJawaban : " + keh,
          text,
          { quoted: mek }
        );

        break;
      case "kapankah":
        if (isBanned) return reply(nad.baned());

        kapankah = body.slice(3);
        const kapan = [
          "Besok",
          "Lusa",
          "Tadi",
          "4 Hari Lagi",
          "5 Hari Lagi",
          "6 Hari Lagi",
          "1 Minggu Lagi",
          "2 Minggu Lagi",
          "3 Minggu Lagi",
          "1 Bulan Lagi",
          "2 Bulan Lagi",
          "3 Bulan Lagi",
          "4 Bulan Lagi",
          "5 Bulan Lagi",
          "6 Bulan Lagi",
          "1 Tahun Lagi",
          "2 Tahun Lagi",
          "3 Tahun Lagi",
          "4 Tahun Lagi",
          "5 Tahun Lagi",
          "6 Tahun Lagi",
          "1 Abad lagi",
          "3 Hari Lagi",
        ];
        const koh = kapan[Math.floor(Math.random() * kapan.length)];
        andre_bot.sendMessage(
          from,
          "Pertanyaan : *" + kapankah + "*\n\nJawaban : " + koh,
          text,
          { quoted: mek }
        );

        break;
      case "apakah":
        if (isBanned) return reply(nad.baned());

        apakah = body.slice(3);
        const apa = ["Iya", "Tidak", "Bisa Jadi", "Ulangi bro gak paham"];
        const kah = apa[Math.floor(Math.random() * apa.length)];
        andre_bot.sendMessage(
          from,
          "Pertanyaan : *" + apakah + "*\n\nJawaban : " + kah,
          text,
          { quoted: mek }
        );

        break;
      case "neontext":
        if (isBanned) return reply(nad.baned());

        if (args.length < 2)
          return reply(`「❗」Contoh : ${prefix}neontext andre_bot`);
        naon = body.slice(10);
        reply("「❗」WAIT GANS");
        alu = await getBuffer(
          `https://api.xteam.xyz/textpro/neon?text=${naon}&APIKEY=${XteamKey}`
        );
        andre_bot.sendMessage(from, alu, image, { quoted: mek });
        break;
      case "timer":
        if (isBanned) return reply(nad.baned());

        if (args[1] == "detik") {
          var timer = args[1] + "000";
        } else if (args[1] == "menit") {
          var timer = args[1] + "0000";
        } else if (args[1] == "jam") {
          var timer = args[1] + "00000";
        } else {
          return reply("*pilih:*\ndetik\nmenit\njam");
        }
        setTimeout(() => {
          reply("Bangun Woyy Habis Waktu :v");
        }, timer);
        break;
      /*
]=====> MENU GRUP <=====[
*/
      case "welcome":
        if (isBanned) return reply(nad.baned());
        if (!isGroup) return reply(nad.groupo());
        if (!isGroupAdmins) return reply(nad.admin());
        if (args.length < 2) return reply("Ekhemm >_<");
        if (Number(args[1]) === 1) {
          if (isWelkom) return reply("*FITUR WELCOME SUDAH AKTIF ngab*");
          welkom.push(from);
          fs.writeFileSync(
            "./database/group/welkom.json",
            JSON.stringify(welkom)
          );
          reply("*「 SUKSES 」MENGAKTIFKAN FITUR WELCOME DI GROUP*");
        } else if (Number(args[1]) === 0) {
          welkom.splice(from, 1);
          fs.writeFileSync(
            "./database/group/welkom.json",
            JSON.stringify(welkom)
          );
          reply("*「 SUKSES 」MEMATIKAN FITUR WELCOME DI GROUP*");
        } else {
          reply(nad.satukos());
        }
        break;
      case "blackpink":
        if (isBanned) return reply(nad.baned());

        if (args.length < 2)
          return reply(`「❗」Contoh : ${prefix}blackpink andre_bot`);
        pink = body.slice(11);
        reply("「❗」Hah Blekping :v");
        lol = await getBuffer(
          `https://api.zeks.xyz/api/logobp?text=${pink}&apikey=apivinz`
        );
        andre_bot.sendMessage(from, lol, image, { quoted: mek });

        break;
      case "coffetext":
        if (isBanned) return reply(nad.baned());

        if (args.length < 2)
          return reply(`「❗」Contoh : ${prefix}blackpink andre_bot`);
        coff = body.slice(11);
        mhe = await fetchJson(
          `https://api.shizukaa.xyz/api/coffie?apikey=itsmeiky633&text=${coff}`
        );
        reply(nad.wait());
        atu = await getBuffer(mhe.result.url);
        andre_bot.sendMessage(from, atu, image, { quoted: mek });

        break;
      case "event":
        if (isBanned) return reply(nad.baned());
        if (!isGroup) return reply(nad.groupo());
        if (!isOwner) return reply(nad.ownerb());
        if (args.length < 2) return reply("Ekhemm >_<");
        if (Number(args[1]) === 1) {
          if (isEventon) return reply("*FITUR EVENT SUDAH AKTIF BOS*");
          event.push(from);
          fs.writeFileSync(
            "./database/group/event.json",
            JSON.stringify(event)
          );
          reply("*「 SUKSES 」MENGAKTIFKAN EVENT DI GROUP*");
        } else if (Number(args[1]) === 0) {
          event.splice(from, 1);
          fs.writeFileSync(
            "./database/group/event.json",
            JSON.stringify(event)
          );
          reply("*「 SUKSES 」MEMATIKAN EVENT DI GROUP*");
        } else {
          reply(nad.satukos());
        }
        break;
      case "simih":
        if (isBanned) return reply(nad.baned());
        if (!isGroup) return reply(nad.groupo());
        if (!isGroupAdmins) return reply(nad.admin());
        if (args.length < 2) return reply("Ekhemm >_<");
        if (Number(args[1]) === 1) {
          if (isSimi) return reply("*SUDAH AKTIF*");
          samih.push(from);
          fs.writeFileSync("./database/group/simi.json", JSON.stringify(samih));
          reply("*「 SUKSES 」MENGAKTIFKAN FITUR SIMI DI GROUP*");
        } else if (Number(args[1]) === 0) {
          samih.splice(from, 1);
          fs.writeFileSync("./database/group/simi.json", JSON.stringify(samih));
          reply("*「 SUKSES 」MEMATIKAN FITUR SIMI DI GROUP*");
        } else {
          reply(nad.satukos());
        }
        break;
      case "nsfw":
        if (isBanned) return reply(nad.baned());
        if (!isGroup) return reply(nad.groupo());
        if (!isGroupAdmins) return reply(nad.admin());
        if (args.length < 2) return reply("Ekhem >_<");
        if (Number(args[1]) === 1) {
          if (isNsfw) return reply(" *sudah aktif*  !!");
          nsfw.push(from);
          fs.writeFileSync("./database/group/nsfw.json", JSON.stringify(nsfw));
          reply("*「 SUKSES 」MENGAKTIFKAN FITUR NSFW DI GROUP*");
        } else if (Number(args[1]) === 0) {
          nsfw.splice(from, 1);
          fs.writeFileSync("./database/group/nsfw.json", JSON.stringify(nsfw));
          reply("*「 SUKSES 」MEMATIKAN FITUR NSWF DI GROUP*");
        } else {
          reply(nad.satukos());
        }
        break;
      case "antilinkgrup":
        if (isBanned) return reply(nad.baned());
        if (!isGroup) return reply(nad.groupo());
        if (!isGroupAdmins) return reply(nad.admin());
        if (!isBotGroupAdmins) return reply(nad.badmin());
        if (args.length < 2) return reply("ketik 1 untuk mengaktifkan");
        if (Number(args[1]) === 1) {
          if (isAntiLink) return reply("EMANG MATI?");
          antilink.push(from);
          fs.writeFileSync(
            "./database/group/antilink.json",
            JSON.stringify(antilink)
          );
          reply("「 SUKSES 」MENGAKTIFKAN ANTI LINK DI GROUP");
          andre_bot.sendMessage(
            from,
            `ALLERT!!! Jika bukan admin jangan kirim link grup`,
            text
          );
        } else if (Number(args[1]) === 0) {
          if (!isAntiLink) return reply("EMANG AKTIF?");
          var ini = antilink.indexOf(from);
          antilink.splice(ini, 1);
          fs.writeFileSync(
            "./database/group/antilink.json",
            JSON.stringify(antilink)
          );
          reply("「 SUKSES 」MEMATIKAN ANTI LINK DI GROUP");
        } else {
          reply("1 untuk mengaktifkan, 0 untuk menonaktifkan");
        }
        break;

      case "admin":
        if (isBanned) return reply(nad.baned());

        if (!isGroup) return reply(nad.groupo());
        teus = `*DAFTAR ATASAN GROUP* _${groupMetadata.subject}_\n*TOTAL* : ${groupAdmins.length}\n\n`;
        no = 0;
        for (let admon of groupAdmins) {
          no += 1;
          teus += `[${no.toString()}] @${admon.split("@")[0]}\n`;
        }
        mentions(teus, groupAdmins, true);

        break;
      case "grup":
      case "group":
        if (isBanned) return reply(nad.baned());
        if (!isGroup) return reply(nad.groupo());
        if (!isGroupAdmins) return reply(nad.admin());
        if (!isBotGroupAdmins) return reply(nad.badmin());
        if (args[1] === "buka") {
          reply(`*BERHASIL MEMBUKA GROUP*`);
          andre_bot.groupSettingChange(
            from,
            GroupSettingChange.messageSend,
            false
          );
        } else if (args[1] === "tutup") {
          reply(`*BERHASIL MENUTUP GROUP*`);
          andre_bot.groupSettingChange(
            from,
            GroupSettingChange.messageSend,
            true
          );
        }
        break;
      case "add":
        if (isBanned) return reply(nad.baned());

        if (!isGroup) return reply(nad.groupo());
        if (!isGroupAdmins) return reply(nad.admin());
        if (!isBotGroupAdmins) return reply(nad.badmin());
        if (args.length < 2) return reply("Yang mau di add siapa?");
        if (args[1].startsWith("08")) return reply("Gunakan kode bahasa ngab");
        try {
          num = `${args[1].replace(/ /g, "")}@s.whatsapp.net`;
          andre_bot.groupAdd(from, [num]);
        } catch (e) {
          console.log("Error :", e);
          reply(
            "Maaf, terjadi kesalahan saat menambahkan member. Kemungkinan karna nomor yang ingin di add di private atau baru saja keluar dari grup."
          );
        }
        break;
      case "kick":
        if (isBanned) return reply(nad.baned());

        if (!isGroup) return reply(nad.groupo());
        if (!isGroupAdmins) return reply(nad.admin());
        if (!isBotGroupAdmins) return reply(nad.badmin());
        if (
          mek.message.extendedTextMessage === undefined ||
          mek.message.extendedTextMessage === null
        )
          return reply("𝗧𝗮𝗴 𝘁𝗮𝗿𝗴𝗲𝘁 ??𝗮𝗻𝗴 𝗶𝗻𝗴𝗶𝗻 𝗱𝗶 𝘁𝗲𝗻𝗱𝗮𝗻𝗴!");
        mentioned = mek.message.extendedTextMessage.contextInfo.mentionedJid;
        if (mentioned.length > 1) {
          teys = "";
          for (let _ of mentioned) {
            teys += `Bismillah atas izin admin grup kamu akan saya tendang 🏃 :\n`;
            teys += `@_.split('@')[0]`;
          }
          mentions(teys, mentioned, true);
          andre_bot.groupRemove(from, mentioned);
        } else {
          mentions(
            `Bismillah atas izin admin grup kamu akan saya tendang @${
              mentioned[0].split("@")[0]
            } 🏃`,
            mentioned,
            true
          );
          andre_bot.groupRemove(from, mentioned);
        }
        break;
      case "hidetag":
        if (isBanned) return reply(nad.baned());

        if (!isGroup) return reply(nad.groupo());
        if (!isGroupAdmins) return reply(nad.admin());
        var value = body.slice(11);
        var group = await andre_bot.groupMetadata(from);
        var member = group["participants"];
        var mem = [];
        member.map(async (adm) => {
          mem.push(adm.id.replace("c.us", "s.whatsapp.net"));
        });
        var options = {
          text: value,
          contextInfo: { mentionedJid: mem },
          quoted: mek,
        };
        andre_bot.sendMessage(from, options, text);

        break;
      case "linkgrup":
        if (isBanned) return reply(nad.baned());

        if (!isGroup) return reply(nad.groupo());

        if (!isBotGroupAdmins) return reply(nad.badmin());
        linkgc = await andre_bot.groupInviteCode(from);
        yeh = `https://chat.whatsapp.com/${linkgc}\n\nlink Group *${groupName}*`;
        andre_bot.sendMessage(from, yeh, text, { quoted: mek });

        break;
      case "tagall":
        if (isBanned) return reply(nad.baned());

        if (!isGroup) return reply(nad.groupo());
        if (!isGroupAdmins) return reply(nad.admin());
        members_id = [];
        tets = args.length > 1 ? body.slice(10).trim() : "";
        for (let mem of groupMembers) {
          tets += "\n\n";
          tets += `➸ @${mem.jid.split("@")[0]}\n`;
          members_id.push(mem.jid);
        }
        mentions(tets, members_id, true);

        break;
      case "tagall":
        if (!isGroup) return reply(ind.groupo());
        if (!isGroupAdmins) return reply(ind.admin());
        members_id = [];
        ters = args.length > 1 ? body.slice(10).trim() : "";
        ters += "\n\n";
        for (let mem of groupMembers) {
          ters += `➸ @${mem.jid.split("@")[0]}\n`;
          members_id.push(mem.jid);
        }
        mentions(ters, members_id, true);
        break;
      case "setname":
        if (!isGroup) return reply(nad.groupo());
        if (!isGroupAdmins) return reply(nad.admin());
        if (!isBotGroupAdmins) return reply(nad.badmin());
        andre_bot.groupUpdateSubject(from, `${body.slice(11)}`);
        andre_bot.sendMessage(from, "「 SUKSES 」Mengubah Nama Grup", text, {
          quoted: mek,
        });
        break;
      case "setdesc":
        if (!isGroup) return reply(nad.groupo());
        if (!isGroupAdmins) return reply(nad.admin());
        if (!isBotGroupAdmins) return reply(nad.badmin());
        andre_bot.groupUpdateDescription(from, `${body.slice(11)}`);
        andre_bot.sendMessage(from, "*「 SUKSES 」Mengubah Desk Grup", text, {
          quoted: mek,
        });
        break;
      case "demote":
        if (!isGroup) return reply(nad.groupo());
        if (!isGroupAdmins) return reply(nad.admin());
        if (!isBotGroupAdmins) return reply(nad.badmin());
        if (
          mek.message.extendedTextMessage === undefined ||
          mek.message.extendedTextMessage === null
        )
          return reply("𝗧𝗮𝗴 𝘁𝗮𝗿𝗴𝗲𝘁 𝘆𝗮𝗻𝗴 𝗶𝗻𝗴𝗶𝗻 𝗱𝗶 𝘁𝗲𝗻𝗱𝗮𝗻𝗴!");
        mentioned = mek.message.extendedTextMessage.contextInfo.mentionedJid;
        if (mentioned.length > 1) {
          tews = "";
          for (let _ of mentioned) {
            tews += `*jabatan kamu di copot*🏃 :\n`;
            tews += `@_.split('@')[0]`;
          }
          mentions(tews, mentioned, true);
          andre_bot.groupDemoteAdmin(from, mentioned);
        } else {
          mentions(
            `Yahh @${
              mentioned[0].split("@")[0]
            } Jabatan kamu sebagai leluhur di grup telah di copot🏃`,
            mentioned,
            true
          );
          andre_bot.groupDemoteAdmin(from, mentioned);
        }
        break;
      case "promote":
        if (!isGroup) return reply(nad.groupo());
        if (!isGroupAdmins) return reply(nad.admin());
        if (!isBotGroupAdmins) return reply(nad.badmin());
        if (
          mek.message.extendedTextMessage === undefined ||
          mek.message.extendedTextMessage === null
        )
          return reply("𝗧𝗮𝗴 ??𝗮??𝗴𝗲𝘁 𝘆𝗮𝗻𝗴 𝗶𝗻𝗴𝗶𝗻 𝗱𝗶 𝘁𝗲𝗻𝗱𝗮𝗻𝗴!");
        mentioned = mek.message.extendedTextMessage.contextInfo.mentionedJid;
        if (mentioned.length > 1) {
          tems = "";
          for (let _ of mentioned) {
            tems += `Yeee🥳 Kamu naik jabatan >_< :\n`;
            tems += `@_.split('@')[0]`;
          }
          mentions(tems, mentioned, true);
          andre_bot.groupMakeAdmin(from, mentioned);
        } else {
          mentions(
            `Selamat🥳 @${
              mentioned[0].split("@")[0]
            } *anda naik menjadi admin group* >_<`,
            mentioned,
            true
          );
          andre_bot.groupMakeAdmin(from, mentioned);
        }
        break;
      case "hedsot":
        if (!isGroup) return reply(nad.groupo());
        if (!isGroupAdmins) return reply(nad.admin());
        if (!isBotGroupAdmins) return reply(nad.badmin());
        if (
          mek.message.extendedTextMessage === undefined ||
          mek.message.extendedTextMessage === null
        )
          return reply("Tag target yang ingin di tendang!");
        mentioned = mek.message.extendedTextMessage.contextInfo.mentionedJid;
        if (mentioned.length > 1) {
          tecs = "Bismillah Hedsot >_< :\n";
          for (let _ of mentioned) {
            tecs += `@${_.split("@")[0]}\n`;
          }
          mentions(tecs, mentioned, true);
          andre_bot.groupRemove(from, mentioned);
          mentions(tecs, mentioned, true);
          andre_bot.groupAdd(from, [num]);
        } else {
          mentions(
            `Berhasil Meng hedsot pala nya  : @${mentioned[0].split("@")[0]}`,
            mentioned,
            true
          );
          andre_bot.groupRemove(from, mentioned);
        }
        break;
      case "fitnah":
        if (isBanned) return reply(nad.baned());

        if (!isGroup) return reply(nad.groupo());
        if (args.length < 2)
          return reply(
            `Gini ngab : ${prefix}fitnah [@tag&pesan&balasanbot]\n\nContoh : ${prefix}fitnah @tagmember&hai&hai juga`
          );
        var gh = body.slice(10);
        mentioned = mek.message.extendedTextMessage.contextInfo.mentionedJid;
        var replace = gh.split("&")[0];
        var target = gh.split("&")[1];
        var bot = gh.split("&")[2];
        andre_bot.sendMessage(from, `${bot}`, text, {
          quoted: {
            key: {
              fromMe: false,
              participant: `${mentioned}`,
              ...(from ? { remoteJid: from } : {}),
            },
            message: { conversation: `${target}` },
          },
        });

        break;
      case "leave":
        if (isBanned) return reply(nad.baned());

        if (!isGroup) return reply(nad.groupo());
        if (!isGroupAdmins) return reply(nad.admin());
        setTimeout(() => {
          andre_bot.groupLeave(from);
        }, 2000);
        setTimeout(() => {
          andre_bot.updatePresence(from, Presence.composing);

          if (isBanned) return reply(nad.baned());
          andre_bot.sendMessage(from, "Aku pamit ngab:)", text);
        }, 0);
        break;
      /*
]=====> DOWNLOAD MENU <=====[
*/
      case "play":
        if (isBanned) return reply(nad.baned());

        reply(nad.wait());
        anu = await fetchJson(
          `https://api.xteam.xyz/dl/play?lagu=${body.slice(
            8
          )}&APIKEY=${XteamKey}`
        );
        if (anu.error) return reply(anu.error);
        infomp3 = `*「❗」Lagu Ditemukan「❗」*\n➸ Judul : ${anu.judul}\n➸ Size : ${anu.size}\n\n*[WAIT] Proses Dumlu Yakan*`;
        bumfer = await getBuffer(anu.thumbnail);
        lamgu = await getBuffer(anu.url);
        andre_bot.sendMessage(from, bumfer, image, {
          quoted: mek,
          caption: infomp3,
        });
        andre_bot.sendMessage(from, lamgu, audio, {
          mimetype: "audio/mp4",
          quoted: mek,
        });
        break;
      case "ytmp3":
        if (isBanned) return reply(nad.baned());

        reply(nad.wait());
        anu = await fetchJson(
          `https://api.zeks.xyz/api/ytmp3/2?url=${body.slice(7)}&apikey=apivinz`
        );
        if (anu.error) return reply(anu.error);
        ingfomp3 = `*「❗」Lagu Ditemukan「❗」*\n➸ Judul : ${anu.result.title}\n➸ Size : ${anu.result.size}\n\n*[WAIT] Proses Dumlu Yakan*`;
        buffer = await getBuffer(anu.result.thumb);
        lagu = await getBuffer(anu.result.link);
        andre_bot.sendMessage(from, buffer, image, {
          quoted: mek,
          caption: ingfomp3,
        });
        andre_bot.sendMessage(from, lagu, audio, {
          mimetype: "audio/mp4",
          quoted: mek,
        });

        break;
      case "igvideo":
        if (isBanned) return reply(nad.baned());

        reply(nad.wait());
        anu = await fetchJson(
          `https://api.zeks.xyz/api/ig?url=${body.slice(11)}&apikey=apivinz`
        );
        if (anu.error) return reply(anu.error);
        igv = await getBuffer(anu.result[0].url);
        andre_bot.sendMessage(from, igv, video, {
          mimetype: "video/mp4",
          quoted: mek,
        });

        break;
      case "igphoto":
        if (isBanned) return reply(nad.baned());

        reply(nad.wait());
        asu = await fetchJson(
          `https://api.zeks.xyz/api/ig?url=${body.slice(11)}&apikey=apivinz`
        );
        if (asu.error) return reply(asu.error);
        igp = await getBuffer(asu.result[0].url);
        andre_bot.sendMessage(from, igp, image, { quoted: mek });

        break;
      /*
]=====> RANDOM MENU <=====[
*/
      case "pokemon":
        if (isBanned) return reply(nad.baned());

        if (!isGroup) return reply(nad.groupo());
        if (!isNsfw) return reply(nad.nsfwoff());
        anu = await fetchJson(`https://api.fdci.se/rep.php?gambar=pokemon`, {
          method: "get",
        });
        reply(nad.wait());
        var n = JSON.parse(JSON.stringify(anu));
        var nimek = n[Math.floor(Math.random() * n.length)];
        pok = await getBuffer(nimek);
        andre_bot.sendMessage(from, pok, image, { quoted: mek });

        break;
      case "anjing":
        if (isBanned) return reply(nad.baned());

        if (!isGroup) return reply(nad.groupo());
        if (!isNsfw) return reply(nad.nsfwoff());
        anu = await fetchJson(`https://api.fdci.se/rep.php?gambar=anjing`, {
          method: "get",
        });
        reply(nad.wait());
        var n = JSON.parse(JSON.stringify(anu));
        var nimek = n[Math.floor(Math.random() * n.length)];
        pok = await getBuffer(nimek);
        andre_bot.sendMessage(from, pok, image, { quoted: mek });

        break;
      case "neko":
        if (isBanned) return reply(nad.baned());

        res = await fetchJson(
          `https://tobz-api.herokuapp.com/api/nekonime?apikey=BotWeA`,
          { method: "get" }
        );
        buffer = await getBuffer(res.result);
        andre_bot.sendMessage(from, buffer, image, {
          quoted: mek,
          caption: "Nih nekonime mu >_<",
        });

        break;
      case "nsfwneko":
        if (isBanned) return reply(nad.baned());

        nikko = await getBuffer(
          `https://api.xteam.xyz/randomimage/nsfwneko?APIKEY=${XteamKey}`,
          { method: "get" }
        );
        andre_bot.sendMessage(from, nikko, image, {
          quoted: mek,
          caption: "Jangan Comly >_<",
        });

        break;
      case "kpop":
        if (isBanned) return reply(nad.baned());

        reply(nad.wait());
        anu = await fetchJson(
          `https://tobz-api.herokuapp.com/api/randomkpop?apikey=BotWeA`,
          { method: "get" }
        );
        if (anu.error) return reply(anu.error);
        buffer = await getBuffer(anu.result);
        randomkpop = `*PLASTIQUE*`;
        andre_bot.sendMessage(from, buffer, image, {
          quoted: mek,
          caption: randomkpop,
        });

        break;
      case "wibu":
        if (isBanned) return reply(nad.baned());

        data = await fetchJson(
          `https://api.zeks.xyz/api/nekonime?apikey=apivinz`
        );
        buffer = await getBuffer(data.result.result);
        andre_bot.sendMessage(from, buffer, image, {
          quoted: mek,
          caption: "VVibu AbiZzz :v",
        });

        break;
      case "loli":
        if (isBanned) return reply(nad.baned());

        data = await fetchJson(
          `https://api.shizukaa.xyz/api/randomloli?apikey=itsmeiky633`
        );
        buper = await getBuffer(data.result);
        andre_bot.sendMessage(from, buper, image, {
          quoted: mek,
          caption: "Cintai Loli Mu >_<",
        });

        break;
      case "darkjokes":
      case "darkjoke":
        if (isBanned) return reply(nad.baned());

        data = fs.readFileSync("./src/darkjokes.js");
        jsonData = JSON.parse(data);
        randIndex = Math.floor(Math.random() * jsonData.length);
        randKey = jsonData[randIndex];
        hasil = await getBuffer(randKey.result);
        sendImage(hasil, mek, "*GELAP BOS :V*");

        break;
      case "moddroid":
        if (isBanned) return reply(nad.baned());

        data = await fetchJson(
          `https://tobz-api.herokuapp.com/api/moddroid?q=${body.slice(
            10
          )}&apikey=BotWeA`
        );
        hepi = data.result[0];
        teos = `*➸ Nama*: ${data.result[0].title}\n*➸ publisher*: ${hepi.publisher}\n*➸ mod info:* ${hepi.mod_info}\n*➸ size*: ${hepi.size}\n*➸ latest version*: ${hepi.latest_version}\n*➸ genre*: ${hepi.genre}\n*➸ link:* ${hepi.link}\n*➸ download*: ${hepi.download}`;
        buffer = await getBuffer(hepi.image);
        andre_bot.sendMessage(from, buffer, image, {
          quoted: mek,
          caption: `${teos}`,
        });
        break;
      case "brainly":
        if (isBanned) return reply(nad.baned());

        brien = body.slice(11);
        if (args.length < 2) {
          return reply(
            `Untuk mencari pertanyaan dan jawaban dari brainly\nPenggunaan : ${prefix}brainly <pertanyaan>`
          );
        }
        brainly(`${brien}`).then((res) => {
          teds = "♡───────────♡\n";
          // console.log(res);
          for (let Y of res.data) {
            teds += `\n*「 BRAINLY 」*\n\n*➸ Pertanyaan:* ${Y.pertanyaan}\n\n*➸ Jawaban:* ${Y.jawaban[0].text}\n♡───────────♡\n`;
          }
          andre_bot.sendMessage(from, teds, text, {
            quoted: mek,
            detectLinks: false,
          });
          console.log(res);
        });

        break;
      case "info":
        me = andre_bot.user;
        uptime = process.uptime();
        const tecs = `*➸ Nama bot* : ${
          me.name
        }\n*➸ OWNER* : ${ownerName}\n*➸ DEVELOPER* : andre_bot\n*➸ Nomor Bot* : @${
          me.jid.split("@")[0]
        }\n*➸ Prefix* : ${prefix}\n*➸ Total Block Contact* : ${
          blocked.length
        }\n*➸ The bot is active on* : ${kyun(uptime)}`;
        buffer = await getBuffer(me.imgUrl);
        andre_bot.sendMessage(from, buffer, image, {
          caption: tecs,
          contextInfo: { mentionedJid: [me.jid] },
        });
        break;
      case "admin":
      case "owner":
      case "creator":
        andre_bot.sendMessage(
          from,
          { displayname: "Jeff", vcard: vcard },
          MessageType.contact,
          { quoted: mek }
        );
        andre_bot.sendMessage(
          from,
          "Jika mau sewa bot, pembuatan SC bot, pembuatan website online shop dll bisa sama owner yaa",
          MessageType.text,
          { quoted: mek }
        );
        break;
      case "hartatahta":
        if (isBanned) return reply(nad.baned());

        if (args.length < 2)
          return reply(
            `Teksnya mana ngab?\nContoh : ${prefix}hartatahta BOTWA`
          );
        tahta = body.slice(12);
        reply("「❗」Hirti Tihti ndasmu :v ");
        bupfer = await getBuffer(
          `https://api.zeks.xyz/api/hartatahta?text=${tahta}&apikey=apivinz`
        );
        andre_bot.sendMessage(from, bupfer, image, { quoted: mek });

        break;
      case "artijodoh":
        if (isBanned) return reply(nad.baned());

        if (args.length < 2)
          return reply(
            `Teksnya mana ngab?\nContoh : ${prefix}artijodoh Andre & Nadila`
          );
        var gh = body.slice(11);
        var jod = gh.split("&")[0];
        var oh = gh.split("&")[1];
        jodoh = await fetchJson(
          `https://api.zeks.xyz/api/primbonjodoh?apikey=apivinz&nama1=${jod}&nama2=${oh}`
        );
        hasilya =
          "「 ARTI JODOH 」\nNama : " +
          jodoh.result.nama1 +
          "\nPasangan :" +
          jodoh.result.nama2 +
          "\n\nPositif : " +
          jodoh.result.positif +
          "\nNegatif : " +
          jodoh.result.negatif;
        arti = await getBuffer(jodoh.result.thumb);
        andre_bot.sendMessage(from, arti, image, {
          quoted: mek,
          caption: hasilya,
        });

        break;
      case "trigered":
        if (isBanned) return reply(nad.baned());

        var imgbb = require("imgbb-uploader");
        if (
          ((isMedia && !mek.message.videoMessage) || isQuotedImage) &&
          args.length == 1
        ) {
          ger = isQuotedImage
            ? JSON.parse(JSON.stringify(mek).replace("quotedM", "m")).message
                .extendedTextMessage.contextInfo
            : mek;
          reply(nad.wait());
          owgi = await andre_bot.downloadAndSaveMediaMessage(ger);
          anu = await imgbb("9558de4c8e793fcb097bc82cc1c98b23", owgi);
          tezs = `${anu.display_url}`;
          ranp = getRandom(".gif");
          rano = getRandom(".webp");
          anu1 = `https://some-random-api.ml/canvas/triggered?avatar=${tezs}`;
          exec(
            `wget ${anu1} -O ${ranp} && ffmpeg -i ${ranp} -vcodec libwebp -filter:v fps=fps=20 -lossless 1 -loop 0 -preset default -an -vsync 0 -s 512:512 ${rano}`,
            (err) => {
              fs.unlinkSync(ranp);
              if (err) return reply("GAGAL UM");
              nobg = fs.readFileSync(rano);
              andre_bot.sendMessage(from, nobg, sticker, { quoted: mek });
              fs.unlinkSync(rano);
            }
          );
        } else {
          reply("Pake foto ngab");
        }
        break;
      case "addprem":
        if (!isOwner) return reply(nad.ownerb());
        addp = body.slice(10);
        premium.push(`${addp}@s.whatsapp.net`);
        fs.writeFileSync(
          "./database/user/premium.json",
          JSON.stringify(premium)
        );
        reply(`Berhasil Menambahkan ${addp} Ke Daftar Premium`);
        break;
      case "dellprem":
        if (!isOwner) return reply(nad.ownerb());
        oh = body.slice(11);
        delp = premium.indexOf(oh);
        premium.splice(delp, 1);
        fs.writeFileSync(
          "./database/user/premium.json",
          JSON.stringify(premium)
        );
        reply(`Berhasil Menghapus ${oh} Dari Daftar Premium`);
        break;
      case "bc":
        andre_bot.updatePresence(from, Presence.composing);
        if (!isOwner) return reply(nad.ownerb());
        if (args.length < 2) return reply(".......");
        anu = await andre_bot.chats.all();
        if ((isMedia && !mek.message.videoMessage) || isQuotedImage) {
          const encmedia = isQuotedImage
            ? JSON.parse(JSON.stringify(mek).replace("quotedM", "m")).message
                .extendedTextMessage.contextInfo
            : mek;
          buff = await andre_bot.downloadMediaMessage(encmedia);
          for (let _ of anu) {
            andre_bot.sendMessage(_.jid, buff, image, {
              caption: `*「 andre_bot BROADCAST 」*\n\n${body.slice(6)}`,
            });
          }
          reply("");
        } else {
          for (let _ of anu) {
            sendMess(_.jid, `*「 andre_bot BROADCAST 」*\n\n${body.slice(6)}`);
          }
          reply("*「 SUKSES BOSKU 」*");
        }
        break;
      case "bcgc":
        if (!isOwner) return reply(nad.ownerb());
        if (args.length < 2) return reply("Teksnya mana bosku >_<");
        anu = await groupMembers;
        nom = mek.participant;
        if ((isMedia && !mek.message.videoMessage) || isQuotedImage) {
          const encmedia = isQuotedImage
            ? JSON.parse(JSON.stringify(mek).replace("quotedM", "m")).message
                .extendedTextMessage.contextInfo
            : mek;
          buff = await andre_bot.downloadMediaMessage(encmedia);
          for (let _ of anu) {
            andre_bot.sendMessage(_.jid, buff, image, {
              caption: `*「 BC GROUP 」*\n\n➸ Dari Grup : ${groupName}\n➸ Pengirim : wa.me/${
                sender.split("@")[0]
              }\n➸ Pesan : ${body.slice(8)}`,
            });
          }
          reply("*「 SUKSES BOSKU 」*");
        } else {
          for (let _ of anu) {
            sendMess(
              _.jid,
              `*「 BC GROUP 」*\n\n➸ Dari Grup : ${groupName}\n➸ Pengirim : wa.me/${
                sender.split("@")[0]
              }\n➸ Pesan : ${body.slice(8)}`
            );
          }
          reply("*「 SUKSES BOSKU 」*");
        }
        break;
      case "setreply":
        if (!isOwner) return reply(nad.ownerb());
        andre_bot.updatePresence(from, Presence.composing);
        if (args.length < 2) return;
        cr = body.slice(10);
        reply(`reply berhasil di ubah menjadi : ${cr}`);

        break;
      case "setprefix":
        if (args.length < 2) return;
        if (!isOwner) return reply(nad.ownerb());
        prefix = args[1];
        reply(`*「 SUKSES 」* Prefix jadi ➸ : ${prefix}`);
        break;
      case "clearall":
        if (!isOwner) return reply(nad.ownerb());
        anu = await andre_bot.chats.all();
        andre_bot.setMaxListeners(25);
        for (let _ of anu) {
          andre_bot.deleteChat(_.jid);
        }
        reply(nad.clears());
        break;
      case "block":
        andre_bot.updatePresence(from, Presence.composing);
        andre_bot.chatRead(from);
        if (!isGroup) return reply(nad.groupo());
        if (!isOwner) return reply(nad.ownerb());
        andre_bot.blockUser(`${body.slice(7)}@c.us`, "add");
        andre_bot.sendMessage(
          from,
          `perintah Diterima, memblokir ${body.slice(7)}@c.us`,
          text
        );
        break;
      case "unblock":
        if (!isGroup) return reply(nad.groupo());
        if (!isOwner) return reply(nad.ownerb());
        andre_bot.blockUser(`${body.slice(11)}@c.us`, "remove");
        andre_bot.sendMessage(
          from,
          `Perintah Diterima, membuka ${body.slice(11)}@c.us`,
          text
        );
        break;
      case "setppbot":
        if (!isOwner) return reply(nad.ownerb());
        andre_bot.updatePresence(from, Presence.composing);
        if (!isQuotedImage)
          return reply(
            `Kirim gambar dengan caption ${prefix}setbotpp atau tag gambar yang sudah dikirim`
          );
        enmedia = JSON.parse(JSON.stringify(mek).replace("quotedM", "m"))
          .message.extendedTextMessage.contextInfo;
        media = await andre_bot.downloadAndSaveMediaMessage(enmedia);
        await andre_bot.updateProfilePicture(botNumber, media);
        reply("Makasih profil barunya bosku😗");
        break;
      case "clone":
        if (!isGroup) return reply(nad.groupo());
        if (!isOwner) return reply(nad.ownerg());
        if (args.length < 2) return reply(" *TAG YANG MAU DI CLONE!!!* ");
        if (
          mek.message.extendedTextMessage === undefined ||
          mek.message.extendedTextMessage === null
        )
          return reply("Tag cvk");
        mentioned = mek.message.extendedTextMessage.contextInfo.mentionedJid[0];
        let { jid, id, notify } = groupMembers.find((x) => x.jid === mentioned);
        try {
          pp = await andre_bot.getProfilePicture(id);
          buffer = await getBuffer(pp);
          andre_bot.updateProfilePicture(botNumber, buffer);
          mentions(
            `Foto profile Berhasil di perbarui menggunakan foto profile @${
              id.split("@")[0]
            }`,
            [jid],
            true
          );
        } catch (e) {
          reply(nad.stikga());
        }

        break;
      case "ban":
        if (!isOwner) return reply(nad.ownerb());
        bnnd = body.slice(8);
        ban.push(`${bnnd}@s.whatsapp.net`);
        fs.writeFileSync("./database/user/banned.json", JSON.stringify(ban));
        reply(`Nomor ${bnnd} telah dibanned!`);
        break;
      case "unban":
        if (!isOwner) return reply(nad.ownerb());
        ya = body.slice(10);
        unb = ban.indexOf(ya);
        ban.splice(unb, 1);
        fs.writeFileSync("./database/user/banned.json", JSON.stringify(ban));
        reply(`Nomor ${ya} telah di unban!`);
        break;
      case "resetlimit":
        if (!isOwner) return reply(nad.ownerb());
        var ngonsol = [];
        rest = _limit.indexOf();
        _limit.splice(rest);
        fs.writeFileSync("./database/user/limit.json", JSON.stringify(ngonsol));
        reply(`LIMIT BERHASIL DI RESET BOS`);
        break;
      // SOUND
      case "iri":
        if (isBanned) return reply(nad.baned());

        const irimp3 = fs.readFileSync("./assets/iri.mp3");
        andre_bot.sendMessage(from, irimp3, MessageType.audio, {
          quoted: mek,
          mimetype: "audio/mp4",
          ptt: true,
        });

        break;
      case "pale":
        if (isBanned) return reply(nad.baned());

        const pa = fs.readFileSync("assets/pale.mp3");
        andre_bot.sendMessage(from, pa, MessageType.audio, {
          quoted: mek,
          mimetype: "audio/mp4",
          ptt: true,
        });

        break;
      case "sound1":
        if (isBanned) return reply(nad.baned());

        satu = fs.readFileSync("./assets/sound1.mp3");
        andre_bot.sendMessage(from, satu, MessageType.audio, {
          quoted: mek,
          mimetype: "audio/mp4",
          ptt: true,
        });

        break;
      case "sound2":
        if (isBanned) return reply(nad.baned());

        dua = fs.readFileSync("./assets/sound2.mp3");
        andre_bot.sendMessage(from, dua, MessageType.audio, {
          quoted: mek,
          mimetype: "audio/mp4",
          ptt: true,
        });

        break;
      case "sound3":
        if (isBanned) return reply(nad.baned());

        tiga = fs.readFileSync("./assets/sound3.mp3");
        andre_bot.sendMessage(from, tiga, MessageType.audio, {
          quoted: mek,
          mimetype: "audio/mp4",
          ptt: true,
        });

        break;
      case "sound4":
        if (isBanned) return reply(nad.baned());

        empat = fs.readFileSync("./assets/sound4.mp3");
        andre_bot.sendMessage(from, empat, MessageType.audio, {
          quoted: mek,
          mimetype: "audio/mp4",
          ptt: true,
        });

        break;
      case "sound5":
        if (isBanned) return reply(nad.baned());

        lima = fs.readFileSync("./assets/sound5.mp3");
        andre_bot.sendMessage(from, lima, MessageType.audio, {
          quoted: mek,
          mimetype: "audio/mp4",
          ptt: true,
        });

        break;
      case "sound6":
        if (isBanned) return reply(nad.baned());

        enam = fs.readFileSync("./assets/sound6.mp3");
        andre_bot.sendMessage(from, enam, MessageType.audio, {
          quoted: mek,
          mimetype: "audio/mp4",
          ptt: true,
        });

        break;
      case "sound7":
        if (isBanned) return reply(nad.baned());

        tujuh = fs.readFileSync("./assets/sound7.mp3");
        andre_bot.sendMessage(from, tujuh, MessageType.audio, {
          quoted: mek,
          mimetype: "audio/mp4",
          ptt: true,
        });

        break;
      case "sound8":
        if (isBanned) return reply(nad.baned());

        lapan = fs.readFileSync("./assets/sound8.mp3");
        andre_bot.sendMessage(from, lapan, MessageType.audio, {
          quoted: mek,
          mimetype: "audio/mp4",
          ptt: true,
        });

        break;
      case "sound9":
        if (isBanned) return reply(nad.baned());

        bilan = fs.readFileSync("./assets/sound9.mp3");
        andre_bot.sendMessage(from, bilan, MessageType.audio, {
          quoted: mek,
          mimetype: "audio/mp4",
          ptt: true,
        });

        break;
      case "sound10":
        if (isBanned) return reply(nad.baned());

        puluh = fs.readFileSync("./assets/sound10.mp3");
        andre_bot.sendMessage(from, puluh, MessageType.audio, {
          quoted: mek,
          mimetype: "audio/mp4",
          ptt: true,
        });

        break;
      default:
        if (budy == "cekprefix") {
          reply(`*${botName} MENGGUNAKAN PREFIX :「 ${prefix} 」*`);
        }
        if (isGroup && !isCmd && isSimi && budy != undefined) {
          console.log(budy);
          muehe = await simih(budy);
          //		reply(ind.cmdnf(prefix, command))
        }
    }
  } catch (e) {
    console.log("Error : %s", color(e, "red"));
    console.log(e);
  }
});
