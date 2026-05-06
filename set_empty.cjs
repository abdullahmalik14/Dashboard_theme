const fs = require('fs');
const path = require('path');

const bundlePath = path.join(__dirname, 'public', 'chartsData.bundle.json');
const normalPath = path.join(__dirname, 'public', 'chartsData.normal.json');
const emptyPath = path.join(__dirname, 'public', 'chartsData.empty.json');

// Backup the current normal data if it doesn't exist yet
if (!fs.existsSync(normalPath)) {
  fs.copyFileSync(bundlePath, normalPath);
  console.log('✅ Backed up normal data to chartsData.normal.json');
}

// Copy empty data to bundle
fs.copyFileSync(emptyPath, bundlePath);
console.log('🔴 DATABASE RESET: Data is now 0 (Empty State). Please refresh the browser.');
