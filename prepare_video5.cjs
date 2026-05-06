const fs = require('fs');
const path = require('path');

const bundlePath = path.join(__dirname, 'public', 'chartsData.bundle.json');
let data;
try {
  data = JSON.parse(fs.readFileSync(bundlePath, 'utf8'));
} catch (e) {
  console.log("Error reading file");
  process.exit(1);
}

const mayEarnings = [];
const mayFans = [];

// Looping tanggal 1 sampai 31 Mei
for(let i = 1; i <= 31; i++) {
  const day = i < 10 ? '0'+i : ''+i;
  const dateStr = `2026-05-${day}`; // Menggunakan Mei 2026
  
  if (i <= 5) {
     // Tanggal 1 sampai 5 (hari ini) -> Ada isinya
     mayEarnings.push({
       period: dateStr,
       subscription: 100 + (Math.random() * 50),
       paytoview: 50,
       merch: 20,
       wishtender: 10,
       customrequest: 20,
       total: 200 + (Math.random() * 50),
       totalTokens: 50
     });
     mayFans.push({
        period: dateStr,
        newFollowers: 10 + Math.floor(Math.random() * 10),
        profileVisits: 50
     });
  } else {
     // Tanggal 6 sampai 31 (masa depan) -> Kosong (0)
     mayEarnings.push({
       period: dateStr,
       subscription: 0,
       paytoview: 0,
       merch: 0,
       wishtender: 0,
       customrequest: 0,
       total: 0,
       totalTokens: 0
     });
     mayFans.push({
        period: dateStr,
        newFollowers: 0,
        profileVisits: 0
     });
  }
}

// Timpa data monthly dengan data Mei
if(data.earnings) data.earnings.monthly = mayEarnings;
if(data.fanInsights) data.fanInsights.monthly = mayFans;

fs.writeFileSync(bundlePath, JSON.stringify(data, null, 2));
console.log('✅ VIDEO 5 READY: Data "Monthly" sudah diset untuk 1 Mei - 31 Mei. Tanggal 6-31 diset 0.');
