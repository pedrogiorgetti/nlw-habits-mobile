import { useEffect } from "react";
import { View } from "react-native";
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";

interface IProgressBarProps {
  progress: number;
}

export function ProgressBar({ progress }: IProgressBarProps) {
  const animatedProgress = useSharedValue(progress);
  const animatedStyle = useAnimatedStyle(() => {
    return {
      width: `${animatedProgress.value}%`,
    }
  });

  useEffect(() => {
    animatedProgress.value = withTiming(progress);
  }, [progress])

  return (
    <View className="w-full h-3 rounded-xl bg-zinc-700 mt-4">
      <Animated.View
        className="h-3 rounded-xl bg-violet-600"
        style={animatedStyle}
      />
    </View>
  )
}