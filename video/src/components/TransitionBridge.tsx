import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";

type Props = {
  text: string;
};

export const TransitionBridge: React.FC<Props> = ({ text }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const opacity = spring({ frame, fps, config: { damping: 30 } });
  const scale = interpolate(opacity, [0, 1], [0.85, 1]);

  return (
    <AbsoluteFill
      style={{
        background: "linear-gradient(135deg, #0d2240 0%, #1a4a8a 100%)",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          opacity,
          transform: `scale(${scale})`,
          textAlign: "center",
          padding: "0 60px",
        }}
      >
        <p
          style={{
            color: "#ffffff",
            fontSize: 62,
            fontWeight: 900,
            lineHeight: 1.5,
            fontFamily: "'Noto Sans JP', sans-serif",
            margin: 0,
            letterSpacing: "0.06em",
          }}
        >
          {text}
        </p>
        <div
          style={{
            width: 120,
            height: 4,
            background: "#e8650a",
            margin: "30px auto 0",
            borderRadius: 2,
            opacity,
          }}
        />
      </div>
    </AbsoluteFill>
  );
};
