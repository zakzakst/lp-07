<template>
  <div>
    <p>{{ id }}</p>
    <p>{{ date }}</p>
    <p>{{ title }}</p>
  </div>
</template>

<script>
import columnItemsDetail from '@/static/wp-json/column-items-detail.json';
import mixinMeta from '@/mixins/meta'

export default {
  // async asyncData({ $axios, params }) {
  //   const res = await $axios.get(`${process.env.COLUMN_ITEM_API}${params.id}.json`);
  //   return res.data;
  // },
  data() {
    return columnItemsDetail[this.$route.params.id]
  },
  computed: {
    meta() {
      return {
        title: `${this.title} || ${process.env.SITE_NAME}`,
        description: this.description,
        keywords: this.keywords,
        ogUrl: process.env.SITE_DOMAIN + process.env.SITE_PATH + this.$route.path,
        ogImage: this.ogImg ? process.env.SITE_DOMAIN + process.env.SITE_PATH + this.ogImg : '',
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

<style></style>
