<template>
  <div class="container">
    <Topbar @toggle_events="(e)=>toggleEvents(e)" :upcoming="upcoming" :results="results" @toggleGames="(e) => toggleGames(e)" />
    <div class="matches-today">
      <Matchcard v-for="match in liveMatches" :match="match" />
    </div>
    <div v-if="results">
      <div class="matches-list">
        <div class="title">
          <p>This Month</p>
        </div>
        <Matchbanner v-for="match in currentMonthMatches" :match="match" />
      </div>
      <div class="matches-list">
        <div class="title">
          <p>Last Month</p>
        </div>
        <Matchbanner v-for="match in lastMonthMatches" :match="match" />
      </div>
      <div class="matches-list">
        <div class="title month-picker">
          <p><span>2020</span></p>
          <div class="selector">
            <div @click="open = !open" class="month">
              <p>{{ formatMonth(selectedMonth) }}</p>
            </div>
            <div :class="{close:!open}" class="month-list">
              <div v-for="month in months" @click="setMonth(month.date)" class="month">
                {{ month.text }}
              </div>
            </div>
          </div>
        </div>
        <Matchbanner v-for="match in selectedMonthMatches" :match="match" />
      </div>
    </div>
    <div v-if="upcoming">
      <div class="matches-list">
        <div class="title">
          <p>Upcoming Matches</p>
        </div>
        <Matchbanner v-for="match in upcomingMatches" :match="match" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import moment from 'moment'
import Topbar from '~/components/topbar.vue'
import Matchcard from '~/components/match_card.vue'
import Matchbanner from '~/components/match_banner.vue'
export const TEAM_IDS = [66, 76, 485, 626]
export const GAMES_TO_ID = {
  'rlcs': 1,
  'overwatch': 2,
  'cod': 3,
  'csgo': 4
}
export default {
  components: {
    Topbar,
    Matchcard,
    Matchbanner
  },
  data () {
    return {
      upcoming: false,
      results: true,
      games: [],
      gameIDs: [1, 2, 3, 4],
      open: false
    }
  },
  computed: {
    ...mapState('matches', {
      liveMatches: state => state.liveMatches,
      currentMonthMatches: state => state.currentMonthMatches,
      lastMonthMatches: state => state.lastMonthMatches,
      selectedMonthMatches: state => state.selectedMonthMatches,
      upcomingMatches: state => state.upcomingMatches,
      selectedMonth: state => state.selectedMonth,
      error: state => state.error
    }),
    months () {
      const m = []
      for (let i = 2; i < 7; i++) {
        const d = moment().subtract(i, 'month').startOf('month')
        m.push({ text: d.format('MMMM'), date: d })
      }
      return m
    }
  },
  async mounted () {
    const promises = [
      this.GET_THIS_MONTH_MATCHES({ gameIDs: this.gameIDs }),
      this.GET_LAST_MONTH_MATCHES({ gameIDs: this.gameIDs }),
      this.GET_SELECTED_MONTH_MATCHES({ gameIDs: this.gameIDs })
    ]
    await Promise.all(promises)
  },
  methods: {
    ...mapActions('matches', [
      'GET_LIVE_MATCHES',
      'GET_THIS_MONTH_MATCHES',
      'GET_LAST_MONTH_MATCHES',
      'GET_SELECTED_MONTH_MATCHES',
      'GET_UPCOMING_MATCHES',
      'SET_SELECTED_MONTH' ]),
    fetchEvents () {
      this.GET_UPCOMING_MATCHES({ gameIDs: this.gameIDs })
      this.GET_THIS_MONTH_MATCHES({ gameIDs: this.gameIDs })
      this.GET_LAST_MONTH_MATCHES({ gameIDs: this.gameIDs })
      this.GET_SELECTED_MONTH_MATCHES({ gameIDs: this.gameIDs })
    },
    toggleEvents (e) {
      this.upcoming = e === 'upcoming'
      this.results = e !== 'upcoming'
      this.fetchEvents()
      console.log(e)
    },
    toggleGames (e) {
      this.games = e
      this.gameIDs = this.games.map(a => GAMES_TO_ID[a]).filter(a => !!a)
      this.fetchEvents()
    },
    formatMonth (d) {
      return moment(d).format('MMMM')
    },
    setMonth (e) {
      this.SET_SELECTED_MONTH({ month: e, gameIDs: this.gameIDs })
      this.open = false
    }
  }
}
</script>

<style lang="scss" scoped>

  .container {
    margin: 60px;
    .matches-today {
      margin-top:70px;
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(360px, min-content));
      grid-row-gap: 15px;
      align-content: center;
      justify-content: center;
    }
    .matches-list {
      margin-top: 45px;
      .title {
        margin-bottom: 24px;
        padding-left: 20px;
        font-size: $normal;
        font-weight: bold;
        color: $darkGray;
      }
      .month-picker {
        display: flex;
        position:relative;
        .selector {
          margin-left: 10px;
          position: relative;
          .month {
            cursor: pointer;
            user-select: none;
          }
          .month-list {
            background-color: white;
            box-shadow: 0px 0px 50px rgba(0, 0, 0, 0.15);
            border-radius: 5px;
            top:50px;
            z-index: 100;
            position:absolute;
            &.close {
              display: none;
            }
            .month {
              user-select: none;
              padding: 5px;
              // padding-left: 2px;
              &:hover {
                background-color:$blueGray;
              }
            }
          }
        }
      }
    }
  }

</style>
