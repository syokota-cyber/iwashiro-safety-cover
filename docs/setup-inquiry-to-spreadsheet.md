# 問い合わせフォーム → Google Spreadsheet 連携 セットアップ手順

## 全体構成

```
[LP フォーム] → POST /api/inquiry
    → [Cloudflare Pages Function]
        → [GAS Web App]
            ├→ Google Spreadsheet に追記
            └→ メール通知 (customer@iwashiro.co.jp)
    → LP に完了表示（失敗時は mailto フォールバック）
```

---

## STEP 1: Google Spreadsheet を作成

1. [Google スプレッドシート](https://sheets.google.com) を開く
2. **「空白のスプレッドシート」** で新規作成
3. ファイル名を `設備カバー_問い合わせ管理` に変更
4. **そのままにしておく**（ヘッダー行はGASが自動作成します）

---

## STEP 2: Google Apps Script (GAS) を設定

### 2-1. スクリプトエディタを開く

1. 作成した Spreadsheet を開いた状態で
2. メニュー → **「拡張機能」→「Apps Script」**

### 2-2. コードを貼り付け

1. エディタ内の既存コード（`function myFunction(){}` など）を **すべて削除**
2. `docs/gas-inquiry.js` の中身を **すべてコピー＆ペースト**
3. 必要に応じて `NOTIFY_TO` のメールアドレスを変更
4. **Ctrl+S (⌘+S)** で保存

### 2-3. デプロイ（Web App として公開）

1. 右上の **「デプロイ」→「新しいデプロイ」** をクリック
2. ⚙ アイコンをクリック → **「ウェブアプリ」** を選択
3. 以下の設定を行う:
   - **説明**: `問い合わせフォーム受信`
   - **次のユーザーとして実行**: `自分`
   - **アクセスできるユーザー**: `全員`
4. **「デプロイ」** をクリック
5. 初回はアクセス許可の画面が出る:
   - 「アクセスを承認」→ Google アカウントを選択
   - 「詳細」→「〇〇（安全でないページ）に移動」→「許可」
6. **ウェブアプリの URL をコピー** して控えておく
   - 例: `https://script.google.com/macros/s/AKfycbx.../exec`

> ⚠ この URL は STEP 3 で使います。紛失しないでください。

---

## STEP 3: Cloudflare Pages に環境変数を設定

1. [Cloudflare Dashboard](https://dash.cloudflare.com) にログイン
2. 左メニュー **「Workers & Pages」** → プロジェクト **「safety-cover」** を選択
3. **「設定」** タブ → **「環境変数」**
4. **「プロダクション」** セクションで **「変数を追加」**:
   - **変数名**: `GAS_WEBHOOK_URL`
   - **値**: STEP 2-3 でコピーした GAS の Web App URL
5. **「保存」** をクリック

> プレビュー環境にも同じ変数を追加しておくとテストに便利です。

---

## STEP 4: コードをデプロイ

```bash
git add functions/api/inquiry.js docs/ index.html
git commit -m "問い合わせフォーム: Cloudflare Functions + GAS Spreadsheet連携を追加"
git push origin main
```

Cloudflare Pages が自動ビルド → デプロイされます。

---

## STEP 5: 動作確認

### 5-1. テスト送信

1. https://safety-cover.pages.dev/#inquiry を開く
2. テストデータを入力して「送信する」をクリック
3. 以下を確認:
   - [ ] LP上に「お問い合わせを受け付けました」が表示される
   - [ ] Google Spreadsheet に行が追加されている
   - [ ] customer@iwashiro.co.jp にメール通知が届く

### 5-2. エラー時のフォールバック確認

1. ブラウザの DevTools → Network タブを開く
2. `/api/inquiry` のリクエストを確認
3. 万が一エラーの場合、mailto でメーラーが起動することを確認

---

## Spreadsheet の列構成（自動作成）

| 列 | 内容 |
|----|------|
| A | タイムスタンプ |
| B | 会社名 |
| C | お名前 |
| D | 電話番号 |
| E | メールアドレス |
| F | ご相談内容 |
| G | 詳細・ご要望 |
| H | ステータス（初期値: 未対応） |

> 「ステータス」列は手動で「対応中」「完了」等に更新して進捗管理に使えます。

---

## トラブルシューティング

| 症状 | 原因と対処 |
|------|-----------|
| LP で送信ボタン押下後 mailto が開く | Cloudflare Function または GAS がエラー。Cloudflare Dashboard → Functions → ログで確認 |
| Spreadsheet に行が追加されない | GAS のデプロイ URL が正しいか確認。GAS エディタの「実行ログ」で確認 |
| メールが届かない | GAS の MailApp 送信上限（100通/日）に達していないか確認。迷惑メールフォルダも確認 |
| 403 エラー | GAS のアクセス設定が「全員」になっているか確認 |
| GAS を修正した | 再デプロイが必要。「デプロイ」→「デプロイを管理」→「新しいバージョン」で更新 |

---

## 運用メモ

- GAS の MailApp は 1日100通まで（Google Workspace は1,500通）
- GAS のコードを修正したら **必ず再デプロイ**（バージョン更新）が必要
- Spreadsheet は共有設定で他のメンバーにも閲覧・編集権限を付与可能
