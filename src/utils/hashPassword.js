const crypto = require("crypto");

const HashPassword = (data) => crypto.createHash("md5").update(data).digest("hex");

module.exports = HashPassword;
