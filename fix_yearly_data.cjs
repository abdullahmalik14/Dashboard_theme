/**
 * Fix yearly data structure per Linden's definitions:
 * - Yearly = monthly breakdown for current year (Jan-Dec), period: "Jan", "Feb", ...
 * - All Time = last 5 years, period: "2022", "2023", "2024", "2025", "2026"
 */
const fs = require('fs');
const path = require('path');

const bundlePath = path.join(__dirname, 'public', 'chartsData.bundle.json');
const bundle = JSON.parse(fs.readFileSync(bundlePath, 'utf8'));

// === EARNINGS ===
// Current yearly data (5 years) → move to alltime
const currentYearly = bundle.earnings.yearly; // 5 entries: 2022-2026

// Generate 12 monthly entries for yearly view (Jan-Dec current year)
// Values based on a realistic growth trend, scaled to match Figma (~200-800 per bar total)
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const yearlyMonthly = months.map((m, i) => {
  // Growth factor: starts low, grows through the year
  const factor = 0.4 + (i * 0.06); // 0.4 to 1.06
  const noise = 1 + (Math.sin(i * 2.3) * 0.15); // slight variance
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

// Set new structure
bundle.earnings.yearly = yearlyMonthly;
bundle.earnings.alltime = currentYearly;

// Update summaries for yearly
const yearlyTotal = yearlyMonthly.reduce((s, e) => s + e.total, 0);
const yearlyTokens = yearlyMonthly.reduce((s, e) => s + e.totalTokens, 0);
bundle.earnings.summaries.yearly = {
  totalEarningsUSD: Math.round(yearlyTotal * 100) / 100,
  tokensReceived: yearlyTokens
};

// Add alltime summary (sum of 5 years)
const alltimeTotal = currentYearly.reduce((s, e) => s + e.total, 0);
const alltimeTokens = currentYearly.reduce((s, e) => s + e.totalTokens, 0);
bundle.earnings.summaries.alltime = {
  totalEarningsUSD: Math.round(alltimeTotal * 100) / 100,
  tokensReceived: alltimeTokens
};

// Print verification
console.log('=== EARNINGS YEARLY (new - 12 months) ===');
yearlyMonthly.forEach((e, i) => console.log(`  [${i}] period=${e.period} total=${e.total} tokens=${e.totalTokens}`));
console.log(`  Summary: $${bundle.earnings.summaries.yearly.totalEarningsUSD}, ${bundle.earnings.summaries.yearly.tokensReceived} tokens`);

console.log('\n=== EARNINGS ALLTIME (moved from yearly) ===');
currentYearly.forEach((e, i) => console.log(`  [${i}] period=${e.period} total=${e.total} tokens=${e.totalTokens}`));
console.log(`  Summary: $${bundle.earnings.summaries.alltime.totalEarningsUSD}, ${bundle.earnings.summaries.alltime.tokensReceived} tokens`);

// Write back
fs.writeFileSync(bundlePath, JSON.stringify(bundle, null, 2), 'utf8');
console.log('\n✅ Bundle updated successfully!');
