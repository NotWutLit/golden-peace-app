import images from '@/constants/images'
import { ImageBackground, StatusBar, View, Text, TouchableOpacity, ScrollView, Switch } from 'react-native'
import React, { useState } from 'react'
import { ArrowLeft2, User, Notification, Lock, ShieldTick, DocumentText, MessageQuestion, Trash, LogoutCurve } from 'iconsax-react-native'
import { useRouter } from 'expo-router'
import { ERouteTable } from '@/constants/route-table'

interface SettingItem {
  id: string
  title: string
  icon: React.ReactNode
  route?: string
  hasToggle?: boolean
  hasDivider?: boolean
}

export default function Setting() {
  const router = useRouter()
  const [notificationsEnabled, setNotificationsEnabled] = useState(true)

  const settingItems: SettingItem[] = [
    {
      id: 'account',
      title: 'Tài khoản',
      icon: <User size="24" color="#22C55E" variant="Outline" />,
      route: ERouteTable.ACCOUNT_INFORMATION,
    },
    {
      id: 'notification',
      title: 'Thông báo',
      icon: <Notification size="24" color="#FFAB00" variant="Outline" />,
      hasToggle: true,
    },
    {
      id: 'password',
      title: 'Đổi mật khẩu',
      icon: <Lock size="24" color="#00B8D9" variant="Outline" />,
      route: ERouteTable.CHANGE_PASSWORD,
    },
    {
      id: 'privacy',
      title: 'Chính sách bảo mật',
      icon: <ShieldTick size="24" color="#EF4444" variant="Outline" />,
      route: ERouteTable.PRIVACY_POLICY,
    },
    {
      id: 'terms',
      title: 'Điều khoản & Điều kiện',
      icon: <DocumentText size="24" color="#10B981" variant="Outline" />,
      route: ERouteTable.TERM_CONDITION,
    },
    {
      id: 'support',
      title: 'Hỗ trợ',
      icon: <MessageQuestion size="24" color="#F59E0B" variant="Outline" />,
      route: ERouteTable.SUPPORT,
      hasDivider: true,
    },
    {
      id: 'delete',
      title: 'Xóa tài khoản',
      icon: <Trash size="24" color="#EF4444" variant="Outline" />,
    },
  ]

  const handleItemPress = (item: SettingItem) => {
    if (item.route) {
      // @ts-ignore
      router.push(item.route)
    } else if (item.id === 'delete') {
      // Handle delete account
      console.log('Delete account')
    }
  }

  const handleLogout = () => {
    // Handle logout
    console.log('Logout')
  }

  return (
    <ImageBackground source={images.bgLibrary} className="flex-1">
      <StatusBar translucent backgroundColor={'transparent'} barStyle="light-content" />
      <View className="flex-1 px-4 mt-16">
        {/* Header */}
        <View className="flex-row items-center mb-8">
          <TouchableOpacity 
            className="items-center h-16 w-16 rounded-3xl justify-center bg-secondary-50" 
            onPress={() => router.back()}
          >
            <ArrowLeft2 size="24" color="#212B36" variant="Outline"/>
          </TouchableOpacity>
          <Text className="text-gray-800 text-2xl font-bold flex-1 text-center mr-16">
            Cài đặt
          </Text>
        </View>

        <ScrollView 
          className="flex-1"
          showsVerticalScrollIndicator={false}
        >
          {/* Settings List */}
          <View className="gap-4 mb-6">
            {settingItems.map((item, index) => (
              <View key={item.id}>
                <TouchableOpacity
                  onPress={() => handleItemPress(item)}
                  disabled={item.hasToggle}
                  className="p-4 flex-row items-center"
                  style={{
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.05,
                    shadowRadius: 4,
                    elevation: 2,
                  }}
                >
                  <View className="w-10 h-10 rounded-full items-center justify-center mr-4">
                    {item.icon}
                  </View>
                  <Text className="flex-1 text-gray-800 text-base font-medium">
                    {item.title}
                  </Text>
                  {item.hasToggle ? (
                    <Switch
                      value={notificationsEnabled}
                      onValueChange={setNotificationsEnabled}
                      trackColor={{ false: '#D1D5DB', true: '#10B981' }}
                      thumbColor="#FFFFFF"
                    />
                  ) : (
                    <ArrowLeft2 
                      size="20" 
                      color="#9CA3AF" 
                      variant="Outline"
                      style={{ transform: [{ rotate: '180deg' }] }}
                    />
                  )}
                </TouchableOpacity>
                {item.hasDivider && (
                  <View className="h-1 w-full border-t border-[#919EAB3D]" />
                )}
              </View>
            ))}
          </View>

        </ScrollView>
        <TouchableOpacity
          onPress={handleLogout}
          className="bg-red-500 rounded-2xl p-5 flex-row items-center justify-center mb-12"
          style={{
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 8,
            elevation: 3,
          }}
        >
          <LogoutCurve size="24" color="#FFFFFF" variant="Bold" />
          <Text className="text-white text-lg font-bold ml-3">
            Đăng xuất
          </Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  )
}