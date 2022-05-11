const bcrypt = require('bcrypt');

const myPlaintextPassword = process.env.SECRET;     
const salt = bcrypt.genSaltSync(10);
const hash = bcrypt.hashSync(myPlaintextPassword, salt);

module.exports = hash;