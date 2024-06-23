import { Text } from "react-native-paper";
import { useAppTheme } from "@/providers/style_provider";
import IconBtn from "../icon_btn";
import * as Speech from 'expo-speech';
import { useEffect, useState } from "react";
import { View } from "react-native";

export function Tts(props: { text: string } & any) {
  const { text } = props;
  const [status, setStatus] = useState<'play' | 'idle'>('idle')
  const { theme } = useAppTheme();

  useEffect(() => {
    return () => {
      Speech.stop();
    }
  }, [])

  const useTts = async () => {
    if (status === 'idle') {
      Speech.speak(text, {
        onDone: () => {
          setStatus('idle');
        }
      });
      setStatus('play')
    } else {
      Speech.stop();
      setStatus('idle')
    }
  };
  return (
    <View>
      <Text {...props}>{text}</Text>
      <IconBtn
        style={{ marginLeft: theme.spacing.md }}
        icon={status === 'idle' ? "speaker" : "pause"}
        iconProps={{ fill: theme.colors.text }}
        onPress={() => {
          useTts();
        }}
      />
    </View>
  );
}
