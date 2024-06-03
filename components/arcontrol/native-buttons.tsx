import { View, TouchableOpacity, Text, StyleSheet } from "react-native";

export type Direction = "left" | "right" | "up" | "down";

// 自定义的上下左右按钮组件
export function DirectButtons(props: { type: "rotation" | "position"; change: (params: { direction: Direction }) => void }) {
  const { change } = props;
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => change({ direction: "down" })} style={[styles.button, { top: 0, right: 0 }]}>
        <Text style={styles.buttonText}>↓</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => change({ direction: "up" })} style={[styles.button, { top: -50, right: 0 }]}>
        <Text style={styles.buttonText}>↑</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => change({ direction: "left" })} style={[styles.button, { right: 50, top: "50%" }]}>
        <Text style={styles.buttonText}>←</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => change({ direction: "right" })} style={[styles.button, { right: -50, top: "25%" }]}>
        <Text style={styles.buttonText}>→</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  button: {
    position: 'absolute',
    padding: 10,
    backgroundColor: "lightblue",
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 20,
    color: "white",
    fontWeight: 'bold',
  },
});
