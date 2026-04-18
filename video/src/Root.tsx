import { Composition } from "remotion";
import { SafetyCoverVideo } from "./SafetyCoverVideo";

export const RemotionRoot: React.FC = () => {
  return (
    <Composition
      id="SafetyCoverPR"
      component={SafetyCoverVideo}
      durationInFrames={30 * 60}
      fps={30}
      width={1920}
      height={1080}
    />
  );
};
