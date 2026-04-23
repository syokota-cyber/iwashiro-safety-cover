export async function onRequestPost(context) {
  const origin = context.request.headers.get("Origin") || "";
  const headers = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": origin,
  };

  try {
    const data = await context.request.json();

    const required = ["会社名", "お名前", "電話番号", "ご相談内容"];
    for (const field of required) {
      if (!data[field]) {
        return new Response(JSON.stringify({ ok: false, error: `${field}は必須です` }), {
          status: 400,
          headers,
        });
      }
    }

    const gasUrl = context.env.GAS_WEBHOOK_URL;
    if (!gasUrl) {
      return new Response(JSON.stringify({ ok: false, error: "サーバー設定エラー" }), {
        status: 500,
        headers,
      });
    }

    const gasRes = await fetch(gasUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!gasRes.ok) {
      throw new Error(`GAS responded ${gasRes.status}`);
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
