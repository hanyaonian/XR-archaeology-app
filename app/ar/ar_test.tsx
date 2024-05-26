import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import {
  ViroARScene,
  ViroAmbientLight,
  ViroARSceneNavigator,
  ViroText,
  Viro3DObject,
  ViroARCamera,
  ViroCameraTransform,
} from "@viro-community/react-viro";
import { useAppTheme } from "@providers/style_provider";
import * as ScreenOrientation from "expo-screen-orientation";
import { IconBtn, MainBody } from "@/components";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ChevronLeftIcon } from "@/components/icons";
import { router } from "expo-router";
import { ControlBar, Direction } from './bar';
import { Viro3DPoint, ViroRotation } from "@viro-community/react-viro/dist/components/Types/ViroUtils";

const DISTANCE = 100;

function GuideScene() {
  const placeWall = () => {
    setLock(true);
    setHint('Justify it...');
  };

  const updateCameraPosition = (cameraTransform: ViroCameraTransform) => {
    if (lock) {
      return;
    }
    const { forward, rotation } = cameraTransform;
    const [ x, y, z ] = forward;
    const [ rx, ry, rz ] = rotation;
    setModelPosition([x * DISTANCE, y* DISTANCE - 10 , z* DISTANCE])
  }

  const  changePosition = (params:{ direction: Direction }) => {
    const [x, y, z] = modelPosition;
    const { direction } = params;
    switch (direction) {
      case 'down': {
        setModelPosition([x, y - 1, z]);
        break;
      }
      case 'up': {
        setModelPosition([x, y + 1, z]);
        break;
      }
      case 'right': {
        setModelPosition([x + 1, y , z]);
        break;
      }
      case 'left': {
        setModelPosition([x - 1, y, z]);
        break;
      }
    }
  }

  const changeRotation = (params:{ direction: Direction }) => {
    const [x, y, z] = modelRotation;
    const { direction } = params;
    switch (direction) {
      case 'down': {
        setModelRotation([x, y - 1, z]);
        break;
      }
      case 'up': {
        setModelRotation([x, y + 1, z]);
        break;
      }
      case 'right': {
        setModelRotation([x + 1, y , z]);
        break;
      }
      case 'left': {
        setModelRotation([x - 1, y, z]);
        break;
      }
    }
  }

  const [hint, setHint] = useState<string>('Press to place the wall');
  const [lock, setLock] = useState<boolean>(false);
  const [modelRotation, setModelRotation ] = useState<ViroRotation>([90, 65, 90]);
  const [modelPosition, setModelPosition] = useState<Viro3DPoint>([0, 0, -1 * DISTANCE]);


  return (
    <>
      <ViroARScene onCameraTransformUpdate={updateCameraPosition}>
        <ViroAmbientLight color="#ffffff" intensity={200} />
        <ViroARCamera>
          <ViroText text={hint} position={[0, 0.1, -1]} scale={[0.4, 0.4, 0.4]} style={{ fontFamily: "Arial", color: "white" }} />
          {!lock && <Viro3DObject
            source={require("@assets/models/wall/arrow.obj")}
            position={[0, 1, -10]}
            rotation={[90, 0, 90]}
            scale={[0.03, 0.03, 0.03]}
            type="OBJ"
            onClick={placeWall}
          />}
          { lock && <>
            <ControlBar type='position' change={changePosition} />
            <ControlBar type='rotation' change={changeRotation} />
            </>
          }
        </ViroARCamera>
        <Viro3DObject
          source={require("@assets/models/wall/wall1.glb")}
          rotation={modelRotation}
          scale={[0.4, 0.4, 0.4]}
          position={modelPosition}
          type="GLB"
        />
      </ViroARScene>
    </>
  );
}

export default function ARTest() {
  const useStyle = () =>
    StyleSheet.create({
      rowLayout: {
        flexDirection: "row",
        alignItems: "center",
        flexShrink: 0,
      },
    });

  const { theme } = useAppTheme();
  const { top } = useSafeAreaInsets();
  const style = useStyle();

  useEffect(() => {
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE_LEFT);

    return () => {
      ScreenOrientation.unlockAsync().then(() => {
        setTimeout(async () => {
          const curOrientation = await ScreenOrientation.getOrientationAsync();
          if (curOrientation !== ScreenOrientation.Orientation.PORTRAIT_UP) {
            ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
          }
        }, 1000);
      });
    };
  }, []);
  // @ts-ignore

  return (
    <MainBody>
      <>
        {/* @ts-ignore */}
        <ViroARSceneNavigator initialScene={{ scene: GuideScene }} />
        <View
          style={[
            style.rowLayout,
            {
              justifyContent: "space-between",
              position: "absolute",
              top: top + theme.spacing.xs,
              left: 0,
              right: 0,
              paddingHorizontal: theme.spacing.md,
            },
          ]}
        >
          <IconBtn icon={<ChevronLeftIcon fill={theme.colors.grey1} />} onPress={() => router.back()} />
        </View>
      </>
    </MainBody>
  );
}
