const fs = require('fs');
if (fs.existsSync('config.env')) require('dotenv').config({ path: './config.env' });

function convertToBool(text, fault = 'true') {
    return text === fault ? true : false;
}
module.exports = {
SESSION_ID: process.env.SESSION_ID || "3wQhHaYC#--BmUU16BLYYzQqbwMcXA1MM09mVyt8AIQMtEcpiThA",
ALIVE_IMG: process.env.ALIVE_IMG || "https://raw.githubusercontent.com/dewmiamaya/Titan79/refs/heads/main/images/20260328_175039.jpg",
ALIVE_MSG: process.env.ALIVE_MSG || `🇬🇧 *Welcome to MALSHAN-MD Ai and multimedia services.* (To view commands, send .MENU📄 )

🇰🇷 *MALSHAN-MD AI 및 멀티미디어 서비스에 오신 것을 환영합니다.*  (명령어를 보려면 .MENU를 보내세요📄 )

🇱🇰 *MALSHAN-MD Ai and multimedia Services වෙතට ඔබව සාදරයෙන් පිළිගනිමු* (විධාන බැලීමට .MENU ලෙස එවන්න📄)

> ⚡ Powered by SLPR MALSHAN 📡
> 🚀 Fast • Smart • Reliable 🛡️`,
BOT_OWNER: '94765900102',  // Replace with the owner's phone number



};
