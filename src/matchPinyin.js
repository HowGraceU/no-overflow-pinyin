const getPinyin = require('./getPinyin');

module.exports = (key, word) => {
    let pinyin = getPinyin(word);

    let startPosition = {
        keyIndex: 0,
        wordIndex: 0,
        pinyinIndex: 0
    }
    let possibleMatch = [startPosition];

    let searchPostion;
    while (searchPostion = possibleMatch.pop()) {
        let {
            isMatch,
            morePosition
        } = matchPinyin({
            key,
            word,
            pinyin
        }, searchPostion);

        if (isMatch) {
            return true;
        }

        if (morePosition.length !== 0) {
            possibleMatch = possibleMatch.concat(morePosition);
        }
    }
}

// 每次匹配一条线，返回匹配结果，若有分支则返回分支
function matchPinyin({
    key,
    word,
    pinyin
}, {
    keyIndex,
    wordIndex,
    pinyinIndex
}) {
    let matchKey = key.slice(keyIndex);
    let pinyinArr = pinyin[wordIndex];

    let morePosition = [];
    let ret = {
        morePosition
    };

    if (!pinyinArr) {
        return ret;
    }

    let pinyinStr = pinyinArr[pinyinIndex];


    if (pinyinArr.length !== pinyinIndex + 1) {
        morePosition.push({
            keyIndex,
            wordIndex,
            pinyinIndex: pinyinIndex + 1
        });
    }

    let pinyinInKey = matchKey.indexOf(pinyinStr);
    // console.log(`key:${key.slice(0, keyIndex + 1)} match ${word.slice(0, wordIndex + 1)} ${pinyinInKey === 0}`);
    if (pinyinInKey === 0) {
        let pinyinLen = pinyinStr.length;
        if (matchKey.length === pinyinLen) {
            ret.isMatch = true;
            return ret;
        } else {
            morePosition.push({
                keyIndex: keyIndex + pinyinLen,
                wordIndex: wordIndex + 1,
                pinyinIndex: 0
            });
        }
    }

    return ret;
}

// console.log(module.exports('djjx', '的金奇晓'))