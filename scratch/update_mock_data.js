import fs from 'fs';
const path = 'public/chartsData.bundle.json';
const data = JSON.parse(fs.readFileSync(path, 'utf8'));

// Mock Monthly Data
data.subscribers.monthly = [
  { newSubscriber: 45, recurringSubscriber: 32, totalSubscribers: 77, tier1: 20, tier2: 25, tier3: 32, tier4: 0, tier5: 0, period: '2025-10-31' },
  { newSubscriber: 52, recurringSubscriber: 38, totalSubscribers: 90, tier1: 25, tier2: 30, tier3: 35, tier4: 0, tier5: 0, period: '2025-11-30' },
  { newSubscriber: 61, recurringSubscriber: 42, totalSubscribers: 103, tier1: 30, tier2: 35, tier3: 38, tier4: 0, tier5: 0, period: '2025-12-31' },
  { newSubscriber: 75, recurringSubscriber: 51, totalSubscribers: 126, tier1: 40, tier2: 42, tier3: 44, tier4: 0, tier5: 0, period: '2026-01-31' },
  { newSubscriber: 88, recurringSubscriber: 59, totalSubscribers: 147, tier1: 45, tier2: 50, tier3: 52, tier4: 0, tier5: 0, period: '2026-02-28' },
  { newSubscriber: 95, recurringSubscriber: 64, totalSubscribers: 159, tier1: 50, tier2: 55, tier3: 54, tier4: 0, tier5: 0, period: '2026-03-31' }
];

// Mock Yearly Data
data.subscribers.yearly = [
  { newSubscriber: 350, recurringSubscriber: 210, totalSubscribers: 560, tier1: 150, tier2: 180, tier3: 230, tier4: 0, tier5: 0, period: '2024-12-31' },
  { newSubscriber: 480, recurringSubscriber: 320, totalSubscribers: 800, tier1: 220, tier2: 260, tier3: 320, tier4: 0, tier5: 0, period: '2025-12-31' }
];

// Add All-Time Data
data.subscribers['all-time'] = [
  { newSubscriber: 350, recurringSubscriber: 210, totalSubscribers: 560, tier1: 150, tier2: 180, tier3: 230, tier4: 0, tier5: 0, period: '2024-12-31' },
  { newSubscriber: 480, recurringSubscriber: 320, totalSubscribers: 800, tier1: 220, tier2: 260, tier3: 320, tier4: 0, tier5: 0, period: '2025-12-31' }
];

fs.writeFileSync(path, JSON.stringify(data, null, 2));
console.log('Successfully updated subscribers mock data');
