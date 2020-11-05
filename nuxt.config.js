// 動的ルーティング用のデータ読み込み
// const columnItems = require('./static/wp-json/column-items.json')
import axios from 'axios'
const pageUpdate = require('./static/data/page-update.json')

export default {
  // Target (https://go.nuxtjs.dev/config-target)
  target: 'static',

  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    // htmlAttrs: {
    //   lang: 'ja'
    // },
    title: process.env.SITE_NAME,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.SITE_DESCRIPTION },
      { hid: 'keywords', name: 'keywords', content: process.env.SITE_KEYWORDS },
      { hid: 'author', name: 'author', content: process.env.SITE_AUTHOR },
      { hid: 'og:site_name', property: 'og:site_name', content: process.env.SITE_NAME },
      { hid: 'og:type', property: 'og:type', content: process.env.SITE_OG_TYPE },
      { hid: 'og:url', property: 'og:url', content: process.env.SITE_DOMAIN + process.env.SITE_PATH + '/' },
      { hid: 'og:title', property: 'og:title', content: process.env.SITE_NAME },
      { hid: 'og:description', property: 'og:description', content: process.env.SITE_DESCRIPTION },
      { hid: 'og:image', property: 'og:image', content: process.env.SITE_DOMAIN + process.env.SITE_PATH + process.env.SITE_OG_IMAGE },
      { hid: 'og:locale', property: 'og:locale', content: process.env.SITE_OG_LOCALE },
    ],
    link: [
      { rel: 'shortcut icon', type: 'image/x-icon', href: process.env.SITE_PATH + process.env.SITE_FAVICON },
      { rel: 'apple-touch-icon', type: 'image/png', href: process.env.SITE_PATH + process.env.SITE_APPLE_ICON }
    ]
  },

  router: {
    base: process.env.SITE_PATH,
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [
  ],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
    {src: '@/plugins/vue-image-lightbox', mode: 'client'},
  ],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    // '@nuxtjs/pwa',
    '@nuxtjs/dotenv',
    '@nuxtjs/sitemap',
    // 'nuxt-compress',
    '@nuxtjs/google-analytics',
  ],

  // Axios module configuration (https://go.nuxtjs.dev/config-axios)
  axios: {},

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
    terser: {
      terserOptions: {
        compress: {
          drop_console: process.env.NODE_ENV === "production"
        }
      }
    }
  },

  // 動的ルーティングの追加
  generate: {
    routes() {
      // return columnItems.map(item => {
      //   return `/column/${item.id}`
      // })
      return axios.get(process.env.COLUMN_ITEMS_API).then(res => {
        return res.data.map(column => {
          return '/column/' + column.id
        })
      })
    }
  },

  sitemap: {
    path: '/sitemap.xml',
    hostname: process.env.SITE_DOMAIN,
    gzip: true,
    // exclude: [
    //   '/path'
    // ],
    defaults: {
      changefreq: 'daily',
      priority: 1,
      lastmod: new Date()
    },
    routes: async () => {
      // nuxtのページの更新日を取得
      const pagesRoute = pageUpdate.map(page => {
        return {
          url: page.path,
          lastmod: new Date(page.update)
        }
      });
      // nuxtの動的ルーティングページの更新日を取得
      const columnsData = await axios.get(process.env.COLUMN_ITEMS_API);
      const columnsRoute = columnsData.data.map(column => {
        return {
          url: '/column/' + column.id,
          // lastmod: new Date(column.upDate + ' +0900'),
          lastmod: new Date(column.update),
        }
      });
      // 更新日の配列を結合して返す
      return [].concat(pagesRoute, columnsRoute);
    }
  },

  googleAnalytics: {
    id: process.env.GOOGLE_ANALYTICS_ID,
  },
}
