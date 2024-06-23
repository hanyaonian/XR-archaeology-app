import { Routes } from "@/app/composable/routes";
import { AppBar, MainBody, NAVBAR_HEIGHT } from "@/components";
import { useAppTheme, AppTheme } from "@/providers/style_provider";
import { router, useLocalSearchParams } from "expo-router";
import _, { transform } from "lodash";
import { Image, ScrollView, StyleSheet, View } from "react-native";
import { Button, Text } from "react-native-paper";

export default function Page() {
  const { theme } = useAppTheme();
  const style = useStyle({ theme });
  const params = useLocalSearchParams<{ id?: string }>();
  const goToReconstruction = () => {
    router.replace({ pathname: Routes.ArTest, params: { id: params.id || 1 } });
  };

  return (
    <MainBody padding={{ top: 0 }}>
      <AppBar title="Reconstruction Guide" showBack />
      <ScrollView contentContainerStyle={{ flexGrow: 1, paddingBottom: NAVBAR_HEIGHT + theme.spacing.md }}>
        <Text style={{ fontSize: 24, padding: theme.spacing.md }}> Welcome! </Text>
        <Text style={style.text}>
          you will enter an AR-enhanced screen where a restored model of the wall will appear at the center of your camera view. To align the model
          with the ruins, adjust your phone's angle and use the slider located at the bottom left to control the distance of the wall. Once you've
          positioned it as close to the ruins as possible, simply tap the 'place it' button to lock the model in place.
        </Text>
        <Image source={require("@/assets/images/guide/step1.jpg")} style={style.image} />
        <Text style={style.text}>
          After fixing the model, you'll notice directional arrows appearing on both sides of the screen. The left arrows are for adjusting the
          position, while the right arrows control the rotation. Since the model is three-dimensional, you'll have the option to adjust it in three
          dimensions: x, y, and z.
        </Text>
        <Image source={require("@/assets/images/guide/step2.jpg")} style={style.image} />
        <Text style={style.text}>
          Experiment freely! Once you're satisfied with the restoration and believe it closely resembles the ancient wall, click on the 'screen shot'
          button located at the bottom right to capture a commemorative photo. Enjoy your experience!
        </Text>
        <View style={style.container}>
          <Button onPress={goToReconstruction}>Got it, Let's try</Button>
        </View>
      </ScrollView>
    </MainBody>
  );
}

const useStyle = ({ theme }: { theme: AppTheme }) =>
  StyleSheet.create({
    container: {
      flexDirection: "column",
      display: "flex",
      alignItems: "center",
      bottom: 20,
      width: "100%",
      position: "absolute",
    },
    image: {
      resizeMode: "contain",
      width: "100%",
      height: 200,
    },
    text: {
      lineHeight: 20,
      paddingHorizontal: theme.spacing.md,
    },
  });
