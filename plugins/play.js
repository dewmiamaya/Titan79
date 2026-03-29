const { cmd } = require("../command");
const fetch = require("node-fetch");

// 🔍 Multi search system
async function ytSearch(query) {
  const apis = [
    async () => {
      const r = await fetch(`https://api.zenzxz.my.id/api/search/youtube?q=${encodeURIComponent(query)}`);
      const d = await r.json();
      if (d.status && d.result?.length) {
        return {
          title: d.result[0].title,
          url: d.result[0].url
        };
      }
    },
    async () => {
      const r = await fetch(`https://vihangayt.me/api/ytsearch?q=${encodeURIComponent(query)}`);
      const d = await r.json();
      if (d.status && d.result?.data?.length) {
        return {
          title: d.result.data[0].title,
          url: d.result.data[0].url
        };
      }
    }
  ];

  for (let api of apis) {
    try {
      const res = await api();
      if (res) return res;
    } catch {}
  }

  throw "Search API failed";
}

// 🎵 MP3 downloader (same fallback)
async function getMp3(url) {
  const apis = [
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

  throw "Download API failed";
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
    const vid = await ytSearch(msg);

    await m.reply(`🔎 Found: ${vid.title}`);

    const link = await getMp3(vid.url);

    await conn.sendMessage(m.chat, {
      audio: { url: link },
      mimetype: "audio/mpeg"
    }, { quoted: m });

  } catch (e) {
    console.log(e);
    m.reply("❌ APIs down 😢 Try later");
  }
});
