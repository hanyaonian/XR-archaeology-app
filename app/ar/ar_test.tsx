import { useEffect, useState } from "react";
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
import { DirectButtons, Direction } from "@/components/arcontrol/native-buttons";
// import { ControlBar, Direction } from "@/components/arcontrol/position-bar";
import { captureScreen } from "react-native-view-shot";
import * as ScreenOrientation from "expo-screen-orientation";
import * as MediaLibrary from "expo-media-library";
import Slider from "@react-native-community/slider";
import { useArModelStore } from "./state/position";
import { toJS } from "mobx";
import { observer } from "mobx-react-lite";

const GuideScene = observer(() => {
  const [lastforward, setForward] = useState([0, 0, 0]);
  const ModelStore = useArModelStore();

  useEffect(() => {
    if (ModelStore.stage !== "unlock") {
      const [x, y, z] = lastforward;
      ModelStore.setModelPosition([x * ModelStore.distance + 20, y * ModelStore.distance - 20, z * ModelStore.distance]);
    }
  }, [ModelStore.radio]);

  const updateCameraPosition = (cameraTransform: ViroCameraTransform) => {
    if (ModelStore.stage !== "unlock") {
      return;
    }
    const { forward, rotation } = cameraTransform;
    const [x, y, z] = forward;
    const [rx, ry, rz] = rotation;
    setForward(forward);
    ModelStore.setModelPosition([x * ModelStore.distance + 20, y * ModelStore.distance - 20, z * ModelStore.distance]);
  };

  return (
    <>
      <ViroARScene onCameraTransformUpdate={updateCameraPosition}>
        <ViroAmbientLight color="#ffffff" intensity={200} />
        <ViroARCamera>
          {ModelStore.stage === "unlock" && (
            <ViroText
              text="Press to place the wall"
              position={[0, 0.1, -1]}
              scale={[0.4, 0.4, 0.4]}
              style={{ fontFamily: "Arial", color: "white" }}
            />
          )}
          {ModelStore.stage === "unlock" && (
            <Viro3DObject
              source={require("@assets/models/wall/arrow.obj")}
              position={[0, 1, -10]}
              rotation={[90, 0, 90]}
              scale={[0.03, 0.03, 0.03]}
              type="OBJ"
            />
          )}
        </ViroARCamera>
        <Viro3DObject
          source={require("@assets/models/wall/wall2.glb")}
          rotation={toJS(ModelStore.rotation)}
          position={toJS(ModelStore.position)}
          scale={[1, 1, 1]}
          type="GLB"
        />
      </ViroARScene>
    </>
  );
});

const ARTest = observer(() => {
  const { theme } = useAppTheme();
  const { top } = useSafeAreaInsets();
  const style = useStyle();
  const ModelStore = useArModelStore();
  const [status, requestPermission] = MediaLibrary.usePermissions();

  if (status === null) {
    requestPermission();
  }

  const changeRotation = (params: { direction: Direction }) => {
    const [x, y, z] = ModelStore.rotation;
    const { direction } = params;
    const distance_unit = ModelStore.radio * 5;
    switch (direction) {
      case "down": {
        ModelStore.setModelRotation([x, y - distance_unit, z]);
        break;
      }
      case "up": {
        ModelStore.setModelRotation([x, y + distance_unit, z]);
        break;
      }
      case "right": {
        ModelStore.setModelRotation([x + distance_unit, y, z]);
        break;
      }
      case "left": {
        ModelStore.setModelRotation([x - distance_unit, y, z]);
        break;
      }
    }
  };

  const changePosition = (params: { direction: Direction }) => {
    const [x, y, z] = ModelStore.position;
    const { direction } = params;
    const distance_unit = ModelStore.radio * 10;
    switch (direction) {
      case "down": {
        ModelStore.setModelPosition([x, y - distance_unit, z]);
        break;
      }
      case "up": {
        ModelStore.setModelPosition([x, y + distance_unit, z]);
        break;
      }
      case "right": {
        ModelStore.setModelPosition([x + distance_unit, y, z]);
        break;
      }
      case "left": {
        ModelStore.setModelPosition([x - distance_unit, y, z]);
        break;
      }
    }
  };

  const screenShot = async () => {
    const previousState = ModelStore.stage;
    ModelStore.setStage("screenshot");
    await new Promise((resolve) => {
      setTimeout(() => {
        resolve(null);
      }, 100);
    });
    captureScreen({
      format: "jpg",
      quality: 0.8,
      handleGLSurfaceViewOnAndroid: true,
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
        ModelStore.setStage(previousState);
      });
  };

  const changeState = () => {
    if (ModelStore.stage === "lock") {
      ModelStore.setStage("unlock");
    } else {
      ModelStore.setStage("lock");
    }
  };

  useEffect(() => {
    ModelStore.reset();
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
    <MainBody>
      <>
        {/* @ts-ignore */}
        <ViroARSceneNavigator initialScene={{ scene: GuideScene }} />
        {ModelStore.stage !== "screenshot" && (
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
                <Button title={ModelStore.stage === "lock" ? "Reset" : "Place It!"} onPress={changeState} />
                <Button title="Screenshot" onPress={screenShot} />
              </View>
            </View>
            <View style={style.controls}>
              {ModelStore.stage === "lock" && (
                <>
                  <DirectButtons type="position" change={changePosition} />
                  <DirectButtons type="rotation" change={changeRotation} />
                </>
              )}
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
              <Text style={{ color: "white" }}>{`Distance: ${ModelStore.distance.toFixed(2)} m`}</Text>
              <Slider
                style={{
                  width: 300,
                  height: 30,
                }}
                value={ModelStore.radio}
                minimumValue={0}
                maximumValue={1}
                minimumTrackTintColor="#FFFFFF"
                maximumTrackTintColor="#000000"
                onValueChange={(val) => {
                  ModelStore.setRadio(val);
                }}
              />
            </View>
          </>
        )}
      </>
    </MainBody>
  );
});

export default ARTest;

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
    controls: {
      position: "absolute",
      bottom: "50%",
      left: "-25%",
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-evenly",
    },
    buttons: {
      padding: 10,
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
    },
  });
