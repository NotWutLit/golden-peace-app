import images from '@/constants/images'
import { ImageBackground, StatusBar, View, Text, TouchableOpacity, ScrollView, TextInput } from 'react-native'
import React, { useState } from 'react'
import { ArrowLeft2, Eye, EyeSlash } from 'iconsax-react-native'
import { useRouter } from 'expo-router'

export default function ChangePassword() {
  const router = useRouter()
  const [showOldPassword, setShowOldPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [error, setError] = useState('Mật khẩu cũ chưa chính xác!')
  
  const [formData, setFormData] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  })

  const handleChangePassword = () => {
    console.log('Change password', formData)
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
            Đổi mật khẩu
          </Text>
        </View>

        <ScrollView 
          className="flex-1"
          showsVerticalScrollIndicator={false}
        >
          {/* Form Fields */}
          <View className="gap-5">
            {/* Old Password */}
            <View>
              <Text className="text-gray-800 text-base font-semibold mb-2">
                Mật khẩu cũ
              </Text>
              <View className="relative">
                <TextInput
                  placeholder="Nhập mật khẩu cũ•"
                  value={formData.oldPassword}
                  onChangeText={(text) => setFormData({ ...formData, oldPassword: text })}
                  secureTextEntry={!showOldPassword}
                  className="bg-secondary-50 rounded-2xl px-4 py-4 pr-12 text-gray-700 text-base"
                  placeholderTextColor="#9CA3AF"
                />
                <TouchableOpacity
                  onPress={() => setShowOldPassword(!showOldPassword)}
                  className="absolute right-4 top-4"
                >
                  {showOldPassword ? (
                    <Eye size="24" color="#9CA3AF" variant="Outline" />
                  ) : (
                    <EyeSlash size="24" color="#9CA3AF" variant="Outline" />
                  )}
                </TouchableOpacity>
              </View>
              {error && (
                <View className="flex-row items-center mt-2">
                  <Text className="text-red-500 text-sm ml-1">⚠ {error}</Text>
                </View>
              )}
            </View>

            {/* New Password */}
            <View>
              <Text className="text-gray-800 text-base font-semibold mb-2">
                Mật khẩu mới
              </Text>
              <View className="relative">
                <TextInput
                  placeholder="Nhập mật khẩu mới"
                  value={formData.newPassword}
                  onChangeText={(text) => setFormData({ ...formData, newPassword: text })}
                  secureTextEntry={!showNewPassword}
                  className="bg-secondary-50 rounded-2xl px-4 py-4 pr-12 text-gray-700 text-base"
                  placeholderTextColor="#9CA3AF"
                />
                <TouchableOpacity
                  onPress={() => setShowNewPassword(!showNewPassword)}
                  className="absolute right-4 top-4"
                >
                  {showNewPassword ? (
                    <Eye size="24" color="#9CA3AF" variant="Outline" />
                  ) : (
                    <EyeSlash size="24" color="#9CA3AF" variant="Outline" />
                  )}
                </TouchableOpacity>
              </View>
            </View>

            {/* Confirm Password */}
            <View>
              <Text className="text-gray-800 text-base font-semibold mb-2">
                Nhập lại mật khẩu mới
              </Text>
              <View className="relative">
                <TextInput
                  placeholder="Nhập lại mật khẩu mới"
                  value={formData.confirmPassword}
                  onChangeText={(text) => setFormData({ ...formData, confirmPassword: text })}
                  secureTextEntry={!showConfirmPassword}
                  className="bg-secondary-50 rounded-2xl px-4 py-4 pr-12 text-gray-700 text-base"
                  placeholderTextColor="#9CA3AF"
                />
                <TouchableOpacity
                  onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 top-4"
                >
                  {showConfirmPassword ? (
                    <Eye size="24" color="#9CA3AF" variant="Outline" />
                  ) : (
                    <EyeSlash size="24" color="#9CA3AF" variant="Outline" />
                  )}
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {/* Change Password Button */}
          <TouchableOpacity
            onPress={handleChangePassword}
            className="bg-primary-main rounded-2xl p-4 mt-8 mb-8"
            style={{
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.1,
              shadowRadius: 8,
              elevation: 3,
            }}
          >
            <Text className="text-white text-center text-lg font-bold">
              Đổi mật khẩu
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </ImageBackground>
  )
}

