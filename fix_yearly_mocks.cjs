const fs = require('fs');
const path = require('path');

const bundlePath = path.join(__dirname, 'public', 'chartsData.bundle.json');

let data;
try {
  data = JSON.parse(fs.readFileSync(bundlePath, 'utf8'));
} catch (e) {
  console.error("Gagal membaca chartsData.bundle.json", e);
  process.exit(1);
}

// Fungsi untuk membuat 5 tahun mock data (2022 - 2026) dari data 2026
function mock5Years(yearlyArray) {
  if (!Array.isArray(yearlyArray) || yearlyArray.length === 0) return yearlyArray;
  
  const baseYearData = yearlyArray.find(y => y.period === "2026" || String(y.period).startsWith("2026")) || yearlyArray[0];
  const newArray = [];
  
  for (let year = 2022; year <= 2026; year++) {
    const diff = 2026 - year; // 0 untuk 2026, 4 untuk 2022
    const multiplier = Math.pow(0.8, diff); // Kurangi 20% tiap tahun mundur
    
    const mockData = { ...baseYearData, period: String(year) };
    
    for (const key of Object.keys(mockData)) {
      if (typeof mockData[key] === 'number' && key !== 'rank') {
        mockData[key] = Math.round(mockData[key] * multiplier);
      }
    }
    newArray.push(mockData);
  }
  
  return newArray;
}

// Terapkan ke setiap section yang relevan
for (const key of Object.keys(data)) {
  if (key === 'earnings' || key === 'summaries' || key === 'contributors' || key === 'grandTotal') continue;
  
  const obj = data[key];
  if (obj && typeof obj === 'object' && !Array.isArray(obj)) {
    if (obj.yearly) {
       obj.yearly = mock5Years(obj.yearly);
    }
    if (key === 'fanInsights') {
      if (obj.countries && obj.countries.yearly) {
        obj.countries.yearly = mock5Years(obj.countries.yearly);
      }
      if (obj.sources && obj.sources.yearly) {
        obj.sources.yearly = mock5Years(obj.sources.yearly);
      }
    }
  }
}

fs.writeFileSync(bundlePath, JSON.stringify(data, null, 2), 'utf8');
console.log('✅ Berhasil menyuntikkan data palsu 5 tahun untuk Fans, Subs, Likes, dll!');
