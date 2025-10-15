import { Image, Text, TouchableOpacity, View } from 'react-native'
import { images } from '@/constants'
import IconSetting from '~/assets/icon-svg/IconSetting'
import { ERouteTable } from '@/constants/route-table'
import { router, useRouter } from 'expo-router'
import IconSearchHome from '~/assets/icon-svg/home/IconSearchHome'
import ModalUser from '@/modal/ModalUser'
import { useState } from 'react'
import { useAuthStore } from '@/store/useAuthStore'
import { Setting2 } from 'iconsax-react-native'

export default function HeaderHome() {
  const router = useRouter()
  const [modalUser, setModalUser] = useState(false)
  const { user } = useAuthStore()

  return (
    <View>
      <View className="mt-20 mx-4">
        <View className="flex-row justify-between w-full">
          <Image
            source={images.avatar}
            className="w-16 h-16 rounded-3xl"
            resizeMode="cover"
          />
          <TouchableOpacity className="w-16 h-16 rounded-3xl items-center bg-white justify-center" onPress={() => router.push(ERouteTable.SETTING)}>
            <Setting2 size="24" color="#212B36"/>
          </TouchableOpacity>
        </View>
      </View>
      <ModalUser visible={modalUser} onClose={() => setModalUser(false)} />
    </View>
  )
}
