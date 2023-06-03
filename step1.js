// import fs module
const fs = require('fs');

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

// get the path argument from the command line
const path = process.argv[2];

// call cat function with path
cat(path); 