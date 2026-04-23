// DashboardAnalytics.js
import { defineStore } from 'pinia'

export const useDashboardAnalytics = defineStore('DashboardAnalytics', {
  state: () => ({
    // Subscribers bundle (Said's format: sub, tip, tier1-5)
    subscriptionsBundle: {
      daily: [],
      weekly: [],
      monthly: [],
      yearly: [],
      alltime: [],
      grandTotal: null,
    },

    // Baki cards ke liye (baad mein implement honge)
    fans: {
      daily: { newFollowers: null, profileVisit: null },
      weekly: { newFollowers: null, profileVisit: null },
      monthly: { newFollowers: null, profileVisit: null },
      yearly: { newFollowers: null, profileVisit: null },
    },
    earnings: {
      daily: [],
      weekly: [],
      monthly: [],
      yearly: [],
      alltime: [],
      grandTotal: null,
    },
    likes: {
      media: null,
      merch: null,
      profile: null,
      feed: null,
    },
    lastUpdated: null,
    bundleLoaded: false,
  }),

  getters: {
    // Subscribers card: daily ka sabse latest entry
    subscribers(state) {
      const daily = state.subscriptionsBundle.daily
      const latest = daily[daily.length - 1] || {}
      const prev = daily[daily.length - 2] || {}

      // Percentage calculate karo (prev se compare)
      const calcPct = (curr, prev) => {
        if (!prev || prev === 0) return null
        return Math.round(((curr - prev) / prev) * 100)
      }

      // Using Said's field names: sub = new, tip = recurring
      return {
        daily: {
          new: latest.sub ?? null,
          recurring: latest.tip ?? null,
          newPercentage: calcPct(latest.sub, prev.sub),
          recurringPercentage: calcPct(latest.tip, prev.tip),
        },
        weekly: (() => {
          const arr = state.subscriptionsBundle.weekly
          const last = arr[arr.length - 1] || {}
          const secondLast = arr[arr.length - 2] || {}
          return {
            new: last.sub ?? null,
            recurring: last.tip ?? null,
            newPercentage: calcPct(last.sub, secondLast.sub),
            recurringPercentage: calcPct(last.tip, secondLast.tip),
          }
        })(),
        monthly: (() => {
          const arr = state.subscriptionsBundle.monthly
          const last = arr[arr.length - 1] || {}
          const secondLast = arr[arr.length - 2] || {}
          return {
            new: last.sub ?? null,
            recurring: last.tip ?? null,
            newPercentage: calcPct(last.sub, secondLast.sub),
            recurringPercentage: calcPct(last.tip, secondLast.tip),
          }
        })(),
        yearly: (() => {
          const gt = state.subscriptionsBundle.grandTotal || {}
          return {
            new: gt.sub ?? null,
            recurring: gt.tip ?? null,
            newPercentage: null,
            recurringPercentage: null,
          }
        })(),
      }
    },
  },

  actions: {
    async loadAnalytics() {
      const now = new Date()
      if (
        !this.lastUpdated ||
        now.getTime() - new Date(this.lastUpdated).getTime() > 15 * 60 * 1000
      ) {
        console.log('📡 Bundle fetch at:', now.toLocaleTimeString())
        try {
          const response = await fetch('/chartsData.bundle.json')
          const bundle = await response.json()

          // Subscriptions data — Said's bundle format
          // Load from separate subscribersBundle.json
          try {
            const subResp = await fetch('/subscribersBundle.json')
            const subBundle = await subResp.json()
            this.subscriptionsBundle = {
              daily: subBundle.daily || [],
              weekly: subBundle.weekly || [],
              monthly: subBundle.monthly || [],
              yearly: subBundle.yearly || [],
              alltime: subBundle.alltime || [],
              grandTotal: subBundle.grandTotal || null,
            }
          } catch(e) {
            console.error('Subscribers bundle load failed:', e)
          }

          // Baki cards ke liye (baad mein implement honge)
          if (bundle.earnings) {
            this.earnings = {
              daily: bundle.earnings.daily || [],
              weekly: bundle.earnings.weekly || [],
              monthly: bundle.earnings.monthly || [],
              yearly: bundle.earnings.yearly || [],
              alltime: bundle.earnings.yearly || [],  // alltime = yearly data
              grandTotal: bundle.earnings.grandTotal || null,
            }
          }

          this.bundleLoaded = true
          this.lastUpdated = now.toISOString()
        } catch (err) {
          console.error('❌ Bundle fetch failed:', err)
        }
      } else {
        console.log('⏳ Using cached data:', now.toLocaleTimeString())
      }
    },

    resetAnalytics() {
      this.subscriptionsBundle = { daily: [], weekly: [], monthly: [], yearly: [], grandTotal: null }
      this.lastUpdated = null
      this.bundleLoaded = false
    },
  },

  persist: true,
})
