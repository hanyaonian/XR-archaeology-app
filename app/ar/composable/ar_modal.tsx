import { useState } from "react";
import { View, Modal, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { ARInfo } from "./ar";
import { Routes } from "@/app/composable/routes";
import { router } from "expo-router";
import { Button } from "react-native-paper";
import { useAppTheme } from "@/providers/style_provider";

export const useReconstructionModal = () => {
  const { theme } = useAppTheme();
  const [modalVisible, setModalVisible] = useState(false);
  const [ar_info, setArInfo] = useState<ARInfo>();
  const showModal = (params: { info: ARInfo }) => {
    const { info } = params;
    setArInfo(info);
    setModalVisible(true);
  };

  const hideModal = () => {
    setModalVisible(false);
  };

  const ReconstructionModal = () => {
    const handleClose = () => {
      setModalVisible(false);
    };
    const gotoReconstructionGuide = () => {
      setModalVisible(false);
      if (ar_info) {
        router.replace({ pathname: Routes.ArGuide, params: { id: ar_info.id } });
      }
    };
    const M = () => {
      return (
        <Modal animationType="slide" transparent={false} visible={modalVisible}>
          <View style={styles.modalContainer}>
            <Text
              style={styles.modalText}
            >{`You are near to \n \n ${ar_info?.name} \n \n Do you want to try the reconstruction function with AR?`}</Text>
            {ar_info?.images?.[0] && <Image source={ar_info?.images?.[0]} style={styles.modalImage} />}
            <Button
              style={styles.modalButton}
              mode="contained"
              buttonColor={theme.colors.primary}
              labelStyle={{ marginHorizontal: theme.spacing.lg, marginVertical: theme.spacing.sm }}
              onPress={gotoReconstructionGuide}
            >
              <Text style={styles.modalButtonText}>Let's See!</Text>
            </Button>
            <Button
              style={styles.modalButton}
              mode="contained"
              buttonColor={theme.colors.error}
              labelStyle={{ marginHorizontal: theme.spacing.lg, marginVertical: theme.spacing.sm }}
              onPress={handleClose}
            >
              <Text style={styles.modalButtonText}>Not interest</Text>
            </Button>
          </View>
        </Modal>
      );
    };

    return modalVisible ? <M></M> : <></>;
  };

  return {
    modalVisible,
    showModal,
    hideModal,
    Modal: ReconstructionModal,
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
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
