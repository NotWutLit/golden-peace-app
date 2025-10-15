import { Image, Text, TouchableOpacity, View } from 'react-native'
import { router, useRouter } from 'expo-router'
import { ERouteTable } from '@/constants/route-table'
import React from 'react'
import { images } from '@/constants'
import IconSearchHome from '~/assets/icon-svg/home/IconSearchHome'
import { SearchNormal1 } from 'iconsax-react-native'

interface IHeaderComponentProps {
  title?: string
}

export default function HeaderComponent({ title }: IHeaderComponentProps) {
  const router = useRouter()

  return (
    <View className="flex-row justify-between w-full items-center pt-20 pb-4 px-4">
      <Image
        source={images.avatar}
        className="w-16 h-16 rounded-2xl"
        resizeMode="cover"
      />
      <Text className="font-semibold text-lg text-white">{title}</Text>
      <TouchableOpacity
        onPress={() => router.push(ERouteTable.SEARCH_SCREEN)}
        className="w-16 h-16 bg-white items-center justify-center rounded-2xl"
      >
        <SearchNormal1 size="24" color="#212B36"/>
      </TouchableOpacity>
    </View>
  )
}
