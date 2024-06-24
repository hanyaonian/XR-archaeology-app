import { Button, Text } from "react-native-paper";
import { IconBtn, MainBody, NAVBAR_HEIGHT } from "@components";
import { View, StyleSheet, ImageBackground, useWindowDimensions, Pressable, ScrollView, Image } from "react-native";
import { useState } from "react";
import { AppTheme, useAppTheme } from "@providers/style_provider";
import { useAuth } from "@providers/auth_provider";
import { Link, router } from "expo-router";
import { Orientation, isPortrait, useOrientation } from "@/plugins/orientation";
import { Routes } from "@/app/composable/routes";

const DECORATE_BOX_HEIGHT = 124;

function Layout({ children, orientation }: { children?: JSX.Element | (JSX.Element | undefined | boolean)[]; orientation: Orientation }) {
  if (isPortrait(orientation)) {
    return children;
  } else {
    return <ScrollView contentContainerStyle={{ flexGrow: 1, paddingBottom: NAVBAR_HEIGHT }}>{children}</ScrollView>;
  }
}

export default function Home() {
  const { theme } = useAppTheme();
  const { width: screenWidth, height: screenHeight } = useWindowDimensions();
  const [topSectionHeight, setTopSectionHeight] = useState(0);

  const style = useStyle({ theme, screenWidth, screenHeight });

  const { user } = useAuth();
  const authenticated = !!user && !!user._id;
  const orientation = useOrientation();

  return (
    <MainBody>
      <Layout orientation={orientation}>
        <View
          style={{
            height: topSectionHeight,
            backgroundColor: theme.colors.container,
            top: DECORATE_BOX_HEIGHT - theme.spacing.lg,
            left: 0,
            right: 0,
            position: "absolute",
            elevation: 4,
          }}
        />
        <View style={style.appBarDecorateBox} />
        <View style={{
          flexDirection: "row",
          justifyContent: "space-between",
          paddingTop: theme.spacing.md,
          paddingBottom: theme.spacing.xs,
          paddingHorizontal: theme.spacing.lg
        }}>
          <Text variant="titleMedium" style={{ color: theme.colors.background }}>
            {`Welcome to \nthe Vedi River Valley!`}
          </Text>

        {__DEV__ && <IconBtn
          icon="createAR"
          iconProps={{ fill: theme.colors.text }}
          onPress={() => {
            router.push(Routes.ArEntry);
        }} />}
        </View>

        {/* Top Section */}
        <View
          onLayout={(e) => {
            const { height } = e.nativeEvent.layout;
            setTopSectionHeight(height);
          }}
          style={{
            flexDirection: "column",
            rowGap: theme.spacing.sm,
            paddingHorizontal: theme.spacing.lg,
            paddingBottom: theme.spacing.lg,
          }}
        >
          <Link href={Routes.History} asChild>
            <Pressable style={{ elevation: 12 }}>
              <ImageBackground source={require("@assets/images/vedi.jpg")} style={[style.thumbnail]} imageStyle={style.image}>
                <View style={{ bottom: theme.spacing.sm, left: theme.spacing.sm, position: "absolute" }}>
                  <Text variant="labelLarge" style={style.label}>
                    Explore the History
                  </Text>
                </View>
              </ImageBackground>
            </Pressable>
          </Link>

          <View style={{ columnGap: theme.spacing.md, rowGap: theme.spacing.sm, flexDirection: "row", flexWrap: "wrap" }}>
            <Link href={{ pathname: Routes.Attractions, params: { type: "Attraction" } }} asChild>
              <Pressable style={style.subThumbContainer}>
                <ImageBackground source={require("@assets/images/attraction.jpeg")} imageStyle={style.image}>
                  <View style={style.subThumb}>
                    <Text variant="labelLarge" style={[style.label, { top: theme.spacing.xxs, left: theme.spacing.xs, position: "absolute" }]}>
                      Attractions
                    </Text>
                  </View>
                </ImageBackground>
              </Pressable>
            </Link>
            <Link href={Routes.Hiking} asChild>
              <Pressable style={style.subThumbContainer}>
                <ImageBackground source={require("@assets/images/hiking.jpeg")} imageStyle={style.image}>
                  <View style={style.subThumb}>
                    <Text variant="labelLarge" style={[style.label, { top: theme.spacing.xxs, right: theme.spacing.xs, position: "absolute" }]}>
                      Hiking
                    </Text>
                  </View>
                </ImageBackground>
              </Pressable>
            </Link>
            <Link href={Routes.Living} asChild>
              <Pressable style={style.subThumbContainer}>
                <ImageBackground source={require("@assets/images/food.jpg")} imageStyle={style.image}>
                  <View style={style.subThumb}>
                    <Text variant="labelLarge" style={[style.label, { left: theme.spacing.xxs, bottom: theme.spacing.xs, position: "absolute" }]}>
                    Food & Lodging
                    </Text>
                  </View>
                </ImageBackground>
              </Pressable>
            </Link>
            <Link href={Routes.Events} asChild>
              <Pressable style={style.subThumbContainer}>
                <ImageBackground source={require("@assets/images/events.jpg")} imageStyle={style.image}>
                  <View style={style.subThumb}>
                    <Text variant="labelLarge" style={[style.label, { bottom: theme.spacing.xxs, right: theme.spacing.xs, position: "absolute" }]}>
                      Events
                    </Text>
                  </View>
                </ImageBackground>
              </Pressable>
            </Link>
          </View>
        </View>
        {/* Login / Favorite Place*/}
        <View
          style={{
            paddingHorizontal: theme.spacing.lg,
            marginVertical: theme.spacing.lg,
            flexDirection: "column",
            gap: theme.spacing.sm,
            flexGrow: 1,
            flexShrink: 0,
          }}
        >
          {!authenticated ? (
            <View style={{ flexDirection: "column", gap: theme.spacing.sm }}>
              <Text variant="bodyMedium" style={{ color: theme.colors.grey3 }}>
                Please login or create an account for more information.
              </Text>
              <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                <Button
                  textColor={theme.colors.textOnPrimary}
                  mode="contained"
                  style={{ borderRadius: theme.spacing.xs }}
                  onPress={() => router.push(Routes.Login)}
                >
                  Login
                </Button>
                <Button
                  mode="outlined"
                  style={{ borderRadius: theme.spacing.xs, borderColor: theme.colors.primary, borderWidth: 2 }}
                  onPress={() => router.push(Routes.Register)}
                >
                  Sign up
                </Button>
              </View>
            </View>
          ) : (
            <Button mode="contained" style={{ width: "100%", borderRadius: theme.spacing.xs }}>
              <Text variant="labelLarge" style={{ color: theme.colors.textOnPrimary }}>
                Your Favorite Places
              </Text>
            </Button>
          )}
          <View style={style.divider} />
        </View>

        {/* Map */}
        {/* <View
          style={[
            { flexGrow: 0, flexShrink: 1 },
            ...[isPortrait(orientation) ? {} : { minHeight: Math.round(MAP_IMG_HEIGHT * (screenWidth / MAP_IMG_WIDTH)) }],
          ]}
        >
          <Pressable onPress={() => router.replace({ pathname: Routes.Map, params: { latitude: vedi_point.latitude, longitude: vedi_point.longitude } })}>
            <Image source={require("@assets/images/vedi_map.jpeg")} style={{ width: "100%", height: "100%" }} />
          </Pressable>
          <View style={{ position: "absolute", top: theme.spacing.md, right: theme.spacing.sm }}>
            <Text variant="titleMedium" style={style.mapLabel}>
              Map of Valley
            </Text>
          </View>
        </View> */}
      </Layout>
    </MainBody>
  );
}

