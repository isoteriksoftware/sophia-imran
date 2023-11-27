import React, { PropsWithChildren, useRef } from "react";
import { Gallery, GalleryScene } from "react-gallery-3d";
import { useFrame } from "@react-three/fiber";
import { Group } from "three";
import { EnvironmentPresets } from "@/components/gallery/types";
import { useIsMobile } from "@/common/utils";

const Renderer: React.FC<
  PropsWithChildren<{
    sceneElements?: React.ReactNode;
  }>
> = ({ children, sceneElements }) => {
  const galleryRef = useRef<Group>(null!);

  useFrame(({ clock }) => {
    if (galleryRef.current) {
      galleryRef.current.rotation.y += clock.getDelta();
    }
  });

  return (
    <>
      {/* @ts-expect-error */}
      <Gallery
        ref={galleryRef}
        ground={{
          reflectorMaterial: {
            metalness: 1,
            roughness: 1,
            mirror: 0.88,
            resolution: 2048,
            depthScale: 1,
            minDepthThreshold: 0.4,
            maxDepthThreshold: 1,
          },
        }}
        item={{
          width: 210,
          height: 70,
          radialSegments: 50,
        }}
      >
        {children}
      </Gallery>

      {sceneElements}
    </>
  );
};

const FinalScene: React.FC<
  PropsWithChildren<{
    sceneElements?: React.ReactNode;
  }>
> = ({ children, sceneElements }) => {
  const isMobile = useIsMobile();

  return (
    <GalleryScene
      fog={{
        near: isMobile ? 400 : 270,
        far: isMobile ? 950 : 510,
      }}
      camera={{
        fov: isMobile ? 45 : 60,
        position: isMobile ? [0, 95, 408] : [0, 85, 208],
      }}
      orbitControls={{
        enableDamping: true,
        enableZoom: true,
        autoRotate: false,
        autoRotateSpeed: 0,
        minPolarAngle: Math.PI / 2 - 0.5,
        maxPolarAngle: Math.PI / 2 - 0.01,
      }}
      disableEnvironment={true}
    >
      <Renderer sceneElements={sceneElements}>{children}</Renderer>
    </GalleryScene>
  );
};

export { FinalScene };
