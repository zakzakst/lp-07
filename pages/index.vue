<template>
  <div>
    <!-- 特長 -->
    <!-- <section class="container py-4">
      <h2 class="text-center mb-4">特長</h2>
      <features />
    </section> -->
    <!-- アクション -->
    <section class="container py-4">
      <h2 class="text-center mb-4">アクション</h2>
      <actions />
    </section>
    <!-- アンケート -->
    <!-- <section class="container py-4">
      <h2 class="text-center mb-4">アンケート</h2>
      <questionnaire />
      <p>テキストが入ります。テキストが入ります。テキストが入ります。テキストが入ります。テキストが入ります。テキストが入ります。テキストが入ります。テキストが入ります。テキストが入ります。テキストが入ります。テキストが入ります。テキストが入ります。テキストが入ります。テキストが入ります。<br>テキストが入ります。テキストが入ります。テキストが入ります。テキストが入ります。テキストが入ります。テキストが入ります。テキストが入ります。</p>
    </section> -->
    <!-- 新着記事 -->
    <!-- <section class="container py-4">
      <h2 class="text-center mb-4">新着記事</h2>
      <ul class="list">
        <li v-for="item in filteredColumnItems" :key="item.id">
          <nuxt-link :to="`/column/${item.id}`" class="list-item">
            <span class="list-item__date">{{ item.date | dateFilter }}</span>
            <span>{{ item.listText }}</span>
          </nuxt-link>
        </li>
      </ul>
      <div class="text-center">
        <nuxt-link to="/column" class="btn btn-outline-dark">記事一覧</nuxt-link>
      </div>
    </section> -->
    <!-- ギャラリー -->
    <!-- <section class="container py-4">
      <h2 class="text-center mb-4">ギャラリー</h2>
      <gallery />
    </section> -->
  </div>
</template>

<script>
// import columnItems from '@/static/wp-json/column-items.json';
import Features from '@/components/Features'
import Actions from '@/components/Actions'
import Questionnaire from '@/components/Questionnaire'
import Gallery from '@/components/Gallery'

export default {
  async asyncData({ $axios }) {
    const res = await $axios.get(process.env.COLUMN_ITEMS_API);
    return {
      columnItems: res.data
    }
  },
  data () {
    return {
      // columnItems: columnItems
    }
  },
  components: {
    Features,
    Actions,
    Questionnaire,
    Gallery,
  },
  computed: {
    filteredColumnItems() {
      return this.columnItems.slice(0, 5);
    }
  },
  filters: {
    dateFilter(val) {
      const date = new Date(val)
      return date.toLocaleDateString();
    },
  },
  head() {
    const jsonld = {
      "@context": "http://schema.org",
      '@type': 'WebSite',
      'name': process.env.SITE_NAME,
      'url': process.env.SITE_DOMAIN + process.env.SITE_PATH + '/',
      'author': {
        '@type': 'Organization',
        'url': process.env.SITE_DOMAIN + process.env.SITE_PATH + '/',
        'logo': process.env.SITE_DOMAIN + process.env.SITE_PATH + '/img/common/logo.png'
      },
      'sameAs': [
        process.env.TWITTER_URL,
        process.env.FACEBOOK_URL,
        process.env.GOOGLE_PLUS_URL,
      ]
    };
    return {
      htmlAttrs: {
        lang: 'ja'
      },
      script: [
        {
          hid: 'jsonld',
          type: 'application/ld+json',
          innerHTML: JSON.stringify(jsonld, null, 2),
        },
      ],
      __dangerouslyDisableSanitizers: ['script']
    }
  },
}
</script>

<style lang="scss" scoped>
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
</style>
