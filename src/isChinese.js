module.exports = (letter) => {
    let chReg = /[\u0391-\uFFE5]/;

    return chReg.test(letter);
}