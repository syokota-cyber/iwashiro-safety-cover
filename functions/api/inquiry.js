export async function onRequestPost(context) {
  const origin = context.request.headers.get("Origin") || "";
  const headers = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": origin,
  };

  try {
    const data = await context.request.json();

    const required = ["会社名", "お名前", "電話番号", "メールアドレス", "ご相談内容"];
    const limits = { "会社名": 100, "お名前": 50, "電話番号": 20, "メールアドレス": 254, "ご相談内容": 100, "詳細・ご要望": 500 };
    const stripTags = (s) => String(s).replace(/<[^>]*>/g, "");
    const urlPattern = /https?:\/\/|www\./i;

    for (const key of Object.keys(limits)) {
      if (data[key] !== undefined) data[key] = stripTags(data[key]).trim();
    }

    for (const field of required) {
      if (!data[field]) {
        return new Response(JSON.stringify({ ok: false, error: `${field}は必須です` }), {
          status: 400,
          headers,
        });
      }
    }

    for (const [field, max] of Object.entries(limits)) {
      if (data[field] && data[field].length > max) {
        return new Response(JSON.stringify({ ok: false, error: `${field}は${max}文字以内で入力してください` }), {
          status: 400,
          headers,
        });
      }
    }

    const email = String(data["メールアドレス"] || "").trim();
    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!emailOk) {
      return new Response(JSON.stringify({ ok: false, error: "メールアドレスの形式が正しくありません" }), {
        status: 400,
        headers,
      });
    }

    if (urlPattern.test(data["詳細・ご要望"] || "")) {
      return new Response(JSON.stringify({ ok: false, error: "URLの入力はご遠慮ください" }), {
        status: 400,
        headers,
      });
    }

    const gasUrl = context.env.GAS_WEBHOOK_URL;
    if (!gasUrl) {
      return new Response(JSON.stringify({ ok: false, error: "サーバー設定エラー" }), {
        status: 500,
        headers,
      });
    }

    // GAS応答をJSONまで確認（200でもok:falseを弾く）
    const gasRes = await fetch(gasUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...data, "メールアドレス": email }),
    });

    if (!gasRes.ok) {
      throw new Error(`GAS responded ${gasRes.status}`);
    }

    let gasJson = null;
    try {
      gasJson = await gasRes.json();
    } catch (_) {
      // 文字列返却などを許さない（確実性優先）
      throw new Error("GAS invalid JSON");
    }
    if (!gasJson || gasJson.ok !== true) {
      throw new Error("GAS returned ok:false");
    }

    return new Response(JSON.stringify({ ok: true }), { status: 200, headers });
  } catch (err) {
    return new Response(JSON.stringify({ ok: false, error: "送信に失敗しました" }), {
      status: 500,
      headers,
    });
  }
}

export async function onRequestOptions() {
  return new Response(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}
