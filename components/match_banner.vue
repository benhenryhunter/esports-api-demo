<template>
  <div :id="match.id" class="match-banner">
    <div class="top">
      <div class="game">
        <div :style="{backgroundImage:`url(${gameImage(match.gameID)})`}" class="img" />
      </div>
      <div class="match-name">
        <p class="title">
          {{ teamA.name }} Vs {{ teamB.name }}
        </p>
      </div>
    </div>
    <div class="body">
      <div class="match-date">
        <div class="date">
          {{ formatDate(match.date) }}
        </div>
        <div class="time">
          {{ formatTime(match.date) }}
        </div>
      </div>
      <div v-if="match.resultSet" class="scores">
        <div :style="{backgroundImage:`url(${ teamALogo })`}" class="img" />
        <div class="scoring">
          <p class="score">
            {{ teamAScore }} - {{ teamBScore }}
          </p>
        </div>
        <div :style="{backgroundImage:`url(${ teamBLogo })`}" class="img" />
      </div>
      <div v-else class="scores">
        <div :style="{backgroundImage:`url(${ teamALogo })`}" class="img" />
        <div class="scoring">
          <p class="score">
            vs
          </p>
        </div>
        <div :style="{backgroundImage:`url(${ teamBLogo })`}" class="img" />
      </div>
      <div v-if="inPast()" class="watch-link">
        <a href="#">View Replay</a>
      </div>
    </div>
    <div class="bottom">
      <div v-if="match.resultSet && isEnvyTeamWin(match.resultSet.winningTeamId)" class="status victory">
        Victory
      </div>
      <div v-else-if="match.resultSet && !isEnvyTeamWin(match.resultSet.winningTeamId)" class="status defeat">
        defeat
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import _get from 'lodash/get'
export const TEAM_IDS = [680, 3963, 4502, 5210, 5673, 6185, 904, 1261, 909, 6381, 412, 53, 504]
export const GAME_ID_TO_IMAGE = {
  1: '/images/rlcs.png',
  2: '/images/overwatch.png',
  3: '/images/cod.png',
  4: '/images/csgo.png',
  5: '/images/valorant.png'
}
export default {
  props: {
    match: {
      type: Object,
      required: true
    }
  },
  computed: {
    teamA () {
      return this.match.teams[0]
    },
    teamB () {
      return this.match.teams[1]
    },
    teamAScore () {
      return this.teamA.id === this.match.resultSet.winningTeamId ? this.match.resultSet.winningTeamScore : this.match.resultSet.losingTeamScore
    },
    teamBScore () {
      return this.teamA.id !== this.match.resultSet.winningTeamId ? this.match.resultSet.winningTeamScore : this.match.resultSet.losingTeamScore
    },
    teamALogo () {
      return encodeURI(this.teamA.logoUrl)
    },
    teamBLogo () {
      return encodeURI(this.teamB.logoUrl)
    }
  },
  methods: {
    formatDate (d) {
      return moment(d).format('MMMM DD, YYYY')
    },
    formatTime (d) {
      return moment(d).format('hh:mm A')
    },
    get (obj, key, d) {
      return _get(obj, key, d)
    },
    isEnvyTeamWin (id) {
      return TEAM_IDS.includes(id)
    },
    gameImage (id) {
      return GAME_ID_TO_IMAGE[id]
    },
    inPast () {
      return moment(this.match.date).isBefore(moment())
    }
  }
}
</script>

<style lang="scss" scoped>
  .match-banner {
    display: flex;
    flex-direction: column;
    padding: 0 20px;
    background:$white;
    box-shadow: 0px 0px 50px rgba(0, 0, 0, 0.05);
    border-radius: 12px;
    margin-bottom: 12px;
    .top {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      justify-content: center;
      position: relative;
      .live {
        // position: absolute;
        top: 0;
        right: 0;
      }
      .game {
        height: 30px;
        width: 80px;
        align-self: center;
        left: 0;
        .img {
          background-position: left;
          height: 100%;
          width: 100%;
        }
      }
      .match-name {
        .title {
          text-align: center;
          color: $blueGray;
        }
      }
    }
    .body {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      align-items: center;
      .match-date {
        .date{
          padding-bottom: 5px;
          color:$blueGray;
        }
        .time{
          color:$blueGray;
        }
        color: $blueGray;
      }
      .scores {
        display: flex;
        align-content: center;
        justify-content: center;
        .scoring {
          display: flex;
          align-items: center;
          justify-content: center;
          .score {
            font-size: $medium;
            font-weight: bold;
            color: $darkGray;
          }
        }
        .img {
          height: 50px;
          width: 50px;
          margin: 15px;
        }
      }
      .watch-link {
        justify-self: flex-end;
        letter-spacing: 2px;
      }
    }
    .bottom {
      display: flex;
      justify-content: center;
      padding-bottom: 10px;
      .status {
        font-weight: bold;
        color: #fff;
        padding: 5px 20px;
        border-radius: 15px;
        text-transform: uppercase;
        &.victory {
          background-color: $green;
        }
        &.defeat {
          background-color: $red;
        }
      }
    }
  }
</style>
