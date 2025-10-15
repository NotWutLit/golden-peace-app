import React, { useState } from 'react'
import { Animated, TouchableOpacity } from 'react-native'
import IconBot from '~/assets/icon-svg/IconBot'
import ModalBotMusic from '@/modal/ModalBotMusic'
import { useRouter } from 'expo-router'
import { ERouteTable } from '@/constants/route-table'

export default function FloatingAssistant() {
  const [modalVisible, setModalVisible] = useState(false)
  const router = useRouter()

  const handleOpenModal = () => {
    router.push(ERouteTable.GENERATE_MUSIC_AI)

  }

  const handleCloseModal = () => {
    setModalVisible(false)
  }

  return (
    <>
      <Animated.View className="absolute bottom-48 right-4 w-16 h-16 rounded-full bg-[#B1FF4D] justify-center items-center shadow-lg">
        <TouchableOpacity className="flex-1 justify-center items-center" onPress={handleOpenModal}>
          <IconBot />
        </TouchableOpacity>
      </Animated.View>

      <ModalBotMusic visible={modalVisible} onClose={handleCloseModal} />
    </>
  )
}
