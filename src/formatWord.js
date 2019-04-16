const isChinese = require('./isChinese');
// 格式化带匹配字符串，使其格式像 pinyin 格式，非中文合为一个数组元素
module.exports = (words) => {
    if (typeof words !== 'string') return [];

    let pys = [];
    let nohans = '';
    words.split('').forEach((word) => {
        let isCh = isChinese(word);
        if (!isCh) {
            nohans += word;
        } else {
            if (nohans) {
                pys.push([nohans]);
                nohans = '';
            }
            pys.push(word);
        }
    });
    // 清理最后的非中文字符串。
    if (nohans.length > 0) {
        pys.push([nohans]);
    }

    return pys;
}