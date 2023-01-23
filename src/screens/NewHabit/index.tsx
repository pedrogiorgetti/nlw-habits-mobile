import { useRef, useState } from "react";
import { Alert, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { ComponentBackButton } from "../../components/BackButton";
import { ComponentCheckbox } from "../../components/Checkbox";
import { Feather } from '@expo/vector-icons';
import colors from "tailwindcss/colors";
import { useReduxDispatch } from "../../hooks/useReduxDispatch";
import { habitActions } from "../../store/slices/habit";

const availableWeekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

export function NewHabit() {
  const reduxDispatch = useReduxDispatch();

  const [weekDays, setWeekDays] = useState<number[]>([]);
  
  const textInputRef = useRef<any>(null);

  const handleToggleWeekDay = (weekDayIndex: number) => {
    if (weekDays.includes(weekDayIndex)) {
      setWeekDays(prevState => prevState.filter(weekDay => weekDay !== weekDayIndex))
    } else {
      setWeekDays(prevState => [...prevState, weekDayIndex])
    }
  };

  const handleCreateNewHabit = () => {
    if (!textInputRef.current?.value?.trim() || weekDays.length === 0) {
      Alert.alert('Please insert the habit name and unless one week day');
      return
    }

    reduxDispatch(habitActions.createRequest({
      title: textInputRef.current?.value as string,
      weekDays, 
    }));

    Alert.alert('Your new habit has been created!');

    textInputRef.current?.setNativeProps({ text: '' });
    setWeekDays([]);
  }


  return (
    <View className="flex-1 bg-background px-8 pt-16">
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>
        <ComponentBackButton />

        <Text className="text-white mt-6 font-extrabold text-3xl">
          Create Habit
        </Text>

        <Text className="text-white mt-6 font-semibold text-base">
          What is your commitment?
        </Text>

        <TextInput
          className="h-12 pl-4 rounded-lg mt-3 bg-zinc-900 border-2 border-zinc-800 text-white focus:border-2 focus:border-green-600"
          placeholder="Exercise, sleep well, drink water"
          placeholderTextColor={colors.zinc[400]}
          autoFocus
          onChangeText={text => textInputRef.current.value = text}
          ref={textInputRef}
        />


        <Text className="text-white mt-4 font-semibold text-base mb-3">
          What is the recurrence?
        </Text>

        {availableWeekDays.map((weekDay, index) => (
          <ComponentCheckbox
            key={weekDay}
            title={weekDay}
            checked={weekDays.includes(index)}
            onPress={() => handleToggleWeekDay(index)}
          />
        ))}

        <TouchableOpacity
          activeOpacity={0.7}
          className="w-full h-14 flex-row items-center justify-center bg-green-600 rounded-md mt-6"
          onPress={handleCreateNewHabit}
        >
          <Feather name="check" size={20} color={colors.white} />
          <Text className="text-white font-semibold text-base ml-2">
            Confirm
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  )
}