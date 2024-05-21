import { useState } from 'react';
import { ViroARScene, ViroAmbientLight, ViroARSceneNavigator, ViroARPlaneSelector, Viro3DObject } from '@viro-community/react-viro';
import { Viro3DPoint } from '@viro-community/react-viro/dist/components/Types/ViroUtils';

export default function ARTest() {
  return <ViroARSceneNavigator initialScene={{ scene: TestScene }}></ViroARSceneNavigator>;
}

function TestScene() {
  const [modelPosition, setModelPosition] = useState<Viro3DPoint>([0, 0, -1]);

  const handlePlaneSelected = (anchor) => {
    setModelPosition(anchor.position);
  };

  return (
    <ViroARScene>
      <ViroARPlaneSelector onPlaneSelected={handlePlaneSelected}>
        <ViroAmbientLight color="#ffffff" intensity={200}/>
        <Viro3DObject
          source={require('@assets/models/demo/Box.glb')}
          resources={[]}
          type="GLB"
          position={modelPosition}
          scale={[1, 1, 1]}
        />
      </ViroARPlaneSelector>
    </ViroARScene>
  );
}