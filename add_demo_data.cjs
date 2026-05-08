const fs = require('fs');
const path = require('path');

const bundlePath = path.join(__dirname, 'public', 'chartsData.bundle.json');
const bundle = JSON.parse(fs.readFileSync(bundlePath, 'utf8'));

// =============================================
// MEDIA thumbnails — video/content style images
// =============================================
const mediaImages = [
  '/images/media_1.png',   // gaming setup
  '/images/media_2.png',   // travel vlog sunset
  '/images/media_3.png',   // cooking/sushi
  '/images/media_4.png',   // DJ concert
  '/images/media_5.png',   // yoga mountain
  '/images/media_6.png',   // skateboarding
  '/images/media_7.png',   // underwater diving
];

// =============================================
// MERCH thumbnails — product photography images
// =============================================
const merchImages = [
  '/images/merch_1.png',   // black hoodie
  '/images/merch_2.png',   // coffee mug
  '/images/merch_3.png',   // baseball cap
  '/images/merch_4.png',   // phone case
  '/images/merch_5.png',   // tote bag
  '/images/merch_6.png',   // water bottle
  '/images/merch_7.png',   // t-shirt
];

// =============================================
// AVATARS — diverse profile pictures
// =============================================
const avatars = [
  '/images/avatar_1.png',
  '/images/avatar_2.png',
  '/images/profile-thumbnail.png',
  'https://i.pravatar.cc/150?u=alice',
  'https://i.pravatar.cc/150?u=bob',
  'https://i.pravatar.cc/150?u=charlie',
  'https://i.pravatar.cc/150?u=diana',
  'https://i.pravatar.cc/150?u=evan',
  'https://i.pravatar.cc/150?u=frank',
  'https://i.pravatar.cc/150?u=grace',
];

// Realistic media titles
const mediaTitles = [
  'Epic Gaming Setup Tour 2026 — RGB Heaven!',
  'Travel Vlog: Hidden Beach Paradise in Bali',
  'Sushi Masterclass — How to Roll Like a Pro',
  'Live DJ Set at Neon Festival Tokyo',
  'Morning Yoga Routine with Mountain Views',
  'Skateboard Tricks at Golden Hour',
  'Underwater Adventure: Coral Reef Diving',
  'Street Food Challenge in Bangkok',
  'Behind the Scenes: Music Video Shoot',
  'Unboxing the Most Expensive Tech of 2026',
];

// Realistic merch titles
const merchTitles = [
  'Premium Black Hoodie — Limited Edition',
  'Signature Coffee Mug — Matte Black',
  'Classic White Baseball Cap',
  'Geometric Phone Case — Midnight Black',
  'Canvas Tote Bag — Minimalist Print',
  'Stainless Steel Water Bottle — Matte Black',
  'Graphic T-Shirt — White Edition',
  'Embroidered Beanie — Charcoal',
  'Laptop Sleeve — Vegan Leather',
  'Enamel Pin Set — Collector\'s Edition',
];

// Contributor names
const contributorNames = [
  'Sophia Martinez', 'James Chen', 'Olivia Park', 'Liam Wilson',
  'Emma Taylor', 'Noah Brown', 'Ava Johnson', 'Lucas Davis',
  'Isabella Garcia', 'Mason Lee',
];

function fillArray(arr, count, templateFactory) {
  const result = [...arr];
  let idCounter = 10000;
  while (result.length < count) {
    const newItem = templateFactory(result.length + 1, idCounter++);
    result.push(newItem);
  }
  return result.slice(0, count).map((item, idx) => {
    item.rank = idx + 1;
    return item;
  });
}

const periods = ['daily', 'weekly', 'monthly', 'yearly', 'alltime'];

// ========== 1. Trending Media — use MEDIA images ==========
if (bundle.trendingsMedia) {
  periods.forEach(p => {
    bundle.trendingsMedia[p] = fillArray(bundle.trendingsMedia[p] || [], 10, (rank, id) => ({
      period: "2026-04-09",
      rank,
      media: mediaTitles[(rank - 1) % mediaTitles.length],
      views: Math.floor(Math.random() * 5000) + 100,
      salesUSD: +(Math.random() * 100).toFixed(2),
      salesCount: Math.floor(Math.random() * 10) + 1,
      ppvSalesUSD: +(Math.random() * 100).toFixed(2),
      ppvSalesCount: Math.floor(Math.random() * 10),
      clicks: Math.floor(Math.random() * 1000) + 50,
      rpmUSD: +(Math.random() * 10).toFixed(2),
      watchDurationSec: Math.floor(Math.random() * 300000) + 3600,
      tags: [],
      thumbnailUrl: mediaImages[(rank - 1) % mediaImages.length]
    })).map((item, idx) => ({
      ...item,
      media: mediaTitles[idx % mediaTitles.length],
      thumbnailUrl: mediaImages[idx % mediaImages.length]
    }));
  });
}

