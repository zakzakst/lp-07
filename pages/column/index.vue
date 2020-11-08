<template>
  <div>
    <picture class="kv">
      <!-- <source type="image/webp" :srcset="`${mainImg}.webp`">
      <img :src="mainImg"> -->
      <img src="https://fakeimg.pl/1400x200/888/000/?text=MainImage">
    </picture>
    <div class="container mt-6">
      <div class="mb-12 text-center">
        <h1 class="mb-4">{{ title }}</h1>
        <div class="btn-group">
          <button
            v-for="category in categories"
            :key="category.id"
            @click="setCategory(category.id)"
            class="btn btn-dark"
            :class="{'active': category.id === categoryCurrent}"
          >{{ category.label }}</button>
        </div>
      </div>
      <transition-group name="list" mode="out-in" tag="ul" class="list">
        <li v-for="item in filteredColumnItems" :key="item.id">
          <nuxt-link :to="`/column/${item.id}`" class="list-item">
            <span class="list-item__date">{{ item.date | dateFilter }}</span>
            <span>{{ item.listText }}</span>
          </nuxt-link>
        </li>
      </transition-group>
      <div class="text-center">
        <button
          v-if="addBtnIsActive"
          @click="addItems"
          type="button"
          class="btn btn-outline-dark"
        >もっと見る</button>
      </div>
    </div>
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
      categoryCurrent: 'all',
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
      if (this.categoryCurrent === category) return;
      // 表示数を初期化
      this.currentItemsNum = this.startItemsNum;
      // カテゴリーを変更
      this.categoryCurrent = category;
    },
    addItems() {
      this.currentItemsNum += this.addItemsNum;
    }
  },
  computed: {
    filteredColumnItems() {
      let result;
      // カテゴリーでフィルター
      if (!this.columnItems.length || this.categoryCurrent === 'all') {
        result = this.columnItems;
      } else {
        result = this.columnItems.filter(column => {
          return column.categories.indexOf(this.categoryCurrent) !== -1;
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
  filters: {
    dateFilter(val) {
      const date = new Date(val)
      return date.toLocaleDateString();
    },
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
.btn{
  &:focus {
    outline: none;
    box-shadow: none;
  }
}
.list {
  list-style: none;
  margin: 0 0 16px;
  padding: 0;
  & > li {
    border-bottom: 1px dotted #333;
    &:first-child {
      border-top: 1px dotted #333;
    }
  }
}
.list-item {
  display: flex;
  padding: 8px;
  color: $color-text-default;
  text-decoration: none;
}
.list-item__date {
  width: 100px;
  flex-shrink: 0;
}

.list-enter-active {
  transition: opacity .5s, transform .5s;
}
.list-leave-active {
  opacity: 0;
  position: absolute;
}
.list-move:not(.list-leave-active) {
  transition: opacity .5s, transform .5s;
}
.list-enter,
.list-leave-to {
  opacity: 0;
}
</style>
