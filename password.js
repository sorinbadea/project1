var crypto = require('crypto');

/*
 * Encrypt the password
 */
exports.crypt_password = function(password, callback) {
   //creating a salt
   this.salt = crypto.randomBytes(16).toString('hex');
   this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, `sha512`).toString(`hex`);
   return callback(this.hash);
}

/*
 * password encryption callback
 */
exports.do_crypt_password = function(password) {
   //console.log(password);
   return password;
}

