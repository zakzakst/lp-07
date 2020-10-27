export default {
  methods: {
    getInfo() {
      const info = {};
      info.meta = [];
      // lang属性の設定
      info.htmlAttrs = {
        lang: 'ja'
      };
      // タイトルの設定
      if (this.meta.title) {
        info.title = this.meta.title;
        info.meta.push({
          hid: 'og:title',
          name: 'og:title',
          content: this.meta.title,
        });
      }
      // descriptionの設定
      if (this.meta.description) {
        info.meta.push({
          hid: 'description',
          name: 'description',
          content: this.meta.description,
        });
        info.meta.push({
          hid: 'og:description',
          name: 'og:description',
          content: this.meta.description,
        });
      }
      // keywordsの設定
      if (this.meta.keywords) {
        info.meta.push({
          hid: 'keywords',
          name: 'keywords',
          content: this.meta.keywords,
        });
      }
      // og:urlの設定
      if (this.meta.ogUrl) {
        info.meta.push({
          hid: 'og:url',
          name: 'og:url',
          content: this.meta.ogUrl,
        });
      }
      // og:imageの設定
      if (this.meta.ogImage) {
        info.meta.push({
          hid: 'og:image',
          name: 'og:image',
          content: this.meta.ogImage,
        });
      }
      return info;
    },
    getJsonLd() {
      if (!this.meta.breadcrumbs) { return ''; }
      // 構造化データのアイテムリストを作成
      const items = this.meta.breadcrumbs.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        item: {
          '@id': item.url,
          name: item.name,
        },
      }));
      // JSON LDを作成
      const jsonld = {
        '@context': 'http://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: items,
      };
      // head設定用のオブジェクトを返す
      return {
        script: [
          {
            hid: 'jsonld',
            type: 'application/ld+json',
            innerHTML: JSON.stringify(jsonld, null, 2),
          },
        ],
        __dangerouslyDisableSanitizers: ['script']
      };
    },
    getMeta() {
      return Object.assign(this.getInfo(), this.getJsonLd());
    }
  },
}
