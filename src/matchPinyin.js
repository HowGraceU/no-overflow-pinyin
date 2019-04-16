const getPinyin = require('./getPinyin');
const isChinese = require('./isChinese');
const formatWord = require('./formatWord');

module.exports = (key, word) => {
    let pinyin = getPinyin(word);

    let startPosition = {
        keyIndex: 0,
        wordIndex: 0,
        pinyinIndex: 0
    }
    let possibleMatch = [startPosition];

    let searchPostion;
    word = formatWord(word);

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

    return false;
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
    let firstKey = matchKey.slice(0, 1);

    let pinyinArr;
    if (isChinese(firstKey)) {
        pinyinArr = word[wordIndex];
    } else {
        pinyinArr = pinyin[wordIndex];
    }

    let morePosition = [];
    let ret = {
        morePosition
    };

    if (!pinyinArr) {
        return ret;
    }

    let pinyinStr = pinyinArr[pinyinIndex];

    // 若第一次遍历这个拼音，先将下一个拼音的定位加入栈
    if (pinyinIndex) {
        morePosition.push({
            keyIndex: 0,
            wordIndex: wordIndex + 1,
            pinyinIndex: 0
        });
    }

    if (pinyinArr.length !== pinyinIndex + 1) {
        morePosition.push({
            keyIndex,
            wordIndex,
            pinyinIndex: pinyinIndex + 1
        });
    }

    let pinyinInKey = matchKey.indexOf(pinyinStr);
    // console.log(`key:${key.slice(0, keyIndex + 1)} match ${word[wordIndex]} ${pinyinInKey === 0}`);
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