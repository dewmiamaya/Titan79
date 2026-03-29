const youtubedl = require('youtube-dl-exec');
const fs = require('fs');
const path = require('path');

const prefix = '.'; // changeable prefix

module.exports = {
  name: 'play',
  command: ['play'],
  category: 'downloader',

  async execute(conn, m) {
    try {
      const body = m.text || '';
      if (!body.startsWith(prefix)) return;

      const args = body.slice(prefix.length).trim().split(' ').slice(1);
      const command = body.slice(prefix.length).trim().split(' ')[0].toLowerCase();

      if (command !== 'play') return;
      if (!args[0]) return conn.sendMessage(m.chat, { text: '❌ Song name එකක් දාන්න' }, { quoted: m });

      const query = args.join(' ');

      // Send loading msg
      await conn.sendMessage(m.chat, { text: '⏳ Searching and downloading...' }, { quoted: m });

      // Search first 5 results
      const info = await youtubedl(`ytsearch5:${query}`, { dumpSingleJson: true });

      let video;
      if (info.entries && info.entries.length > 0) {
        video = info.entries[0]; // pick first result (can enhance to let user choose)
      } else {
        return conn.sendMessage(m.chat, { text: '❌ Song not found' }, { quoted: m });
      }

      const title = video.title;
      const thumbnail = video.thumbnail;
      const videoUrl = video.webpage_url;

      // Send song info
      await conn.sendMessage(m.chat, {
        image: { url: thumbnail },
        caption: `🎵 *${title}*\nDownloading...`
      }, { quoted: m });

      // Downloads folder
      const dir = path.join(__dirname, 'downloads');
      if (!fs.existsSync(dir)) fs.mkdirSync(dir);

      const filePath = path.join(dir, `song-${Date.now()}.mp3`);

      // Download audio
      await youtubedl(videoUrl, {
        extractAudio: true,
        audioFormat: 'mp3',
        audioQuality: 0,
        output: filePath
      });

      // Send audio
      await conn.sendMessage(m.chat, {
        audio: fs.readFileSync(filePath),
        mimetype: 'audio/mpeg'
      }, { quoted: m });

      // Delete temp file
      fs.unlinkSync(filePath);

    } catch (err) {
      console.log(err);
      await conn.sendMessage(m.chat, { text: '❌ Download fail උනා' }, { quoted: m });
    }
  }
};
