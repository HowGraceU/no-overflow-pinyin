// 获取中文的拼音，若是 ‘的’ 则返回 [[de, di, d]] 的不重复数组

const pinyin = require("node-pinyin");

module.exports = (word) => {
    let _pinyin = pinyin(word, {
        heteronym: true,
        style: 'normal'
    })

    _pinyin = _pinyin.map(item => {
        let set = new Set();

        item.forEach(p => {
            set.add(p.slice(0, 1));
            set.add(p);
        });

        return [...set];
    })

    return _pinyin;
}