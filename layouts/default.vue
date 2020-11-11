<template>
  <div>
    <Nuxt />
    <global-footer />
    <float-btn />
    <page-transition />
  </div>
</template>

<script>
import FloatBtn from '@/components/FloatBtn'
import GlobalFooter from '@/components/GlobalFooter'
import PageTransition from '@/components/PageTransition'

export default {
  // data () {
  //   return {
  //   }
  // },
  components: {
    FloatBtn,
    GlobalFooter,
    PageTransition,
  },
}
</script>

<style lang="scss">
// .page-enter-active,
// .page-leave-active {
//   transition: opacity $transition-fast;
// }
// .page-enter,
// .page-leave-to {
//   opacity: 0;
// }
</style>
