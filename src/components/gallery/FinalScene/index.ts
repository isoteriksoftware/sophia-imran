import dynamic from "next/dynamic";

const FinalScene = dynamic(
  () =>
    import("@/components/gallery/FinalScene/FinalScene").then(
      (mod) => mod.FinalScene,
    ),
  {
    ssr: false,
  },
);

export default FinalScene;
