const fs = require('fs');
const path = require('path');

const bundlePath = path.join(__dirname, 'public', 'chartsData.bundle.json');
const emptyPath = path.join(__dirname, 'public', 'chartsData.empty.json');

// Mulai dari data yang benar-benar kosong
let data = JSON.parse(fs.readFileSync(emptyPath, 'utf8'));

// 1. Tambah 1 data di LIKES (hanya 1 baris waktu)
const today = new Date().toISOString().split('T')[0];

data.likes = {
  daily: [{ period: today, media: 10, merch: 5, profile: 2, feed: 3, total: 20 }],
  weekly: [{ period: today, media: 10, merch: 5, profile: 2, feed: 3, total: 20 }],
  monthly: [{ period: today, media: 10, merch: 5, profile: 2, feed: 3, total: 20 }],
  yearly: [{ period: today, media: 10, merch: 5, profile: 2, feed: 3, total: 20 }]
};

// 2. Tambah 1 data di EARNINGS (agar di atas nggak kosong)
data.earnings = {
  daily: [{ period: today, subscription: 100, paytoview: 50, merch: 0, wishtender: 0, customrequest: 0, total: 150 }],
  weekly: [{ period: today, subscription: 100, paytoview: 50, merch: 0, wishtender: 0, customrequest: 0, total: 150 }],
  monthly: [{ period: today, subscription: 100, paytoview: 50, merch: 0, wishtender: 0, customrequest: 0, total: 150 }],
  yearly: [{ period: today, subscription: 100, paytoview: 50, merch: 0, wishtender: 0, customrequest: 0, total: 150 }],
  grandTotal: { total: 150, totalTokens: 0 },
  topCountries: [{ country: "Indonesia", iso: "ID", sales: 150, rank: 1 }]
};

// 3. Tambah 1 data di SUBSCRIBERS
data.subscribers = {
  daily: [{ period: today, new: 5, recurring: 10, total: 15 }],
  weekly: [{ period: today, new: 5, recurring: 10, total: 15 }],
  monthly: [{ period: today, new: 5, recurring: 10, total: 15 }],
  yearly: [{ period: today, new: 5, recurring: 10, total: 15 }]
};

// 4. Tambah 1 data di FANS
data.fans = {
  daily: [{ period: today, newFollowers: 20, profileVisits: 50, total: 70 }],
  weekly: [{ period: today, newFollowers: 20, profileVisits: 50, total: 70 }],
  monthly: [{ period: today, newFollowers: 20, profileVisits: 50, total: 70 }],
  yearly: [{ period: today, newFollowers: 20, profileVisits: 50, total: 70 }],
  sources: {
    daily: [{ name: "Instagram", value: 70 }],
    weekly: [{ name: "Instagram", value: 70 }],
    monthly: [{ name: "Instagram", value: 70 }],
    yearly: [{ name: "Instagram", value: 70 }]
  }
};

// 5. Tambah 1 data di CONTRIBUTORS
data.contributorsInsight = {
  topContributors: {
    daily: [{ name: "Budi", spend: 100, avatar: "/images/profile-thumbnail.png" }],
    weekly: [{ name: "Budi", spend: 100, avatar: "/images/profile-thumbnail.png" }],
    monthly: [{ name: "Budi", spend: 100, avatar: "/images/profile-thumbnail.png" }],
    yearly: [{ name: "Budi", spend: 100, avatar: "/images/profile-thumbnail.png" }]
  }
};

fs.writeFileSync(bundlePath, JSON.stringify(data, null, 2));
console.log('🟡 1 EVENT ADDED: Berhasil menambahkan tepat 1 titik data pada semua grafik.');
