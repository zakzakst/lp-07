// 動的ルーティング用のデータ読み込み
const columnItems = require('./static/wp-json/column-items.json')

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
    '@nuxtjs/pwa',
    '@nuxtjs/dotenv',
  ],

  // Axios module configuration (https://go.nuxtjs.dev/config-axios)
  axios: {},

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
  },

  // 動的ルーティングの追加
  generate: {
    routes() {
      return columnItems.map(item => {
        return `/column/${item.id}`
      })
    }
  },
}
