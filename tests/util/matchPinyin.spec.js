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

    it('全简单中文错误匹配', done => {
        assert.equal(matchPinyin('djqxasdasd', '的金奇晓'), false);
        done();
    });

    it('数字英文匹配', done => {
        assert.equal(matchPinyin('1234jqx', '1234jqx'), true);
        done();
    });

    it('英文中文匹配', done => {
        assert.equal(matchPinyin('的jqx', '的金奇晓'), true);
        done();
    });

    it('数字中文匹配', done => {
        assert.equal(matchPinyin('1234金奇晓', '1234金奇晓'), true);
        done();
    });

    it('数字英文中文匹配', done => {
        assert.equal(matchPinyin('1234d金奇晓', '1234的金奇晓'), true);
        done();
    });

    it('重复匹配', done => {
        assert.equal(matchPinyin('jjjjqx', '急急金奇晓的急急急金奇晓'), true);
        done();
    });

    it('首字母全拼混合1', done => {
        assert.equal(matchPinyin('ajinqxe', '啊金奇晓额'), true);
        done();
    });

    it('首字母全拼混合2', done => {
        assert.equal(matchPinyin('ajqixe', '啊金奇晓额'), true);
        done();
    });

    it('首字母全拼混合3', done => {
        assert.equal(matchPinyin('ajqxiaoe', '啊金奇晓额'), true);
        done();
    });
})