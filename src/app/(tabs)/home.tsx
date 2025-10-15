import { ImageBackground, View, Text, TouchableOpacity, Image } from 'react-native'
import HeaderHome from 'src/components/home/HeaderHome'
import React from 'react'
import { useRouter } from 'expo-router'
import images from '@/constants/images'
import { ArrowRight, MusicPlaylist } from 'iconsax-react-native'
import { ERouteTable } from '@/constants/route-table'

export default function HomeScreen() {
  const router = useRouter()

  return (
    <ImageBackground source={images.bgHome} className="bg-[#161c24] flex-1">
      <HeaderHome />
      <View className="px-4 mt-4 flex-1">
        <Text className="text-primary font-semibold text-4xl">Xin chào!</Text>
        <View className="flex-row items-center justify-between mt-4">
          <Text className="text-xl">Lời yêu thương{'\n'}mỗi ngày!</Text>
          <TouchableOpacity onPress={() => router.push(ERouteTable.SUGGESTION_MUSIC)} className="bg-white rounded-full px-8 h-[72px] flex-row items-center gap-2">
            <MusicPlaylist size="24" color="#212B36" variant="Bold"/>
            <Text className="text-3xl text-primary font-semibold">8</Text>
          </TouchableOpacity>
        </View>
        <Text className="mt-6 text-primary font-medium text-2xl">
          Mỗi sáng một câu chuyện vui.{'\n'}
          Chúc bạn ngày mới thật{'\n'}
          an yên và hạnh phúc.{'\n'}
        </Text>
      </View>
      <View className="mx-4 mb-40 p-4 rounded-3xl relative flex-row justify-between">
        <Image
          source={images.bannerDiscovery}
          className="w-full h-36 rounded-3xl"
          resizeMode="cover"
        />
        <View className="absolute right-10 mt-10">
          <Text className="text-xl font-semibold">Nhật ký cảm xúc</Text>
          <TouchableOpacity onPress={() => router.push(ERouteTable.SURVEY_SCREEN)} className="flex-row items-center gap-2 mt-2 ml-6">
            <Text className="text-tertiary-main font-semibold">Khám phá</Text>
            <ArrowRight size="20" color="#ED882D" variant="Outline"/>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  )
}
