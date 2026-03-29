const { cmd } = require("../command");
const fetch = require("node-fetch");

// 🔍 YouTube search
async function ytSearch(query) {
  const r = await fetch(`https://api.dylux.xyz/search/ytsearch?q=${encodeURIComponent(query)}`);
  const d = await r.json();
  if (!d.status || !d.result.length) throw "No results";

  return d.result[0]; // first result
}

// 🎵 MP3 downloader (fallback system)
async function getMp3(url) {
  const apis = [
    async () => {
      const r = await fetch(`https://api.dylux.xyz/download/ytmp3?url=${url}`);
      const d = await r.json();
      if (d.status && d.result?.download) return d.result.download;
    },
    async () => {
      const r = await fetch(`https://api.zenzxz.my.id/api/downloader/ytmp3?url=${url}`);
      const d = await r.json();
      if (d.status && d.result?.url) return d.result.url;
    },
    async () => {
      const r = await fetch(`https://vihangayt.me/api/ytdl/mp3?url=${url}`);
      const d = await r.json();
      if (d.status && d.result?.download) return d.result.download;
    }
  ];

  for (let api of apis) {
    try {
      const res = await api();
      if (res) return res;
    } catch {}
  }

  throw "All APIs failed";
}

// 🎧 command
cmd({
  pattern: "play",
  desc: "Search & Download MP3",
  category: "download",
  react: "🎶"
}, async (conn, m, msg) => {

  if (!msg) return m.reply("❗ Song name එක දාන්න");

  try {
    // 🔍 search
    const vid = await ytSearch(msg);

    await m.reply(`🔎 Found: ${vid.title}`);

    // 🎵 download
    const link = await getMp3(vid.url);

    await conn.sendMessage(m.chat, {
      audio: { url: link },
      mimetype: "audio/mpeg"
    }, { quoted: m });

  } catch (e) {
    console.log(e);
    m.reply("❌ Search/Download failed");
  }
});
