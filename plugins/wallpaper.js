
const { cmd } = require("../command");
const axios = require("axios");

cmd(
  {
    pattern: "wall",
    alias: ["wallpaper"],
    react: "🖼️",
    desc: "Download Wallpapers",
    category: "download",
    filename: __filename,
  },
  async (
    conn,
    mek,
    m,
    {
      from,
      q,
      reply,
    }
  ) => {
    try {
      if (!q) return reply(`╭━━━〔 🌐 MALSHAN-MD WALLPAPER SERVICE 〕━━━╮

🇬🇧  Welcome to MALSHAN-MD wallpaper service
🇰🇷  MALSHAN-MD 배경화면 서비스에 오신 것을 환영합니다.

────────────────────────────

🇬🇧  How to use this command correctly ➡️ (.wall The name of the wallpaper you want)
🇰🇷  이 명령어를 올바르게 사용하는 방법 ➡️ (.wall 원하시는 배경화면의 이름)

────────────────────────────

MALSHAN-MD AI 및 멀티미디어 서비스를 이용해 주셔서 감사합니다. 좋은 하루 되세요💕...

╰━━━━━━━━━━━━━━━━━━━━━━━━━━━━╯`,);

      reply("*🔍 MALSHAN-MD Searching for HD wallpapers... Please wait a moment.*");

      const res = await axios.get(`https://wallhaven.cc/api/v1/search?q=${encodeURIComponent(q)}&sorting=random&resolutions=1920x1080,2560x1440,3840x2160`);
      const wallpapers = res.data.data;

      if (!wallpapers || wallpapers.length === 0) {
        return reply("*❌ No HD wallpapers found for that keyword.*");
      }

      const selected = wallpapers.slice(0, 5); // get top 5

      const header = `MALSHAN-MD WALLPAPER DOWNLOADER`;

      await conn.sendMessage(
        from,
        {
          image: {
            url: "https://raw.githubusercontent.com/dewmiamaya/Titan79/refs/heads/main/images/20260328_175039.jpg",
          },
          caption: header,
        },
        { quoted: mek }
      );

      for (const wallpaper of selected) {
        const caption = `
📥 *Resolution:* ${wallpaper.resolution}
🔗 *Link:* ${wallpaper.url}
`;

        await conn.sendMessage(
          from,
          {
            image: { url: wallpaper.path },
            caption,
          },
          { quoted: mek }
        );
      }

      return reply("*🌟 Enjoy your HD wallpapers! Thank you for using MALSHAN-MD.*");
    } catch (e) {
      console.error(e);
      reply(`*❌ Error:* ${e.message || e}`);
    }
  }
);


