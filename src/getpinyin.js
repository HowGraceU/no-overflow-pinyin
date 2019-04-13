var pinyin = require("node-pinyin");

console.log(pinyin("金奇晓", {
    heteronym: true,
    style: 'normal'
}));