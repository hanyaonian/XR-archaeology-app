import { View } from "react-native";
import { EdgeInsets, useSafeAreaInsets } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import _ from "lodash";
import { useAppTheme } from "@providers/style_provider";

export interface Props {
  children?: JSX.Element | (JSX.Element | undefined | boolean)[] | undefined;
  padding?: Partial<EdgeInsets>;
  backgroundColor?: string | string[];
}

export default function MainBody({ children, padding, backgroundColor }: Props): JSX.Element {
  const { theme } = useAppTheme();
  const { top, bottom, left, right } = { ...useSafeAreaInsets(), ..._.omitBy(padding, _.isNull) } as EdgeInsets;

  const bgColor: string[] = backgroundColor
    ? Array.isArray(backgroundColor)
      ? backgroundColor
      : [backgroundColor, backgroundColor]
    : [theme.colors.background, theme.colors.background];
  return (
    <View
      style={{
        backgroundColor: theme.colors.background,
        flex: 1,
        flexDirection: "row",
        justifyContent: "center",
      }}
    >
      <LinearGradient
        colors={bgColor}
        style={{ flex: 1, paddingTop: top, paddingBottom: bottom, paddingLeft: left, paddingRight: right, position: "relative" }}
      >
        {children}
      </LinearGradient>
    </View>
  );
}
