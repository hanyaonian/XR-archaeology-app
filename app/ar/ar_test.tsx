import { useState } from "react";
import {
  ViroARScene,
  ViroARTrackingTargets,
  ViroARImageMarker,
  ViroAmbientLight,
  ViroARSceneNavigator,
  ViroText,
  Viro3DObject,
  ViroPolyline,
  ViroMaterials,
} from "@viro-community/react-viro";
// import { Viro3DPoint } from "@viro-community/react-viro/dist/components/Types/ViroUtils";

export default function ARTest() {
  return <ViroARSceneNavigator initialScene={{ scene: TestScene }}></ViroARSceneNavigator>;
}

function PolyLines() {
  ViroMaterials.createMaterials({
    red: {
      diffuseColor: "rgba(255, 0, 0, 1)",
    },
    green: {
      diffuseColor: "rgba(0, 255, 0, 1)",
    },
    blue: {
      diffuseColor: "rgba(0, 0, 255, 1)",
    },
  });
  return (
    <>
      {/* X轴线 */}
      <ViroPolyline
        points={[
          [-1, 0, 0],
          [1, 0, 0],
        ]}
        thickness={0.01}
        materials={["red"]}
      />
      {/* X轴标签 */}
      <ViroText text="X" position={[1.1, 0, 0]} scale={[0.1, 0.1, 0.1]} style={{ fontFamily: "Arial", fontSize: 20, color: "red" }} />

      {/* Y轴线 */}
      <ViroPolyline
        points={[
          [0, -1, 0],
          [0, 1, 0],
        ]}
        thickness={0.01}
        materials={["green"]}
      />
      {/* Y轴标签 */}
      <ViroText text="Y" position={[0, 1.1, 0]} scale={[0.1, 0.1, 0.1]} style={{ fontFamily: "Arial", fontSize: 20, color: "green" }} />

      {/* Z轴线 */}
      <ViroPolyline
        points={[
          [0, 0, -1],
          [0, 0, 1],
        ]}
        thickness={0.01}
        materials={["blue"]}
      />
      {/* Z轴标签 */}
      <ViroText text="Z" position={[0, 0, 1.1]} scale={[0.1, 0.1, 0.1]} style={{ fontFamily: "Arial", fontSize: 20, color: "blue" }} />
    </>
  );
}

function TestScene() {
  const [status, setStatus] = useState<string>("Seeking");
  const [model_status, setModelStatus] = useState<string>("Unload");

  const onAnchorFound = () => {
    setStatus("Anchor found");
  };

  ViroARTrackingTargets.createTargets({
    logo: {
      source: require("@/assets/models/demo/logo.jpeg"),
      orientation: "Up",
      // real world width in meters
      physicalWidth: 0.165,
    },
  });

  return (
    <ViroARScene>
      <PolyLines />
      <ViroText text={status} position={[3, 0, 2]}></ViroText>
      <ViroText text={model_status} position={[3, 1, 2]}></ViroText>
      <ViroAmbientLight color="#ffffff" intensity={200} />
      <ViroARImageMarker target={"logo"} onAnchorFound={onAnchorFound}>
        <Viro3DObject
          onLoadEnd={() => setModelStatus("model loaded")}
          source={require("@assets/models/demo/Walls_21052024.obj")}
          resources={[require("@assets/models/demo/Walls_21052024.mtl")]}
          type="OBJ"
          scale={[0.1, 0.1, 0.1]}
        />
      </ViroARImageMarker>
    </ViroARScene>
  );
}
