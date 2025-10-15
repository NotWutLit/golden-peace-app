import { Stack } from 'expo-router'
import { View } from 'react-native'
import '~/global.css'
import { QueryProvider } from '@/context/QueryProvider'
import { ToastProvider } from '@/components/ToastNotify/ToastContext'
import { StatusBar } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <QueryProvider>
        <ToastProvider>
          <View className="flex-1 bg-[#161c24]">
            <StatusBar translucent backgroundColor={'#161c24'} barStyle="light-content" />
            <Stack
              screenOptions={{
                headerShown: false,
                contentStyle: { backgroundColor: '#161c24' },
              }}
            />
          </View>
        </ToastProvider>
      </QueryProvider>
    </GestureHandlerRootView>
  )
}
