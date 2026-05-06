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

// Helper to get ISO week
function getISOWeek(d) {
  const date = new Date(d.getTime());
  date.setHours(0, 0, 0, 0);
  date.setDate(date.getDate() + 3 - (date.getDay() + 6) % 7);
  const week1 = new Date(date.getFullYear(), 0, 4);
  return 1 + Math.round(((date.getTime() - week1.getTime()) / 86400000 - 3 + (week1.getDay() + 6) % 7) / 7);
}

// Re-aggregate array based on formatted period
function reAggregate(arr, periodType) {
  if (!Array.isArray(arr)) return arr;
  const map = {};
  
  arr.forEach(item => {
    let newPeriod = item.period;
    if (item.period && String(item.period).includes('-')) {
       const d = new Date(item.period);
       if (!isNaN(d.getTime())) {
         if (periodType === 'weekly') {
           const w = getISOWeek(d);
           newPeriod = `${d.getFullYear()}-W${w.toString().padStart(2, '0')}`;
         } else if (periodType === 'monthly') {
           newPeriod = `${d.getFullYear()}-${(d.getMonth()+1).toString().padStart(2, '0')}`;
         } else if (periodType === 'yearly') {
           newPeriod = `${d.getFullYear()}`;
         } else if (periodType === 'daily') {
           newPeriod = d.toISOString().split('T')[0];
         }
       }
    }
    
    if (!map[newPeriod]) {
      map[newPeriod] = { ...item, period: newPeriod };
    } else {
      // Sum numeric fields
      for (const k of Object.keys(item)) {
        if (typeof item[k] === 'number' && k !== 'rank') {
          map[newPeriod][k] = (map[newPeriod][k] || 0) + item[k];
        }
      }
    }
  });
  
  return Object.values(map);
}

// Fix all sections
for (const section of Object.keys(data)) {
  const obj = data[section];
  if (!obj || typeof obj !== 'object' || Array.isArray(obj)) continue;

  if (obj.daily) obj.daily = reAggregate(obj.daily, 'daily');
  if (obj.weekly) obj.weekly = reAggregate(obj.weekly, 'weekly');
  if (obj.monthly) obj.monthly = reAggregate(obj.monthly, 'monthly');
  if (obj.yearly) obj.yearly = reAggregate(obj.yearly, 'yearly');
}

// === EARNINGS YEARLY MOCK (5 years) ===
const currentYearly = data.earnings.yearly;
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
data.earnings.summaries.yearly = {
  totalEarningsUSD: Math.round(yearlyTotal * 100) / 100,
  tokensReceived: yearlyTokens
};

// === SUBSCRIPTIONS YEARLY MOCK (Tahun 2025) ===
if (data.subscriptions && Array.isArray(data.subscriptions.yearly)) {
  const existing = data.subscriptions.yearly.find(y => y.period === "2026") || data.subscriptions.yearly[0];
  if (existing && !data.subscriptions.yearly.find(y => y.period === "2025")) {
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
     data.subscriptions.yearly.push(mockYear);
     data.subscriptions.yearly.sort((a,b) => String(a.period).localeCompare(String(b.period)));
  }
}

fs.writeFileSync(bundlePath, JSON.stringify(data, null, 2), 'utf8');
console.log('✅ FIXED DATES & MOCK DATA (Subscriptions 2025 + Earnings) applied successfully!');
