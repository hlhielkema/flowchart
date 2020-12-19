const fs = require('fs');

function copyFile(from, to) {
    fs.copyFile(from, to, (err) => {
        if (err) {
            throw err;
        }
    
        console.log(from + ' was copied to ' + to);
    });
}

copyFile('dist/flowchart.js', 'demo/flowchart.js');
copyFile('dist/flowchart.css', 'demo/flowchart.css');