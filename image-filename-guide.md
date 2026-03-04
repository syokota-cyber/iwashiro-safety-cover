# 画像ファイル命名ガイド
## 岩代工業株式会社 safety-cover.html 用

> **操作手順：**
> 1. `safety-cover.html` と同じ階層に `images/` フォルダを作成
> 2. 以下の対応表を見て、各画像を正しいファイル名に変更して `images/` に格納
> 3. ブラウザで `safety-cover.html` を開いて確認

---

## ファイル命名対応表

| # | ファイル名（保存名） | 画像の内容 | 使用箇所 | 種別 |
|---|------------------|-----------|---------|------|
| 1 | `hero-bg.jpg` | 工場内・溶接スパーク・作業員シルエット（暗め） | ヒーロー全面背景 | CSS背景 |
| 2 | `hero-cover-product.png` | 単体の安全カバー製品写真（白/薄背景） | ヒーロー右カード内上部 | `<img>` |
| 3 | `pain-exposed-machine.jpg` | カバーなしの露出した回転部・モーター軸 | 課題カード①上部 | `<img>` |
| 4 | `pain-inspection-doc.jpg` | クリップボードを持つ監査員・工場内 | 課題カード②上部 | `<img>` |
| 5 | `pain-cost-estimate.jpg` | 図面・見積書・カレンダー（平置き） | 課題カード③上部 | `<img>` |
| 6 | `journey-step1-consult.jpg` | 安全ベスト姿の担当者がスマホを見るシーン | ジャーニーSTEP1下 | `<img>` |
| 7 | `journey-step2-survey.jpg` | 作業員がメジャーで機械を採寸するシーン | ジャーニーSTEP2下 | `<img>` |
| 8 | `journey-step3-quote.jpg` | エンジニアがCAD画面を見ながら図面確認 | ジャーニーSTEP3下 | `<img>` |
| 9 | `journey-step4-fab.jpg` | 溶接作業・スパーク・工場内暗め | ジャーニーSTEP4下 | `<img>` |
| 10 | `journey-step5-install.jpg` | 2名の作業員がカバーを機械に取付中 | ジャーニーSTEP5下 | `<img>` |
| 11 | `features-workshop.jpg` | 工場全景・設備が並ぶ広い作業場（明るめ） | 特徴セクション背景 | CSS背景 |
| 12 | `process-factory-floor.jpg` | 工程別に分かれた作業ステーションが横並び | 製作フロー背景 | CSS背景 |
| 13 | `cover-showcase-sts.jpg` | ステンレス製安全カバーを機械に設置した完成写真 | 製品ショーケース① | `<img>` |
| 14 | `cover-showcase-iron.jpg` | 黒/ダーク塗装の鉄製カバー設置写真 | 製品ショーケース② | `<img>` |
| 15 | `cover-showcase-poly.jpg` | 透明ポリカーボネート製カバー設置写真 | 製品ショーケース③ | `<img>` |
| 16 | `cta-factory-dramatic.jpg` | 俯瞰・広角・光が差し込む迫力ある工場写真 | CTAセクション背景 | CSS背景 |
| 17 | `contact-staff.jpg` | 作業服姿のスタッフが笑顔でカメラ目線（縦構図） | フォーム左スタッフ欄 | `<img>` |

---

## フォルダ構成

```
iwashiro-landing-page/
├── safety-cover.html        ← メインページ
└── images/
    ├── hero-bg.jpg          ← 1
    ├── hero-cover-product.png ← 2
    ├── pain-exposed-machine.jpg ← 3
    ├── pain-inspection-doc.jpg  ← 4
    ├── pain-cost-estimate.jpg   ← 5
    ├── journey-step1-consult.jpg ← 6
    ├── journey-step2-survey.jpg  ← 7
    ├── journey-step3-quote.jpg   ← 8
    ├── journey-step4-fab.jpg     ← 9
    ├── journey-step5-install.jpg ← 10
    ├── features-workshop.jpg     ← 11
    ├── process-factory-floor.jpg ← 12
    ├── cover-showcase-sts.jpg    ← 13
    ├── cover-showcase-iron.jpg   ← 14
    ├── cover-showcase-poly.jpg   ← 15
    ├── cta-factory-dramatic.jpg  ← 16
    └── contact-staff.jpg         ← 17
```

---

## 推奨サイズ（Web最適化後）

| 種別 | ファイル | 推奨サイズ | 最大容量目安 |
|-----|---------|-----------|------------|
| CSS背景（全幅） | hero-bg, features-workshop, process-factory-floor, cta-factory-dramatic | 1920×1080px | 各300KB以下 |
| `<img>` 製品写真 | cover-showcase-*.jpg | 800×600px | 各150KB以下 |
| `<img>` カード内 | pain-*.jpg, journey-*.jpg | 600×400px | 各100KB以下 |
| `<img>` ヒーロー製品 | hero-cover-product.png | 800×600px | 200KB以下 |
| `<img>` スタッフ | contact-staff.jpg | 600×800px（縦） | 150KB以下 |

> **圧縮ツール：** [Squoosh](https://squoosh.app) または [TinyPNG](https://tinypng.com) で圧縮推奨

---

*岩代工業株式会社 安全カバーページ 2024*
