const youtubedl = require('youtube-dl-exec');
const fs = require('fs');
const path = require('path');

module.exports = {
  name: 'play',
  command: ['play'],
  category: 'downloader',

  async execute(conn, m, args) {
    try {
      if (!args[0]) {
        return conn.sendMessage(m.chat, { text: '❌ Song name එකක් දාන්න' }, { quoted: m });
      }

      const query = args.join(' ');

      // 📂 downloads folder inside plugin
      const dir = path.join(__dirname, 'downloads');
      if (!fs.existsSync(dir)) fs.mkdirSync(dir);

      const filePath = path.join(dir, `song-${Date.now()}.mp3`);

      // ⏳ Loading message
      await conn.sendMessage(m.chat, { text: '⏳ Download වෙමින්...' }, { quoted: m });

      // 🔍 Search first result and download
      const info = await youtubedl(`ytsearch1:${query}`, { dumpSingleJson: true });
      let videoUrl;

      if (info.entries && info.entries.length > 0) {
        videoUrl = info.entries[0].webpage_url;
      } else if (info.webpage_url) {
        videoUrl = info.webpage_url;
      } else {
        return conn.sendMessage(m.chat, { text: '❌ Song not found' }, { quoted: m });
      }

      await youtubedl(videoUrl, {
        extractAudio: true,
        audioFormat: 'mp3',
        audioQuality: 0,
        output: filePath
      });

      // 📤 Send audio
      await conn.sendMessage(m.chat, {
        audio: fs.readFileSync(filePath),
        mimetype: 'audio/mpeg'
      }, { quoted: m });

      // 🗑 Delete temp file
      fs.unlinkSync(filePath);

    } catch (err) {
      console.log(err);
      await conn.sendMessage(m.chat, { text: '❌ Download fail උනා' }, { quoted: m });
    }
  }
};
