// @ts-check
import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
  // 本番URL（OGP・サイトマップ等で使用）。案件ごとに変更する。
  site: "https://example.com",

  // 末尾スラッシュを強制（/about/ 形式に統一）
  trailingSlash: "always",

  build: {
    // index.html 以外も /about/index.html 形式で出力（クリーンURL）
    format: "directory",
    // CSS は1ファイルにまとめずインライン化しきい値で制御
    inlineStylesheets: "auto",
  },

  scopedStyleStrategy: "class",

  image: {
    // astro:assets で扱う画像の最適化（Sharp）
    responsiveStyles: true,
  },
});
