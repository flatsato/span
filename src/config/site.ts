/**
 * サイト共通設定
 * 旧構成の EJS データ（gulp.config）に相当。案件ごとにここを編集する。
 */

export type NavItem = {
  label: string;
  href: string;
  /** 外部リンクなら true（target=_blank rel=noopener が付く） */
  external?: boolean;
  children?: NavItem[];
};

export const site = {
  /** サイト名（ロゴ・OGP・コピーライトで使用） */
  name: "FLAT Starter",
  /** デフォルトのページタイトル接尾辞 */
  titleSuffix: "FLAT Starter",
  /** 既定の meta description */
  description: "Astro + モダンCSS で構築する FLAT のウェブサイト制作スターターキット。",
  /** 本番 URL（astro.config の site と揃える） */
  url: "https://example.com",
  /** デフォルト OGP 画像（/public 配下） */
  ogImage: "/ogp.png",
  /** 言語 */
  lang: "ja",
  locale: "ja_JP",
} as const;

/** グローバルナビゲーション */
export const globalNav: NavItem[] = [
  { label: "サイトについて", href: "/about/" },
  { label: "サービス", href: "/service/" },
  { label: "実績", href: "/works/" },
  { label: "お知らせ", href: "/news/" },
  { label: "お問い合わせ", href: "/contact/" },
];

/** フッターリンク */
export const footerNav: NavItem[] = [
  { label: "プライバシーポリシー", href: "/privacy/" },
  { label: "サイトマップ", href: "/sitemap/" },
];
