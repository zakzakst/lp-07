<template>
  <div>
    <ul>
      <li v-for="item in columnItems" :key="item.id">
        <nuxt-link :to="`/column/${item.id}`">
          {{ item.date }}：{{ item.description }}
        </nuxt-link>
      </li>
    </ul>
  </div>
</template>

<script>
import mixinMeta from '@/mixins/meta'

export default {
  async asyncData({ $axios }) {
    const res = await $axios.get(process.env.COLUMN_ITEMS_API);
    return {
      columnItems: res.data
    }
  },
  data() {
    return {
      title: 'コラム一覧',
      description: 'コラム一覧の概要',
      keywords: 'コラム一覧のキーワード1,コラム一覧のキーワード2',
    }
  },
  computed: {
    meta() {
      return {
        title: `${this.title} || ${process.env.SITE_NAME}`,
        description: this.description,
        keywords: this.keywords,
        ogUrl: process.env.SITE_DOMAIN + process.env.SITE_PATH + '/column/',
        ogImage: process.env.SITE_DOMAIN + process.env.SITE_PATH + '/img/column/ogp.png',
        breadcrumbs: [
          {
            url: process.env.SITE_DOMAIN + process.env.SITE_PATH + '/',
            name: process.env.SITE_NAME,
          },
          {
            url: process.env.SITE_DOMAIN + process.env.SITE_PATH + '/column/',
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
