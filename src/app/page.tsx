"use client";

import {
  GalleryItem,
  GalleryItemInitData,
  ImageItemMaterial,
  VideoItemMaterial,
} from "react-gallery-3d";
import CustomScene from "@/components/gallery/CustomScene";
import { Material, Mesh, MeshPhysicalMaterial } from "three";
import { useMemo, useRef } from "react";
import SceneLights from "@/components/gallery/CustomScene/SceneLights";
import Model from "@/components/utils/Model";
import { SpotLight, Text3D } from "@react-three/drei";
import FinalScene from "@/components/gallery/FinalScene";
import LatoRegular from "../assets/fonts/Lato_Regular.json";
import dynamic from "next/dynamic";
import { useFrame } from "@react-three/fiber";

class ShinyImageMaterial extends ImageItemMaterial {
  constructor(src: string) {
    super(src);
  }

  public generate() {
    this.initTexture();

    return new MeshPhysicalMaterial({
      toneMapped: false,
      map: this.texture,
      reflectivity: 1,
      metalness: 0.7,
      roughness: 0.3,
      clearcoat: 1,
      clearcoatRoughness: 0.1,
      polygonOffsetFactor: 1,
      polygonOffsetUnits: 1,
      transparent: false,
      opacity: 1,
    });
  }
}

class ShinyVideoMaterial extends VideoItemMaterial {
  constructor(source: string) {
    super(source);
  }

  generate(): Material | Material[] {
    this.initVideo();

    return new MeshPhysicalMaterial({
      toneMapped: true,
      map: this.texture,
      polygonOffset: true,
      polygonOffsetFactor: 1,
      polygonOffsetUnits: 1,
      reflectivity: 1,
      metalness: 0.7,
      roughness: 0.3,
      clearcoat: 1,
      clearcoatRoughness: 0.1,
    });
  }
}

const AnimatedText = () => {
  const textRef = useRef<Mesh>(null!);
  let time = 0;

  useFrame((state, delta) => {
    if (!textRef.current) return;

    time += delta;
    const minY = 70; // Minimum Y value
    const movementMagnitude = 30;
    const movementSpeed = 0.5; // Speed of vertical oscillation
    const rotationRange = Math.PI / 4; // Range of rotation (e.g., 45 degrees in radians)
    const rotationSpeed = 0.2; // Speed of rotation

    // Vertical oscillation
    textRef.current.position.y =
      minY + Math.sin(time * movementSpeed) * movementMagnitude;

    // Oscillating rotation around Y-axis
    // The rotation oscillates between -rotationRange and rotationRange
    textRef.current.rotation.y = Math.sin(time * rotationSpeed) * rotationRange;
  });

  return (
    <Text3D
      ref={textRef}
      font={LatoRegular as any}
      position={[-220, 100, -80]}
      scale={[4, 4, 5]}
      size={5}
      height={2}
    >
      {/* eslint-disable-next-line react/no-unescaped-entities */}
      Sophia & Imran's Enchanted Union - December 22, 2023
      <meshStandardMaterial
        color="#FFFFFF"
        roughness={0.1}
        metalness={0.3}
        emissive="#DDDDDD"
        emissiveIntensity={0.1}
      />
    </Text3D>
  );
};

const Scenery = () => {
  const petalY = -29;

  return (
    <>
      <ambientLight color={"#c42f11"} intensity={0.43} />
      <directionalLight
        color={"#ffffff"}
        intensity={1}
        position={[-2, 10, 27]}
      />
      <SpotLight
        color={"#245810"}
        intensity={1}
        position={[5, 100, 27]}
        angle={Math.PI / 2}
        penumbra={0}
        decay={0}
        distance={0}
        visible={true}
        castShadow={true}
      />
      <pointLight
        color={"#3b7c26"}
        intensity={1}
        position={[5, 132, 149]}
        decay={0}
        distance={0}
        visible={true}
        castShadow={true}
      />

      <AnimatedText />

      <group position={[0, petalY, -50]}>
        <Model url="./models/petals.glb" scale={[100, 100, 100]} />
      </group>
      <group position={[0, petalY, 50]}>
        <Model url="./models/petals.glb" scale={[100, 100, 100]} />
      </group>
      <group position={[50, petalY, 0]}>
        <Model url="./models/petals.glb" scale={[100, 100, 100]} />
      </group>
      <group position={[-50, petalY, 0]}>
        <Model url="./models/petals.glb" scale={[100, 100, 100]} />
      </group>

      <group position={[-150, -90, 0]} scale={[30, 30, 30]}>
        <Model url="./models/balloons.glb" />
      </group>
      <group position={[20, -90, 0]} scale={[30, 30, 30]}>
        <Model url="./models/balloons.glb" />
      </group>
      <group position={[170, -80, -10]} scale={[30, 30, 30]}>
        <Model url="./models/balloons.glb" />
      </group>
    </>
  );
};

const Home = () => {
  const itemMaterials = useMemo(() => {
    return [
      new ShinyImageMaterial("./images/img1.jpg"),
      new ShinyVideoMaterial("./videos/vid1.mov"),
      new ShinyImageMaterial("./images/img2.jpg"),
      new ShinyImageMaterial("./images/img3.jpg"),
      new ShinyVideoMaterial("./videos/vid2.mp4"),
      new ShinyImageMaterial("./images/img4.jpg"),
      new ShinyImageMaterial("./images/img5.jpg"),
      new ShinyVideoMaterial("./videos/vid3.mov"),
      new ShinyImageMaterial("./images/img6.jpg"),
      new ShinyVideoMaterial("./videos/vid4.mov"),
    ];
  }, []);

  const autoPlayOnInit = ({ itemMaterial }: GalleryItemInitData) => {
    if (itemMaterial instanceof VideoItemMaterial) {
      const video = (itemMaterial as VideoItemMaterial).getVideo()!;
      video.muted = true;
      video.loop = true;
      video.play();
    }
  };

  return (
    <FinalScene sceneElements={<Scenery />}>
      {[
        ...itemMaterials.map((itemMaterial, index) => (
          <GalleryItem
            key={index}
            itemMaterial={itemMaterial}
            onInit={autoPlayOnInit}
          />
        )),
      ]}
    </FinalScene>
  );
};

export default Home;
