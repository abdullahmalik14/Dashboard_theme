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

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

// Fungsi untuk memecah total tahun 2026 menjadi 12 bulan (Jan - Dec)
function create12MonthsFromYear(yearData) {
  const newArray = [];
  for (let i = 0; i < 12; i++) {
    // Buat kurva natural: rendah di awal tahun, tinggi di akhir tahun
    const factor = 0.4 + (i * 0.06); 
    const noise = 1 + (Math.sin(i * 2.3) * 0.15); 
    let weight = factor * noise;
    
    // Normalisasi kasar (agar totalnya mendekati aslinya)
    weight = weight / 12; 
    
    const monthData = { ...yearData, period: months[i] };
    
    for (const key of Object.keys(monthData)) {
      if (typeof monthData[key] === 'number' && key !== 'rank') {
        monthData[key] = Math.round(yearData[key] * weight);
      }
    }
    newArray.push(monthData);
  }
  return newArray;
}

// Terapkan ke setiap section yang relevan
for (const key of Object.keys(data)) {
  if (key === 'earnings' || key === 'summaries' || key === 'contributors' || key === 'grandTotal') continue;
  
  const obj = data[key];
  if (obj && typeof obj === 'object' && !Array.isArray(obj)) {
    // Jika obj.yearly saat ini berisi 5 tahun (karena script sebelumnya), pindahkan ke alltime
    if (obj.yearly && obj.yearly.length >= 2 && obj.yearly[0].period && !isNaN(Number(obj.yearly[0].period))) {
       // Pindahkan 2022-2026 ke alltime
       obj.alltime = JSON.parse(JSON.stringify(obj.yearly));
       
       // Ambil data tahun 2026 (atau tahun terakhir) untuk dipecah ke 12 bulan
       const baseYearData = obj.alltime.find(y => String(y.period).startsWith("2026")) || obj.alltime[obj.alltime.length-1];
       
       // Buat 12 bulan untuk yearly
       obj.yearly = create12MonthsFromYear(baseYearData);
    }
    
    // Ulangi untuk fanInsights.countries
    if (key === 'fanInsights') {
      if (obj.countries && obj.countries.yearly && obj.countries.yearly.length >= 2) {
        obj.countries.alltime = JSON.parse(JSON.stringify(obj.countries.yearly));
        const baseC = obj.countries.alltime.find(y => String(y.period).startsWith("2026")) || obj.countries.alltime[obj.countries.alltime.length-1];
        obj.countries.yearly = create12MonthsFromYear(baseC);
      }
      if (obj.sources && obj.sources.yearly && obj.sources.yearly.length >= 2) {
        obj.sources.alltime = JSON.parse(JSON.stringify(obj.sources.yearly));
        const baseS = obj.sources.alltime.find(y => String(y.period).startsWith("2026")) || obj.sources.alltime[obj.sources.alltime.length-1];
        obj.sources.yearly = create12MonthsFromYear(baseS);
      }
    }
  }
}

fs.writeFileSync(bundlePath, JSON.stringify(data, null, 2), 'utf8');
console.log('✅ Berhasil menyusun data 12 Bulan untuk tab Yearly dan 5 Tahun untuk tab Alltime!');
