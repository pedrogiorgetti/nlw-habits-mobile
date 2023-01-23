import { ActivityIndicator, ScrollView, Text, View } from "react-native";
import { useRoute } from "@react-navigation/native";
import dayjs from "dayjs";
import { useCallback, useEffect } from "react";
import colors from "tailwindcss/colors";
import { ComponentBackButton } from "../../components/BackButton";
import { ComponentCheckbox } from "../../components/Checkbox";
import { ComponentIsVisible } from "../../components/IsVisible";
import { ProgressBar } from "../../components/ProgressBar";
import { useReduxDispatch } from "../../hooks/useReduxDispatch";
import { useReduxSelector } from "../../hooks/useReduxSelector";
import { habitActions } from "../../store/slices/habit";
import { generateProgressPercentage } from "../../utils/generateProgressPercentage";
import clsx from "clsx";

interface IRouteParams {
  date: string;
}

export function Habit() {
  const route = useRoute();
  const reduxDispatch = useReduxDispatch();

  const completedHabits = useReduxSelector(state => state.habit.getAllByDay.list.completedHabits);
  const possibleHabits = useReduxSelector(state => state.habit.getAllByDay.list.possibleHabits);
  const emptyMessage = useReduxSelector(state => state.habit.getAllByDay.config.emptyMessage);
  const isLoading = useReduxSelector(state => state.habit.getAllByDay.config.isLoading);


  const { date } = route.params as IRouteParams;

  const parsedDate = dayjs(date);
  const isDateInPast = dayjs(date).endOf('day').isBefore(new Date());
  const dayOfWeek = parsedDate.format('dddd');
  const dayAndMonth = parsedDate.format('MM/DD');
  const habitsProgress = possibleHabits.length ? generateProgressPercentage({
    amount: possibleHabits.length, completed: completedHabits.length
  }) : 0;

  const handleToggleHabit = (habitId: string) => {
    reduxDispatch(habitActions.toggleRequest({
      habitId,
    }))
  }

  const loadHabitByDay = useCallback(() => {
    reduxDispatch(habitActions.getAllByDayRequest({
      date: date,
    }))
  }, [reduxDispatch])

  useEffect(() => {
    loadHabitByDay()
  }, [loadHabitByDay])

  return (
    <View className="flex-1 bg-background px-8 pt-16">
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>

        <ComponentBackButton />

        <Text className="mt-6 text-zinc-400 font-semibold text-base lowercase">
          {dayOfWeek}
        </Text>

        <Text className="text-white font-extrabold text-3xl">
          {dayAndMonth}
        </Text>

        <ProgressBar progress={habitsProgress} />

        <View className={clsx("mt-6", {
          ["opacity-50"]: isDateInPast
        })}>
          <ComponentIsVisible when={isLoading}>
            <View className="mt-6 items-center justify-center flex-1">
              <ActivityIndicator size={32} color={colors.zinc[400]} />
            </View>
          </ComponentIsVisible>
          <ComponentIsVisible when={!isLoading}>
            <ComponentIsVisible when={possibleHabits.length > 0}>
              {possibleHabits.map(possibleHabit => (
                <ComponentCheckbox
                  key={possibleHabit.id}
                  title={possibleHabit.title}
                  disabled={isDateInPast}
                  checked={completedHabits.includes(possibleHabit.id)}
                  onPress={() => handleToggleHabit(possibleHabit.id)}
                />
              ))}
            </ComponentIsVisible>

            <ComponentIsVisible when={possibleHabits.length <= 0}>
              <Text className="text-base text-zinc-400 font-medium max-w-[120px] text-center mx-auto">
                {emptyMessage}
              </Text>
            </ComponentIsVisible>
          </ComponentIsVisible>
        </View>
      </ScrollView>
    </View>
  )
}