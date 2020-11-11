<template>
  <div>
    <div ref="row1" class="row flex-md-row-reverse mb-8">
      <div class="img__wrapper col-md-4 py-12 py-md-0">
        <img ref="img1" class="img-1" src="img/top/action-01.png" alt="">
      </div>
      <div class="col-md-8">
        <h3>見出しが入ります</h3>
        <p>テキストが入ります。テキストが入ります。テキストが入ります。テキストが入ります。テキストが入ります。テキストが入ります。テキストが入ります。テキストが入ります。テキストが入ります。テキストが入ります。テキストが入ります。テキストが入ります。テキストが入ります。テキストが入ります。</p>
        <p>テキストが入ります。テキストが入ります。テキストが入ります。テキストが入ります。テキストが入ります。テキストが入ります。テキストが入ります。テキストが入ります。テキストが入ります。テキストが入ります。テキストが入ります。テキストが入ります。テキストが入ります。テキストが入ります。</p>
        <p>テキストが入ります。テキストが入ります。テキストが入ります。テキストが入ります。テキストが入ります。テキストが入ります。テキストが入ります。テキストが入ります。テキストが入ります。テキストが入ります。テキストが入ります。テキストが入ります。テキストが入ります。テキストが入ります。</p>
      </div>
    </div>
    <div ref="row2" class="row mb-8">
      <div class="img__wrapper col-md-4 py-12 py-md-0">
        <img ref="img2" class="img-2" src="img/top/action-02.png" alt="">
      </div>
      <div class="col-md-8">
        <h3>見出しが入ります</h3>
        <p>テキストが入ります。テキストが入ります。テキストが入ります。テキストが入ります。テキストが入ります。テキストが入ります。テキストが入ります。テキストが入ります。テキストが入ります。テキストが入ります。テキストが入ります。テキストが入ります。テキストが入ります。テキストが入ります。</p>
        <p>テキストが入ります。テキストが入ります。テキストが入ります。テキストが入ります。テキストが入ります。テキストが入ります。テキストが入ります。テキストが入ります。テキストが入ります。テキストが入ります。テキストが入ります。テキストが入ります。テキストが入ります。テキストが入ります。</p>
        <p>テキストが入ります。テキストが入ります。テキストが入ります。テキストが入ります。テキストが入ります。テキストが入ります。テキストが入ります。テキストが入ります。テキストが入ります。テキストが入ります。テキストが入ります。テキストが入ります。テキストが入ります。テキストが入ります。</p>
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
    }
  },
  methods: {
    setAnim() {
      gsap.to(this.$refs.img1, {
        scrollTrigger: {
          trigger: this.$refs.row1,
          start: 'top bottom',
          end: 'top top',
          scrub: .3,
          // markers: true,
        },
        opacity: 1,
        rotate: 0,
      });
      gsap.to(this.$refs.img2, {
        scrollTrigger: {
          trigger: this.$refs.row2,
          start: 'top bottom',
          end: 'top top',
          scrub: .3,
          // markers: true,
        },
        opacity: 1,
        x: 0,
        y: -50,
      });
    }
  },
  mounted() {
    this.setAnim();
  }
}
</script>

<style lang="scss" scoped>
.img__wrapper {
  display: flex;
  align-items: center;
  & > img {
    width: 100%;
    opacity: 0;
  }
}
.img-1 {
  transform: rotate(-180deg);
}
.img-2 {
  transform: translate(-100px, 100px);
}
</style>
