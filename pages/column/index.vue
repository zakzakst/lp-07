<template>
  <div>
    <button
      v-for="category in categories"
      :key="category.id"
      @click="setCategory(category.id)"
    >{{ category.label }}</button>
    <ul>
      <li v-for="item in filteredColumnItems" :key="item.id">
      <!-- <li v-for="item in columnItems" :key="item.id"> -->
        <nuxt-link :to="`/column/${item.id}`">
          {{ item.date }}：{{ item.listText }}
        </nuxt-link>
      </li>
    </ul>
    <button v-if="addBtnIsActive" @click="addItems">add</button>
  </div>
</template>

<script>
// import columnItems from '@/static/wp-json/column-items.json';
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
      // columnItems: columnItems,
      title: 'コラム一覧',
      description: 'コラム一覧の概要',
      keywords: 'コラム一覧のキーワード1,コラム一覧のキーワード2',
      category: 'all',
      categories: [
        {
          id: 'all',
          label: '全て',
        },
        {
          id: 'event',
          label: 'イベント',
        },
        {
          id: 'blog',
          label: 'ブログ',
        },
      ],
      startItemsNum: 10,
      currentItemsNum: 10,
      addItemsNum: 5,
      addBtnIsActive: false,
    }
  },
  methods: {
    setCategory(category) {
      // 現在のカテゴリーと同じ場合は処理を止める
      if (this.category === category) return;
      // 表示数を初期化
      this.currentItemsNum = this.startItemsNum;
      // カテゴリーを変更
      this.category = category;
    },
    addItems() {
      this.currentItemsNum += this.addItemsNum;
    }
  },
  computed: {
    filteredColumnItems() {
      let result;
      // カテゴリーでフィルター
      if (!this.columnItems.length || this.category === 'all') {
        result = this.columnItems;
      } else {
        result = this.columnItems.filter(column => {
          return column.categories.indexOf(this.category) !== -1;
        });
      }
      // 表示数の反映
      if (result.length > this.currentItemsNum) {
        result = result.slice(0, this.currentItemsNum);
        this.addBtnIsActive = true;
      } else {
        this.addBtnIsActive = false;
      }
      return result;
    },
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
