# WordPress管理画面

---

## プラグインの設定

### 【カスタムフィールドテンプレート】
https://ja.wordpress.org/plugins/custom-field-template/

#### 下記テンプレートを作成
- テンプレートタイトル
``ネコ``
- カスタムポストタイプ
``cat``
- テンプレートコンテンツ
```
[description]
type = text
label = メタデータのdescription

[keywords]
type = text
label = メタデータのkeywords

[list_text]
type = text
label = 一覧に表示されるテキスト

[main_img]
type = file
label = メイン画像

[ogp_img]
type = file
label = OGP画像
```


### 【EWWW Image Optimizer】
https://ja.wordpress.org/plugins/ewww-image-optimizer/

#### WebP対応を設定
- 「WebP変換」にチェックを入れる
- .htaccess ファイルに指定されたコードを追記

---

## 投稿タイプ「ネコ」の設定

### カテゴリー作成
- event
- blog

---
