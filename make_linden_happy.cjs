const fs = require('fs');
const path = require('path');

const generatedPath = path.join(__dirname, 'public', 'chartsData.generated.json');
const bundlePath = path.join(__dirname, 'public', 'chartsData.bundle.json');

let data;
try {
  data = JSON.parse(fs.readFileSync(generatedPath, 'utf8'));
} catch (e) {
  console.error("Gagal membaca chartsData.generated.json", e);
  process.exit(1);
}

// 1. Bersihkan semua 'T00:00:00.000Z' menjadi 'YYYY-MM-DD' murni
function cleanDates(arr) {
  if (!Array.isArray(arr)) return arr;
  arr.forEach(item => {
    if (item.period && typeof item.period === 'string' && item.period.includes('T')) {
      item.period = item.period.split('T')[0];
    } else if (item.period && item.period instanceof Date) {
      item.period = item.period.toISOString().split('T')[0];
    }
  });
  return arr;
}

// Bersihkan seluruh data dulu
for (const key of Object.keys(data)) {
  const obj = data[key];
  if (obj && typeof obj === 'object' && !Array.isArray(obj)) {
    if (obj.daily) cleanDates(obj.daily);
    if (obj.weekly) cleanDates(obj.weekly);
    if (obj.monthly) cleanDates(obj.monthly);
    if (obj.yearly) cleanDates(obj.yearly);
    
    // Khusus FanInsights (ada countries & sources)
    if (key === 'fanInsights') {
      if (obj.countries) {
        cleanDates(obj.countries.daily); cleanDates(obj.countries.weekly); cleanDates(obj.countries.monthly); cleanDates(obj.countries.yearly);
      }
      if (obj.sources) {
        cleanDates(obj.sources.daily); cleanDates(obj.sources.weekly); cleanDates(obj.sources.monthly); cleanDates(obj.sources.yearly);
      }
    }
  }
}

// 2. Terapkan Aturan Linden (Range Fixes)
// yearly = last 5 years
// monthly = daily data for last 30 days
// weekly = daily data for last 7 days
// daily = today (last 1 day)
function applyLindenRanges(dataObj) {
  if (dataObj && dataObj.daily && Array.isArray(dataObj.daily)) {
    // Pastikan kita mengurutkan dari yang paling awal ke akhir
    const dArr = dataObj.daily.sort((a,b) => String(a.period).localeCompare(String(b.period)));
    
    const wArr = dArr.slice(-7);
    const mArr = dArr.slice(-30);
    const yArr = dataObj.yearly || [];
    
    // Gantikan array-nya
    dataObj.daily = dArr.slice(-2); // Pakai 2 hari agar persentase jalan
    dataObj.weekly = wArr;
    dataObj.monthly = mArr;
    dataObj.yearly = yArr;
  }
}

for (const key of Object.keys(data)) {
  if (key === 'fanInsights') {
     applyLindenRanges(data.fanInsights);
     if (data.fanInsights.countries) applyLindenRanges(data.fanInsights.countries);
     if (data.fanInsights.sources) applyLindenRanges(data.fanInsights.sources);
  } else if (key === 'contributors' || key === 'summaries') {
     // Skip mock arrays
  } else {
     applyLindenRanges(data[key]);
  }
}

// 3. === EARNINGS YEARLY MOCK (5 years) ===
const currentYearly = data.earnings.yearly || [];
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const yearlyMonthly = months.map((m, i) => {
  const factor = 0.4 + (i * 0.06); 
  const noise = 1 + (Math.sin(i * 2.3) * 0.15); 
  const base = factor * noise;
  
  const subscription = Math.round(120 * base * 100) / 100;
  const paytoview = Math.round(85 * base * 100) / 100;
  const merch = Math.round(95 * base * 100) / 100;
  const wishtender = Math.round(45 * base * 100) / 100;
  const customrequest = Math.round(155 * base * 100) / 100;
  const total = Math.round((subscription + paytoview + merch + wishtender + customrequest) * 100) / 100;
  
  const tipTokens = Math.round(80 * base);
  const callTokens = Math.round(120 * base);
  const chatTokens = Math.round(65 * base);
  const liveStreamTokens = Math.round(90 * base);
  const totalTokens = tipTokens + callTokens + chatTokens + liveStreamTokens;
  
  return {
    period: m,
    subscription, paytoview, merch, wishtender, customrequest, total,
    subscriptionTokens: 0, paytoviewTokens: 0, merchTokens: 0, wishtenderTokens: 0, customrequestTokens: 0,
    totalTokens, tipTokens, callTokens, chatTokens, liveStreamTokens
  };
});

data.earnings.yearly = yearlyMonthly;
if (currentYearly && currentYearly.length > 0) {
  data.earnings.alltime = currentYearly;
}

const yearlyTotal = yearlyMonthly.reduce((s, e) => s + e.total, 0);
const yearlyTokens = yearlyMonthly.reduce((s, e) => s + e.totalTokens, 0);
if (!data.earnings.summaries) data.earnings.summaries = {};
data.earnings.summaries.yearly = {
  totalEarningsUSD: Math.round(yearlyTotal * 100) / 100,
  tokensReceived: yearlyTokens
};

// 4. === SUBSCRIPTIONS YEARLY MOCK (Tahun 2025) ===
if (data.subscriptions && Array.isArray(data.subscriptions.yearly)) {
  const existing = data.subscriptions.yearly.find(y => y.period === "2026" || (y.period && y.period.startsWith("2026"))) || data.subscriptions.yearly[0];
  if (existing) {
     const mockYear = {
        ...existing,
        period: "2025",
        newSubscriber: Math.round(existing.newSubscriber * 0.8) || 50,
        recurringSubscriber: Math.round(existing.recurringSubscriber * 0.8) || 30,
        totalSubscribers: Math.round(existing.totalSubscribers * 0.8) || 80,
        tier1: Math.round(existing.tier1 * 0.8) || 10,
        tier2: Math.round(existing.tier2 * 0.8) || 10,
        tier3: Math.round(existing.tier3 * 0.8) || 10,
        tier4: 0,
        tier5: 0
     };
     
     // Pastikan existing period juga rapi
     existing.period = "2026";
     
     data.subscriptions.yearly = [mockYear, existing];
  }
}

// Pastikan yearly di fanInsights juga cuma tahunan
if (data.fanInsights && Array.isArray(data.fanInsights.yearly)) {
  data.fanInsights.yearly.forEach(item => { if (item.period && item.period.startsWith("2026")) item.period = "2026"; });
}
if (data.likes && Array.isArray(data.likes.yearly)) {
  data.likes.yearly.forEach(item => { if (item.period && item.period.startsWith("2026")) item.period = "2026"; });
}

fs.writeFileSync(bundlePath, JSON.stringify(data, null, 2), 'utf8');
console.log('✅ RULES LINDEN DITERAPKAN KEMBALI SEPERTI KEMARIN!');
