import images from '@/constants/images'
import { ImageBackground, StatusBar, View, Text, TouchableOpacity, ScrollView } from 'react-native'
import React from 'react'
import { ArrowLeft2 } from 'iconsax-react-native'
import { useRouter } from 'expo-router'

export default function PrivacyPolicy() {
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
            Chính sách{'\n'}bảo mật
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
            Chúng tôi tại An Tâm Tuổi Vàng cam kết bảo vệ thông tin cá nhân của bạn một cách nghiêm ngặt. Chính sách này mô tả cách chúng tôi thu thập, sử dụng và bảo vệ dữ liệu của bạn.
          </Text>

          {/* Section 1 */}
          <View className="mb-6">
            <Text className="text-gray-800 text-lg font-bold mb-3">
              1. Thông tin chúng tôi thu thập
            </Text>
            
            <View className="mb-4">
              <Text className="text-gray-800 text-base font-semibold mb-2">
                • Thông tin cá nhân:
              </Text>
              <Text className="text-gray-700 text-base leading-6">
                Chúng tôi chỉ thu thập thông tin cơ bản như tên và số điện thoại (nếu bạn muốn đăng ký), nhằm mục đích xác thực và liên lạc khi cần thiết.
              </Text>
            </View>

            <View className="mb-4">
              <Text className="text-gray-800 text-base font-semibold mb-2">
                • Dữ liệu nhật ký cảm xúc:
              </Text>
              <Text className="text-gray-700 text-base leading-6">
                Dữ liệu này bao gồm các câu trả lời của bạn về tâm trạng hàng ngày, nhưng chúng tôi cam kết không chia sẻ nó với bất kỳ ai. Dữ liệu này chỉ được dùng để hiển thị biểu đồ và thống kê cá nhân cho bạn.
              </Text>
            </View>
          </View>

          {/* Section 2 */}
          <View className="mb-6">
            <Text className="text-gray-800 text-lg font-bold mb-3">
              2. Cách chúng tôi sử dụng thông tin
            </Text>
            
            <Text className="text-gray-700 text-base leading-6 mb-2">
              Chúng tôi sử dụng thông tin để cung cấp và cải thiện các chức năng của ứng dụng như:
            </Text>
            
            <Text className="text-gray-700 text-base leading-6 mb-2">
              • Gửi thông điệp tích cực và gợi ý thư giản phù hợp.
            </Text>
            <Text className="text-gray-700 text-base leading-6 mb-2">
              • Tạo biểu đồ nhật ký cảm xúc cá nhân.
            </Text>
            
            <Text className="text-gray-700 text-base leading-6 mt-3">
              Chúng tôi tuyệt đối không bán, cho thuê hoặc chia sẻ thông tin của bạn với bên thứ ba cho mục đích thương mại.
            </Text>
          </View>

          {/* Section 3 */}
          <View className="mb-6">
            <Text className="text-gray-800 text-lg font-bold mb-3">
              3. Bảo mật thông tin
            </Text>
            
            <Text className="text-gray-700 text-base leading-6 mb-3">
              Mọi dữ liệu cá nhân và dữ liệu nhật ký cảm xúc của bạn đều được mã hóa và lưu trữ an toàn.
            </Text>
            
            <Text className="text-gray-700 text-base leading-6">
              Chúng tôi sử dụng các biện pháp bảo mật tiên tiến để đảm bảo thông tin của bạn không bị truy cập trái phép.
            </Text>
          </View>

          {/* Section 4 */}
          <View className="mb-6">
            <Text className="text-gray-800 text-lg font-bold mb-3">
              4. Quyền của bạn
            </Text>
            
            <Text className="text-gray-700 text-base leading-6 mb-2">
              Bạn có quyền:
            </Text>
            
            <Text className="text-gray-700 text-base leading-6 mb-2">
              • Truy cập và chỉnh sửa thông tin cá nhân của mình bất cứ lúc nào.
            </Text>
            <Text className="text-gray-700 text-base leading-6 mb-2">
              • Yêu cầu xóa tài khoản và toàn bộ dữ liệu liên quan.
            </Text>
            <Text className="text-gray-700 text-base leading-6">
              • Liên hệ với chúng tôi nếu có bất kỳ câu hỏi hoặc thắc mắc nào về quyền riêng tư của bạn.
            </Text>
          </View>

          {/* Section 5 */}
          <View className="mb-8">
            <Text className="text-gray-800 text-lg font-bold mb-3">
              5. Thay đổi chính sách
            </Text>
            
            <Text className="text-gray-700 text-base leading-6">
              Chúng tôi có thể cập nhật chính sách bảo mật này theo thời gian. Mọi thay đổi sẽ được thông báo rõ ràng trong ứng dụng và bạn sẽ được yêu cầu đồng ý lại nếu cần.
            </Text>
          </View>
        </ScrollView>
      </View>
    </ImageBackground>
  )
}

