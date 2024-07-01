import { Button, Text } from "react-native-paper";
import { ARInfo } from "../fixed-things/ar";
import { Image, StyleSheet, View } from "react-native";
import { useAppTheme } from "@/providers/style_provider";
import { router } from "expo-router";
import { Routes } from "@/app/composable/routes";

export function ReconstructionModalBody(props: {
  ar_info: ARInfo,
  close: () => void,
}) {
  const { theme } = useAppTheme();
  const style = useStyle();
  const { ar_info, close } = props;

  const handleClose = () => {
    close();
  };
  const gotoReconstructionGuide = () => {
    close();
    if (ar_info) {
      router.replace({ pathname: Routes.ArGuide, params: { id: ar_info.id } });
    }
  };

  return (
    <View style={style.modalContainer}>
      <Text style={style.modalText}>{`You are near to \n \n ${ar_info?.name} \n \n Do you want to try the reconstruction function with AR?`}</Text>
      {ar_info?.images?.[0] && <Image source={ar_info?.images?.[0]} style={style.modalImage} />}
      <Button
        style={style.modalButton}
        mode="contained"
        buttonColor={theme.colors.primary}
        labelStyle={{ marginHorizontal: theme.spacing.lg, marginVertical: theme.spacing.sm }}
        onPress={gotoReconstructionGuide}
      >
        <Text style={style.modalButtonText}>Let's See!</Text>
      </Button>
      <Button
        style={style.modalButton}
        mode="contained"
        buttonColor={theme.colors.error}
        labelStyle={{ marginHorizontal: theme.spacing.lg, marginVertical: theme.spacing.sm }}
        onPress={handleClose}
      >
        <Text style={style.modalButtonText}>Not interest</Text>
      </Button>
    </View>
  );
}

const useStyle = () =>
  StyleSheet.create({
    modalContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      padding: 20,
      backgroundColor: "white",
    },
    modalText: {
      textAlign: "center",
      marginBottom: 20,
      fontSize: 16,
    },
    modalImage: {
      resizeMode: "cover",
      width: "100%",
      height: 200,
    },
    modalButton: {
      marginTop: 20,
    },
    modalButtonText: {
      color: "white",
      textAlign: "center",
    },
  });
