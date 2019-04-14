const {join} = require('path');
matchPinyinPath = join(__dirname, '..', '..', 'src', 'matchPinyin');
const matchPinyin = require(matchPinyinPath);
const assert = require('assert')

describe('拼音模糊搜索测试', function () {
    it('全英文匹配', done => {
        assert.equal(matchPinyin('asdjqxfgh', 'asdjqxfgh'), true);
        done();
    });

    it('全数字匹配', done => {
        assert.equal(matchPinyin('12345678', '12345678'), true);
        done();
    });

    it('全简单中文匹配', done => {
        assert.equal(matchPinyin('djqx', '的金奇晓'), true);
        done();
    });
})