import { Searchbar, Text, TouchableRipple, Button } from "react-native-paper";
import { useAppTheme } from "../../styles";
import MainBody from "../../components/main_body";
import { View, ScrollView, GestureResponderEvent, Image, StyleSheet, ImageBackground } from "react-native";
import { useState } from "react";
import SearchIcon from "../../assets/icons/search.svg";
import BookMarkOutlineIcon from "../../assets/icons/bookmark-outline.svg";

import { Artifact } from "models/artifact";
import { LinearGradient } from "expo-linear-gradient";
import { FlatList } from "react-native-gesture-handler";
import IconBtn from "../../components/icon_btn";
import { router } from "expo-router";

export default function Home() {
  const theme = useAppTheme();

  const [searchText, setSearchText] = useState("");

  const search = (query: string) => setSearchText(query);

  // for dev use
  const categories: String[] = ["Daily Features", "Antiquities"];
  // for dev use
  const items: Artifact[] = Array.from({ length: 5 }, (_, i) => ({
    _id: `${i}`,
    name: "The 8th century reliquary hand of Saint Abulmuse",
  }));

  return (
    <MainBody>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ flexDirection: "row", padding: theme.spacing.md, alignItems: "center", gap: theme.spacing.sm }}>
          <Searchbar
            placeholder="Search"
            value={searchText}
            onChangeText={search}
            onSubmitEditing={(e) => router.push(`/search_result?q=${searchText}`)}
            mode="bar"
            icon={() => null}
            iconColor={theme.colors.grey4}
            elevation={0}
            style={{ flexGrow: 1, backgroundColor: "#6D6D6D33", borderRadius: 4, paddingRight: 0 }}
            traileringIcon={({ color }) => <SearchIcon fill={color} />}
          />
          <IconBtn icon={<BookMarkOutlineIcon fill="white" />} />
        </View>
        <>
          {categories.map((cat, index) => (
            <View style={{ paddingBottom: 24 }} key={index}>
              <View style={_style.titleBar}>
                <Text variant="titleMedium" style={{ flexGrow: 1, flexShrink: 1 }}>
                  {cat}
                </Text>
                <Button
                  mode="text"
                  textColor="white"
                  onPress={() => {
                    router.push(`/category?cat=${cat}`);
                  }}
                >
                  view more
                </Button>
              </View>
              <FlatList
                showsHorizontalScrollIndicator={false}
                style={{ padding: theme.spacing.sm }}
                horizontal={true}
                data={items}
                renderItem={({ item }) => <ItemCard item={item} />}
                ItemSeparatorComponent={() => <View style={{ width: theme.spacing.md }} />}
              />
            </View>
          ))}
        </>
      </ScrollView>
    </MainBody>
  );
}

interface ItemCardProps {
  onPress?: (e: GestureResponderEvent) => void;
  onLongPress?: () => void;
  loading?: boolean;
  item: Artifact;
}

const ItemCard = (props: ItemCardProps) => {
  const { item, onPress } = props;
  return (
    <View style={_style.itemCard}>
      <TouchableRipple onPress={onPress ?? (() => router.push(`/detail?id=${item._id}`))}>
        <ImageBackground resizeMode="cover" style={_style.itemImg} source={item.image || require("../../assets/images/demo_item.png")}>
          <LinearGradient colors={["#0000006B", "#00000000"]} start={{ x: 0.5, y: 1 }} end={{ x: 0.5, y: 0 }} style={_style.gradient} />
          <Text variant="labelSmall" style={_style.itemText} numberOfLines={2}>
            {item.name}
          </Text>
        </ImageBackground>
      </TouchableRipple>
    </View>
  );
};

const _style = StyleSheet.create({
  itemCard: {
    width: 150,
    height: 150,
    borderRadius: 32,
    overflow: "hidden",
  },
  gradient: {
    flex: 1,
    justifyContent: "center",
  },
  itemImg: {
    width: 150,
    height: 150,
  },
  itemText: {
    position: "absolute",
    left: 8,
    right: 8,
    bottom: 15,
    display: "flex",
    overflow: "hidden",
  },
  titleBar: {
    display: "flex",
    flexDirection: "row",
    paddingLeft: 20,
    justifyContent: "space-between",
    alignItems: "center",
  },
});