// ========== 2. Trending Merch — use MERCH images ==========
if (bundle.trendingMerch) {
  periods.forEach(p => {
    bundle.trendingMerch[p] = fillArray(bundle.trendingMerch[p] || [], 10, (rank, id) => ({
      period: "2026-04-09",
      rank,
      merch: merchTitles[(rank - 1) % merchTitles.length],
      salesCount: Math.floor(Math.random() * 50) + 5,
      salesUSD: +(Math.random() * 500 + 10).toFixed(2),
      views: Math.floor(Math.random() * 2000) + 100,
      clicks: Math.floor(Math.random() * 500) + 20,
      thumbnailUrl: merchImages[(rank - 1) % merchImages.length]
    })).map((item, idx) => ({
      ...item,
      merch: merchTitles[idx % merchTitles.length],
      thumbnailUrl: merchImages[idx % merchImages.length]
    }));
  });
}

// ========== 3. Trending Tags ==========
const tagNames = ['#gaming', '#travel', '#food', '#music', '#fitness', '#fashion', '#tech', '#art', '#vlog', '#comedy'];
if (bundle.trendingTags) {
  periods.forEach(p => {
    bundle.trendingTags[p] = fillArray(bundle.trendingTags[p] || [], 10, (rank, id) => ({
      period: "2026-04-09",
      rank,
      tag: tagNames[(rank - 1) % tagNames.length],
      count: Math.floor(Math.random() * 1000) + 50
    }));
  });
}

// ========== 4. Trending Countries ==========
const countryNames = [
  'Hong Kong', 'United States of America', 'Singapore', 'Australia',
  'Taiwan', 'United Kingdom', 'Japan', 'Germany', 'Canada', 'France'
];
if (bundle.trendingCountries) {
  periods.forEach(p => {
    bundle.trendingCountries[p] = fillArray(bundle.trendingCountries[p] || [], 10, (rank, id) => ({
      period: "2026-04-09",
      rank,
      country: countryNames[(rank - 1) % countryNames.length],
      views: Math.floor(Math.random() * 10000) + 500,
      earningsUSD: +(Math.random() * 5000 + 100).toFixed(2),
      users: Math.floor(Math.random() * 500) + 10
    }));
  });
}

// ========== 5. Contributors — use AVATAR images ==========
if (bundle.contributors) {
  const cTypes = ['topContributors', 'topFirms', 'topOrderSpenders', 'topFans'];
  cTypes.forEach(type => {
    if (!bundle.contributors[type]) bundle.contributors[type] = {};
    periods.forEach(p => {
      bundle.contributors[type][p] = fillArray(bundle.contributors[type][p] || [], 10, (rank, id) => ({
        period: "2026-04-09",
        rank,
        name: contributorNames[(rank - 1) % contributorNames.length],
        username: `@${contributorNames[(rank - 1) % contributorNames.length].replace(/\s+/g, '').toLowerCase()}`,
        handle: `@${contributorNames[(rank - 1) % contributorNames.length].replace(/\s+/g, '').toLowerCase()}`,
        avatar: avatars[(rank - 1) % avatars.length],
        totalUSD: +(Math.random() * 1000 + 50).toFixed(2),
        usdSpent: +(Math.random() * 1000 + 50).toFixed(2),
        purchases: Math.floor(Math.random() * 20) + 1,
        views: Math.floor(Math.random() * 500) + 10
      })).map((item, idx) => ({
        ...item,
        name: contributorNames[idx % contributorNames.length],
        handle: `@${contributorNames[idx % contributorNames.length].replace(/\s+/g, '').toLowerCase()}`,
        avatar: avatars[idx % avatars.length]
      }));
    });
  });
}

fs.writeFileSync(bundlePath, JSON.stringify(bundle, null, 2));
console.log('✅ Successfully injected 10 items per array with SEPARATE media/merch images!');
console.log(`   Media images: ${mediaImages.length} unique thumbnails`);
console.log(`   Merch images: ${merchImages.length} unique product photos`);
console.log(`   Avatars: ${avatars.length} unique profile pics`);
