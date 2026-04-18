import React from "react";
import {
  AbsoluteFill,
  Img,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";

type Props = {
  image: string;
  narration: string;
  subtitle?: string;
  zoomDirection: "in" | "out";
  tone: "dark" | "light";
};

export const SlideWithNarration: React.FC<Props> = ({
  image,
  narration,
  subtitle,
  zoomDirection,
  tone,
}) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const scale =
    zoomDirection === "in"
      ? interpolate(frame, [0, durationInFrames], [1, 1.15])
      : interpolate(frame, [0, durationInFrames], [1.15, 1]);

  const textOpacity = spring({ frame: frame - 8, fps, config: { damping: 30 } });

  const overlayOpacity = tone === "dark" ? 0.55 : 0.35;

  const displayText = subtitle || narration;

  return (
    <AbsoluteFill>
      <AbsoluteFill style={{ overflow: "hidden" }}>
        <Img
          src={image}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            transform: `scale(${scale})`,
          }}
        />
      </AbsoluteFill>

      <AbsoluteFill
        style={{
          background: `linear-gradient(to top, rgba(0,0,0,${overlayOpacity + 0.3}) 0%, rgba(0,0,0,${overlayOpacity * 0.3}) 50%, rgba(0,0,0,${overlayOpacity * 0.5}) 100%)`,
        }}
      />

      <AbsoluteFill
        style={{
          justifyContent: "flex-end",
          alignItems: "center",
          padding: "0 80px 80px",
        }}
      >
        <div
          style={{
            opacity: textOpacity,
            transform: `translateY(${interpolate(textOpacity, [0, 1], [30, 0])}px)`,
            textAlign: "center",
            maxWidth: 1400,
          }}
        >
          <p
            style={{
              color: "#ffffff",
              fontSize: subtitle ? 52 : 46,
              fontWeight: 900,
              lineHeight: 1.5,
              textShadow: "0 4px 20px rgba(0,0,0,0.7)",
              fontFamily: "'Noto Sans JP', sans-serif",
              margin: 0,
              letterSpacing: "0.04em",
            }}
          >
            {displayText}
          </p>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
