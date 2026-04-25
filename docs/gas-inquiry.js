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
    var email = (data["メールアドレス"] || "").toString().trim();
    var emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!emailOk) {
      return ContentService.createTextOutput(
        JSON.stringify({ ok: false, error: "メールアドレスは必須です" })
      ).setMimeType(ContentService.MimeType.JSON);
    }

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
      email,
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
    body += "メールアドレス: " + email + "\n";
    body += "ご相談内容: " + (data["ご相談内容"] || "") + "\n";
    body += "詳細・ご要望: " + (data["詳細・ご要望"] || "") + "\n";
    body += "\n---\n";
    body += "このメールは設備カバーLPのフォームから自動送信されています。\n";
    body += "Spreadsheet: " + ss.getUrl() + "\n";

    MailApp.sendEmail({
      to: NOTIFY_TO,
      subject: "【設備カバー】お問い合わせ: " + (data["会社名"] || "（会社名なし）"),
      replyTo: email,
      body: body,
    });

    // --- 自動返信（問い合わせ者へ） ---
    var replyBody = "";
    replyBody += (data["お名前"] || "") + " 様\n\n";
    replyBody += "この度はお問い合わせいただき、誠にありがとうございます。\n";
    replyBody += "以下の内容で承りました。\n\n";
    replyBody += "━━━━━━━━━━━━━━━━━━━━\n";
    replyBody += "受付日時: " + now + "\n";
    replyBody += "会社名: " + (data["会社名"] || "") + "\n";
    replyBody += "お名前: " + (data["お名前"] || "") + "\n";
    replyBody += "電話番号: " + (data["電話番号"] || "") + "\n";
    replyBody += "ご相談内容: " + (data["ご相談内容"] || "") + "\n";
    replyBody += "詳細・ご要望: " + (data["詳細・ご要望"] || "") + "\n";
    replyBody += "━━━━━━━━━━━━━━━━━━━━\n\n";
    replyBody += "担当者より改めてご連絡いたしますので、\n";
    replyBody += "今しばらくお待ちくださいませ。\n\n";
    replyBody += "※ このメールは自動送信です。本メールへの返信はできません。\n";
    replyBody += "  ご不明点がございましたら下記までご連絡ください。\n\n";
    replyBody += "─────────────────────\n";
    replyBody += "岩城工業株式会社\n";
    replyBody += "TEL: 0250-62-1477\n";
    replyBody += "Email: customer@iwashiro.co.jp\n";
    replyBody += "─────────────────────\n";

    MailApp.sendEmail({
      to: email,
      name: "岩城工業 設備カバー",
      subject: "【岩城工業】お問い合わせを受け付けました",
      body: replyBody,
      noReply: true,
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
