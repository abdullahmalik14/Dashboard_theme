/**
 * fix_bundle_data_linden.cjs
 * 
 * 1. Generate views for fanInsights.countries based on earningsUSD
 * 2. Generate fanInsights.sources for Traffic Sources donut chart
 * 3. Convert contributors flat array into period-based object
 */
const fs = require('fs');
const path = require('path');

const bundlePath = path.join(__dirname, 'public', 'chartsData.bundle.json');
const data = JSON.parse(fs.readFileSync(bundlePath, 'utf8'));

// ========================================================
// 1. FIX FAN INSIGHTS COUNTRIES (Views = 0)
// ========================================================
if (data.fanInsights && data.fanInsights.countries) {
  for (const period of Object.keys(data.fanInsights.countries)) {
    data.fanInsights.countries[period] = data.fanInsights.countries[period].map(c => {
      if (c.views === 0) {
        // Generate a realistic view count based on earnings, or random if earnings = 0
        const baseViews = c.earningsUSD > 0 ? c.earningsUSD * (Math.random() * 5 + 5) : Math.random() * 500 + 100;
        return { ...c, views: Math.floor(baseViews) };
      }
      return c;
    });
  }
}

// ========================================================
// 2. FIX FAN INSIGHTS SOURCES (Traffic Sources = [])
// ========================================================
const sourcesList = ['Instagram', 'TikTok', 'Twitter', 'Reddit', 'Direct', 'Other'];
const sourcesWeights = [0.4, 0.25, 0.15, 0.10, 0.05, 0.05];

function generateSourcesForPeriod(totalVisits) {
  if (!totalVisits || totalVisits <= 0) totalVisits = Math.floor(Math.random() * 5000 + 1000);
  return sourcesList.map((name, index) => {
    // Add slight random variance to weights
    let weight = sourcesWeights[index] * (0.8 + Math.random() * 0.4);
    return {
      source: name,
      value: Math.floor(totalVisits * weight)
    };
  }).sort((a, b) => b.value - a.value); // Sort descending
}

if (data.fanInsights) {
  data.fanInsights.sources = {
    daily: generateSourcesForPeriod(1500),
    weekly: generateSourcesForPeriod(10500),
    monthly: generateSourcesForPeriod(45000),
    yearly: generateSourcesForPeriod(540000),
    alltime: generateSourcesForPeriod(2700000)
  };
  
  // Wait, Fans popup actually uses fans_traffic? 
  // Let's check Fans popup or DashboardAnalytics.js.
  // Actually fans_traffic was also in the bundle:
  if (data.fans_traffic) {
    data.fans_traffic = data.fanInsights.sources;
  }
}

// ========================================================
// 3. FIX CONTRIBUTORS (Period-based instead of flat array)
// ========================================================
// The original contributors were just topContributors: [5 items], etc.
// We need to convert them to:
// topContributors: { daily: [], weekly: [], monthly: [], yearly: [], alltime: [] }

function scaleContributors(baseArr, multiplier) {
  return baseArr.map(c => {
    // Randomize rankings a bit
    const variance = 0.8 + Math.random() * 0.4; // 80% to 120%
    const scale = multiplier * variance;
    return {
      ...c,
      subscription: Math.round(c.subscription * scale * 100) / 100,
      paytoview: Math.round(c.paytoview * scale * 100) / 100,
      merch: Math.round(c.merch * scale * 100) / 100,
      wishtender: Math.round(c.wishtender * scale * 100) / 100,
      customrequest: Math.round(c.customrequest * scale * 100) / 100,
      tokens: Math.round(c.tokens * scale * 100) / 100,
      usdSpent: Math.round(c.usdSpent * scale * 100) / 100,
      totalSpent: Math.round(c.totalSpent * scale * 100) / 100,
    };
  }).sort((a, b) => (b.tokens || b.usdSpent || 0) - (a.tokens || a.usdSpent || 0)); // Re-sort
}

function periodizeContributors(flatArr) {
  if (!flatArr || flatArr.length === 0) {
    return { daily: [], weekly: [], monthly: [], yearly: [], alltime: [] };
  }
  
  // Assume flatArr is the "yearly" amount.
  return {
    daily: scaleContributors(flatArr, 1 / 365),
    weekly: scaleContributors(flatArr, 7 / 365),
    monthly: scaleContributors(flatArr, 30 / 365),
    yearly: flatArr, // Use original as yearly
    alltime: scaleContributors(flatArr, 5) // 5 years
  };
}

if (data.contributors) {
  // Only convert if it's currently an array
  if (Array.isArray(data.contributors.topContributors)) {
    data.contributors.topContributors = periodizeContributors(data.contributors.topContributors);
  }
  if (Array.isArray(data.contributors.topFans)) {
    data.contributors.topFans = periodizeContributors(data.contributors.topFans);
  }
  if (Array.isArray(data.contributors.topOrderSpenders)) {
    data.contributors.topOrderSpenders = periodizeContributors(data.contributors.topOrderSpenders);
  }
  if (Array.isArray(data.contributors.topFirms)) {
    data.contributors.topFirms = periodizeContributors(data.contributors.topFirms);
  }
}

// Write back to file
fs.writeFileSync(bundlePath, JSON.stringify(data, null, 2), 'utf8');
console.log('✅ Bundle data updated: Views fixed, Sources fixed, Contributors periodized.');
