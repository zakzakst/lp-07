<template>
  <div class="float-btn" :class="{'is-open': menuOpen}">
    <button class="float-btn__control" @click="toggleItems">
      <icon-menu />
    </button>
    <div class="float-btn__items">
      <button class="float-btn__item" @click="toHome">
        <icon-home />
      </button>
      <button class="float-btn__item" @click="toColumn">
        <icon-column />
      </button>
      <button class="float-btn__item" @click="toTop">
        <icon-top />
      </button>
    </div>
  </div>
</template>

<script>
import gsap from 'gsap'
import IconMenu from '@/static/bootstrap-icons/list-ul.svg'
import IconHome from '@/static/bootstrap-icons/house-fill.svg'
import IconColumn from '@/static/bootstrap-icons/file-text-fill.svg'
import IconTop from '@/static/bootstrap-icons/caret-up-square-fill.svg'

export default {
  data() {
    return {
      menuOpen: false,
      showItemSpeed: .3,
    }
  },
  components: {
    IconMenu,
    IconHome,
    IconColumn,
    IconTop,
  },
  methods: {
    toggleItems() {
      this.animControlBtn();
      if(this.menuOpen) {
        this.hideItems();
      } else {
        this.showItems();
      }
    },
    animControlBtn() {
      // コントロールボタンのインタラクション
      const tl = gsap.timeline();
      tl.set('.float-btn__control', {
        scale: .9,
      }).to('.float-btn__control', {
        scale: 1,
        ease: 'back.out(4)',
      });
    },
    showItems() {
      // アイテムボタンの表示
      const r = 72;
      const self = this;
      gsap.to('.float-btn__item', {
        duration: this.showItemSpeed,
        ease: 'back.out',
        x: index => {
          return -Math.cos(Math.PI / 4 * index) * r;
        },
        y: index => {
          return -Math.sin(Math.PI / 4 * index) * r;
        },
        stagger: {
          each: .1,
        },
        onComplete() {
          self.menuOpen = true;
        }
      });
    },
    hideItems() {
      // アイテムボタンの非表示
      const self = this;
      gsap.to('.float-btn__item', {
        duration: this.showItemSpeed,
        ease: 'back.in',
        x: 0,
        y: 0,
        stagger: {
          each: .1,
          from: 'end',
        },
        onComplete() {
          self.menuOpen = false;
        }
      });
    },
    toHome() {
      this.hideItems();
      this.$router.push('/');
    },
    toColumn() {
      this.hideItems();
      this.$router.push('/column');
    },
    toTop() {
      this.hideItems();
      this.$scrollTo('body');
    }
  }
}
</script>

<style lang="scss" scoped>
.float-btn {
  position: fixed;
  right: 12px;
  bottom: 12px;
  z-index: $z-float-btn;
}
.float-btn__control {
  position: relative;
  width: 60px;
  height: 60px;
  color: $color-text-light;
  background: $color-primary;
  border: none;
  border-radius: 50%;
  z-index: 2;
  &:focus {
    outline: none;
  }
  & > svg {
    width: 32px;
    height: 32px;
  }
}
.float-btn__control-icon {
  transition: transform $transition-default;
}
.float-btn__items {
  position: absolute;
  width: 48px;
  height: 48px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1;
}
.float-btn__item {
  position: absolute;
  display: flex;
  width: 48px;
  height: 48px;
  top: 0;
  left: 0;
  justify-content: center;
  align-items: center;
  color: $color-text-light;
  background: $color-primary;
  border: none;
  border-radius: 50%;
  &:focus {
    outline: none;
  }
  & > svg {
    width: 24px;
    height: 24px;
  }
}
// 「.is-open」付与時のスタイル
.float-btn.is-open {
  .float-btn__control-icon {
    transform: rotate(45deg);
  }
}
</style>
