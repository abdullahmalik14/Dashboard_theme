const fs = require('fs');
const path = require('path');

const bundlePath = path.join(__dirname, 'public', 'chartsData.bundle.json');
const normalPath = path.join(__dirname, 'public', 'chartsData.normal.json');

if (fs.existsSync(normalPath)) {
  fs.copyFileSync(normalPath, bundlePath);
  console.log('🟢 DATABASE RESTORED: Data is back to normal. Please refresh the browser.');
} else {
  console.log('❌ Backup normal data not found!');
}
