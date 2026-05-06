const fs = require('fs');
const path = require('path');

const bundlePath = path.join(__dirname, 'public', 'chartsData.bundle.json');

let data;
try {
  data = JSON.parse(fs.readFileSync(bundlePath, 'utf8'));
} catch(e) {
  console.log("Error reading bundle data.");
  process.exit(1);
}

// Tambah +100 ke Earnings (Grand Total dan Hari Terakhir)
if (data.earnings) {
  if (data.earnings.grandTotal) {
    data.earnings.grandTotal.total += 100;
  }
  ['daily', 'weekly', 'monthly', 'yearly', 'alltime'].forEach(period => {
    if (data.earnings[period] && data.earnings[period].length > 0) {
      const lastItem = data.earnings[period][data.earnings[period].length - 1];
      lastItem.total += 100;
      lastItem.subscription += 100; // Masukkan ke kategori subscription
    }
  });
}

// Tambah +100 ke jumlah New Followers di Fans
if (data.fans) {
  ['daily', 'weekly', 'monthly', 'yearly', 'alltime'].forEach(period => {
    if (data.fans[period] && data.fans[period].length > 0) {
      const lastItem = data.fans[period][data.fans[period].length - 1];
      lastItem.total += 100;
      lastItem.newFollowers += 100;
    }
  });
}

// Tulis kembali datanya
fs.writeFileSync(bundlePath, JSON.stringify(data, null, 2));
console.log('📈 MASTER EVENT ADDED: Berhasil menambahkan +100 data baru (Earnings & Fans). Silakan refresh browser!');
