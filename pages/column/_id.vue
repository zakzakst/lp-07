<template>
  <div>
    <picture v-if="mainImg" class="kv">
      <source type="image/webp" :srcset="`${mainImg}.webp`">
      <img :src="mainImg">
    </picture>
    <picture v-else class="kv">
      <img src="https://fakeimg.pl/1400x200/888/000/?text=NoImage">
    </picture>
    <div class="container mt-6">
      <div class="mb-12 text-center">
        <h1>{{ title }}</h1>
        <p>最終更新日：{{ update | dateFilter }}</p>
        <p v-if="categories">
          <span
            v-for="category in categories"
            :key="category"
            class="badge rounded-pill bg-dark mx-1 p-2"
          >{{ category | categoryLabel }}</span>
        </p>
      </div>
      <div v-html="content"></div>
    </div>
  </div>
</template>

<script>
// import columnItemsDetail from '@/static/wp-json/column-items-detail.json';
import mixinMeta from '@/mixins/meta'

export default {
  async asyncData({ $axios, params }) {
    const res = await $axios.get(process.env.COLUMN_ITEM_API + params.id);
    return res.data;
  },
  // data() {
  //   return columnItemsDetail[this.$route.params.id]
  // },
  computed: {
    meta() {
      return {
        title: `${this.title} || ${process.env.SITE_NAME}`,
        description: this.description,
        keywords: this.keywords,
        ogUrl: process.env.SITE_DOMAIN + process.env.SITE_PATH + this.$route.path,
        ogImage: this.ogpImg ? this.ogpImg : '',
        breadcrumbs: [
          {
            url: process.env.SITE_DOMAIN + process.env.SITE_PATH + '/',
            name: process.env.SITE_NAME,
          },
          {
            url: process.env.SITE_DOMAIN + process.env.SITE_PATH + '/column/',
            name: 'コラム一覧',
          },
          {
            url: process.env.SITE_DOMAIN + process.env.SITE_PATH + this.$route.path,
            name: this.title,
          },
        ],
      }
    }
  },
  mixins: [
    mixinMeta,
  ],
  filters: {
    dateFilter(val) {
      const date = new Date(val)
      return date.toLocaleDateString();
    },
    categoryLabel(val) {
      if (val === 'event') return 'イベント';
      if (val === 'blog') return 'ブログ';
    }
  },
  head() {
    return this.getMeta();
    // headの内容を追加する場合
    // const baseMeta = this.getMeta();
    // return Object.assign(baseMeta, {
    //   // ここに追加内容を記載
    // });
  }
}
</script>

<style lang="scss" scoped>
.kv {
  position: relative;
  display: block;
  height: 200px;
  overflow: hidden;
  & > img {
    position: absolute;
    display: block;
    height: 200px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}
</style>
