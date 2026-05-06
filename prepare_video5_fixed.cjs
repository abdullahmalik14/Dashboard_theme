const fs = require('fs');
const path = require('path');

const bundlePath = path.join(__dirname, 'public', 'chartsData.bundle.json');
const normalPath = path.join(__dirname, 'public', 'chartsData.normal.json');

// Mulai dari data normal agar peta dan tabel bawah tetap punya data yang bagus
let data;
try {
  // Kita copy dulu dari normal agar datanya full
  data = JSON.parse(fs.readFileSync(normalPath, 'utf8'));
} catch (e) {
  data = JSON.parse(fs.readFileSync(bundlePath, 'utf8'));
}

const mayEarnings = [];
let totalMayEarnings = 0;
let totalMayTokens = 0;

// Looping tanggal 1 sampai 31 Mei
for(let i = 1; i <= 31; i++) {
  const day = i < 10 ? '0'+i : ''+i;
  const dateStr = `2026-05-${day}`;
  
  if (i <= 5) {
     const earn = 200 + Math.floor(Math.random() * 100);
     const toks = 50 + Math.floor(Math.random() * 50);
     totalMayEarnings += earn;
     totalMayTokens += toks;
     
     mayEarnings.push({
       period: dateStr,
       subscription: earn * 0.4,
       paytoview: earn * 0.2,
       merch: earn * 0.2,
       wishtender: earn * 0.1,
       customrequest: earn * 0.1,
       total: earn,
       totalTokens: toks,
       tipTokens: toks * 0.3,
       callTokens: toks * 0.2,
       chatTokens: toks * 0.3,
       liveStreamTokens: toks * 0.2
     });
  } else {
     mayEarnings.push({
       period: dateStr,
       subscription: 0,
       paytoview: 0,
       merch: 0,
       wishtender: 0,
       customrequest: 0,
       total: 0,
       totalTokens: 0,
       tipTokens: 0,
       callTokens: 0,
       chatTokens: 0,
       liveStreamTokens: 0
     });
  }
}

// Timpa data khusus untuk Monthly
if(data.earnings) {
  data.earnings.monthly = mayEarnings;
  if(!data.earnings.summaries) data.earnings.summaries = {};
  data.earnings.summaries.monthly = {
    totalEarningsUSD: totalMayEarnings,
    tokensReceived: totalMayTokens
  };
}

fs.writeFileSync(bundlePath, JSON.stringify(data, null, 2));
console.log('✅ VIDEO 5 DIPERBAIKI: Data "Monthly" sekarang sangat lengkap dan Total Angka di atas tidak akan "--" lagi.');
