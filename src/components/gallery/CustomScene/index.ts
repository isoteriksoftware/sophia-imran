import dynamic from "next/dynamic";

const CustomScene = dynamic(
  () =>
    import("@/components/gallery/CustomScene/CustomScene").then(
      (mod) => mod.CustomScene,
    ),
  {
    ssr: false,
  },
);

export default CustomScene;
