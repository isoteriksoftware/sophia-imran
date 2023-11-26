import React, { useRef, useEffect, Suspense, useMemo } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import { AnimationClip, AnimationMixer, Object3D } from "three";
import { GLTFLoader } from "three-stdlib";

type ModelDataProps = {
  url: string;
  scale?: [number, number, number];
  disableAnimation?: boolean;
};

const ModelData: React.FC<ModelDataProps> = ({
  url,
  scale,
  disableAnimation,
}) => {
  const gltf = useLoader(GLTFLoader, url);
  const clonedScene: Object3D = useMemo(
    () => gltf.scene.clone(true),
    [gltf.scene],
  );
  const mixer = useRef(
    disableAnimation ? null : new AnimationMixer(clonedScene),
  ).current;

  useEffect(() => {
    if (disableAnimation) return;

    if (!mixer) return;

    gltf.animations.forEach((clip: AnimationClip) => {
      mixer.clipAction(clip).play();
    });

    return () => {
      mixer.stopAllAction();
    };
  }, [disableAnimation, gltf.animations, mixer]);

  useFrame((state, delta) => mixer?.update(delta));

  return <primitive object={clonedScene} scale={scale} />;
};

type ModelProps = {
  url: string;
  scale?: [number, number, number];
  disableAnimation?: boolean;
};

const Model: React.FC<ModelProps> = ({
  url,
  scale = [0.5, 0.5, 0.5],
  disableAnimation,
}) => {
  return (
    <Suspense fallback={null}>
      <ModelData url={url} scale={scale} disableAnimation={disableAnimation} />
    </Suspense>
  );
};

export default Model;
