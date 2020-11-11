<template>
  <transition name="page-transition">
    <div v-if="isActive" class="bg"></div>
  </transition>
</template>

<script>
export default {
  data() {
    return {
    }
  },
  computed: {
    isActive() {
      return this.$store.getters['page-transition/isActive'];
    }
  },
}
</script>

<style lang="scss" scoped>
.bg {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: #000;
  z-index: $z-page-transition;
}
.page-transition-enter-active,
.page-transition-leave-active {
  transition: transform $transition-default;
}
.page-transition-enter {
  transform: translateX(-100%);
}
.page-transition-leave-to {
  transform: translateX(100%);
}
</style>
