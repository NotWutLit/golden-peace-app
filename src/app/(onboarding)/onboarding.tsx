import { Text, ImageBackground, TouchableOpacity, View, Image, StatusBar } from 'react-native'
import { images } from '@/constants'
import { ERouteTable } from '@/constants/route-table'
import { router } from 'expo-router'

export default function Onboarding() {
  return (
    <ImageBackground source={images.onboarding2} resizeMode="cover" className="h-full px-8 pt-16">
      <StatusBar translucent backgroundColor={'transparent'} barStyle="light-content" />
      <Text className="text-4xl leading-[40px] font-normal mt-[50vh] text-white">
        An Tâm Tuổi Vàng {'\n'}Sống vui, sống khỏe {'\n'}mỗi ngày
      </Text>
      <Text className="py-6 text-[#FFFFFFA3]">
        Mỗi sáng, bạn sẽ nhận được một thông điệp tích cực. Chúng tôi cũng gợi ý các bài tập nhẹ nhàng và danh sách nhạc phù hợp để giúp tinh thần luôn thoải mái.
      </Text>
      <View>
        <TouchableOpacity
          className="bg-primary-main w-max rounded-[16px] px-[70px] h-14 justify-center"
          onPress={() => router.replace(ERouteTable.SIGIN_IN)}
        >
          <Text className="text-center text-white text-lg font-bold">Tiếp tục</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  )
}
