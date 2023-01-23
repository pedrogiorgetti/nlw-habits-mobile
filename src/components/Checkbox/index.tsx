import { Text, TouchableOpacity, TouchableOpacityProps, View } from "react-native";
import colors from "tailwindcss/colors";
import { Feather } from '@expo/vector-icons';
import { ComponentIsVisible } from "../IsVisible";
import Animated, { ZoomIn, ZoomOut } from "react-native-reanimated";

interface IComponentCheckboxProps extends TouchableOpacityProps {
  checked?: boolean;
  title: string;
}

export function ComponentCheckbox({ title, checked, ...rest }: IComponentCheckboxProps) {


  return (
    <TouchableOpacity
      activeOpacity={0.7}
      className="flex-row mb-2 items-center"
      {...rest}
    >
      <ComponentIsVisible when={!!checked}>
        <Animated.View
          className="h-8 w-8 bg-green-500 rounded-lg items-center justify-center"
          entering={ZoomIn}
          exiting={ZoomOut}
        >
          <Feather name="check" size={20} color={colors.white} />
        </Animated.View>
      </ComponentIsVisible>

      <ComponentIsVisible when={!checked}>
        <View className="h-8 w-8 bg-zinc-900 rounded-lg items-center justify-center" />
      </ComponentIsVisible>

      <Text className="text-white font-semibold text-base ml-3">
        {title}
      </Text>
    </TouchableOpacity>
  )
}