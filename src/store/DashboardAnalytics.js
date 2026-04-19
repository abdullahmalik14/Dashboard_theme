// DashboardAnalytics.js
import { defineStore } from 'pinia'
import { fetchMockAnalytics } from '../api/analytics'

export const useDashboardAnalytics = defineStore('DashboardAnalytics', {
  state: () => ({
    subscribers: {
      daily: { new: null, recurring: null },
      weekly: { new: null, recurring: null },
      monthly: { new: null, recurring: null },
      yearly: { new: null, recurring: null },
    },
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
    },
    likes: {
      media: null,
      merch: null,
      profile: null,
      feed: null,
    },
    lastUpdated: null,
  }),

  actions: {
    async loadAnalytics() {
      const now = new Date()
      if (
        !this.lastUpdated ||
        now.getTime() - new Date(this.lastUpdated).getTime() > 15 * 60 * 1000
      ) {
        console.log('📡 API called at:', now.toLocaleTimeString())
        const data = await fetchMockAnalytics()

        this.subscribers = data.subscribers
        this.fans = data.fans
        this.earnings = data.earnings
        this.likes = data.likes
        this.lastUpdated = now.toISOString()
      } else {
        console.log('⏳ Using cached data, no API call:', now.toLocaleTimeString())
      }
    },

    setAnalyticsData(data) {
      this.subscribers = data.subscribers
      this.fans = data.fans
      this.earnings = data.earnings
      this.likes = data.likes
      this.lastUpdated = new Date().toISOString()
    },

    resetAnalytics() {
      this.subscribers = {
        daily: { new: null, recurring: null },
        weekly: { new: null, recurring: null },
        monthly: { new: null, recurring: null },
        yearly: { new: null, recurring: null },
      }
      this.fans = {
        daily: { newFollowers: null, profileVisit: null },
        weekly: { newFollowers: null, profileVisit: null },
        monthly: { newFollowers: null, profileVisit: null },
        yearly: { newFollowers: null, profileVisit: null },
      }
      this.earnings = { daily: [], weekly: [], monthly: [], yearly: [] }
      this.likes = { media: null, merch: null, profile: null, feed: null }
      this.lastUpdated = null
    },
  },

  persist: true,
})
