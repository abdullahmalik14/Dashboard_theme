const fs = require('fs');
const path = require('path');

const bundlePath = path.join(__dirname, 'public', 'chartsData.bundle.json');
const emptyPath = path.join(__dirname, 'public', 'chartsData.empty.json');

// Mulai dari data yang benar-benar kosong
let data = JSON.parse(fs.readFileSync(emptyPath, 'utf8'));

// HANYA Tambah 1 data di SUBSCRIBERS, yang lainnya dibiarkan kosong (0)
const today = new Date().toISOString().split('T')[0];

data.subscribers = {
  daily: [{ period: today, new: 5, recurring: 10, total: 15 }],
  weekly: [{ period: today, new: 5, recurring: 10, total: 15 }],
  monthly: [{ period: today, new: 5, recurring: 10, total: 15 }],
  yearly: [{ period: today, new: 5, recurring: 10, total: 15 }]
};

// Tulis kembali datanya
fs.writeFileSync(bundlePath, JSON.stringify(data, null, 2));
console.log('🟡 HANYA SUBSCRIBERS ADDED: Berhasil menambahkan 1 data hanya pada Subscribers. Grafik lain tetap 0.');
