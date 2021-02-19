const fs = require("fs");

const apiKey = process.env.REGOBS_API_KEY;
const data = JSON.stringify({ apiKey });
fs.writeFileSync("./src/assets/apiKey.json", data);
