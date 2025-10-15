import images from '@/constants/images'
import { ImageBackground, StatusBar, View, Text, TouchableOpacity, ScrollView, TextInput, Image } from 'react-native'
import React, { useState } from 'react'
import { ArrowLeft2, Camera } from 'iconsax-react-native'
import { useRouter } from 'expo-router'

export default function AccountInformation() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: '',
    phone: '0967633999',
    email: '',
    gender: 'Nam',
    day: '15',
    month: 'Tháng Một',
    year: '1950',
  })

  const handleSave = () => {
    console.log('Save account info', formData)
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
            Tài khoản
          </Text>
        </View>

        <ScrollView 
          className="flex-1"
          showsVerticalScrollIndicator={false}
        >
          {/* Avatar Section */}
          <View className="items-center mb-8">
            <View className="relative">
              <Image 
                source={images.avatar}
                className="w-24 h-24 rounded-full"
              />
              <TouchableOpacity 
                className="absolute bottom-0 right-0 w-8 h-8 bg-gray-800 rounded-full items-center justify-center"
              >
                <Camera size="16" color="#FFFFFF" variant="Bold" />
              </TouchableOpacity>
            </View>
            <Text className="text-gray-500 text-sm mt-3">
              Tên người dùng
            </Text>
            <Text className="text-gray-800 text-lg font-semibold mt-1">
              user162836
            </Text>
          </View>

          {/* Form Fields */}
          <View className="gap-5">
            {/* Name */}
            <View>
              <Text className="text-gray-800 text-base font-semibold mb-2">
                Tên
              </Text>
              <TextInput
                placeholder="Nhập tên"
                value={formData.name}
                onChangeText={(text) => setFormData({ ...formData, name: text })}
                className="bg-secondary-50 rounded-2xl px-4 py-4 text-gray-700 text-base"
                placeholderTextColor="#9CA3AF"
              />
            </View>

            {/* Phone */}
            <View>
              <Text className="text-gray-800 text-base font-semibold mb-2">
                Điện thoại
              </Text>
              <TextInput
                placeholder="Nhập số điện thoại"
                value={formData.phone}
                onChangeText={(text) => setFormData({ ...formData, phone: text })}
                keyboardType="phone-pad"
                className="bg-secondary-50 rounded-2xl px-4 py-4 text-gray-700 text-base"
                placeholderTextColor="#9CA3AF"
              />
            </View>

            {/* Email */}
            <View>
              <Text className="text-gray-800 text-base font-semibold mb-2">
                Email
              </Text>
              <TextInput
                placeholder="Nhập email"
                value={formData.email}
                onChangeText={(text) => setFormData({ ...formData, email: text })}
                keyboardType="email-address"
                autoCapitalize="none"
                className="bg-secondary-50 rounded-2xl px-4 py-4 text-gray-700 text-base"
                placeholderTextColor="#9CA3AF"
              />
            </View>

            {/* Gender */}
            <View>
              <Text className="text-gray-800 text-base font-semibold mb-2">
                Giới tính
              </Text>
              <TouchableOpacity className="bg-secondary-50 rounded-2xl px-4 py-4 flex-row items-center justify-between">
                <Text className="text-gray-700 text-base">
                  {formData.gender}
                </Text>
                <ArrowLeft2 
                  size="20" 
                  color="#9CA3AF" 
                  variant="Outline"
                  style={{ transform: [{ rotate: '-90deg' }] }}
                />
              </TouchableOpacity>
            </View>

            {/* Birthday */}
            <View>
              <Text className="text-gray-800 text-base font-semibold mb-2">
                Ngày sinh
              </Text>
              <View className="flex-row gap-3">
                <TouchableOpacity className="flex-1 bg-secondary-50 rounded-2xl px-4 py-4 flex-row items-center justify-between">
                  <Text className="text-gray-700 text-base">
                    {formData.day}
                  </Text>
                  <ArrowLeft2 
                    size="20" 
                    color="#9CA3AF" 
                    variant="Outline"
                    style={{ transform: [{ rotate: '-90deg' }] }}
                  />
                </TouchableOpacity>

                <TouchableOpacity className="flex-1 bg-secondary-50 rounded-2xl px-4 py-4 flex-row items-center justify-between">
                  <Text className="text-gray-700 text-base">
                    {formData.month}
                  </Text>
                  <ArrowLeft2 
                    size="20" 
                    color="#9CA3AF" 
                    variant="Outline"
                    style={{ transform: [{ rotate: '-90deg' }] }}
                  />
                </TouchableOpacity>

                <TouchableOpacity className="flex-1 bg-secondary-50 rounded-2xl px-4 py-4 flex-row items-center justify-between">
                  <Text className="text-gray-700 text-base">
                    {formData.year}
                  </Text>
                  <ArrowLeft2 
                    size="20" 
                    color="#9CA3AF" 
                    variant="Outline"
                    style={{ transform: [{ rotate: '-90deg' }] }}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {/* Save Button */}
          <TouchableOpacity
            onPress={handleSave}
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
              Lưu thay đổi
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </ImageBackground>
  )
}

