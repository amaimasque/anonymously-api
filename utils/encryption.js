const { scrypt, randomBytes, timingSafeEqual } = require("crypto");

const ENCRYPTION_PASSPHRASE = process.env.ENCRYPTION_PASSPHRASE ?? ""

const scryptAsync = (password, salt) => new Promise((resolve, reject) => {
  scrypt(password, salt, 64, (err, key) => {
    if (err) return reject(err)
    resolve(key)
  })
})

const hashPassword = async (password) => {
  const salt = randomBytes(16).toString("hex");
  const buf = (await scryptAsync(password, salt));
  return `${buf.toString("hex")}.${salt}`;
}

const comparePassword = async (
  storedPassword,
  suppliedPassword
) => {
  // split() returns array
  const [hashedPassword, salt] = storedPassword.split(".");
  // we need to pass buffer values to timingSafeEqual
  const hashedPasswordBuf = Buffer.from(hashedPassword, "hex");
  // we hash the new sign-in password
  const suppliedPasswordBuf = await scryptAsync(suppliedPassword, salt);
  // compare the new supplied password with the stored hashed password
  console.log(suppliedPassword, salt, hashedPasswordBuf, suppliedPasswordBuf)
  return timingSafeEqual(hashedPasswordBuf, suppliedPasswordBuf);
}

// const decryptAES256 = (encrypted) => {
//     // 1. Separate ciphertext and salt
//     var encryptedWA = CryptoJS.enc.Base64.parse(encrypted);
//     var prefixWA = CryptoJS.lib.WordArray.create(encryptedWA.words.slice(0, 8/4));                             // Salted__ prefix
//     var saltWA = CryptoJS.lib.WordArray.create(encryptedWA.words.slice(8/4, 16/4));                            // 8 bytes salt: 0x0123456789ABCDEF
//     var ciphertextWA = CryptoJS.lib.WordArray.create(encryptedWA.words.slice(16/4, encryptedWA.words.length)); // ciphertext        

//     // 2. Determine key and IV using PBKDF2
//     var password = ENCRYPTION_PASSPHRASE
//     var keyIvWA = CryptoJS.PBKDF2(
//       password, 
//       saltWA, 
//       {
//         keySize: (32+16)/4,          // key and IV
//         iterations: 10000,
//         hasher: CryptoJS.algo.SHA256
//       }
//     );
//     var keyWA = CryptoJS.lib.WordArray.create(keyIvWA.words.slice(0, 32/4));
//     var ivWA = CryptoJS.lib.WordArray.create(keyIvWA.words.slice(32/4, (32+16)/4));

//     // 3. Decrypt
//     var decryptedWA = CryptoJS.AES.decrypt(
//       {ciphertext: ciphertextWA}, 
//       keyWA, 
//       {iv: ivWA}
//     );
//     var decrypted = decryptedWA.toString(CryptoJS.enc.Utf8)
//     return decrypted
// }

module.exports = {
  comparePassword,
  hashPassword
}