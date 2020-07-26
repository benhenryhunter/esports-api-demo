import axios from 'axios'
import moment from 'moment'
import { TEAM_IDS } from '../constants'
import { Action, Mutation } from './types'

export default {
  async [Action.GET_THIS_MONTH_MATCHES] ({ commit }, { gameIDs }) {
    try {
      const response = await axios.get(`${process.env.API_URL}/teams/${TEAM_IDS.join(',')}/matches?dateAfter=${moment().startOf('month').format('YYYY-MM-DD')}&dateBefore=${moment().endOf('month').format('YYYY-MM-DD')}&match.game_id=${gameIDs.join(',')}`)
      commit(Mutation.SET_THIS_MONTH_MATCHES, response.data.data)
    } catch (error) {
      commit(Mutation.SET_ERROR, error)
    }
  },
  async [Action.GET_LAST_MONTH_MATCHES] ({ commit }, { gameIDs }) {
    try {
      const response = await axios.get(`${process.env.API_URL}/teams/${TEAM_IDS.join(',')}/matches?dateAfter=${moment().subtract(1, 'month').startOf('month').format('YYYY-MM-DD')}&dateBefore=${moment().subtract(1, 'month').endOf('month').format('YYYY-MM-DD')}&match.game_id=${gameIDs.join(',')}`)
      commit(Mutation.SET_LAST_MONTH_MATCHES, response.data.data)
    } catch (error) {
      commit(Mutation.SET_ERROR, error)
    }
  },
  async [Action.SET_SELECTED_MONTH] ({ commit, dispatch }, { month, gameIDs }) {
    await commit(Mutation.SET_SELECTED_MONTH, month)
    dispatch(Action.GET_SELECTED_MONTH_MATCHES, { gameIDs })
  },
  async [Action.GET_SELECTED_MONTH_MATCHES] ({ commit, state }, { gameIDs }) {
    try {
      const response = await axios.get(`${process.env.API_URL}/teams/${TEAM_IDS.join(',')}/matches?dateAfter=${moment(state.selectedMonth).startOf('month').format('YYYY-MM-DD')}&dateBefore=${moment(state.selectedMonth).endOf('month').format('YYYY-MM-DD')}&match.game_id=${gameIDs.join(',')}`)
      commit(Mutation.SET_SELECTED_MONTH_MATCHES, response.data.data)
    } catch (error) {
      commit(Mutation.SET_ERROR, error)
    }
  },
  async [Action.GET_UPCOMING_MATCHES] ({ commit, state }, { gameIDs }) {
    try {
      const response = await axios.get(`${process.env.API_URL}/teams/${TEAM_IDS.join(',')}/matches?dateAfter=${moment().subtract(1, 'day').startOf('day').format('YYYY-MM-DD')}&match.game_id=${gameIDs.join(',')}`)
      commit(Mutation.SET_UPCOMING_MATCHES, response.data.data)
    } catch (error) {
      commit(Mutation.SET_ERROR, error)
    }
  }
}
