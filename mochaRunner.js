const Mocha = require('mocha');
const {join} = require('path');

let mocha = new Mocha({
    reporter: 'mochawesome',
    reporterOptions: {
        reportDir: './docs/customReportFilename',
        // quiet: true
    }
});

mocha.addFile(join('tests', 'util', 'matchPinyin.spec.js'));
mocha.run(() => {
    process.exit();
})