import React from 'react'
import { Image, ScrollView, StatusBar, Text, TouchableOpacity, View } from 'react-native'
import HeaderComponent from '@/components/HeaderComponent'
import images from '@/constants/images'
import { useRouter } from 'expo-router'
import { ERouteTable } from '@/constants/route-table'

export default function PracticeScreen() {
  const router = useRouter()
  return (
    <View className="bg-secondary-lighter flex-1">
      <StatusBar translucent backgroundColor={'transparent'} barStyle="light-content" />
      <HeaderComponent />
      <ScrollView className="mx-4 mt-4">
        <TouchableOpacity
          onPress={() => {
            router.push({
              pathname: ERouteTable.LIBRARY_DETAIL,
              params: { title: 'Nhạc xưa' },
            })
          }}
          className="rounded-3xl relative flex-row justify-between"
        >
          <Image
            source={images.bannerNhacXua}
            className="w-full h-36 rounded-3xl"
            resizeMode="cover"
          />
          <View className="absolute inset-0 bg-[rgba(0,0,0,0.4)] rounded-3xl" />
          <View className="absolute right-8 mt-20">
            <Text className="text-sm text-white font-semibold">TỔNG HỢP</Text>
            <Text className="text-2xl text-white font-semibold">Nhạc xưa</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            router.push({
              pathname: ERouteTable.LIBRARY_DETAIL,
              params: { title: 'Âm thanh thiên nhiên' },
            })
          }}
          className="rounded-3xl mt-4 relative flex-row justify-between"
        >
          <Image
            source={images.bannerNatual}
            className="w-full h-36 rounded-3xl"
            resizeMode="cover"
          />
          <View className="absolute inset-0 bg-[rgba(0,0,0,0.4)] rounded-3xl" />
          <View className="absolute left-8 mt-20">
            <Text className="text-sm text-white font-semibold">TỔNG HỢP</Text>
            <Text className="text-2xl text-white font-semibold">Âm thanh thiên nhiên</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            router.push({
              pathname: ERouteTable.LIBRARY_DETAIL,
              params: { title: 'Hướng dẫn thiền' },
            })
          }}
          className="rounded-3xl mt-4 relative flex-row justify-between"
        >
          <Image
            source={images.bannerThien}
            className="w-full h-36 rounded-3xl"
            resizeMode="cover"
          />
          <View className="absolute inset-0 bg-[rgba(0,0,0,0.4)] rounded-3xl" />
          <View className="absolute right-8 mt-20">
            <Text className="text-sm text-white font-semibold">TỔNG HỢP</Text>
            <Text className="text-2xl text-white font-semibold">Hướng dẫn thiền</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            router.push({
              pathname: ERouteTable.LIBRARY_DETAIL,
              params: { title: 'Podcast' },
            })
          }}
          className="rounded-3xl mt-4 relative flex-row justify-between"
        >
          <Image
            source={images.bannerPodcast}
            className="w-full h-36 rounded-3xl"
            resizeMode="cover"
          />
          <View className="absolute inset-0 bg-[rgba(0,0,0,0.4)] rounded-3xl" />
          <View className="absolute left-8 mt-20">
            <Text className="text-sm text-white font-semibold">TỔNG HỢP</Text>
            <Text className="text-2xl text-white font-semibold">Podcast</Text>
          </View>
        </TouchableOpacity>
      </ScrollView>
    </View>
  )
}
