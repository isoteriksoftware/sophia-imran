"use client";

import {
  GalleryItem,
  GalleryItemInitData,
  ImageItemMaterial,
  VideoItemMaterial,
} from "react-gallery-3d";
import CustomScene from "@/components/gallery/CustomScene";
import { Material, MeshPhysicalMaterial } from "three";
import { useMemo } from "react";
import SceneLights from "@/components/gallery/CustomScene/SceneLights";
import Model from "@/components/utils/Model";

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
      metalness: 1,
      roughness: 1,
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
      metalness: 1,
      roughness: 1,
      clearcoat: 0.1,
      clearcoatRoughness: 0.2,
    });
  }
}

const Scenery = () => {
  const petalY = -29;

  return (
    <>
      <SceneLights />

      {/*<group position={[-210, -30, -20]}>*/}
      {/*  <Model url="./models/pond.glb" scale={[7, 7, 7]} />*/}
      {/*</group>*/}

      <group position={[0, petalY, 0]}>
        <Model url="./models/petals.glb" scale={[100, 100, 100]} />
      </group>
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

      <group position={[180, -40, 0]}>
        <Model url="./models/hyacinth.glb" />
      </group>
    </>
  );
};

const Home = () => {
  const itemMaterials = useMemo(() => {
    return [
      new ShinyImageMaterial("./images/img1.jpg"),
      new ShinyVideoMaterial("./videos/vid2.mp4"),
      new ShinyImageMaterial("./images/img4.jpg"),
      new ShinyImageMaterial("./images/img5.jpg"),
      new ShinyVideoMaterial("./videos/vid4.mp4"),
      new ShinyImageMaterial("./images/img6.jpg"),
      new ShinyImageMaterial("./images/img7.jpg"),
      new ShinyVideoMaterial("./videos/vid5.mov"),
      new ShinyImageMaterial("./images/img11.jpg"),
      new ShinyVideoMaterial("./videos/vid6.mov"),
      new ShinyImageMaterial("./images/img12.jpg"),
      new ShinyImageMaterial("./images/img13.jpg"),
      new ShinyVideoMaterial("./videos/vid1.mp4"),
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
    <CustomScene sceneElements={<Scenery />}>
      {[
        ...itemMaterials.map((itemMaterial, index) => (
          <GalleryItem
            key={index}
            itemMaterial={itemMaterial}
            onInit={autoPlayOnInit}
          />
        )),
      ]}
      {/*<VideoItem src="./videos/vid1.mp4" />*/}
      {/*<ImageItem src="./images/img2.jpg" />*/}
      {/*<ImageItem src="./images/img3.jpg" />*/}
      {/*<VideoItem src="./videos/vid2.mp4" />*/}
      {/*<ImageItem src="./images/img4.jpg" />*/}
      {/*<ImageItem src="./images/img5.jpg" />*/}
      {/*<VideoItem src="./videos/vid3.mp4" />*/}
      {/*<ImageItem src="./images/img6.jpg" />*/}
      {/*<ImageItem src="./images/img7.jpg" />*/}
      {/*<VideoItem src="./videos/vid4.mp4" />*/}
      {/*<ImageItem src="./images/img8.jpg" />*/}
      {/*<ImageItem src="./images/img9.jpg" />*/}
      {/*<VideoItem src="./videos/vid5.mov" />*/}
      {/*<ImageItem src="./images/img10.jpg" />*/}
      {/*<ImageItem src="./images/img11.jpg" />*/}
      {/*<VideoItem src="./videos/vid6.mov" />*/}
      {/*<ImageItem src="./images/img12.jpg" />*/}
      {/*<ImageItem src="./images/img13.jpg" />*/}
      {/*<VideoItem src="./videos/vid7.mov" />*/}
    </CustomScene>
  );
};

export default Home;
