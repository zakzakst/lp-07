<template>
  <div class="row justify-content-md-center mb-8">
    <div ref="itemWrapper" class="col-lg-8">
      <div
        v-for="(item, index) in items"
        :key="index" class="item"
        :class="{'is-winner': item.isAnimated && item.isWinner}"
      >
        <div class="item-thumb">
          <img class="item-thumb__img" :src="item.thumb">
        </div>
        <div class="item-bar">
          <div class="item-bar__val" :style="{width: `${item.percent}%`}"></div>
        </div>
        <div class="item-vote"><span>{{ item.voteNum.toFixed() }}</span>票</div>
      </div>
    </div>
  </div>
</template>

<script>
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (process.client) {
  gsap.registerPlugin(ScrollTrigger)
}

export default {
  data() {
    return {
      items: [
        {
          thumb: 'https://picsum.photos/id/237/120/120',
          percent: 0,
          vote: 28,
          voteNum: 0,
          isAnimated: false,
          isWinner: false,
        },
        {
          thumb: 'https://picsum.photos/id/238/120/120',
          percent: 0,
          vote: 48,
          voteNum: 0,
          isAnimated: false,
          isWinner: true,
        },
        {
          thumb: 'https://picsum.photos/id/239/120/120',
          percent: 0,
          vote: 36,
          voteNum: 0,
          isAnimated: false,
          isWinner: false,
        },
      ],
      barMaxVal: 50,
    }
  },
  methods: {
    animItems() {
      this.items.forEach(item => {
        gsap.to(item, {
          duration: 2.5,
          voteNum: item.vote,
          percent: item.vote / this.barMaxVal * 100,
          ease: 'power1.in',
          onComplete() {
            item.isAnimated = true;
          }
        });
      });
    },
    setAnim() {
      ScrollTrigger.create({
        trigger: this.$refs.itemWrapper,
        start: "top 50%",
        onEnter: self => {
          this.animItems();
          self.kill();
        }
      });
    }
  },
  mounted() {
    this.setAnim();
  }
}
</script>

<style lang="scss" scoped>
.item {
  display: flex;
  margin-bottom: 16px;
  align-items: center;
}
.item-thumb {
  width: 60px;
  height: 60px;
  margin-right: 16px;
  flex-shrink: 0;
  background: #888;
  border-radius: 50%;
  overflow: hidden;
}
.item-thumb__img {
  width: 100%;
}
.item-bar {
  position: relative;
  height: 32px;
  flex: 1 1 auto;
}
.item-bar__val {
  position: absolute;
  width: 0;
  top: 0;
  bottom: 0;
  left: 0;
  background: #000;
  transition: background-color $transition-fast;
}
.item-vote {
  width: 72px;
  margin-left: 8px;
  flex-shrink: 0;
  line-height: 1;
  text-align: right;
  transition: color $transition-fast;
  & > span {
    font-size: 36px;
    font-weight: bold;
  }
}
.is-winner {
  .item-bar__val {
    background: $color-primary;
  }
  .item-vote {
    color: $color-primary;
  }
}
</style>
