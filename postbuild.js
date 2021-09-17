const exec = require('child_process').exec;
const fs = require('fs');
const path = require('path');

// find the styles css file
const files = getFilesFromPath('./dist/climedo-museum-test', '.css');
let data = [];

if (!files && files.length <= 0) {
    console.log('cannot find style files to purge');
    return;
}

for (const f of files) {
    // get original file size
    const originalSize = getFilesizeInKiloBytes('./dist/climedo-museum-test/' + f) + 'kb';
    const o = {file: f, originalSize: originalSize, newSize: ''};
    data.push(o);
}

console.log('Run PurgeCSS...');

exec('purgecss -css dist/climedo-museum-test/*.css --content dist/climedo-museum-test/index.html dist/climedo-museum-test/*.js dist/climedo-museum-test/**/*.js -o dist/climedo-museum-test/', function(error, stdout, stderr) {
    console.log('PurgeCSS done');
    console.log();

    for (const d of data) {
        // get new file size
        const newSize = getFilesizeInKiloBytes('./dist/climedo-museum-test/' + d.file) + 'kb';
        d.newSize = newSize;
    }

    console.table(data);
});

function getFilesizeInKiloBytes(filename) {
    const stats = fs.statSync(filename);
    const fileSizeInBytes = stats.size / 1024;
    return fileSizeInBytes.toFixed(2);
}

function getFilesFromPath(dir, extension) {
    const files = fs.readdirSync(dir);
    return files.filter(e => path.extname(e).toLowerCase() === extension);
}
