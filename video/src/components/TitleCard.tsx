import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  spring,
  interpolate,
} from "remotion";

export const TitleCard: React.FC = () => {
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
            fontSize: 28,
            fontWeight: 700,
            fontFamily: "'Noto Sans JP', sans-serif",
            letterSpacing: "0.2em",
            marginBottom: 20,
          }}
        >
          岩代工業株式会社
        </p>
        <h1
          style={{
            color: "#ffffff",
            fontSize: 64,
            fontWeight: 900,
            fontFamily: "'Noto Sans JP', sans-serif",
            lineHeight: 1.4,
            margin: 0,
          }}
        >
          現場の"困った"を
          <br />
          設備カバーで解決する
        </h1>
      </div>
    </AbsoluteFill>
  );
};
