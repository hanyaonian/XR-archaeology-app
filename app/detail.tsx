import { Text } from "react-native-paper";
import { useAppTheme } from "../styles";
import MainBody from "../components/main_body";
import { View, StyleSheet, ScrollView } from "react-native";
import { useMemo, useRef, useState } from "react";
import BookmarkOutlineIcon from "../assets/icons/bookmark-outline.svg";
import BookmarkIcon from "../assets/icons/bookmark.svg";
import ChevronLeftIcon from "../assets/icons/chevron-left.svg";
import ShareIcon from "../assets/icons/share.svg";
import CreateARIcon from "../assets/icons/create-ar.svg";
import { Artifact } from "models/artifact";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import { router, useLocalSearchParams } from "expo-router";
import IconBtn from "../components/icon_btn";
import ModelView from "../components/model_view";
import ModelViewer from "../components/model_viewer";
import BottomSheet, { BottomSheetScrollView, BottomSheetScrollViewMethods, BottomSheetView } from "@gorhom/bottom-sheet";
import AudioPlayer from "../components/audio_player";

export default function DetailPage() {
  const theme = useAppTheme();
  const params = useLocalSearchParams<{ id?: string }>();
  const [bookmarked, setBookmarked] = useState(false);
  // ref
  const bottomSheetRef = useRef<BottomSheet>(null);
  const bottomSheetScrollRef = useRef<BottomSheetScrollViewMethods | null>(null);

  // variables
  const snapPoints = useMemo(() => ["50%", "85%"], []);
  // TODO: load item by id
  return (
    <MainBody backgroundColor={theme.colors.gradientBackground} padding={{ left: theme.spacing.md, right: theme.spacing.md }}>
      <>
        <View style={[_style.rowLayout, { justifyContent: "space-between" }]}>
          <IconBtn icon={<ChevronLeftIcon fill={theme.colors.grey1} />} onPress={() => router.back()} />
          <View style={[_style.rowLayout, { gap: theme.spacing.sm }]}>
            <IconBtn icon={<ShareIcon fill={theme.colors.grey1} />} onPress={() => {}} />
            <IconBtn
              icon={bookmarked ? <BookmarkIcon fill={theme.colors.grey1} /> : <BookmarkOutlineIcon fill={theme.colors.grey1} />}
              onPress={() => setBookmarked(!bookmarked)}
            />
            <IconBtn icon={<CreateARIcon fill={theme.colors.grey1} />} onPress={() => {}} />
          </View>
        </View>

        <ModelViewer style={{ flex: 1 / 2 }} />
        <BottomSheet
          ref={bottomSheetRef}
          snapPoints={snapPoints}
          backgroundStyle={[{ backgroundColor: theme.colors.container, marginHorizontal: theme.spacing.md }, _style.bottomSheetShadow]}
        >
          <View style={[_style.columnLayout, { flex: 0, marginTop: theme.spacing.md }]}>
            <Text variant="headlineSmall" style={{ marginBottom: theme.spacing.sm }}>
              Arrow head
            </Text>
            <View style={_style.rowLayout}>
              <Text variant="bodyMedium" style={{ color: theme.colors.tertiary, textAlign: "center" }}>
                Early Medieval Times (559-646 C.E.)
              </Text>
            </View>
            <AudioPlayer soundUri={require("../assets/audio/arrowhead.mp3")} />
          </View>
          <BottomSheetScrollView ref={bottomSheetScrollRef} showsVerticalScrollIndicator={false}>
            <View
              style={{ flex: 1, overflow: "hidden", flexDirection: "column", paddingHorizontal: theme.spacing.xl, paddingBottom: theme.spacing.xl }}
            >
              <Text variant="bodyMedium" style={{ marginTop: theme.spacing.lg * 2 }}>
                The arrow head is made of stone and dates back to Early Medieval Times. It is found in the citadel-east trench, N.38.478200.4419510.
                The treach sits at the eastern edge of the citadal and is bisected by a single Early Medieval retaining wall. This seems to have been
                a terrace or retaining wall to support building further up into the citadel and perhaps it also served to defend this approach from
                the lower east shelf.
              </Text>
              <Text variant="bodyMedium" style={{ marginTop: theme.spacing.lg * 2 }}>
                The arrow head is made of stone and dates back to Early Medieval Times. It is found in the citadel-east trench, N.38.478200.4419510.
                The treach sits at the eastern edge of the citadal and is bisected by a single Early Medieval retaining wall. This seems to have been
                a terrace or retaining wall to support building further up into the citadel and perhaps it also served to defend this approach from
                the lower east shelf.
              </Text>
              <Text variant="bodyMedium" style={{ marginTop: theme.spacing.lg * 2 }}>
                The arrow head is made of stone and dates back to Early Medieval Times. It is found in the citadel-east trench, N.38.478200.4419510.
                The treach sits at the eastern edge of the citadal and is bisected by a single Early Medieval retaining wall. This seems to have been
                a terrace or retaining wall to support building further up into the citadel and perhaps it also served to defend this approach from
                the lower east shelf.
              </Text>
              <Text variant="bodyMedium" style={{ marginTop: theme.spacing.lg * 2 }}>
                The arrow head is made of stone and dates back to Early Medieval Times. It is found in the citadel-east trench, N.38.478200.4419510.
                The treach sits at the eastern edge of the citadal and is bisected by a single Early Medieval retaining wall. This seems to have been
                a terrace or retaining wall to support building further up into the citadel and perhaps it also served to defend this approach from
                the lower east shelf.
              </Text>
            </View>
          </BottomSheetScrollView>
        </BottomSheet>
      </>
    </MainBody>
  );
}

const _style = StyleSheet.create({
  gradient: {
    flex: 1,
    justifyContent: "center",
  },
  rowLayout: {
    flexDirection: "row",
    alignItems: "center",
    flexShrink: 0,
  },
  columnLayout: {
    flex: 1,
    flexDirection: "column",
    alignContent: "flex-start",
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
    overflow: "hidden",
  },
  bottomSheetShadow: {
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: -32 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
  },
});
