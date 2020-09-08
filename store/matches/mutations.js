import { Mutation } from './types'

export default {
  [Mutation.SET_LIVE_MATCHES] (state, data) {
    state.liveMatches = data
  },
  [Mutation.SET_THIS_MONTH_MATCHES] (state, data) {
    state.currentMonthMatches = data
  },
  [Mutation.SET_LAST_MONTH_MATCHES] (state, data) {
    state.lastMonthMatches = data
  },
  [Mutation.SET_SELECTED_MONTH_MATCHES] (state, data) {
    state.selectedMonthMatches = data
  },
  [Mutation.SET_SELECTED_MONTH] (state, data) {
    state.selectedMonth = data
  },
  [Mutation.SET_UPCOMING_MATCHES] (state, data) {
    state.upcomingMatches = data
  },
  [Mutation.SET_ERROR] (state, data) {
    state.error = data
  },
  [Mutation.CLEAR_MATCHES] (state) {
    state.liveMatches = []
    state.currentMonthMatches = []
    state.lastMonthMatches = []
    state.selectedMonthMatches = []
    state.upcomingMatches = []
  }
}
