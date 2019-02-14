const Cryptr = require('cryptr');
const cryptr = new Cryptr('myTotalySecretKey');

export function encrypt(str){
    return cryptr.encrypt(str);
}

export function decrypt(str){
    return cryptr.decrypt(str);
}