import React, { PropsWithChildren, useEffect, useRef } from "react";
import { Gallery, GalleryScene } from "react-gallery-3d";
import { SpotLight, Stats } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { Group, PerspectiveCamera } from "three";
import { useGallerySceneSettings } from "@/common/hooks";
import { EnvironmentPresets } from "@/components/gallery/types";

const DynamicUpdates: React.FC<{
  cameraControls: { fov: number; position: [number, number, number] };
}> = ({ cameraControls }) => {
  const { camera } = useThree();

  useEffect(() => {
    if (camera instanceof PerspectiveCamera) {
      camera.fov = cameraControls.fov;
      camera.position.set(...cameraControls.position);
      camera.updateProjectionMatrix();
    }
  }, [camera, cameraControls]);

  return null;
};

const Renderer: React.FC<
  PropsWithChildren<{
    sceneElements?: React.ReactNode;
  }>
> = ({ children, sceneElements }) => {
  const galleryRef = useRef<Group>(null!);
  const { groundControls, galleryItemControls, cameraControls } =
    useGallerySceneSettings();

  useFrame(({ clock }) => {
    if (galleryRef.current) {
      galleryRef.current.rotation.y += 1 * clock.getDelta();
    }
  });

  return (
    <>
      {/* @ts-expect-error */}
      <Gallery
        ref={galleryRef}
        ground={{
          width: groundControls.width,
          height: groundControls.height,
          disableReflector: !groundControls.enableReflector,
          reflectorMaterial: {
            color: groundControls.groundColor,
            metalness: groundControls.metalness,
            roughness: groundControls.roughness,
            mirror: groundControls.mirror,
            resolution: groundControls.resolution,
            depthScale: groundControls.depthScale,
            minDepthThreshold: groundControls.minDepthThreshold,
            maxDepthThreshold: groundControls.maxDepthThreshold,
          },
        }}
        disableGround={!groundControls.enableGround}
        item={{
          width: galleryItemControls.width,
          height: galleryItemControls.height,
          radialSegments: galleryItemControls.radialSegments,
          heightSegments: galleryItemControls.heightSegments,
          innerRadiusPercent: galleryItemControls.innerRadiusPercent,
        }}
      >
        {children}
      </Gallery>

      {sceneElements}
      <Stats />
      <DynamicUpdates cameraControls={cameraControls} />
    </>
  );
};

const CustomScene: React.FC<
  PropsWithChildren<{
    sceneElements?: React.ReactNode;
  }>
> = ({ children, sceneElements }) => {
  const { fogControls, orbitControls, environmentControls } =
    useGallerySceneSettings();

  return (
    <GalleryScene
      fog={{
        color: fogControls.fogColor,
        near: fogControls.near,
        far: fogControls.far,
      }}
      disableFog={!fogControls.enableFog}
      disableControls={!orbitControls.enableOrbitControls}
      orbitControls={{
        enableDamping: orbitControls.enableDamping,
        enableZoom: orbitControls.enableZoom,
        dampingFactor: orbitControls.dampingFactor,
        autoRotate: orbitControls.autoRotate,
        autoRotateSpeed: orbitControls.autoRotateSpeed,
        minPolarAngle: Math.PI / 2 - 0.5,
        maxPolarAngle: Math.PI / 2 - 0.01,
      }}
      disableEnvironment={!environmentControls.enableEnvironment}
      environment={{
        preset: environmentControls.preset as EnvironmentPresets,
      }}
    >
      <Renderer sceneElements={sceneElements}>{children}</Renderer>
    </GalleryScene>
  );
};

export { CustomScene };
