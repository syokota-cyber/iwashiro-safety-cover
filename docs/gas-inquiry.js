// ============================================================
// Google Apps Script — 問い合わせ受信 & Spreadsheet 記録 & メール通知
// ============================================================
// このファイルの中身を Google Apps Script エディタに貼り付けてください。
// ファイル自体はデプロイには使用しません。
// ============================================================

var SHEET_NAME = "問い合わせ";
var NOTIFY_TO = "customer@iwashiro.co.jp";

function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);

    // --- Spreadsheet に追記 ---
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getSheetByName(SHEET_NAME);
    if (!sheet) {
      sheet = ss.insertSheet(SHEET_NAME);
      sheet.appendRow([
        "タイムスタンプ",
        "会社名",
        "お名前",
        "電話番号",
        "メールアドレス",
        "ご相談内容",
        "詳細・ご要望",
        "ステータス",
      ]);
    }

    var now = Utilities.formatDate(new Date(), "Asia/Tokyo", "yyyy-MM-dd HH:mm:ss");
    sheet.appendRow([
      now,
      data["会社名"] || "",
      data["お名前"] || "",
      data["電話番号"] || "",
      data["メールアドレス"] || "",
      data["ご相談内容"] || "",
      data["詳細・ご要望"] || "",
      "未対応",
    ]);

    // --- メール通知 ---
    var body = "";
    body += "【設備カバー LP お問い合わせ】\n\n";
    body += "受信日時: " + now + "\n";
    body += "会社名: " + (data["会社名"] || "") + "\n";
    body += "お名前: " + (data["お名前"] || "") + "\n";
    body += "電話番号: " + (data["電話番号"] || "") + "\n";
    body += "メールアドレス: " + (data["メールアドレス"] || "") + "\n";
    body += "ご相談内容: " + (data["ご相談内容"] || "") + "\n";
    body += "詳細・ご要望: " + (data["詳細・ご要望"] || "") + "\n";
    body += "\n---\n";
    body += "このメールは設備カバーLPのフォームから自動送信されています。\n";
    body += "Spreadsheet: " + ss.getUrl() + "\n";

    MailApp.sendEmail({
      to: NOTIFY_TO,
      subject: "【設備カバー】お問い合わせ: " + (data["会社名"] || "（会社名なし）"),
      body: body,
    });

    return ContentService.createTextOutput(
      JSON.stringify({ ok: true })
    ).setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(
      JSON.stringify({ ok: false, error: err.message })
    ).setMimeType(ContentService.MimeType.JSON);
  }
}
