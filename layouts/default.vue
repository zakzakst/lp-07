<template>
  <div>
    <Nuxt />
    <global-footer />
    <float-btn />
  </div>
</template>

<script>
import FloatBtn from '@/components/FloatBtn'
import GlobalFooter from '@/components/GlobalFooter'

export default {
  // data () {
  //   return {
  //   }
  // },
  components: {
    FloatBtn,
    GlobalFooter,
  },
}
</script>

<style lang="scss">
.page-enter-active,
.page-leave-active {
  transition: opacity $transition-fast;
}
.page-enter,
.page-leave-to {
  opacity: 0;
}
</style>
