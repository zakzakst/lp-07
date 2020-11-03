<?php
// REST APIの設定

// 一覧表示用のデータを取得
add_action('rest_api_init', 'add_rest_api_cat_post_items');

function add_rest_api_cat_post_items() {
  register_rest_route('cat', '/post/items', array(
    'methods' => 'GET',
    'callback' => 'get_cat_post_items'
  ));
}

function get_cat_post_items() {
  $args = array(
    'post_type' => 'cat',
    'post_status' => 'publish',
    'orderby' => 'date',
    'order' => 'DESC',
  );
  $result = array_map('format_cat_post_items', get_posts($args));
  return $result;
}

function format_cat_post_items($post) {
  // カテゴリーを取得
  $categories = [];
  $terms = get_the_terms($post->ID, 'cat_category');
  if ($terms) {
    foreach ($terms as $term) {
      array_push($categories, $term->name);
    }
  }
  // 返り値のオブジェクトを作成
  $result = array(
    'id' => $post->ID,
    'title' => $post->post_title,
    'date' => $post->post_date,
    'listText' => get_post_meta($post->ID, 'list_text', true),
    'categories' => $categories,
  );
  return $result;
}


// ページ表示用のデータを取得
add_action('rest_api_init', 'add_rest_api_cat_post_item');

function add_rest_api_cat_post_item() {
  register_rest_route('cat', '/post/item/(?P<id>\d+)', array(
    'methods' => 'GET',
    'callback' => 'get_cat_post_item',
    'args' => array(
      'id'
    ),
  ));
}

function get_cat_post_item($args) {
  // IDから投稿のデータを取得
  $post = get_post($args['id']);
  // カテゴリーを取得
  $categories = [];
  $terms = get_the_terms($post->ID, 'cat_category');
  if ($terms) {
    foreach ($terms as $term) {
      array_push($categories, $term->name);
    }
  }
  // 画像IDを取得
  $main_img_id = get_post_meta($post->ID, 'main_img', true);
  $ogp_img_id = get_post_meta($post->ID, 'ogp_img', true);
  // 返り値のオブジェクトを作成
  $result = array(
    'id' => $post->ID,
    'title' => $post->post_title,
    'date' => $post->post_date,
    'content' => $post->post_content,
    'categories' => $categories,
    'description' => get_post_meta($post->ID, 'description', true),
    'keywords' => get_post_meta($post->ID, 'keywords', true),
    'mainImg' => $main_img_id ? wp_get_attachment_image_src($main_img_id, 'full')[0] : '',
    'ogpImg' => $ogp_img_id ? wp_get_attachment_image_src($ogp_img_id, 'full')[0] : '',
  );
  return $result;
}
