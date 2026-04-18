import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  spring,
} from "remotion";

export const EndCard: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const opacity = spring({ frame, fps, config: { damping: 30 } });

  return (
    <AbsoluteFill
      style={{
        background: "linear-gradient(135deg, #0d2240 0%, #1a4a8a 100%)",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div style={{ opacity, textAlign: "center" }}>
        <p
          style={{
            color: "#e8650a",
            fontSize: 24,
            fontWeight: 700,
            fontFamily: "'Noto Sans JP', sans-serif",
            letterSpacing: "0.2em",
            marginBottom: 16,
          }}
        >
          設備カバー製作
        </p>
        <h2
          style={{
            color: "#ffffff",
            fontSize: 72,
            fontWeight: 900,
            fontFamily: "'Noto Sans JP', sans-serif",
            margin: "0 0 30px",
          }}
        >
          岩代工業株式会社
        </h2>
        <div
          style={{
            width: 120,
            height: 4,
            background: "#e8650a",
            margin: "0 auto 40px",
            borderRadius: 2,
          }}
        />
        <p
          style={{
            color: "#ffffff",
            fontSize: 36,
            fontFamily: "'Noto Sans JP', sans-serif",
            fontWeight: 500,
            margin: "0 0 16px",
            letterSpacing: "0.05em",
          }}
        >
          iwashiro.co.jp/safety-cover/
        </p>
        <p
          style={{
            color: "#f0a040",
            fontSize: 32,
            fontFamily: "'Noto Sans JP', sans-serif",
            fontWeight: 700,
            margin: 0,
          }}
        >
          ご相談無料 | お気軽にお問い合わせください
        </p>
      </div>
    </AbsoluteFill>
  );
};
