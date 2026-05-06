const fs = require('fs');
const path = require('path');

const bundlePath = path.join(__dirname, 'public', 'chartsData.bundle.json');
const emptyPath = path.join(__dirname, 'public', 'chartsData.empty.json');

// Mulai dari data yang benar-benar kosong
let data = JSON.parse(fs.readFileSync(emptyPath, 'utf8'));

// HANYA Tambah data di EARNINGS bagian SUBSCRIPTION saja
const today = new Date().toISOString().split('T')[0];

data.earnings = {
  daily: [{ period: today, subscription: 20000, paytoview: 0, merch: 0, wishtender: 0, customrequest: 0, total: 20000 }],
  weekly: [{ period: today, subscription: 20000, paytoview: 0, merch: 0, wishtender: 0, customrequest: 0, total: 20000 }],
  monthly: [{ period: today, subscription: 20000, paytoview: 0, merch: 0, wishtender: 0, customrequest: 0, total: 20000 }],
  yearly: [{ period: today, subscription: 20000, paytoview: 0, merch: 0, wishtender: 0, customrequest: 0, total: 20000 }],
  grandTotal: { 
    subscription: 20000, 
    paytoview: 0, 
    merch: 0, 
    wishtender: 0, 
    customrequest: 0, 
    total: 20000,
    totalTokens: 0 
  },
  topCountries: [{ country: "Indonesia", iso: "ID", sales: 20000, rank: 1 }]
};

// Tulis kembali datanya
fs.writeFileSync(bundlePath, JSON.stringify(data, null, 2));
console.log('🟡 HANYA EARNINGS (SUBSCRIPTION) ADDED: Berhasil menambahkan angka 20000. Grafik lain tetap 0.');
