const crypto = require('crypto');

const seedGenerate = new crypto
    .createHash('sha256')
    .update(crypto
        .randomBytes(256))
        .digest('hex')

module.exports = { seedGenerate }
