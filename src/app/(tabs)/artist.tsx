import React from 'react'
import { View, ScrollView, ImageBackground, Text, Image } from 'react-native'
import HeaderHome from '@/components/home/HeaderHome'
import images from '@/constants/images'
import { Mobile, MusicPlay, Play } from 'iconsax-react-native'
import { useRouter } from 'expo-router'
import IconHeart from '~/assets/icon-svg/heathy/IconHeart'
import IconThien from '~/assets/icon-svg/heathy/IconThien'
import IconDiBo from '~/assets/icon-svg/heathy/IconDiBo'
import IconWater from '~/assets/icon-svg/heathy/IconWater'

export default function LearnScreen() {
  const router = useRouter()

  return (
    <ImageBackground source={images.bgHeathy} className=" flex-1">
      <HeaderHome />
      <ScrollView className="mx-4 mt-8 flex-1" showsVerticalScrollIndicator={false}>
        <Text className="text-primary font-semibold text-4xl">Chăm sóc tinh thần{'\n'}
          & sức khỏe</Text>
        <Text className="text-xl">Mỗi ngày một chút, bạn sẽ thấy{'\n'}khỏe hơn và vui vẻ hơn!</Text>
        <View className="p-4 bg-white rounded-2xl mt-4 flex-row gap-4 items-center justify-between">
          <View className="flex-row gap-4 items-center">
            <Image
              source={images.bannerHeathy}
              className="w-[88px] h-[88px] rounded-3xl"
              resizeMode="cover"
            />
            <Text className="text-xl font-bold">Bài tập hít thở &{'\n'}vận động nhẹ</Text>
          </View>

          <View className="bg-primary-main w-10 h-10 rounded-full items-center justify-center">
            <Play size="20" color="#FFFFFF" variant="Bold"/>
          </View>
        </View>
        <Text className="text-left mt-3 ml-3 text-secondary">Bài tập này giúp thư giãn và tăng cường{'\n'}tuần hoàn máu. Hãy làm theo nhé!</Text>
        <View className="mt-4 p-6 bg-white rounded-2xl">
          <View className="flex-row mb-4 items-center justify-between">
            <Text className="text-2xl font-semibold">Thói quen mỗi ngày</Text>
            <IconHeart />
          </View>
          <View className="flex-row items-center justify-between">
            <View className="flex-row gap-4 items-center">
              <IconThien />
              <Text className="text-lg font-bold">Hít thở vận động nhẹ</Text>
            </View>
            <Text>5 phút</Text>
          </View>
          <View className="flex-row my-2 items-center justify-between">
            <View className="flex-row gap-4 items-center">
              <IconWater />
              <Text className="text-lg font-bold">Uống nước</Text>
            </View>
            <Text>2 lít</Text>
          </View>
          <View className="flex-row items-center justify-between">
            <View className="flex-row gap-4 items-center">
              <IconDiBo />
              <Text className="text-lg font-bold">Đi bộ</Text>
            </View>
            <Text>15 phút</Text>
          </View>
          <View className="flex-row gap-4 my-2 items-center">
            <MusicPlay size="32" color="#FF5630" variant="Bold"/>
            <Text className="text-lg font-bold">Nghe nhạc yêu thích</Text>
          </View>
          <View className="flex-row gap-4 items-center">
            <Mobile size="32" color="#078DEE" variant="Bold"/>
            <Text className="text-lg font-bold">Gọi điện cho người thân</Text>
          </View>

        </View>
        <View className="mt-4 p-6 bg-white rounded-2xl">
          <Text className="text-2xl font-semibold">Bạn cảm thấy thế nào{'\n'}sau khi hoạt động?</Text>
          <View className="h-10 rounded-lg bg-[#919EAB14] mt-4 items-center justify-center">
            <Text className="font-semibold text-sm">😄 Vui hơn</Text>
          </View>
          <View className="h-10 rounded-lg bg-[#919EAB14] mt-4 items-center justify-center">
            <Text className="font-semibold text-sm">😦 Bình thường</Text>
          </View>
          <View className="h-10 rounded-lg bg-[#919EAB14] mt-4 items-center justify-center">
            <Text className="font-semibold text-sm">😵‍💫 Mệt hơn</Text>
          </View>

        </View>
        <View className="h-40" />

      </ScrollView>
    </ImageBackground>
  )
}
