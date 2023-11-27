import { useGallerySceneSettings } from "@/common/hooks";
import { useEffect, useMemo, useRef } from "react";
import { Mesh } from "three";
import { SpotLight } from "@react-three/drei";

const SceneLights = () => {
  const { ambientLightControls, directionalLightControls, spotLightControls } =
    useGallerySceneSettings();

  const spotLightTarget = useMemo(() => new Mesh(), []);

  useEffect(() => {
    spotLightTarget.position.set(...spotLightControls.target);
  }, [spotLightControls.target, spotLightTarget.position]);

  return (
    <>
      {ambientLightControls.enableAmbientLight && (
        <ambientLight
          color={ambientLightControls.color}
          intensity={ambientLightControls.intensity}
        />
      )}

      {directionalLightControls.enableDirectionalLight && (
        <directionalLight
          color={directionalLightControls.color}
          intensity={directionalLightControls.intensity}
          position={directionalLightControls.position}
        />
      )}

      {spotLightControls.enableSpotLight && (
        <SpotLight
          color={spotLightControls.color}
          intensity={spotLightControls.intensity}
          position={spotLightControls.position}
          //target={spotLightTarget}
          angle={spotLightControls.angle}
          penumbra={spotLightControls.penumbra}
          decay={spotLightControls.decay}
          distance={spotLightControls.distance}
          visible={true}
          castShadow={true}
        />
      )}
    </>
  );
};

export default SceneLights;
