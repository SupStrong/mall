'use strict'

const CryptoJS = require('crypto-js'); // 引用AES源码js

const key = CryptoJS.enc.Utf8.parse('1234567898882222'); // 十六位十六进制数作为密钥
const iv = CryptoJS.enc.Utf8.parse('8NONwyJtHesysWpM'); // 十六位十六进制数作为密钥偏移量

// 解密方法
function Decrypt(word) {
  word = word.split(' ').join('+');
  let base64 = CryptoJS.enc.Base64.parse(word);
  let src = CryptoJS.enc.Base64.stringify(base64);
  let decrypted = CryptoJS.AES.decrypt(src, key, { iv: iv, padding: CryptoJS.pad.Pkcs7 });
  return decrypted.toString(CryptoJS.enc.Utf8);
}

// 加密方法
function Encrypt(word) {
  var encrypted = CryptoJS.AES.encrypt(word, key, { iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 });
  return encrypted.toString();
}

export default {
  Decrypt,
  Encrypt
}
