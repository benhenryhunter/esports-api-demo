import moment from 'moment'
import mutations from './mutations'
import actions from './actions'

const state = () => ({
  liveMatches: [],
  currentMonthMatches: [],
  lastMonthMatches: [],
  selectedMonthMatches: [],
  upcomingMatches: [],
  selectedMonth: moment().subtract(2, 'months').startOf('month'),
  error: null
})

export default {
  state,
  mutations,
  actions
}
