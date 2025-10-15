import images from '@/constants/images'
import { ImageBackground, StatusBar, View, Text, TouchableOpacity, ScrollView } from 'react-native'
import React from 'react'
import { ArrowLeft2 } from 'iconsax-react-native'
import { useRouter } from 'expo-router'

export default function TermCondition() {
  const router = useRouter()

  return (
    <ImageBackground source={images.bgLibrary} className="flex-1">
      <StatusBar translucent backgroundColor={'transparent'} barStyle="light-content" />
      <View className="flex-1 px-4 mt-16">
        {/* Header */}
        <View className="flex-row items-center mb-6">
          <TouchableOpacity 
            className="items-center h-16 w-16 rounded-3xl justify-center bg-secondary-50" 
            onPress={() => router.back()}
          >
            <ArrowLeft2 size="24" color="#212B36" variant="Outline"/>
          </TouchableOpacity>
          <Text className="text-gray-800 text-2xl font-bold flex-1 text-center mr-16">
            Điều khoản{'\n'}& Điều kiện
          </Text>
        </View>

        <ScrollView 
          className="flex-1"
          showsVerticalScrollIndicator={false}
        >
          {/* Last Updated */}
          <Text className="text-gray-500 text-sm mb-4">
            Cập nhật lần cuối: 01/07/2025
          </Text>

          {/* Introduction */}
          <Text className="text-gray-700 text-base leading-6 mb-6">
            Chào mừng bạn đến với An Tâm Tuổi Vàng. Bằng việc sử dụng ứng dụng này, bạn đã đồng ý với các điều khoản dưới đây.
          </Text>

          {/* Section 1 */}
          <View className="mb-6">
            <Text className="text-gray-800 text-lg font-bold mb-3">
              1. Quyền sử dụng
            </Text>
            
            <Text className="text-gray-700 text-base leading-6 mb-3">
              • Ứng dụng này được cung cấp miễn phí cho mục đích cá nhân, phi thương mại.
            </Text>
            
            <Text className="text-gray-700 text-base leading-6">
              • Bạn được phép sử dụng các chức năng như xem thông điệp, thực hành bài tập và ghi lại nhật ký cảm xúc.
            </Text>
          </View>

          {/* Section 2 */}
          <View className="mb-6">
            <Text className="text-gray-800 text-lg font-bold mb-3">
              2. Giới hạn trách nhiệm
            </Text>
            
            <Text className="text-gray-700 text-base leading-6 mb-3">
              • Các lời khuyên và gợi ý trong ứng dụng chỉ mang tính chất tham khảo. Chúng tôi không phải là chuyên gia y tế. Nếu bạn có bất kỳ vấn đề nghiêm trọng nào về sức khỏe tinh thần, hãy tìm đến sự giúp đỡ của bác sĩ hoặc chuyên gia tâm lý.
            </Text>
            
            <Text className="text-gray-700 text-base leading-6">
              • Chúng tôi không chịu trách nhiệm về bất kỳ thiệt hại nào phát sinh từ việc sử dụng hoặc không thể sử dụng ứng dụng này.
            </Text>
          </View>

          {/* Section 3 */}
          <View className="mb-6">
            <Text className="text-gray-800 text-lg font-bold mb-3">
              3. Thay đổi điều khoản
            </Text>
            
            <Text className="text-gray-700 text-base leading-6">
              Chúng tôi có quyền cập nhật các điều khoản này bất cứ lúc nào. Mọi thay đổi sẽ được thông báo rõ ràng trong ứng dụng.
            </Text>
          </View>

          {/* Section 4 */}
          <View className="mb-8">
            <Text className="text-gray-800 text-lg font-bold mb-3">
              4. Quyền sở hữu trí tuệ
            </Text>
            
            <Text className="text-gray-700 text-base leading-6">
              Tất cả nội dung, bao gồm hình ảnh, video và văn bản trong ứng dụng, thuộc quyền sở hữu của An Tâm Tuổi Vàng và được bảo vệ bởi luật bản quyền. Bạn không được sao chép, phân phối hoặc sử dụng nội dung này cho mục đích thương mại mà không có sự đồng ý của chúng tôi.
            </Text>
          </View>
        </ScrollView>
      </View>
    </ImageBackground>
  )
}

