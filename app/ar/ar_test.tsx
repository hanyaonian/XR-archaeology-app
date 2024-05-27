import { useEffect, useState, createContext, useContext } from "react";
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
import { ControlBar, Direction } from "./bar";
import { Viro3DPoint, ViroRotation } from "@viro-community/react-viro/dist/components/Types/ViroUtils";
import Slider from "@react-native-community/slider";

const RadioContext = createContext<{ radio: number } | null>(null);

function GuideScene() {
  const placeWall = () => {
    setLock(true);
    setHint("Justify it...");
  };

  const radioContext = useContext(RadioContext);
  if (!radioContext) {
    return null;
  }
  const { radio } = radioContext;
  const maxDistance = 300;
  const minDistance = 100;
  const initDistance = maxDistance - radio * (maxDistance - minDistance);
  const [distance, setDistance] = useState(initDistance);
  const [lastforward, setForward] = useState([0, 0, 0]);

  useEffect(() => {
    if (lock) {
      const [x, y, z] = lastforward;
      setModelPosition([x * distance + 20, y * distance - 20, z * distance]);
    }
    setDistance(maxDistance - radio * (maxDistance - minDistance));
  }, [radio]);

  const updateCameraPosition = (cameraTransform: ViroCameraTransform) => {
    if (lock) {
      return;
    }
    const { forward, rotation } = cameraTransform;
    const [x, y, z] = forward;
    const [rx, ry, rz] = rotation;
    setForward(forward);
    setModelPosition([x * distance + 20, y * distance - 20, z * distance]);
  };

  const changePosition = (params: { direction: Direction }) => {
    const [x, y, z] = modelPosition;
    const { direction } = params;
    switch (direction) {
      case "down": {
        setModelPosition([x, y - 1, z]);
        break;
      }
      case "up": {
        setModelPosition([x, y + 1, z]);
        break;
      }
      case "right": {
        setModelPosition([x + 1, y, z]);
        break;
      }
      case "left": {
        setModelPosition([x - 1, y, z]);
        break;
      }
    }
  };

  const changeRotation = (params: { direction: Direction }) => {
    const [x, y, z] = modelRotation;
    const { direction } = params;
    switch (direction) {
      case "down": {
        setModelRotation([x, y - 1, z]);
        break;
      }
      case "up": {
        setModelRotation([x, y + 1, z]);
        break;
      }
      case "right": {
        setModelRotation([x + 1, y, z]);
        break;
      }
      case "left": {
        setModelRotation([x - 1, y, z]);
        break;
      }
    }
  };

  const [hint, setHint] = useState<string>("Press to place the wall");
  const [lock, setLock] = useState<boolean>(false);
  const [modelRotation, setModelRotation] = useState<ViroRotation>([90, 65, 90]);
  const [modelPosition, setModelPosition] = useState<Viro3DPoint>([0, 0, -1 * distance]);

  return (
    <>
      <ViroARScene onCameraTransformUpdate={updateCameraPosition}>
        <ViroAmbientLight color="#ffffff" intensity={200} />
        <ViroARCamera>
          <ViroText text={hint} position={[0, 0.1, -1]} scale={[0.4, 0.4, 0.4]} style={{ fontFamily: "Arial", color: "white" }} />
          {!lock && (
            <Viro3DObject
              source={require("@assets/models/wall/arrow.obj")}
              position={[0, 1, -10]}
              rotation={[90, 0, 90]}
              scale={[0.03, 0.03, 0.03]}
              type="OBJ"
              onClick={placeWall}
            />
          )}
          {lock && (
            <>
              <ControlBar type="position" change={changePosition} />
              <ControlBar type="rotation" change={changeRotation} />
            </>
          )}
        </ViroARCamera>
        <Viro3DObject
          source={require("@assets/models/wall/wall2.glb")}
          rotation={modelRotation}
          scale={[1, 1, 1]}
          position={modelPosition}
          type="GLB"
        />
      </ViroARScene>
    </>
  );
}

export default function ARTest() {
  const [radio, setRadio] = useState(0.5);
  const { theme } = useAppTheme();
  const { top } = useSafeAreaInsets();
  const style = useStyle();

  useEffect(() => {
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE_RIGHT);
    return () => {
      setTimeout(async () => {
        const curOrientation = await ScreenOrientation.getOrientationAsync();
        if (curOrientation !== ScreenOrientation.Orientation.PORTRAIT_UP) {
          ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
        }
      }, 1000);
    };
  }, []);
  // @ts-ignore

  return (
    <RadioContext.Provider value={{ radio }}>
      <MainBody>
        <>
          {/* @ts-ignore */}
          <ViroARSceneNavigator initialScene={{ scene: GuideScene, passProps: { radio } }} />
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
          <View
            style={{
              left: 30,
              bottom: 30,
              position: "absolute",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              paddingHorizontal: theme.spacing.md,
            }}
          >
            <Slider
              style={{
                width: 300,
                height: 30,
              }}
              value={radio}
              minimumValue={0}
              maximumValue={1}
              minimumTrackTintColor="#FFFFFF"
              maximumTrackTintColor="#000000"
              onValueChange={(val) => {
                setRadio(val);
              }}
            />
          </View>
        </>
      </MainBody>
    </RadioContext.Provider>
  );
}

const useStyle = () =>
  StyleSheet.create({
    rowLayout: {
      flexDirection: "row",
      alignItems: "center",
      flexShrink: 0,
    },
  });
