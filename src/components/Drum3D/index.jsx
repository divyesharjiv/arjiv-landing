import { Billboard, Banner } from "@/components/webgl";
import { View } from "@/webgl/View";
import { useCollageTexture } from "@/hooks";

const DRUM_IMAGES = [
  { url: "/images/1.jpg" },
  { url: "/images/2.jpg" },
  { url: "/images/3.jpg" },
  { url: "/images/4.jpg" },
  { url: "/images/5.jpg" },
  { url: "/images/6.jpg" },
  { url: "/images/7.jpg" },
  { url: "/images/8.jpg" },
  { url: "/images/9.jpg" },
  { url: "/images/10.jpg" },
  { url: "/images/11.jpg" },
  { url: "/images/12.jpg" },
  { url: "/images/13.jpg" },
];

const COUNT = 4;
const GAP = 3.2;

export default function Drum3D() {
  const { texture, dimensions, isLoading } = useCollageTexture(DRUM_IMAGES);
  if (isLoading) return null;

  return (
    <div className="w-full h-svh">
      <View className="w-full h-full">
        <group rotation={[-0.15, 0, -0.2]}>
          {Array.from({ length: COUNT }).map((_, index) => (
            <>
              <Billboard
                key={`billboard-${index}`}
                radius={5}
                rotation={[0, index * Math.PI * 0.5, 0]}
                position={[0, (index - (Math.ceil(COUNT / 2) - 1)) * GAP, 0]}
                texture={texture}
                dimensions={dimensions}
              />
              <Banner
                key={`banner-${index}`}
                radius={5.035}
                rotation={[0, 0, 0.085]}
                position={[
                  0,
                  (index - (Math.ceil(COUNT / 2) - 1)) * GAP - GAP * 0.5,
                  0,
                ]}
              />
            </>
          ))}
        </group>
      </View>
    </div>
  );
}
