import { Routes } from "@/app/composable/routes";
import { AppBar, ListItem, MainBody, NAVBAR_HEIGHT } from "@/components";
import { AppTheme, useAppTheme } from "@/providers/style_provider";
import _ from "lodash";
import { ScrollView, StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
import { WALL_INFOS } from "./fixed-things/ar";

export default function Page() {
  const { theme } = useAppTheme();
  const style = useStyle({ theme });
  const walls = WALL_INFOS.map((point) => {
    return { ...point, href: { pathname: Routes.ArTest, params: { id: point.id } } };
  });

  return (
    <MainBody padding={{ top: 0 }}>
      <AppBar title="Virtual reconstruction" showBack />
      <ScrollView contentContainerStyle={{ flexGrow: 1, paddingBottom: NAVBAR_HEIGHT + theme.spacing.md }}>
        <View style={style.sectionHeader}></View>
        <Text variant="bodyMedium" style={style.sectionDesc}>
          another description
        </Text>
        <View style={style.list}>
          {walls.map((item, index) => {
            return <ListItem {...item} key={index} />;
          })}
        </View>
      </ScrollView>
    </MainBody>
  );
}

const useStyle = ({ theme }: { theme: AppTheme }) =>
  StyleSheet.create({
    sectionHeader: {
      paddingLeft: theme.spacing.lg,
      paddingRight: theme.spacing.xs,
      paddingVertical: theme.spacing.xs,
      flexDirection: "row",
      alignContent: "center",
      justifyContent: "space-between",
    },
    title: {
      textAlignVertical: "center",
    },
    sectionDesc: {
      paddingHorizontal: theme.spacing.lg,
      paddingVertical: theme.spacing.xxs,
      color: theme.colors.text,
    },
    list: {
      flexDirection: "column",
      marginVertical: theme.spacing.md,
      gap: theme.spacing.xs,
    },
  });