const useStyle = ({ theme, screenWidth, screenHeight }: { theme: AppTheme; screenWidth: number, screenHeight: number }) =>
  StyleSheet.create({
    appBarDecorateBox: {
      backgroundColor: theme.colors.primary,
      borderBottomRightRadius: theme.borderRadius.lg,
      borderBottomLeftRadius: theme.borderRadius.lg,
      position: "absolute",
      height: DECORATE_BOX_HEIGHT,
      top: 0,
      left: 0,
      right: 0,
    },
    thumbnail: {
      height: Math.round((screenWidth - theme.spacing.lg * 2) * 0.42),
      borderRadius: theme.spacing.xs,
      width: "100%",
      overflow: "hidden",
    },
    subThumbContainer: {
      borderRadius: theme.spacing.xs,
      overflow: "hidden",
      height: Math.round((((screenHeight - theme.spacing.lg * 2 - theme.spacing.md) / 2) * 3) / 9),
      width: Math.round((screenWidth - theme.spacing.lg * 2 - theme.spacing.md) / 2 - 1),
      position: "relative",
      elevation: 8,
    },
    subThumb: {
      width: "100%",
      height: "100%",
      position: "relative",
    },
    image: {
      width: "100%",
      height: "100%",
      resizeMode: "cover",
    },
    label: {
      color: theme.colors.white,
      textShadowColor: theme.colors.shadow,
    },
    mapContainer: {
      overflow: "hidden",
    },
    fill: {
      width: "100%",
      height: "100%",
    },
    divider: {
      height: 1,
      width: "100%",
      backgroundColor: theme.colors.grey4,
    },
    mapLabel: {
      color: "white",
      textShadowColor: "black",
      textShadowRadius: 8,
      elevation: 8,
    },
  });
