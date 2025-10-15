import images from '@/constants/images'
import { ImageBackground, StatusBar, View, Text, TouchableOpacity, Image, TextInput, ScrollView } from 'react-native'
import HeaderBackComponent from '@/components/HeaderBackComponent'
import React, { useState } from 'react'
import { router } from 'expo-router'
import { ERouteTable } from '@/constants/route-table'

interface SurveyAnswers {
  mood?: string
  activity?: string
  worry?: string
  physical?: string
  message?: string
}

export default function SurveyScreen() {
  const [currentStep, setCurrentStep] = useState(1)
  const [answers, setAnswers] = useState<SurveyAnswers>({})
  const [selectedOption, setSelectedOption] = useState<string | null>(null)

  const handleSelectOption = (key: keyof SurveyAnswers, value: string) => {
    setSelectedOption(value)
    setAnswers({ ...answers, [key]: value })
  }

  const handleNext = () => {
    if (currentStep < 5) {
      setCurrentStep(currentStep + 1)
      setSelectedOption(null)
    } else {
      // Navigate to story screen after completing survey
      router.push(ERouteTable.STORY_SCREEN)
    }
  }

  const handleMessageChange = (text: string) => {
    if (text.length <= 199) {
      setAnswers({ ...answers, message: text })
    }
  }

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <View className="flex-1">
            <Image 
              source={images.bannerHeathy} 
              className="w-full h-64 rounded-3xl mb-6"
              resizeMode="cover"
            />
            <Text className="text-2xl font-bold text-gray-800 mb-2">
              Hôm nay bạn cảm thấy thế nào?
            </Text>
            <Text className="text-base text-gray-500 mb-8">
              Chọn một đáp án phù hợp.
            </Text>
            
            <View className="gap-4 mb-8">
              <View className="flex-row gap-4">
                <TouchableOpacity
                  onPress={() => handleSelectOption('mood', 'Rất vui')}
                  className={`flex-1 py-6 rounded-2xl  ${
                    selectedOption === 'Rất vui' ? 'bg-emerald-50 border-emerald-600' : 'bg-secondary-50 '
                  }`}
                >
                  <Text className={`text-center text-lg font-semibold ${
                    selectedOption === 'Rất vui' ? 'text-emerald-700' : 'text-gray-700'
                  }`}>
                    Rất vui
                  </Text>
                </TouchableOpacity>
                
                <TouchableOpacity
                  onPress={() => handleSelectOption('mood', 'Bình thường')}
                  className={`flex-1 py-6 rounded-2xl  ${
                    selectedOption === 'Bình thường' ? 'bg-emerald-50 border-emerald-600' : 'bg-secondary-50 '
                  }`}
                >
                  <Text className={`text-center text-lg font-semibold ${
                    selectedOption === 'Bình thường' ? 'text-emerald-700' : 'text-gray-700'
                  }`}>
                    Bình thường
                  </Text>
                </TouchableOpacity>
              </View>
              
              <TouchableOpacity
                onPress={() => handleSelectOption('mood', 'Hơi buồn')}
                className={`py-6 rounded-2xl  ${
                  selectedOption === 'Hơi buồn' ? 'bg-emerald-50 border-emerald-600' : 'bg-secondary-50'
                }`}
              >
                <Text className={`text-center text-lg font-semibold ${
                  selectedOption === 'Hơi buồn' ? 'text-emerald-700' : 'text-gray-700'
                }`}>
                  Hơi buồn
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )

      case 2:
        return (
          <View className="flex-1">
            <Image 
              source={images.bannerHeathy} 
              className="w-full h-64 rounded-3xl mb-6"
              resizeMode="cover"
            />
            <Text className="text-2xl font-bold text-gray-800 mb-2">
              Sáng nay bạn đã làm gì khiến bạn thân cảm thấy thoải mái?
            </Text>
            <Text className="text-base text-gray-500 mb-8">
              Chọn một đáp án phù hợp.
            </Text>
            
            <View className="gap-4 mb-8">
              <View className="flex-row gap-4">
                <TouchableOpacity
                  onPress={() => handleSelectOption('activity', 'Tập thể dục')}
                  className={`flex-1 py-6 rounded-2xl  ${
                    selectedOption === 'Tập thể dục' ? 'bg-emerald-50 border-emerald-600' : 'bg-secondary-50 '
                  }`}
                >
                  <Text className={`text-center text-lg font-semibold ${
                    selectedOption === 'Tập thể dục' ? 'text-emerald-700' : 'text-gray-700'
                  }`}>
                    Tập thể dục
                  </Text>
                </TouchableOpacity>
                
                <TouchableOpacity
                  onPress={() => handleSelectOption('activity', 'Nghe nhạc')}
                  className={`flex-1 py-6 rounded-2xl  ${
                    selectedOption === 'Nghe nhạc' ? 'bg-emerald-50 border-emerald-600' : 'bg-secondary-50 '
                  }`}
                >
                  <Text className={`text-center text-lg font-semibold ${
                    selectedOption === 'Nghe nhạc' ? 'text-emerald-700' : 'text-gray-700'
                  }`}>
                    Nghe nhạc
                  </Text>
                </TouchableOpacity>
              </View>
              
              <View className="flex-row gap-4">
                <TouchableOpacity
                  onPress={() => handleSelectOption('activity', 'Gặp gỡ con cháu')}
                  className={`flex-1 py-6 rounded-2xl  ${
                    selectedOption === 'Gặp gỡ con cháu' ? 'bg-emerald-50 border-emerald-600' : 'bg-secondary-50 '
                  }`}
                >
                  <Text className={`text-center text-lg font-semibold ${
                    selectedOption === 'Gặp gỡ con cháu' ? 'text-emerald-700' : 'text-gray-700'
                  }`}>
                    Gặp gỡ{'\n'}con cháu
                  </Text>
                </TouchableOpacity>
                
                <TouchableOpacity
                  onPress={() => handleSelectOption('activity', 'Không')}
                  className={`flex-1 py-6 rounded-2xl  ${
                    selectedOption === 'Không' ? 'bg-emerald-50 border-emerald-600' : 'bg-secondary-50 '
                  }`}
                >
                  <Text className={`text-center text-lg font-semibold ${
                    selectedOption === 'Không' ? 'text-emerald-700' : 'text-gray-700'
                  }`}>
                    Không
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )

      case 3:
        return (
          <View className="flex-1">
            <Image 
              source={images.bannerHeathy} 
              className="w-full h-64 rounded-3xl mb-6"
              resizeMode="cover"
            />
            <Text className="text-2xl font-bold text-gray-800 mb-2">
              Có điều gì khiến bạn lo lắng không?
            </Text>
            <Text className="text-base text-gray-500 mb-8">
              Chọn một đáp án phù hợp.
            </Text>
            
            <View className="gap-4 mb-8">
              <TouchableOpacity
                onPress={() => handleSelectOption('worry', 'Có')}
                className={`py-6 rounded-2xl  ${
                  selectedOption === 'Có' ? 'bg-emerald-50 border-emerald-600' : 'bg-secondary-50 '
                }`}
              >
                <Text className={`text-center text-lg font-semibold ${
                  selectedOption === 'Có' ? 'text-emerald-700' : 'text-gray-700'
                }`}>
                  Có
                </Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                onPress={() => handleSelectOption('worry', 'Không')}
                className={`py-6 rounded-2xl  ${
                  selectedOption === 'Không' ? 'bg-emerald-50 border-emerald-600' : 'bg-secondary-50 '
                }`}
              >
                <Text className={`text-center text-lg font-semibold ${
                  selectedOption === 'Không' ? 'text-emerald-700' : 'text-gray-700'
                }`}>
                  Không
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )

      case 4:
        return (
          <View className="flex-1">
            <Image 
              source={images.bannerHeathy} 
              className="w-full h-64 rounded-3xl mb-6"
              resizeMode="cover"
            />
            <Text className="text-2xl font-bold text-gray-800 mb-2">
              Hôm nay bạn có cảm thấy dễ chịu về mặt thể chất không?
            </Text>
            <Text className="text-base text-gray-500 mb-8">
              Chọn một đáp án phù hợp.
            </Text>
            
            <View className="gap-4 mb-8">
              <View className="flex-row gap-4">
                <TouchableOpacity
                  onPress={() => handleSelectOption('physical', 'Rất tốt')}
                  className={`flex-1 py-6 rounded-2xl  ${
                    selectedOption === 'Rất tốt' ? 'bg-emerald-50 border-emerald-600' : 'bg-secondary-50 '
                  }`}
                >
                  <Text className={`text-center text-lg font-semibold ${
                    selectedOption === 'Rất tốt' ? 'text-emerald-700' : 'text-gray-700'
                  }`}>
                    Rất tốt
                  </Text>
                </TouchableOpacity>
                
                <TouchableOpacity
                  onPress={() => handleSelectOption('physical', 'Bình thường')}
                  className={`flex-1 py-6 rounded-2xl  ${
                    selectedOption === 'Bình thường' ? 'bg-emerald-50 border-emerald-600' : 'bg-secondary-50 '
                  }`}
                >
                  <Text className={`text-center text-lg font-semibold ${
                    selectedOption === 'Bình thường' ? 'text-emerald-700' : 'text-gray-700'
                  }`}>
                    Bình thường
                  </Text>
                </TouchableOpacity>
              </View>
              
              <TouchableOpacity
                onPress={() => handleSelectOption('physical', 'Hơi khó chịu')}
                className={`py-6 rounded-2xl  ${
                  selectedOption === 'Hơi khó chịu' ? 'bg-emerald-50 border-emerald-600' : 'bg-secondary-50 '
                }`}
              >
                <Text className={`text-center text-lg font-semibold ${
                  selectedOption === 'Hơi khó chịu' ? 'text-emerald-700' : 'text-gray-700'
                }`}>
                  Hơi khó chịu
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )

      case 5:
        return (
          <View className="flex-1">
            <Text className="text-2xl font-bold text-gray-800 mb-8">
              Bạn muốn nhắn gửi điều gì cho bản thân hoặc cho con cháu không?
            </Text>
            
            <View className="flex-1">
              <TextInput
                multiline
                placeholder="Nhập nội dung..."
                value={answers.message || ''}
                onChangeText={handleMessageChange}
                className="bg-white rounded-2xl p-4 text-base text-primary h-40"
                style={{ 
                  textAlignVertical: 'top',
                  shadowColor: '#000',
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.1,
                  shadowRadius: 8,
                  elevation: 3
                }}
              />
              <Text className="text-center text-gray-400 mt-4 text-sm">
                {answers.message?.length || 0}/199
              </Text>
            </View>
          </View>
        )

      default:
        return null
    }
  }

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return !!answers.mood
      case 2:
        return !!answers.activity
      case 3:
        return !!answers.worry
      case 4:
        return !!answers.physical
      case 5:
        return true // Last step always allows proceeding
      default:
        return false
    }
  }

  return (
    <ImageBackground source={images.bgLibrary} className="flex-1">
      <StatusBar translucent backgroundColor={'transparent'} barStyle="light-content" />
      <View className="flex-1 px-4 mt-16">
        <HeaderBackComponent title="Khảo sát cảm xúc hàng ngày" />
        
        <ScrollView 
          className="flex-1 mt-6"
          showsVerticalScrollIndicator={false}
        >
          {renderStep()}
        </ScrollView>

        {/* Bottom Button */}
        <View className="pb-8 pt-4">
          <TouchableOpacity
            onPress={handleNext}
            disabled={!canProceed()}
            className={`py-4 rounded-2xl ${
              canProceed() ? 'bg-emerald-700' : 'bg-gray-300'
            }`}
          >
            <Text className="text-white text-center text-lg font-bold">
              {currentStep === 5 ? 'Tiếp tục' : 'Tiếp theo'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  )
}