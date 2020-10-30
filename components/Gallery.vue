<template>
  <div>
    <template v-if="flickrData">
      <div
        v-for="(item, index) in flickrData"
        :key="item.id"
        :style="{backgroundImage: `url(${getFlickrImgURL(item, 'q')})`}"
      >{{ item.id }} <button @click="showLightBox(index)">test</button></div>
    </template>
    <client-only>
      <LightBox
        v-if="lightBoxData"
        ref="lightBox"
        :media="lightBoxData"
        v-bind="lightBoxOptions"
      ></LightBox>
    </client-only>
  </div>
</template>

<script>
export default {
  data() {
    return {
      flickrParams: {
        method: 'flickr.photos.search',
        api_key: process.env.FLICKR_API_KEY,
        text: 'cat', // 検索テキスト
        sort: 'interestingness-desc', // 興味深さ順
        per_page: 12, // 取得件数
        license: '4', // Creative Commons Attributionのみ
        extras: 'owner_name,license', // 追加で取得する情報
        format: 'json', // レスポンスをJSON形式に
        nojsoncallback: 1, // レスポンスの先頭に関数呼び出しを含めない
      },
      flickrData: null,
      lightBoxOptions: {
        // オプション設定：https://github.com/pexea12/vue-image-lightbox?ref=kabanoki.net#options
        showLightBox: false,
        showCaption: true,
        // showFooterCount: false,
      },
    }
  },
  computed: {
    lightBoxData() {
      if (!this.flickrData) return '';
      const result = this.flickrData.slice().map(data => {
        return {
          thumb: this.getFlickrImgURL(data, 'q'),
          src: this.getFlickrImgURL(data),
          caption: `<a href="${this.getFlickrPageURL(data)}" target="_blank">this.getFlickrText(data)</a>`,
        }
      });
      return result;
    }
  },
  methods: {
    async setFlickrData() {
      // このコンポーネントでしか利用しないので、storeには移動しない
      const params = Object.entries(this.flickrParams).map((e) => `${e[0]}=${e[1]}`).join('&');
      const url = `https://api.flickr.com/services/rest/?${params}`;
      const res = await this.$axios.get(url);
      this.flickrData = res.data.photos.photo;
    },
    getFlickrImgURL(photo, size) {
      let url = `https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${
        photo.secret
      }`;
      if (size) {
        // サイズ指定ありの場合
        url += `_${size}`;
      }
      url += '.jpg';
      return url;
    },
    getFlickrPageURL(photo) {
      return `https://www.flickr.com/photos/${photo.owner}/${photo.id}`;
    },
    getFlickrText(photo) {
      let text = `"${photo.title}" by ${photo.ownername}`;
      if (photo.license === '4') {
        // Creative Commons Attribution（CC BY）ライセンス
        text += ' / CC BY';
      }
      return text;
    },
    showLightBox(index) {
      this.$refs.lightBox.showImage(index);
    }
  },
  mounted() {
    this.setFlickrData();
  },
}
</script>

<style></style>
