import React, { useState } from 'react'
import { View, Text, TextInput, Pressable, ImageBackground, Image, StatusBar } from 'react-native'
import { useRouter } from 'expo-router'
import { useAuth } from '@/hooks/useAuth'
import { images } from '@/constants'
import { ERouteTable } from '@/constants/route-table'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { Eye, EyeSlash } from 'iconsax-react-native' // 👈 thêm dòng này

// Define validation schema
const schema = yup.object().shape({
  phoneNumber: yup
    .string()
    .matches(/^(0|\+84)[0-9]{9,10}$/, 'Số điện thoại không hợp lệ')
    .required('Vui lòng nhập số điện thoại'),
  password: yup
    .string()
    .min(6, 'Mật khẩu phải có ít nhất 6 ký tự')
    .required('Vui lòng nhập mật khẩu'),
})

type FormData = {
  phoneNumber: string
  password: string
}

const SignUp = () => {
  const [loading, setLoading] = useState(false)
  const { sendOtpMutation } = useAuth()
  const router = useRouter()

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      phoneNumber: '0918160502',
      password: '123456',
    },
  })

  const onSubmit = async (data: FormData) => {
    // try {
    //   setLoading(true)
    //   await sendOtpMutation.mutateAsync(data)
    // } catch (error: any) {
    //   console.log(error)
    // } finally {
    //   setLoading(false)
    // }
    router.push({
      pathname: ERouteTable.USER_INFORMATION,
    })
  }

  return (
    <ImageBackground source={images.bgAuth} resizeMode="cover" className="h-full">
      <StatusBar translucent backgroundColor={'transparent'} barStyle="light-content" />
      <View className="justify-center mt-20 p-8 rounded-3xl pt-48 pb-12">
        <Text className="text-3xl mb-3 text-center text-primary">Tạo tài khoản</Text>

        {/* Email Input */}
        <Controller
          control={control}
          name="phoneNumber"
          render={({ field: { onChange, value } }) => (
            <View className="mb-2">
              <Text className="text-primary my-2 ml-2">Điện thoại</Text>
              <TextInput
                placeholderTextColor="#637381"
                placeholder="Nhập số điện thoại"
                value={value}
                onChangeText={onChange}
                autoCapitalize="none"
                keyboardType="email-address"
                className="border border-[#919EAB52] h-14 text-disabled rounded-2xl px-4 mb-2 text-base"
              />
              {errors.phoneNumber && (
                <Text className="text-red-500 text-sm mb-2">{errors.phoneNumber.message}</Text>
              )}
            </View>
          )}
        />
        <Controller
          control={control}
          name="password"
          render={({ field: { onChange, value } }) => {
            const [showPassword, setShowPassword] = useState(false)

            return (
              <View className="mb-6">
                <Text className="text-primary my-2 ml-2">Mật khẩu</Text>

                <View className="relative">
                  <TextInput
                    placeholderTextColor="#637381"
                    placeholder="Nhập mật khẩu"
                    value={value}
                    onChangeText={onChange}
                    autoCapitalize="none"
                    secureTextEntry={!showPassword} // 👈 quan trọng
                    className="border border-[#919EAB52] h-14 text-disabled rounded-2xl px-4 pr-12 mb-2 text-base"
                  />

                  {/* Nút con mắt ẩn/hiện */}
                  <Pressable
                    onPress={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-4"
                  >
                    {showPassword ? (
                      <EyeSlash size="24" color="#637381" />
                    ) : (
                      <Eye size="24" color="#637381" />
                    )}
                  </Pressable>
                </View>

                {errors.password && (
                  <Text className="text-red-500 text-sm mb-2">{errors.password.message}</Text>
                )}
              </View>
            )
          }}
        />
        <Pressable
          onPress={handleSubmit(onSubmit)}
          disabled={loading}
          className="bg-primary-main h-12 justify-center rounded-2xl"
        >
          <Text className="text-white text-center text-base font-semibold">
            {loading ? 'Tạo tài khoản...' : 'Tạo tài khoản'}
          </Text>
        </Pressable>

        <Pressable onPress={() => router.push(ERouteTable.SIGIN_IN)}>
          <Text className="text-center text-sm text-secondary mt-6">
            Bạn có một tài khoản? <Text className="text-primary underline">Đăng nhập</Text>
          </Text>
        </Pressable>
      </View>
    </ImageBackground>
  )
}

export default SignUp
