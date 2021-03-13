const help = (pushname, prefix, botName, ownerName, sender) => {
  return `🔰 -----[ *MENU ${botName}* ]----- 🔰

Hallo, ${pushname} 👋
Saya adalah Andre Bot V1.0, Dibuat dengan bahasa pemrograman JavaScript dan dijalankan menggunakan runtime NodeJS. Selamat menggunakan✨
┏━━━━━━━━━━━━━━━━━━━━┓
┃╭───────────────────
┃│➸ Nama : ${pushname}
┃│➸ Nomer : wa.me/${sender.split("@")[0]}
┃╰───────────────────
┗━━━━━━━━━━━━━━━━━━━━┛
Berikut adalah fitur yang ada pada bot ini!✨
──「 *LIST MENU* 」──
「 *M A K E R* 」
❏ *${prefix}sticker* 
❏ *${prefix}ttp*
❏ *${prefix}toimg*
「 *F U N  M E N U* 」
❏ *${prefix}bisakah* <teks>
❏ *${prefix}kapankah* <teks>
❏ *${prefix}apakah* <teks>
❏ *${prefix}moddroid* <teks>
❏ *${prefix}darkjoke* <teks>
❏ *${prefix}meme* <teks>
❏ *${prefix}happymod* <teks>
「 *M E D I A* 」
❏ *${prefix}brainly* 
❏ *${prefix}igstalk* <username>
❏ *${prefix}tiktok* <username>
❏ *${prefix}kbbi* <text>
「 *D O W L O A D E R* 」
❏ *${prefix}ytmp3* <link>
❏ *${prefix}ytmp4* <link>
「 *N S F W* 」
❏ *${prefix}anjing*
❏ *${prefix}blowjob*
❏ *${prefix}neko*
❏ *${prefix}pokemon*
❏ *${prefix}nangis*
❏ *${prefix}cium*
❏ *${prefix}peluk*
「 *G R O U P* 」
❏ *${prefix}hidetag5*
❏ *${prefix}hidetag10*
❏ *${prefix}level*
❏ *${prefix}linkgrup*
❏ *${prefix}tagall*
❏ *${prefix}add* <nomor>
❏ *${prefix}kick* <tag>
❏ *${prefix}setname* <teks>
❏ *${prefix}setdesc* <teks>
❏ *${prefix}demote* <tag>
❏ *${prefix}promote* <tag>
❏ *${prefix}group* [buka/tutup]
❏ *${prefix}leveling* [enable/disable]
❏ *${prefix}nsfw* [1/0]
❏ *${prefix}simih* [1/0]
❏ *${prefix}welcome* [1/0]
「 *O W N E R* 」
❏ *${prefix}bc* <teks>
❏ *${prefix}bcgc* <teks>
❏ *${prefix}setreply* <teks>
❏ *${prefix}setprefix* <symbol>
❏ *${prefix}clearall*
❏ *${prefix}block* <tag>
❏ *${prefix}unblock* <tag>
❏ *${prefix}leave*
❏ *${prefix}event* [1/0]
❏ *${prefix}clone* <tag>
❏ *${prefix}setppbot*
「 *B O T* 」
 *${prefix}info*
 *${prefix}donasi*
 *${prefix}owner*
🔰 -----[ *POWERED BY ${ownerName}* ]----- 🔰`;
};
exports.help = help;
