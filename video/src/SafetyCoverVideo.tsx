import { AbsoluteFill, Sequence, staticFile } from "remotion";
import { SlideWithNarration } from "./components/SlideWithNarration";
import { TitleCard } from "./components/TitleCard";
import { EndCard } from "./components/EndCard";
import { TransitionBridge } from "./components/TransitionBridge";

const FPS = 30;
const sec = (s: number) => Math.round(s * FPS);

export const SafetyCoverVideo: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: "#0d2240" }}>
      {/* === 第1幕：課題提起 (0:00-0:15) === */}

      <Sequence from={sec(0)} durationInFrames={sec(5)}>
        <SlideWithNarration
          image={staticFile("images/d1_safety.jpg")}
          narration="コンベアのつなぎ目、カバーなしで稼働していませんか？"
          zoomDirection="in"
          tone="dark"
        />
      </Sequence>

      <Sequence from={sec(5)} durationInFrames={sec(3.5)}>
        <SlideWithNarration
          image={staticFile("images/d2_safety.jpg")}
          narration="部品がない。メーカーに断られた。"
          zoomDirection="in"
          tone="dark"
        />
      </Sequence>

      <Sequence from={sec(8.5)} durationInFrames={sec(3.5)}>
        <SlideWithNarration
          image={staticFile("images/d3_safety.jpg")}
          narration="注意書きを貼っても、読まれない。"
          zoomDirection="out"
          tone="dark"
        />
      </Sequence>

      <Sequence from={sec(12)} durationInFrames={sec(3.5)}>
        <SlideWithNarration
          image={staticFile("images/d4_safety.jpg")}
          narration="製造業の死亡災害、最多は挟まれ・巻き込まれで32.6%。"
          subtitle="製造業の死亡災害 最多＝挟まれ・巻き込まれ 32.6%"
          zoomDirection="in"
          tone="dark"
        />
      </Sequence>

      {/* === ブリッジ (0:15-0:17) === */}
      <Sequence from={sec(15.5)} durationInFrames={sec(2)}>
        <TransitionBridge text="その課題、設備カバーで解決できます。" />
      </Sequence>

      {/* === 第2幕A：コンベア結節点 (0:17-0:23) === */}
      <Sequence from={sec(17.5)} durationInFrames={sec(3)}>
        <SlideWithNarration
          image={staticFile("images/d7_safety.jpg")}
          narration="メーカー不問。現場採寸から対応します。"
          zoomDirection="out"
          tone="light"
        />
      </Sequence>

      <Sequence from={sec(20.5)} durationInFrames={sec(3)}>
        <SlideWithNarration
          image={staticFile("images/d10a_safecover.jpg")}
          narration="設計、製作、取付まで一貫対応。分割発注の手戻りをなくします。"
          zoomDirection="in"
          tone="light"
        />
      </Sequence>

      {/* === 第2幕B：レトロフィット (0:23-0:32) === */}
      <Sequence from={sec(23.5)} durationInFrames={sec(4)}>
        <SlideWithNarration
          image={staticFile("images/d5a_safecover.jpg")}
          narration="設備丸ごと入替えますか？後付けカバーなら、大幅にコスト削減できます。"
          zoomDirection="out"
          tone="light"
        />
      </Sequence>

      <Sequence from={sec(27.5)} durationInFrames={sec(4.5)}>
        <SlideWithNarration
          image={staticFile("images/d11a_safecover.jpg")}
          narration="カバー交換と同時に、安全基準も現行レベルへアップグレード。"
          zoomDirection="in"
          tone="light"
        />
      </Sequence>

      {/* === 第2幕C：ポカヨケ (0:32-0:44) === */}
      <Sequence from={sec(32)} durationInFrames={sec(4)}>
        <SlideWithNarration
          image={staticFile("images/d6_safety.jpg")}
          narration="多国籍スタッフが働く現場。言語に頼らない物理的な防護で、全員を守ります。"
          zoomDirection="out"
          tone="light"
        />
      </Sequence>

      <Sequence from={sec(36)} durationInFrames={sec(4)}>
        <SlideWithNarration
          image={staticFile("images/d9_safecover.jpg")}
          narration="深夜2時、注意力が落ちても。物理カバーは24時間、同じレベルで守り続けます。"
          zoomDirection="in"
          tone="light"
        />
      </Sequence>

      <Sequence from={sec(40)} durationInFrames={sec(4)}>
        <SlideWithNarration
          image={staticFile("images/d12_safecover.jpg")}
          narration="透明素材なら、安全と視認性を両立できます。"
          zoomDirection="out"
          tone="light"
        />
      </Sequence>

      {/* === 第3幕：差別化 (0:44-0:50) === */}
      <Sequence from={sec(44)} durationInFrames={sec(4)}>
        <SlideWithNarration
          image={staticFile("images/d13_safecover.jpg")}
          narration="既製品で無理やり合わせていませんか？オーダーメイドなら、ぴったりフィット。"
          zoomDirection="in"
          tone="light"
        />
      </Sequence>

      {/* === 第4幕：CTA (0:48-0:60) === */}
      <Sequence from={sec(48)} durationInFrames={sec(6)}>
        <SlideWithNarration
          image={staticFile("images/d14_safecover.jpg")}
          narration="ご相談だけでも無料です。まずはお気軽にお問い合わせください。"
          zoomDirection="out"
          tone="light"
        />
      </Sequence>

      <Sequence from={sec(54)} durationInFrames={sec(6)}>
        <EndCard />
      </Sequence>
    </AbsoluteFill>
  );
};
