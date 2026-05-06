/**
 * Fix: Update bundle data to exactly match Figma values
 */
const fs = require('fs');
const path = require('path');

const bundlePath = path.join(__dirname, 'public', 'chartsData.bundle.json');
const bundle = JSON.parse(fs.readFileSync(bundlePath, 'utf8'));

// === EARNINGS ===
if (bundle.earnings && bundle.earnings.daily) {
  const arr = bundle.earnings.daily;
  if (arr.length > 0) {
    const latest = arr[arr.length - 1];
    latest.total = 2000;
    latest.earningsPercentage = 20;
    if (arr.length > 1) {
      const prev = arr[arr.length - 2];
      prev.total = Math.round(2000 / 1.20);
    }
  }
}

// === SUBSCRIBERS ===
if (bundle.subscriptions && bundle.subscriptions.daily) {
  const arr = bundle.subscriptions.daily;
  if (arr.length > 0) {
    const latest = arr[arr.length - 1];
    latest.newSubscriber = 50;
    latest.recurringSubscriber = 5;
    latest.newPercentage = 20;
    latest.recurringPercentage = 20;
    if (arr.length > 1) {
      const prev = arr[arr.length - 2];
      prev.newSubscriber = Math.round(50 / 1.20);
      prev.recurringSubscriber = Math.round(5 / 1.20);
    }
  }
}

// === FANS ===
if (bundle.fanInsights && bundle.fanInsights.daily) {
  const arr = bundle.fanInsights.daily;
  if (arr.length > 0) {
    const latest = arr[arr.length - 1];
    latest.newFollowers = 4;
    latest.profileVisits = 4;
    latest.newFollowersPercentage = -20;
    latest.profileVisitPercentage = -20;
    if (arr.length > 1) {
      const prev = arr[arr.length - 2];
      prev.newFollowers = Math.round(4 / 0.80);
      prev.profileVisits = Math.round(4 / 0.80);
    }
  }
}

// === LIKES ===
if (bundle.likes && bundle.likes.daily) {
  const arr = bundle.likes.daily;
  if (arr.length > 0) {
    const latest = arr[arr.length - 1];
    latest.media = 76;
    latest.merch = 2;
    latest.profile = 12000;
    latest.feed = 4500;
    latest.mediaPercentage = -20;
    latest.merchPercentage = -20;
    latest.profilePercentage = 20;
    latest.feedPercentage = 20;
  }
}

// === CONTRIBUTORS ===
if (bundle.contributors && bundle.contributors.topContributors) {
  bundle.contributors.topContributors.forEach(c => {
    if (c.handle === '@Mangoes4eva' || c.name === 'MAN GOES') {
      // Ensure specific avatar
      c.avatar = 'https://i.ibb.co.com/mXyG1hS/mangoes.png';
    }
  });
}

fs.writeFileSync(bundlePath, JSON.stringify(bundle, null, 2), 'utf8');
console.log('✅ Bundle data updated to match Figma exactly!');
