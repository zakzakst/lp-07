export default async ({ app, store }) => {
  app.router.beforeEach((to, from, next) => {
    // 初期読み込みのエラー対応
    if(!from.name) {
      next();
      return;
    }
    // ページ遷移アニメーションの開始
    store.dispatch('page-transition/setIsActive', true);
    // ページ遷移アニメーションが完了してから移動
    setTimeout(() => {
      next();
    }, 500);
  });
  app.router.afterEach((to, from) => {
    // ページ遷移アニメーションの終了
    store.dispatch('page-transition/setIsActive', false);
  });
}
