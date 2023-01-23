import './src/lib/dayjs';
import { StatusBar } from 'react-native';
import { 
  useFonts,
  Inter_400Regular,
  Inter_600SemiBold,
  Inter_700Bold,
  Inter_800ExtraBold
} from '@expo-google-fonts/inter'
import { ComponentLoading } from './src/components/Loading';
import { Routes } from './src/routes';
import { Provider } from 'react-redux';
import { store } from './src/store';

export default function App() {

  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_600SemiBold,
    Inter_700Bold,
    Inter_800ExtraBold
  });

  if(!fontsLoaded) {
    return (
      <ComponentLoading />
    )
  }

  return (
    <Provider store={store}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      <Routes />
    </Provider>
  );
}

