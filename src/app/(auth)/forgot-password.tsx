import React from 'react'
import {
  View,
  Text,
  TextInput,
  Alert,
  TouchableOpacity,
  ImageBackground,
  Image,
  StatusBar,
} from 'react-native'
import { useRouter } from 'expo-router'
import { images } from '@/constants'
import { ERouteTable } from '@/constants/route-table'
import CustomButton from '@/components/CustomButton'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import IconUploadImage from '~/assets/icon-svg/IconUploadImage'
import { useAuth } from '@/hooks/useAuth'
import { ArrowLeft2 } from 'iconsax-react-native'

// Define validation schema
const schema = yup.object().shape({
  phoneNumber: yup
    .string()
    .matches(/^(0|\+84)[0-9]{9,10}$/, 'Số điện thoại không hợp lệ')
    .required('Vui lòng nhập số điện thoại'),
})

type FormData = {
  phoneNumber: string
}

const ForgotPassword = () => {
  const router = useRouter()
  const { updateProfileMutation } = useAuth()

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      phoneNumber: '',
    },
  })

  const onSubmit = async (data: FormData) => {
    try {
      // await updateProfileMutation.mutateAsync({ fullName: data.name })
      // After successful profile update, navigate to home
      router.push({
        pathname: ERouteTable.VERIFY_ACCOUNT,
        params: { email: '0918167502' },
      })
    } catch (error) {
      console.error(error)
      Alert.alert('Lỗi', 'Có lỗi xảy ra khi cập nhật thông tin.')
    }
  }

  return (
    <ImageBackground source={images.bgAuth} resizeMode="cover" className="h-full">
      <StatusBar translucent backgroundColor={'transparent'} barStyle="light-content" />
      <View className="justify-center mt-10 p-6 rounded-xl pt-48 pb-12">
        <Text className="text-center text-3xl font-semibold text-primary mt-10">
          Quên mật khẩu
        </Text>
        <Text className="text-secondary text-center my-6">Vui lòng nhập số điện thoại liên kết với tài khoản{'\n'} của bạn để đặt lại mật khẩu.</Text>

        <Controller
          control={control}
          name="phoneNumber"
          render={({ field: { onChange, value } }) => (
            <View>
              <Text className="text-primary my-2 ml-2">Điện thoại</Text>
              <TextInput
                className="border border-[#919EAB52] rounded-xl px-4 py-3 mb-1 text-base text-primary"
                placeholderTextColor="#94A3B8"
                placeholder="Nhập số điện thoại"
                onChangeText={onChange}
                value={value}
                editable={!updateProfileMutation.isPending}
              />
              {errors.phoneNumber && (
                <Text className="text-red-500 text-sm mb-2">{errors.phoneNumber.message}</Text>
              )}
            </View>
          )}
        />

        <CustomButton
          title={updateProfileMutation.isPending ? 'Đang xử lý...' : 'Gửi yêu cầu'}
          onPress={handleSubmit(onSubmit)}
          containerStyle={`w-full mt-7 mb-2'} min-h-12`}
          textStyle="text-white font-semibold"
          disabled={updateProfileMutation.isPending}
        />

        <TouchableOpacity
          className="flex-row gap-1 mt-6 flex mx-auto"
          onPress={() => router.push(ERouteTable.SIGIN_IN)}
          disabled={updateProfileMutation.isPending}
        >
          <ArrowLeft2 size="20" color="#212B36"/>
          <Text className="text-primary font-semibold text-sm">Quay lại đăng nhập</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  )
}

export default ForgotPassword
