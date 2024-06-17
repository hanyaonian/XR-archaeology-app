import { Content } from "@/models";
import { useAppTheme } from "@/providers/style_provider";
import { ImageStyle, View, ViewStyle } from "react-native";
import { Text } from "react-native-paper";
import { Tts } from "@/components/common/tts";
import Carousel from "./carousel";

export interface Props {
  content: Content;
  hideIndicators?: boolean;
  imageRatio?: number;
  animating?: boolean;
  duration?: number;
  imageStyle?: ViewStyle & ImageStyle;
}

export default function ContentItem({ content, ...props }: Props) {
  const { theme } = useAppTheme();
  return (
    <View>
      <Text variant="titleMedium" style={{ marginBottom: theme.spacing.md, paddingHorizontal: theme.spacing.lg }}>
        {content.heading.toString()}
      </Text>
      {content.images && <Carousel images={content.images} imageStyle={props.imageStyle} />}
      <Tts
        variant="bodyMedium"
        text={content.desc?.toString() ?? ""}
        style={{ color: theme.colors.text, marginTop: theme.spacing.md, paddingHorizontal: theme.spacing.lg }}
      ></Tts>
    </View>
  );
}
