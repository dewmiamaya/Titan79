const fs = require('fs');
if (fs.existsSync('config.env')) require('dotenv').config({ path: './config.env' });

function convertToBool(text, fault = 'true') {
    return text === fault ? true : false;
}
module.exports = {
SESSION_ID: process.env.SESSION_ID || "",
ALIVE_IMG: process.env.ALIVE_IMG || "https://raw.githubusercontent.com/dewmiamaya/Titan79/refs/heads/main/images/20260323_102432.jpg",
ALIVE_MSG: process.env.ALIVE_MSG || "*Hello👋 MALSHAN-MD Is Alive Now😍*",
BOT_OWNER: '94765900102',  // Replace with the owner's phone number



};
