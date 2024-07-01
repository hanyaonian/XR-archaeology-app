import { Text } from "react-native-paper";
import { AppTheme, useAppTheme } from "@/providers/style_provider";
import IconBtn from "../icon_btn";
import * as Speech from "expo-speech";
import { useEffect, useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";

export function Tts(props: { text: string; padding?: number } & any) {
  const { theme } = useAppTheme();
  const { text, padding = theme.spacing.md } = props;
  const [status, setStatus] = useState<"play" | "idle">("idle");

  useEffect(() => {
    return () => {
      Speech.stop();
    };
  }, []);

  const useTts = async () => {
    if (status === "idle") {
      Speech.speak(text, {
        onDone: () => {
          setStatus("idle");
        },
      });
      setStatus("play");
    } else {
      Speech.stop();
      setStatus("idle");
    }
  };
  return (
    <Pressable
      onPress={() => {
        useTts();
      }}
    >
      <Text {...props}>{text}</Text>
      <IconBtn style={{ paddingLeft: padding }} icon={status === "idle" ? "speaker" : "pause"} iconProps={{ fill: theme.colors.text }} />
    </Pressable>
  );
}
