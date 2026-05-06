
const fs = require('fs');

const data = JSON.parse(fs.readFileSync('public/chartsData.bundle.json', 'utf8'));

function getISOWeek(d) {
  const date = new Date(d.getTime());
  date.setHours(0, 0, 0, 0);
  date.setDate(date.getDate() + 3 - (date.getDay() + 6) % 7);
  const week1 = new Date(date.getFullYear(), 0, 4);
  return 1 + Math.round(((date.getTime() - week1.getTime()) / 86400000 - 3 + (week1.getDay() + 6) % 7) / 7);
}

for (const section of Object.keys(data)) {
  const obj = data[section];
  if (!obj || typeof obj !== 'object' || Array.isArray(obj)) continue;

  if (Array.isArray(obj.weekly)) {
    obj.weekly.forEach((item, i) => {
      if (item.period && String(item.period).includes('-')) {
         const d = new Date(item.period);
         if (!isNaN(d.getTime())) {
           const w = getISOWeek(d);
           item.period = \\-W\\;
         }
      }
    });
  }

  if (Array.isArray(obj.monthly)) {
    obj.monthly.forEach((item, i) => {
      if (item.period && String(item.period).includes('-')) {
         const d = new Date(item.period);
         if (!isNaN(d.getTime())) {
           item.period = \\-\\;
         }
      }
    });
  }
  
  if (Array.isArray(obj.yearly)) {
    obj.yearly.forEach((item, i) => {
      if (item.period && String(item.period).includes('-')) {
         const d = new Date(item.period);
         if (!isNaN(d.getTime())) {
           item.period = \\\;
         }
      }
    });
  }
}

// Add 2nd year to subscriptions.yearly
if (data.subscriptions && Array.isArray(data.subscriptions.yearly)) {
  const existing = data.subscriptions.yearly[0];
  if (existing) {
     const mockYear = {
        ...existing,
        period: '2025',
        newSubscriber: Math.round(existing.newSubscriber * 0.8),
        recurringSubscriber: Math.round(existing.recurringSubscriber * 0.8),
        totalSubscribers: Math.round(existing.totalSubscribers * 0.8),
        tier1: Math.round(existing.tier1 * 0.8),
        tier2: Math.round(existing.tier2 * 0.8),
        tier3: Math.round(existing.tier3 * 0.8),
     };
     
     if (!data.subscriptions.yearly.find(y => y.period === '2025')) {
        data.subscriptions.yearly.push(mockYear);
        data.subscriptions.yearly.sort((a,b) => String(a.period).localeCompare(String(b.period)));
     }
  }
}

fs.writeFileSync('public/chartsData.bundle.json', JSON.stringify(data, null, 2));
console.log('Fixed dates to match Vue charts and added 2025 to subscriptions.yearly');
