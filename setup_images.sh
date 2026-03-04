#!/bin/bash
# =============================================================
#  岩代工業株式会社 安全カバーページ 画像セットアップスクリプト
#  使い方: このファイルを safety-cover.html と同じフォルダに置き、
#          ターミナルで  bash setup_images.sh  を実行
# =============================================================

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
IMAGES_DIR="$SCRIPT_DIR/images"

echo ""
echo "============================================"
echo "  岩代工業 安全カバーページ 画像セットアップ"
echo "============================================"
echo ""

# images/ フォルダを作成
mkdir -p "$IMAGES_DIR"
echo "✅ images/ フォルダを確認/作成しました"
echo ""

# 必要な画像ファイルリスト（ファイル名：説明）
declare -a REQUIRED_FILES=(
  "hero-bg.jpg:ヒーロー背景（工場内・溶接スパーク）"
  "hero-cover-product.png:製品単体写真（白背景）"
  "pain-exposed-machine.jpg:露出したモーター軸の危険写真"
  "pain-inspection-doc.jpg:安全監査員がクリップボードを持つシーン"
  "pain-cost-estimate.jpg:図面・見積書・カレンダーの平置き写真"
  "journey-step1-consult.jpg:設備担当者がスマホを見るシーン"
  "journey-step2-survey.jpg:作業員がメジャーで採寸するシーン"
  "journey-step3-quote.jpg:エンジニアがCAD画面を確認するシーン"
  "journey-step4-fab.jpg:溶接作業・スパーク写真"
  "journey-step5-install.jpg:2名がカバーを取り付けるシーン"
  "features-workshop.jpg:工場全景（特徴セクション背景）"
  "process-factory-floor.jpg:横長工程フロア写真"
  "cover-showcase-sts.jpg:ステンレス製安全カバー設置完成写真"
  "cover-showcase-iron.jpg:鉄板塗装安全カバー設置写真"
  "cover-showcase-poly.jpg:ポリカーボネート製安全カバー写真"
  "cta-factory-dramatic.jpg:迫力ある工場俯瞰写真（CTA背景）"
  "contact-staff.jpg:スタッフ笑顔ポートレート（縦構図）"
)

echo "--- 画像チェック結果 ---"
echo ""

FOUND=0
MISSING=0

for entry in "${REQUIRED_FILES[@]}"; do
  FILENAME="${entry%%:*}"
  DESCRIPTION="${entry##*:}"
  TARGET="$IMAGES_DIR/$FILENAME"

  # images/ 内にすでにある場合
  if [ -f "$TARGET" ]; then
    echo "  ✅ $FILENAME"
    ((FOUND++))
    continue
  fi

  # 同フォルダにある場合は自動移動
  if [ -f "$SCRIPT_DIR/$FILENAME" ]; then
    mv "$SCRIPT_DIR/$FILENAME" "$TARGET"
    echo "  ✅ $FILENAME  （images/ に移動しました）"
    ((FOUND++))
    continue
  fi

  echo "  ❌ $FILENAME  → 【$DESCRIPTION】"
  ((MISSING++))
done

echo ""
echo "----------------------------------------"
echo "  見つかった画像: $FOUND / 17"
echo "  不足している画像: $MISSING"
echo "----------------------------------------"
echo ""

if [ $MISSING -eq 0 ]; then
  echo "🎉 すべての画像が揃っています！"
  echo "   ブラウザで safety-cover.html を開いて確認してください。"
else
  echo "📋 不足している画像（❌マーク）を以下の手順で追加してください："
  echo ""
  echo "   1. 不足画像を用意する（AI生成 or 実写）"
  echo "   2. 上記のファイル名でリネームする"
  echo "   3. images/ フォルダにコピーする"
  echo "   4. このスクリプトを再実行して確認"
  echo ""
  echo "   画像生成プロンプトは image-prompts.md を参照してください。"
fi

echo ""
echo "--- フォルダ構成確認 ---"
ls -lh "$IMAGES_DIR" 2>/dev/null || echo "（画像なし）"
echo ""
