const fs = require('fs');
const path = require('path');

const bundlePath = path.join(__dirname, 'public', 'chartsData.bundle.json');
let bundle;
try {
  bundle = JSON.parse(fs.readFileSync(bundlePath, 'utf8'));
} catch (e) {
  console.error("Gagal membaca chartsData.bundle.json", e);
  process.exit(1);
}

// === EARNINGS YEARLY MOCK (5 years) ===
const currentYearly = bundle.earnings.yearly;
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
    subscription,
    paytoview,
    merch,
    wishtender,
    customrequest,
    total,
    subscriptionTokens: 0,
    paytoviewTokens: 0,
    merchTokens: 0,
    wishtenderTokens: 0,
    customrequestTokens: 0,
    totalTokens,
    tipTokens,
    callTokens,
    chatTokens,
    liveStreamTokens
  };
});

bundle.earnings.yearly = yearlyMonthly;
if (currentYearly && currentYearly.length > 0) {
  bundle.earnings.alltime = currentYearly;
}

const yearlyTotal = yearlyMonthly.reduce((s, e) => s + e.total, 0);
const yearlyTokens = yearlyMonthly.reduce((s, e) => s + e.totalTokens, 0);
bundle.earnings.summaries.yearly = {
  totalEarningsUSD: Math.round(yearlyTotal * 100) / 100,
  tokensReceived: yearlyTokens
};

// === SUBSCRIPTIONS YEARLY MOCK (Tahun 2025) ===
if (bundle.subscriptions && Array.isArray(bundle.subscriptions.yearly)) {
  const existing = bundle.subscriptions.yearly.find(y => y.period === "2026") || bundle.subscriptions.yearly[0];
  if (existing && !bundle.subscriptions.yearly.find(y => y.period === "2025")) {
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
     bundle.subscriptions.yearly.push(mockYear);
     bundle.subscriptions.yearly.sort((a,b) => String(a.period).localeCompare(String(b.period)));
  }
}

fs.writeFileSync(bundlePath, JSON.stringify(bundle, null, 2), 'utf8');
console.log('✅ Mock data (5 years earnings & 2 years subscriptions) applied successfully!');
