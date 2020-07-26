<template>
  <div class="match-card">
    <div class="top">
      <div class="game">
        <div class="cod img" />
      </div>
      <div class="live">
        <div class="live-img">
          12:00 PM EST
        </div>
      </div>
      <div class="match-name">
        <p class="title">
          some match
        </p>
      </div>
    </div>
    <div class="body">
      <div class="scores">
        <div class="img dallasEmpire" />
        <div class="scoring">
          <p class="score">
            vs
          </p>
        </div>
        <div class="img someRandy" />
      </div>
    </div>
    <div class="bottom">
      <div class="watch-link">
        <a href="#">Watch</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
  .match-card {
    display: flex;
    flex-direction: column;
    padding: 10px 20px;
    background:$white;
    box-shadow: 0px 0px 50px rgba(0, 0, 0, 0.05);
    border-radius: 12px;
    margin-right: 20px;
    min-width: 320px;
    .top {
      display: flex;
      flex-direction: column;
      align-content: center;
      position: relative;
      .live {
        position: absolute;
        top: 0;
        right: 0;
      }
      .game {
        height: 30px;
        max-width: 80px;
        .img {
          height: 100%;
          width:100%;
        }
      }
      .match-name {
        max-width: 50%;
        .title {
          text-align: left;
          color: $blueGray;
        }
      }
    }
    .body {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 20px;
      .scores {
        display: flex;
        align-content: center;
        justify-items: center;
        .scoring {
          display: flex;
          align-items: center;
        }
        .img {
          height: 50px;
          width: 50px;
          margin: 15px;
        }
      }
    }
    .bottom {
      display: flex;
      justify-content: center;
      padding-bottom: 10px;
    }
  }
</style>
