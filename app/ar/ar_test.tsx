import { useEffect, useState, createContext, useContext } from "react";
import { StyleSheet, View, Button, Text, ToastAndroid } from "react-native";
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
import { IconBtn, MainBody } from "@/components";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ChevronLeftIcon } from "@/components/icons";
import { router } from "expo-router";
import { ControlBar, Direction } from "@/components/arcontrol/position-bar";
import { Viro3DPoint, ViroRotation } from "@viro-community/react-viro/dist/components/Types/ViroUtils";
import { captureScreen } from "react-native-view-shot";
import * as ScreenOrientation from "expo-screen-orientation";
import * as MediaLibrary from "expo-media-library";
import Slider from "@react-native-community/slider";

type ModelStage = "lock" | "unlock" | "screenshot";

const RadioContext = createContext<{ radio: number; stage: ModelStage; setStage: (stage: ModelStage) => void } | null>(null);

function getWallDistance(radio: number) {
  const maxDistance = 300;
  const minDistance = 100;
  return maxDistance - radio * (maxDistance - minDistance);
}

function GuideScene() {
  const placeWall = () => {
    setHint("Justify it...");
  };

  const radioContext = useContext(RadioContext);
  if (!radioContext) {
    return null;
  }
  const { radio, stage } = radioContext;

  const initDistance = getWallDistance(radio);
  const [distance, setDistance] = useState(initDistance);
  const [lastforward, setForward] = useState([0, 0, 0]);

  useEffect(() => {
    if (stage !== "unlock") {
      const [x, y, z] = lastforward;
      setModelPosition([x * distance + 20, y * distance - 20, z * distance]);
    }
    setDistance(getWallDistance(radio));
  }, [radio]);

  const updateCameraPosition = (cameraTransform: ViroCameraTransform) => {
    if (stage !== "unlock") {
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
    const distance_unit = radio * 10;
    switch (direction) {
      case "down": {
        setModelPosition([x, y - distance_unit, z]);
        break;
      }
      case "up": {
        setModelPosition([x, y + distance_unit, z]);
        break;
      }
      case "right": {
        setModelPosition([x + distance_unit, y, z]);
        break;
      }
      case "left": {
        setModelPosition([x - distance_unit, y, z]);
        break;
      }
    }
  };

  const changeRotation = (params: { direction: Direction }) => {
    const [x, y, z] = modelRotation;
    const { direction } = params;
    const distance_unit = radio * 5;
    switch (direction) {
      case "down": {
        setModelRotation([x, y - distance_unit, z]);
        break;
      }
      case "up": {
        setModelRotation([x, y + distance_unit, z]);
        break;
      }
      case "right": {
        setModelRotation([x + distance_unit, y, z]);
        break;
      }
      case "left": {
        setModelRotation([x - distance_unit, y, z]);
        break;
      }
    }
  };

  const [hint, setHint] = useState<string>("Press to place the wall");
  const [modelRotation, setModelRotation] = useState<ViroRotation>([90, 65, 90]);
  const [modelPosition, setModelPosition] = useState<Viro3DPoint>([0, 0, -1 * distance]);

  return (
    <>
      <ViroARScene onCameraTransformUpdate={updateCameraPosition}>
        <ViroAmbientLight color="#ffffff" intensity={200} />
        <ViroARCamera>
          {stage !== "screenshot" && (
            <ViroText text={hint} position={[0, 0.1, -1]} scale={[0.4, 0.4, 0.4]} style={{ fontFamily: "Arial", color: "white" }} />
          )}
          {stage !== "lock" && stage !== "screenshot" && (
            <Viro3DObject
              source={require("@assets/models/wall/arrow.obj")}
              position={[0, 1, -10]}
              rotation={[90, 0, 90]}
              scale={[0.03, 0.03, 0.03]}
              type="OBJ"
              onClick={placeWall}
            />
          )}
          {stage !== "unlock" && stage !== "screenshot" && (
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
  const [status, requestPermission] = MediaLibrary.usePermissions();
  const [stage, setStage] = useState<ModelStage>("unlock");

  if (status === null) {
    requestPermission();
  }

  const screenShot = async () => {
    const previousState = stage;
    setStage("screenshot");
    await new Promise((resolve) => {
      setTimeout(() => {
        resolve(null);
      }, 100);
    });
    captureScreen({
      format: "jpg",
      quality: 0.8,
    })
      .then(
        (uri) => {
          MediaLibrary.saveToLibraryAsync(uri)
            .then(() => {
              ToastAndroid.show("save success!", ToastAndroid.SHORT);
            })
            .catch((err) => {
              console.error(uri);
              ToastAndroid.show("save failed!", ToastAndroid.SHORT);
            });
        },
        (error) => console.error("Oops, snapshot failed", error)
      )
      .finally(() => {
        setStage(previousState);
      });
  };

  const changeState = () => {
    if (stage === "lock") {
      setStage("unlock");
    } else {
      setStage("lock");
    }
  };

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
    <RadioContext.Provider value={{ radio, stage, setStage }}>
      <MainBody>
        <>
          {/* @ts-ignore */}
          <ViroARSceneNavigator initialScene={{ scene: GuideScene, passProps: { radio } }} />
          {stage !== "screenshot" && (
            <>
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
              <View style={style.buttonsArea}>
                <View style={style.buttons}>
                  <Button title={stage === "lock" ? "Reset" : "Place It!"} onPress={changeState} />
                  <Button title="Screenshot" onPress={screenShot} />
                </View>
              </View>
              <View
                style={{
                  left: 10,
                  bottom: 30,
                  position: "absolute",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  paddingHorizontal: theme.spacing.md,
                }}
              >
                <Text style={{ color: "white" }}>{`Distance: ${getWallDistance(radio).toFixed(2)} m`}</Text>
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
          )}
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
    buttonsArea: {
      position: "absolute",
      bottom: 30,
      right: 0,
      width: "50%",
      alignSelf: "center",
    },
    buttons: {
      padding: 10,
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
    },
  });
