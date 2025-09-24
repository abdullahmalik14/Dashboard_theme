// DashboardAnalytics.js
import { defineStore } from 'pinia'
import { fetchMockAnalytics } from '../api/analytics'

export const useDashboardAnalytics = defineStore('DashboardAnalytics', {
  state: () => ({
    subscribers: {
      new: null,
      recurring: null,
    },
    fans: {
      newFollowers: null,
      profileVisit: null,
    },
    earnings: {
      daily: [],
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
      this.subscribers = { new: null, recurring: null }
      this.fans = { newFollowers: null, profileVisit: null }
      this.earnings = { daily: [] }
      this.likes = { media: null, merch: null, profile: null, feed: null }
      this.lastUpdated = null
    },
  },

  persist: true,
})
