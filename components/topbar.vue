<template>
  <div class="top-bar">
    <div class="left-actions">
      <div :class="{active: upcoming}" @click="clickFilter('upcoming')" class="action-filter">
        <p>Upcoming</p>
      </div>
      <div :class="{active: results}" @click="clickFilter('results')" class="action-filter">
        <p>Results</p>
      </div>
    </div>
    <div class="right-actions">
      <div class="action">
        <p>Show All</p>
      </div>
      <div @click="toggleGame('smash')" class="action">
        <div :class="{inactive: !games.includes('smash')}" class="img smash" />
      </div>
      <div @click="toggleGame('cod')" class="action">
        <div :class="{inactive: !games.includes('cod')}" class="img cod" />
      </div>
      <div @click="toggleGame('overwatch')" class="action">
        <div :class="{inactive: !games.includes('overwatch')}" class="img overwatch" />
      </div>
      <div @click="toggleGame('csgo')" class="action">
        <div :class="{inactive: !games.includes('csgo')}" class="img csgo" />
      </div>
      <div @click="toggleGame('magic')" class="action">
        <div :class="{inactive: !games.includes('magic')}" class="img magic" />
      </div>
      <div @click="toggleGame('rlcs')" class="action">
        <div :class="{inactive: !games.includes('rlcs')}" class="img rlcs" />
      </div>
      <div @click="toggleGame('valorant')" class="action">
        <div :class="{inactive: !games.includes('valorant')}" class="img valorant" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    upcoming: {
      type: Boolean,
      required: true
    },
    results: {
      type: Boolean,
      required: true
    }
  },
  data () {
    return {
      games: [
        'smash',
        'cod',
        'overwatch',
        'csgo',
        'magic',
        'rlcs',
        'valorant'
      ]
    }
  },
  mounted () {
    this.$emit('toggleGames', this.games)
  },
  methods: {
    clickFilter (e) {
      this.$emit('toggle_events', e)
    },
    toggleGame (e) {
      if (this.games.includes(e)) {
        this.games.splice(this.games.indexOf(e), 1)
      } else {
        this.games.push(e)
      }
      this.$emit('toggleGames', this.games)
    }
  }
}
</script>

<style lang="scss" scoped>
  .action {
    margin-right: 10px;
    max-height: 100%;
    white-space: nowrap;
    .overlay {
      max-height: 100%;
      max-width:100%;
      img {
        max-width:100%;
        max-height:100%;
      }
    }
  }

  .top-bar {
    display: flex;
    box-shadow: 0px 10px 10px rgba(0, 0, 0, 0.05);
    border-radius: 12px;
    height: 94px;
    align-items: center;
    padding: 0 50px;
    background-color:$white;
    overflow: hidden;
    .left-actions {
      height: 100%;
      display: flex;
      align-items: center;
      .action-filter {
        padding: 0 10px;
        &:hover {
          cursor: pointer;
          background-color: $hoverColor;
        }
        height: 100%;
        font-size: 16px;
        font-weight: bold;
        max-height: 100%;
        white-space: nowrap;
        display: flex;
        align-items: center;
        border-bottom: 6px solid transparent;
        p {
          margin: 0;
          color: $blueGray;
        }
        &.active {
          p {
            margin: 0;
            color: $blue;
          }
          border-bottom: solid 6px $blue;
        }
      }
    }
    .right-actions {
      display: flex;
      margin-left: auto;
      max-height: 100%;
      .action {
        padding: 10px;
        height: 60px;
        width: 60px;
        cursor: pointer;
        .img {
          height: 100%;
          width: 100%;
          background-size: contain;
          background-repeat: no-repeat;
          background-position: center;
          &.inactive {
            opacity: .15;
          }
        }
      }
    }
  }

  .smash {
    background-image: url("/images/smash.png");
  }
  .cod {
    background-image: url("/images/cod.png");
  }
  .overwatch {
    background-image: url("/images/overwatch.png");
  }
  .csgo {
    background-image: url("/images/csgo.png");
  }
  .magic {
    background-image: url("/images/magic.png");
  }
  .rlcs {
    background-image: url("/images/rlcs.png");
  }
  .valorant {
    background-image: url("/images/valorant.png");
  }
</style>
