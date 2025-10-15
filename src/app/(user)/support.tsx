import images from '@/constants/images'
import { ImageBackground, StatusBar, View, Text, TouchableOpacity, ScrollView, TextInput } from 'react-native'
import React, { useState } from 'react'
import { ArrowLeft2, ArrowDown2, Send } from 'iconsax-react-native'
import { useRouter } from 'expo-router'

interface FAQItem {
  id: string
  question: string
  answer: string
}

export default function Support() {
  const router = useRouter()
  const [expandedFAQ, setExpandedFAQ] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  })

  const faqData: FAQItem[] = [
    {
      id: '1',
      question: 'Ứng dụng này có thực sự phù hợp với người lớn tuổi không?',
      answer: 'Có! Ứng dụng được thiết kế đặc biệt cho người cao tuổi với giao diện thân thiện, chữ lớn và dễ sử dụng.',
    },
    {
      id: '2',
      question: 'Nếu tôi không biết cách sử dụng, có ai hướng dẫn không?',
      answer: 'Chúng tôi có hướng dẫn chi tiết trong ứng dụng và đội ngũ hỗ trợ sẵn sàng giúp đỡ bạn qua email hoặc điện thoại.',
    },
    {
      id: '3',
      question: 'Ứng dụng này có thu phí không?',
      answer: 'Ứng dụng hoàn toàn miễn phí cho tất cả các chức năng cơ bản.',
    },
    {
      id: '4',
      question: 'Thông tin cá nhân của tôi có được bảo mật không?',
      answer: 'Tất cả thông tin của bạn được mã hóa và bảo mật tuyệt đối. Chúng tôi không chia sẻ với bất kỳ bên thứ ba nào.',
    },
  ]

  const toggleFAQ = (id: string) => {
    setExpandedFAQ(expandedFAQ === id ? null : id)
  }

  const handleSendSupport = () => {
    console.log('Send support request', formData)
    // Reset form
    setFormData({ name: '', email: '', message: '' })
  }

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
            Hỗ trợ
          </Text>
        </View>

        <ScrollView 
          className="flex-1"
          showsVerticalScrollIndicator={false}
        >
          {/* Introduction */}
          <Text className="text-gray-700 text-base leading-6 mb-6">
            Chúng tôi luôn sẵn lòng trợ giúp bạn có trải nghiệm tốt nhất! Dưới đây là cách bạn có thể nhận được hỗ trợ:
          </Text>

          {/* Section 1: FAQ */}
          <View className="mb-6">
            <Text className="text-gray-800 text-xl font-bold mb-4">
              1. Câu hỏi thường gặp
            </Text>
            
            <Text className="text-gray-700 text-base leading-6 mb-4">
              Trước khi liên hệ với chúng tôi, vui lòng kiểm tra phần Câu hỏi thường gặp của chúng tôi. Bạn có thể tìm thấy câu trả lời nhanh chóng cho các vấn đề phổ biến như:
            </Text>

            {/* FAQ Accordion */}
            <View className="gap-3">
              {faqData.map((item) => (
                <View 
                  key={item.id}
                  className="bg-secondary-50 rounded-2xl overflow-hidden"
                  style={{
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 1 },
                    shadowOpacity: 0.05,
                    shadowRadius: 3,
                    elevation: 2,
                  }}
                >
                  <TouchableOpacity
                    onPress={() => toggleFAQ(item.id)}
                    className="p-4 flex-row items-center justify-between"
                  >
                    <Text className="flex-1 text-gray-700 text-base leading-6 pr-3">
                      {item.question}
                    </Text>
                    <ArrowDown2 
                      size="20" 
                      color="#9CA3AF" 
                      variant="Outline"
                      style={{
                        transform: [{ rotate: expandedFAQ === item.id ? '180deg' : '0deg' }]
                      }}
                    />
                  </TouchableOpacity>
                  {expandedFAQ === item.id && (
                    <View className="px-4 pb-4">
                      <Text className="text-gray-600 text-base leading-6">
                        {item.answer}
                      </Text>
                    </View>
                  )}
                </View>
              ))}
            </View>
          </View>

          {/* Section 2: Send Support Request */}
          <View className="mb-6">
            <Text className="text-gray-800 text-xl font-bold mb-4">
              2. Gửi yêu cầu hỗ trợ
            </Text>
            
            <Text className="text-gray-700 text-base leading-6 mb-4">
              Nếu bạn không tìm thấy câu trả lời trong phần FAQ hoặc cần hỗ trợ cá nhân, bạn có thể gửi yêu cầu hỗ trợ cho chúng tôi.
            </Text>

            <View className="bg-green-50 rounded-2xl p-4 mb-4">
              <Text className="text-green-700 text-base font-semibold mb-2">
                💡 Mẹo để nhận được hỗ trợ nhanh nhất:
              </Text>
              <Text className="text-green-700 text-sm leading-5 mb-1">
                • Mô tả rõ ràng: Càng cụ thể về vấn đề, chúng tôi càng dễ dàng giúp bạn.
              </Text>
              <Text className="text-green-700 text-sm leading-5">
                • Thông tin thiết bị: Luôn cung cấp thông tin về thiết bị và hệ điều hành của bạn.
              </Text>
            </View>

            {/* Support Form */}
            <View className="gap-4">
              <View>
                <TextInput
                  placeholder="Tên"
                  value={formData.name}
                  onChangeText={(text) => setFormData({ ...formData, name: text })}
                  className="bg-secondary-50 rounded-2xl px-4 py-4 text-gray-700 text-base"
                  placeholderTextColor="#9CA3AF"
                />
              </View>

              <View>
                <TextInput
                  placeholder="Email"
                  value={formData.email}
                  onChangeText={(text) => setFormData({ ...formData, email: text })}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  className="bg-secondary-50 rounded-2xl px-4 py-4 text-gray-700 text-base"
                  placeholderTextColor="#9CA3AF"
                />
              </View>

              <View>
                <TextInput
                  placeholder="Tin nhắn"
                  value={formData.message}
                  onChangeText={(text) => setFormData({ ...formData, message: text })}
                  multiline
                  numberOfLines={4}
                  textAlignVertical="top"
                  className="bg-secondary-50 rounded-2xl px-4 py-4 text-gray-700 text-base h-32"
                  placeholderTextColor="#9CA3AF"
                />
              </View>

              <TouchableOpacity
                onPress={handleSendSupport}
                className="bg-gray-800 rounded-2xl p-4 flex-row items-center justify-center"
                style={{
                  shadowColor: '#000',
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.1,
                  shadowRadius: 8,
                  elevation: 3,
                }}
              >
                <Send size="24" color="#FFFFFF" variant="Bold" />
                <Text className="text-white text-lg font-bold ml-2">
                  Gửi
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Section 3: Response Time */}
          <View className="mb-6">
            <Text className="text-gray-800 text-xl font-bold mb-4">
              3. Thời gian phản hồi
            </Text>
            
            <Text className="text-gray-700 text-base leading-6">
              Chúng tôi cố gắng phản hồi tất cả các yêu cầu hỗ trợ trong vòng <Text className="font-bold">24-48 giờ làm việc</Text>. Đối với các vấn đề khẩn cấp, chúng tôi sẽ ưu tiên xử lý.
            </Text>
          </View>

          {/* Section 4: Updates */}
          <View className="mb-8">
            <Text className="text-gray-800 text-xl font-bold mb-4">
              4. Cập nhật và thông báo
            </Text>
            
            <Text className="text-gray-700 text-base leading-6">
              Để nhận được thông tin mới nhất về các bản sửa lỗi, cập nhật tính năng và thông báo quan trọng, hãy đảm bảo bạn đã bật thông báo cho Ứng dụng của chúng tôi.
            </Text>
          </View>
        </ScrollView>
      </View>
    </ImageBackground>
  )
}

