import { useState } from "react";
import { View, TextInput, StyleSheet } from "react-native";
import { Text } from "react-native-paper";

export function SearchInput(props?: { value?: string; hint?: string; onChangeText?: (text: string) => void }) {
  const { hint = "Search...", onChangeText = () => {} } = props ?? {};
  const [text, setText] = useState("");

  return (
    <View style={styles.container}>
      <Text style={styles.searchIcon}> 🔍 </Text>
      <TextInput
        style={styles.input}
        placeholder={hint}
        value={text}
        onChangeText={(t) => {
          setText(t);
          onChangeText(t);
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    marginTop: 10,
    marginBottom: 10,
  },
  searchIcon: {
    zIndex: 10,
    paddingLeft: 10,
    paddingRight: 10,
  },
  input: {
    flex: 1,
    paddingVertical: 10,
    fontSize: 16,
    color: "#333",
  },
});
