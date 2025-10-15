import images from '@/constants/images'
import { ImageBackground, StatusBar, View, Text, TouchableOpacity, ScrollView, Image } from 'react-native'
import HeaderBackComponent from '@/components/HeaderBackComponent'
import React, { useState } from 'react'
import { Play } from 'iconsax-react-native'

interface MoodData {
  day: string
  mood: 'happy' | 'normal' | 'sad' | 'very-sad' | null
  height: number
}

interface Note {
  date: string
  content: string
}

export default function StoryScreen() {
  const [selectedPeriod, setSelectedPeriod] = useState('Ngày')

  // Mock data for the week
  const weekData: MoodData[] = [
    { day: 'T2', mood: 'sad', height: 60 },
    { day: 'T3', mood: 'normal', height: 80 },
    { day: 'T4', mood: 'happy', height: 100 },
    { day: 'T5', mood: 'sad', height: 60 },
    { day: 'T6', mood: 'normal', height: 80 },
    { day: 'T7', mood: null, height: 0 },
    { day: 'CN', mood: null, height: 0 },
  ]

  const notes: Note[] = [
    { date: 'Thứ 6, 12/01/2025', content: 'Hôm nay gặp con cháu, rất vui!' },
    { date: 'Thứ 5, 11/01/2025', content: 'Hơi mệt.' },
    { date: 'Thứ 4, 11/01/2025', content: 'Cà phê chiu chiu.' },
  ]

  const getMoodColor = (mood: MoodData['mood']) => {
    switch (mood) {
      case 'happy':
        return 'bg-green-400'
      case 'normal':
        return 'bg-cyan-400'
      case 'sad':
        return 'bg-yellow-400'
      case 'very-sad':
        return 'bg-orange-400'
      default:
        return 'bg-gray-200'
    }
  }

  return (
    <ImageBackground source={images.bgLibrary} className="flex-1">
      <StatusBar translucent backgroundColor={'transparent'} barStyle="light-content" />
      <View className="flex-1 px-4 mt-16">
        <HeaderBackComponent title="Nhật ký cảm xúc" />

        <ScrollView 
          className="flex-1 mt-6"
          showsVerticalScrollIndicator={false}
        >
          {/* Emotion Chart Card */}
          <View className="bg-secondary-50 rounded-3xl p-5 mb-4" style={{
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 8,
            elevation: 3
          }}>
            {/* Header */}
            <View className="flex-row items-center justify-between mb-6">
              <View className="flex-row items-center gap-2">
                <View className="w-8 h-8 bg-emerald-100 rounded-full items-center justify-center">
                  <Text className="text-lg">💚</Text>
                </View>
                <Text className="text-lg font-bold text-gray-800">Cảm xúc</Text>
              </View>
              <TouchableOpacity className="flex-row items-center gap-1 px-3 py-1 bg-gray-50 rounded-lg">
                <Text className="text-gray-700">{selectedPeriod}</Text>
                <Text className="text-gray-500">▼</Text>
              </TouchableOpacity>
            </View>

            {/* Bar Chart */}
            <View className="mb-6">
              <View className="flex-row items-end justify-between h-40 px-2">
                {weekData.map((data, index) => (
                  <View key={index} className="items-center flex-1">
                    <View className="flex-1 justify-end w-full items-center mb-2">
                      {data.mood && (
                        <>
                          {/* Emoji on T4 */}
                          {data.day === 'T4' && (
                            <View className="absolute -top-8 bg-gray-800 rounded-full w-10 h-10 items-center justify-center z-10">
                              <Text className="text-xl">😊</Text>
                            </View>
                          )}
                          <View 
                            className={`w-12 rounded-full ${getMoodColor(data.mood)}`}
                            style={{ height: `${data.height}%` }}
                          />
                        </>
                      )}
                      {!data.mood && (
                        <View 
                          className="w-12 rounded-full bg-gray-200"
                          style={{ height: '35%' }}
                        />
                      )}
                    </View>
                    <Text className="text-gray-600 text-sm font-medium mt-1">
                      {data.day}
                    </Text>
                  </View>
                ))}
              </View>
            </View>

            {/* Legend */}
            <View className="flex-row flex-wrap gap-x-6 gap-y-2">
              <View className="flex-row items-center gap-2">
                <View className="w-3 h-3 rounded-full bg-green-400" />
                <Text className="text-gray-700 text-sm">Vui vẻ</Text>
              </View>
              <View className="flex-row items-center gap-2">
                <View className="w-3 h-3 rounded-full bg-cyan-400" />
                <Text className="text-gray-700 text-sm">Bình thường</Text>
              </View>
              <View className="flex-row items-center gap-2">
                <View className="w-3 h-3 rounded-full bg-yellow-400" />
                <Text className="text-gray-700 text-sm">Hơi buồn</Text>
              </View>
              <View className="flex-row items-center gap-2">
                <View className="w-3 h-3 rounded-full bg-orange-400" />
                <Text className="text-gray-700 text-sm">Rất buồn</Text>
              </View>
            </View>
          </View>

          {/* Summary Text */}
          <View className="bg-secondary-50 rounded-2xl p-4 mb-4" style={{
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 8,
            elevation: 3
          }}>
            <Text className="text-gray-700 text-base leading-6">
              Tuần này, bạn đã có <Text className="font-bold text-green-500">5 ngày Vui vẻ</Text> và <Text className="font-bold text-cyan-500">2 ngày bình thường</Text>.
            </Text>
          </View>

          {/* Music Suggestion Card */}
          <View className="bg-secondary-50 rounded-2xl p-4 mb-4 flex-row items-center" style={{
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 8,
            elevation: 3
          }}>
            <Image 
              source={images.bannerHeathy}
              className="w-24 h-24 rounded-xl"
              resizeMode="cover"
            />
            <View className="flex-1 ml-4">
              <Text className="text-lg font-bold text-gray-800 mb-1">
                Nhạc gợi ý
              </Text>
              <Text className="text-sm text-gray-500 leading-5">
                Dựa theo cảm xúc{'\n'}của bạn hôm nay!
              </Text>
            </View>
            <TouchableOpacity className="w-14 h-14 bg-primary-main rounded-full items-center justify-center">
              <Play size="24" color="#FFFFFF" variant="Bold"/>
            </TouchableOpacity>
          </View>

          {/* Notes Section */}
          <View className="mb-6">
            <Text className="text-xl font-bold text-gray-800 mb-4">
              Ghi chú
            </Text>
            
            {notes.map((note, index) => (
              <View 
                key={index}
                className="bg-secondary-50 rounded-2xl p-4 mb-3"
                style={{ 
                  shadowColor: '#000',
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.1,
                  shadowRadius: 8,
                  elevation: 3
                }}
              >
                <Text className="text-gray-500 text-sm mb-1">
                  {note.date}
                </Text>
                <Text className="text-gray-800 text-base leading-6">
                  {note.content}
                </Text>
              </View>
            ))}
          </View>
        </ScrollView>
      </View>
    </ImageBackground>
  )
}