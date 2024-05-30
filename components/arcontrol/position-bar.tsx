import { Viro3DObject } from "@viro-community/react-viro";
import { Viro3DPoint, ViroRotation, ViroScale } from "@viro-community/react-viro/dist/components/Types/ViroUtils";

export type Direction = 'left' | 'right' | 'up' | 'down';

function getPosition(base: Viro3DPoint, type: Direction):Viro3DPoint  {
  const gap = 0.5;
  const [ x, y, z ] = base;
  switch (type) {
    case 'down': {
      return [x, y - gap, z]
    }
    case 'up': {
      return [x, y + gap, z]
    }
    case 'right': {
      return [x + gap, y, z]
    }
    case 'left': {
      return [x - gap, y, z]
    }
    default: return base;
  }
}

export function ControlBar(props: {
  type: "rotation" | "position";
  change: (params: { direction: Direction }) => void;
}) {
  const { change, type } = props;
  const scale = [0.02, 0.02, 0.02] as ViroScale;
  const rotations = {
    down: [90, 0, 90],
    up: [90, 0, 180],
    right: [90, 0, -90],
    left: [90, 0, 0],
  } as Record<Direction, ViroRotation>;
  const basePosition: Viro3DPoint = type === 'position' ? [-4, -1, -10] : [4, -1, -10];
  const startTouch = (touchState: any, touchPos: Viro3DPoint) => {
    console.warn(touchState, touchPos);
  }
  return (
    <>
      {/* down */}
      <Viro3DObject
        source={require("@assets/models/wall/arrow.obj")}
        position={getPosition(basePosition, 'down')}
        rotation={rotations.down}
        scale={scale}
        type="OBJ"
        onClick={() => change({ direction: 'down' })}
        onHover={startTouch}
      />
      {/* left */}
      <Viro3DObject
        source={require("@assets/models/wall/arrow.obj")}
        position={getPosition(basePosition, 'left')}
        rotation={rotations.left}
        scale={scale}
        type="OBJ"
        onClick={() => change({ direction: 'left' })}
        onHover={startTouch}
      />
      {/* right */}
      <Viro3DObject
        source={require("@assets/models/wall/arrow.obj")}
        position={getPosition(basePosition, 'right')}
        rotation={rotations.up}
        scale={scale}
        type="OBJ"
        onClick={() => change({ direction: 'right' })}
        onHover={startTouch}
      />
      {/* up */}
      <Viro3DObject
        source={require("@assets/models/wall/arrow.obj")}
        position={getPosition(basePosition, 'up')}
        rotation={rotations.right}
        scale={scale}
        type="OBJ"
        onClick={() => change({ direction: 'up' })}
        onHover={startTouch}
      />
    </>
  );
}
