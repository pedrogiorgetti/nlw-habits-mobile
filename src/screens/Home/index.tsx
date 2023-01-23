import { useNavigation } from "@react-navigation/native";
import { AxiosResponse } from "axios";
import dayjs from "dayjs";
import { useEffect } from "react";
import { View, Text, ScrollView } from "react-native";
import { HabitDay, DAY_SIZE } from "../../components/HabitDay";
import { Header } from "../../components/Header";
import { ComponentIsVisible } from "../../components/IsVisible";
import { useReduxDispatch } from "../../hooks/useReduxDispatch";
import { useReduxSelector } from "../../hooks/useReduxSelector";
import { habitActions } from "../../store/slices/habit";
import { utils } from "../../utils";

const weekDays = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
const summaryDates = utils.generateDateFromYearBeginning();
const minimumSummaryDatesSize = 18 * 5;
const amountOfDaysToFill = minimumSummaryDatesSize - summaryDates.length;

export function Home() {
  const { navigate } = useNavigation();
  const reduxDispatch = useReduxDispatch();

  const habitsList = useReduxSelector(state => state.habit.getAll.list);
  
  useEffect(() => {
    reduxDispatch(habitActions.getAllRequest());
  }, []);

  return (
    <View className="flex-1 bg-background px-8 pt-16">
      <Header />

      <View className="flex-row mt-6 mb-2">
        {weekDays.map((weekDay, index) => (
          <Text
            key={`${weekDay} - ${index}`}
            className="text-zinc-400 text-xl font-bold text-center mx-1"
            style={{width: DAY_SIZE}}
          >
            {weekDay}
          </Text>
        ))}
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>
        <ComponentIsVisible when={habitsList.length !== 0}>
          <View className="flex-row flex-wrap">
            {summaryDates.map(summaryDate => {
              const dayWithHabits = habitsList.find(summaryHabit => {
                return dayjs(summaryDate).isSame(summaryHabit.date, 'day');
              })

              return (
                <HabitDay
                  date={summaryDate}
                  key={summaryDate.toISOString()}
                  completed={dayWithHabits?.completed}
                  amount={dayWithHabits?.amount}
                  onPress={() => navigate('Habit', {date: summaryDate.toISOString()})}
                />
              )
            })}

            {amountOfDaysToFill > 0 && Array
              .from({length: amountOfDaysToFill})
              .map((_, index) => (
                <View
                  key={index}
                  className="bg-zinc-900 rounded-lg border-2 m-1 border-zinc-800 opacity-40"
                  style={{ width: DAY_SIZE, height: DAY_SIZE }}
                />
              ))
            }
          </View>
        </ComponentIsVisible>

      </ScrollView>
    </View>
  )
}