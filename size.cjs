const { execSync } = require('child_process');
console.log(execSync('ls -la app/applet').toString());

