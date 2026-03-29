const youtubedl = require('youtube-dl-exec');
const fs = require('fs');
const path = require('path');

module.exports = async (conn, m) => {
  try {
    const body = m.text || '';
    const args = body.split(' ').slice(1);
    const command = body.split(' ')[0].toLowerCase();

    if (command === '.play') {

      if (!args[0]) {
        return conn.sendMessage(m.chat, { text: '❌ Song name එකක් දාන්න' }, { quoted: m });
      }

      const query = args.join(' ');

      const dir = path.join(__dirname, 'downloads');
      if (!fs.existsSync(dir)) fs.mkdirSync(dir);

      const filePath = path.join(dir, `song-${Date.now()}.mp3`);

      // 🔍 search + download
      await youtubedl(`ytsearch1:${query}`, {
        extractAudio: true,
        audioFormat: 'mp3',
        audioQuality: 0,
        output: filePath
      });

      await conn.sendMessage(m.chat, {
        audio: fs.readFileSync(filePath),
        mimetype: 'audio/mpeg'
      }, { quoted: m });

      fs.unlinkSync(filePath);
    }

  } catch (err) {
    console.log(err);
    conn.sendMessage(m.chat, { text: '❌ Search / Download fail උනා' }, { quoted: m });
  }
};
