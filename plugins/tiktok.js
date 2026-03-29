const { cmd } = require("../command");
const { TiktokDL } = require("@tobyg74/tiktok-api-dl");

cmd({
  pattern: "tiktok",
  desc: "Download TikTok video",
  category: "download",
  react: "🎬"
}, async (conn, m, msg) => {

  if (!msg) return m.reply("❗ TikTok URL එක දාන්න");

  try {
    const data = await TiktokDL(msg);

    if (data.status !== "success") {
      return m.reply("❌ Failed to fetch video");
    }

    // video link (no watermark usually)
    const video = data.result.video?.[0] || data.result.video;

    await conn.sendMessage(m.chat, {
      video: { url: video },
      caption: `✅ ${data.result.desc || "Downloaded"}`
    }, { quoted: m });

  } catch (e) {
    console.log(e);
    m.reply("❌ Error downloading video");
  }
});
