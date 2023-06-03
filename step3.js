// import fs module
const fs = require('fs');
const axios = require('axios');
const process = require('process');

function handleOutput(text,outputPath) {
    if (outputPath) {
        fs.writeFile(outputPath, text, 'utf8', function(err) {
            if (err) {
                console.error(`Could not write ${outputPath}: \n ${err}`);
                process.exit(1);
            }
        });
    } else {
        console.log(text);
    }
}


// define cat function
async function cat(path, outputPath) {
    fs.readFile(path, 'utf8', function(err, data) {
        if (err) {
            console.error(`Error reading ${path}:\n  ${err}`);
            // halt the script execution
            process.exit(1);
        }
        console.log(data, outputPath);
    });
}

async function webCat(url, outputPath) {
    try {
        let res = await axios.get(url);
        handleOutput(res.data, outputPath);
    } catch (err) {
        console.error(`Error fetching ${url}: \n ${err}`);
        process.exit(1);
    }
}

let path;
let outputPath;

if (process.argv[2] === '--out') {
    outputPath = process.argv[3];
    path = process.argv[4];
} else {
    path = process.argv[2];
}

if (path.slice(0,4) === 'http') {
    webCat(path, outputPath);
} else {
    cat(path, outputPath);
}