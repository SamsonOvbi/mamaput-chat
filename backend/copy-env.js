const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const envPath = path.join(__dirname, '.env');
if (fs.existsSync(envPath)) {
  execSync(`shx cp ${envPath} build/`);
}

const imgPath = path.join(__dirname, 'src/public/');
if (fs.existsSync(imgPath)) {
  execSync(`shx cp -r ${imgPath} build/`);
}