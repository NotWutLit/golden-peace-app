import { Image, ImageBackground, Pressable, StatusBar, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { useRouter } from 'expo-router'
import { ERouteTable } from '@/constants/route-table'
import { images } from '@/constants'
import { useAuth } from '@/hooks/useAuth'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { Eye, EyeSlash } from 'iconsax-react-native'

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

const SignIn = () => {
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const { sendOtpMutation } = useAuth()

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      phoneNumber: '0989909876',
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
    router.replace(ERouteTable.HOME)
  }

  return (
    <ImageBackground source={images.bgAuth} resizeMode="cover" className="h-full">
      <StatusBar translucent backgroundColor={'transparent'} barStyle="light-content" />
      <View className="justify-center p-8 mt-20 rounded-3xl pt-48 pb-12">
        <Text className="text-3xl mb-3 text-center text-primary font-semibold">Đăng nhập</Text>

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
        <TouchableOpacity onPress={() => router.push(ERouteTable.FORGOT_PASSWORD)}>
          <Text className="text-center my-4">Quên mật khẩu?</Text>
        </TouchableOpacity>
        <Pressable onPress={handleSubmit(onSubmit)} disabled={loading} className="bg-primary-main h-12 justify-center rounded-2xl">
          <Text className="text-white text-center text-base font-semibold">
            {loading ? 'Đăng nhập...' : 'Đăng nhập'}
          </Text>
        </Pressable>
        <Pressable onPress={() => router.push(ERouteTable.SIGIN_UP)}>
          <Text className="text-center text-sm text-secondary mt-6">
            Bạn chưa có tài khoản? <Text className="text-primary underline">Đăng ký</Text>
          </Text>
        </Pressable>
      </View>
    </ImageBackground>
  )
}

export default SignIn
