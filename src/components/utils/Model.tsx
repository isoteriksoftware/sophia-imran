import React, { useRef, useEffect, Suspense, useMemo } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import { AnimationClip, AnimationMixer, Object3D } from "three";
import { GLTFLoader } from "three-stdlib";

type ModelDataProps = {
  url: string;
  scale?: [number, number, number];
};

const ModelData: React.FC<ModelDataProps> = ({ url, scale }) => {
  const gltf = useLoader(GLTFLoader, url);
  const clonedScene: Object3D = useMemo(
    () => gltf.scene.clone(true),
    [gltf.scene],
  );
  const mixer: AnimationMixer = useRef(new AnimationMixer(clonedScene)).current;

  useEffect(() => {
    gltf.animations.forEach((clip: AnimationClip) => {
      mixer.clipAction(clip).play();
    });

    return () => {
      mixer.stopAllAction();
    };
  }, [gltf.animations, mixer]);

  useFrame((state, delta) => mixer.update(delta));

  return <primitive object={clonedScene} scale={scale} />;
};

type ModelProps = {
  url: string;
  scale?: [number, number, number];
};

const Model: React.FC<ModelProps> = ({ url, scale = [0.5, 0.5, 0.5] }) => {
  return (
    <Suspense fallback={null}>
      <ModelData url={url} scale={scale} />
    </Suspense>
  );
};

export default Model;
