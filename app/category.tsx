import { Text } from "react-native-paper";
import { useAppTheme } from "../styles";
import MainBody from "../components/main_body";
import { View, ScrollView, StyleSheet } from "react-native";
import ChevronLeftIcon from "../assets/icons/chevron-left.svg";
import SortIcon from "../assets/icons/sort.svg";
import { Artifact } from "models/artifact";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import { router, useLocalSearchParams } from "expo-router";
import { ItemCard } from "../components/item_card";

export default function CategoryPage() {
  const theme = useAppTheme();
  const params = useLocalSearchParams<{ cat?: string }>();

  // for dev use
  const items: Artifact[] = Array.from({ length: 5 }, (_, i) => ({
    _id: `${i}`,
    name: "The 8th century reliquary hand of Saint Abulmuse",
    location: "Vedi Fortress",
    date: new Date("1960-8-1"),
  }));
  return (
    <MainBody backgroundColor={theme.colors.gradientBackground}>
      <ScrollView>
        <View style={[_style.header, { padding: theme.spacing.md, gap: theme.spacing.sm }]}>
          <TouchableOpacity onPress={() => router.back()}>
            <ChevronLeftIcon fill="white" />
          </TouchableOpacity>
          <Text variant="headlineMedium" style={{ flex: 1 }}>
            {params.cat}
          </Text>
          <TouchableOpacity>
            <SortIcon fill="white" />
          </TouchableOpacity>
        </View>
        <FlatList
          scrollEnabled={false}
          showsVerticalScrollIndicator={false}
          data={items}
          renderItem={({ item }) => <ItemCard item={item} />}
          columnWrapperStyle={{ gap: theme.spacing.sm, paddingBottom: theme.spacing.md, justifyContent: "flex-start" }}
          numColumns={2}
          keyExtractor={(item, index) => item._id}
          style={{ padding: theme.spacing.md }}
        />
      </ScrollView>
    </MainBody>
  );
}

const _style = StyleSheet.create({
  gradient: {
    flex: 1,
    justifyContent: "center",
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
    overflow: "hidden",
  },
});