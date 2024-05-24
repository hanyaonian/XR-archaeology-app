import { useState } from "react";
import {
  ViroARScene,
  ViroARTrackingTargets,
  ViroPlaneUpdatedMap,
  ViroARPlaneSelector,
  ViroAmbientLight,
  ViroARSceneNavigator,
  ViroText,
  Viro3DObject,
  ViroPolyline,
  ViroMaterials,
  ViroNode,
  ViroARCamera,
  ViroButton,
} from "@viro-community/react-viro";
import { Viro3DPoint } from "@viro-community/react-viro/dist/components/Types/ViroUtils";

export default function ARTest() {
  // @ts-ignore
  return <ViroARSceneNavigator initialScene={{ scene: GuideScene }} />;
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

function GuideScene() {
  const placeWall = (...args: any[]) => {
    console.warn(args);
    setWallStatus(true);
  };

  const [wallPlaceStatus, setWallStatus] = useState<boolean>(false);
  const [model_position, setModelPostion] = useState<Viro3DPoint>([10, -12, -50]);

  return (
    <ViroARScene>
      <ViroAmbientLight color="#ffffff" intensity={200} />
      <ViroARCamera>
        <ViroText
          text="Place the wall"
          position={[0, 0, -1]}
          transformBehaviors={"billboard"}
          scale={[0.4, 0.4, 0.4]}
          style={{ fontFamily: "Arial", color: "white" }}
        />
        <Viro3DObject
          source={require("@assets/models/wall/arrow.obj")}
          position={[0, 0, -10]}
          rotation={[90, 0, 90]}
          scale={[0.05, 0.05, 0.05]}
          type="OBJ"
        />
        <Viro3DObject
          source={require("@assets/models/wall/wall1.glb")}
          rotation={[90, 65, 90]}
          position={model_position}
          scale={[0.2, 0.2, 0.2]}
          type="GLB"
          onDrag={(pos) => {
            console.warn(pos);
          }}
        />
        <ViroButton
          position={[0, -0.5, -1]}
          scale={[0.1, 0.1, 0.1]}
          source={require("@assets/images/play.png")}
          onClick={placeWall}
          height={2}
          width={3}
        ></ViroButton>
      </ViroARCamera>
    </ViroARScene>
  );
}
