import React from 'react';
import { Tabs, useRouter } from 'expo-router';
import { Text, View } from 'react-native';
import {
  Home,
  Music,
  Health,
} from 'iconsax-react-native';
import { clsx } from 'clsx';
import MiniPlayer from '@/components/MiniPlayer';

const icons = {
  home: Home,
  library: Music,
  artist: Health,
};

type TabIconProps = {
  Icon: React.ElementType;
  focused: boolean;
  name: string;
};

const TabIcon = ({ Icon, focused, name }: TabIconProps) => {
  const renderName = () => {
    switch (name) {
      case 'home':
        return 'An Tâm'
      case 'library':
        return 'Thư giãn'
      case 'artist':
        return 'Sức khỏe'
    }
  }

  return (
    <View
      className={clsx(
        `flex-row mt-14 gap-2 items-center justify-center ${focused ? 'bg-white !w-32 h-14 rounded-3xl': ''}`
      )}
    >
      <Icon
        size={24}
        color={focused ? '#274935' : '#637381'}
        variant='Bold'
      />
      {focused && (
        <Text className="font-semibold">{renderName()}</Text>
      )}
    </View>
  );
};

export default function TabsLayout() {
  return (
    <>
      <Tabs
        screenOptions={({ route }: { route: { name: string } }) => ({
          headerShown: false,
          tabBarShowLabel: false,
          tabBarStyle: {
            position: 'absolute',
            bottom: 40,
            marginLeft: 52,
            marginRight: 52,
            height: 88,
            borderRadius: 32,
            backgroundColor: '#212B36',
            borderTopWidth: 0,
            elevation: 10,
            shadowRadius: 8,
            shadowOffset: { width: 0, height: 3 },
            paddingHorizontal: 16,
          },
          tabBarItemStyle: {
            alignSelf: 'center',
          },
          tabBarIcon: ({ focused }: { focused: boolean }) => {
            const Icon = icons[route.name as keyof typeof icons];
            return <TabIcon Icon={Icon} focused={focused} name={route.name} />;
          },
        })}
      >
        <Tabs.Screen name='home' options={{ title: 'Home' }} />
        <Tabs.Screen name='library' options={{ title: 'Wallet' }} />
        <Tabs.Screen name='artist' options={{ title: 'Chatbot' }} />
      </Tabs>
      <MiniPlayer />
    </>
  );
}
