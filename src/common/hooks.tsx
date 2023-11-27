import { useControls } from "leva";

export const useGallerySceneSettings = () => {
  const galleryItemControls = useControls("Gallery Item", {
    width: { value: 210, min: 10, max: 1000 },
    height: { value: 70, min: 10, max: 1000 },
    radialSegments: { value: 50, min: 8, max: 100 },
    heightSegments: { value: 1, min: 1, max: 100 },
    innerRadiusPercent: { value: 0.99, min: 0.1, max: 0.99 },
  });

  const environmentControls = useControls("Environment", {
    preset: {
      value: "city",
      options: [
        "city",
        "dawn",
        "night",
        "sunset",
        "warehouse",
        "apartment",
        "forest",
        "lobby",
        "park",
        "studio",
      ],
    },
    enableEnvironment: false,
  });

  const cameraControls = useControls("Camera", {
    fov: { value: 60, min: 1, max: 180 },
    position: {
      value: [0, 85, 208],
      step: 1,
      min: -1000,
      max: 1000,
    },
  });

  const fogControls = useControls("Fog", {
    enableFog: true,
    fogColor: "#000000",
    near: { value: 270, min: 0.1, max: 1000 },
    far: { value: 460, min: 1, max: 1000 },
  });

  const groundControls = useControls("Ground", {
    enableGround: true,
    groundColor: "#ffffff",
    width: { value: 1000, min: 10, max: 1000 },
    height: { value: 1000, min: 10, max: 1000 },
    enableReflector: true,
    mirror: { value: 0.88, min: 0, max: 1 },
    resolution: { value: 2048, min: 0, max: 2048 },
    depthScale: { value: 1, min: 0.01, max: 1 },
    minDepthThreshold: { value: 0.4, min: 0.01, max: 1 },
    maxDepthThreshold: { value: 1, min: 0.01, max: 1 },
    roughness: { value: 1, min: 0.01, max: 1 },
    metalness: { value: 1, min: 0.01, max: 1 },
  });

  const orbitControls = useControls("Orbit Controls", {
    enableOrbitControls: true,
    autoRotate: false,
    enableZoom: true,
    enableDamping: true,
    dampingFactor: { value: 0.01, min: 0.001, max: 0.5 },
    autoRotateSpeed: { value: -1, min: -100, max: 100 },
  });

  const ambientLightControls = useControls("Ambient Light", {
    enableAmbientLight: true,
    color: "#c42f11",
    intensity: { value: 0.43, min: 0, max: 1 },
  });

  const directionalLightControls = useControls("Directional Light", {
    enableDirectionalLight: true,
    color: "#ffffff",
    intensity: { value: 1, min: 0, max: 1 },
    position: {
      value: [-2, 10, 27],
      step: 1,
      min: -1000,
      max: 1000,
    },
  });

  const spotLightControls = useControls("Spot Light", {
    enableSpotLight: true,
    color: "#245810",
    intensity: { value: 1, min: 0, max: 1 },
    position: {
      value: [5, 100, 27],
      step: 1,
      min: -1000,
      max: 1000,
    },
    target: {
      value: [0, 0, 0],
      step: 1,
      min: -1000,
      max: 1000,
    },
    angle: { value: Math.PI / 2, min: 0, max: Math.PI / 2 },
    penumbra: { value: 0, min: 0, max: 1 },
    decay: { value: 0, min: 0, max: 2 },
    distance: { value: 0, min: 0, max: 1000 },
  });

  const pointLightControls = useControls("Point Light", {
    enablePointLight: true,
    color: "#3b7c26",
    intensity: { value: 1, min: 0, max: 1 },
    position: {
      value: [5, 132, 149],
      step: 1,
      min: -1000,
      max: 1000,
    },
    decay: { value: 0, min: 0, max: 2 },
    distance: { value: 0, min: 0, max: 1000 },
  });

  return {
    fogControls,
    groundControls,
    orbitControls,
    galleryItemControls,
    environmentControls,
    cameraControls,
    ambientLightControls,
    directionalLightControls,
    spotLightControls,
    pointLightControls,
  };
};
