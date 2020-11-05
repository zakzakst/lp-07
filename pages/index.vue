<template>
  <div>
    <ul>
      <li v-for="item in columnItems" :key="item.id">
        <nuxt-link :to="`/column/${item.id}`">
          {{ item.date }}：{{ item.listText }}
        </nuxt-link>
      </li>
    </ul>
    <gallery />
  </div>
</template>

<script>
// import columnItems from '@/static/wp-json/column-items.json';
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
    Gallery,
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

<style></style>
