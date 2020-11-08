<template>
  <div>
    <Nuxt />
    <global-footer />
    <!-- <float-btn /> -->
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

<style></style>
