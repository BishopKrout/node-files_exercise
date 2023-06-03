// import fs module
const fs = require('fs');
const axios = require('axios');

// define cat function
function cat(path) {
    fs.readFile(path, 'utf8', function(err, data) {
        if (err) {
            console.error(`Error reading ${path}:\n  ${err}`);
            // halt the script execution
            process.exit(1);
        }
        console.log(data);
    });
}

function webCat(url) {
    axios.get(url)
        .then(function(res) {
            console.log(res.data);
        })
        .catch(function(err) {
            console.log(`Error fetching ${url}:\n ${err}`);
        });
}
const pathOrUrl = process.argv[2];

if (pathOrUrl.startsWith('http://') || pathOrUrl.startsWith('https://')) {
    webCat(pathOrUrl);
} else {
    cat(pathOrUrl);
}