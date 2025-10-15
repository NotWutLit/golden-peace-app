import React, { useMemo } from 'react'
import {
  ImageBackground,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  Image,
} from 'react-native'
import images from '@/constants/images'
import HeaderBackComponent from '@/components/HeaderBackComponent'
import IconSong from '~/assets/icon-svg/IconSong'
import { AntDesign } from '@expo/vector-icons'
import IconEmoji from '~/assets/icon-svg/IconEmoji'
import { Play } from 'iconsax-react-native'
import DataOldMusic from '@/data/DataOldMusic'
import { useRouter } from 'expo-router'
import { ERouteTable } from '@/constants/route-table'

interface MusicItem {
  id: number
  title: string
  artist?: string
  duration: string
  image: string
  audio: string
  description: string
}

export default function SuggestionMusic() {
  const router = useRouter()

  // Random select songs from DataOldMusic
  const selectedSongs = useMemo(() => {
    const shuffled = [...DataOldMusic].sort(() => 0.5 - Math.random())
    return shuffled.slice(0, 10) // Get 10 random songs
  }, [])

  // Calculate total duration
  const totalDuration = useMemo(() => {
    const totalMinutes = selectedSongs.reduce((sum, song) => {
      const [mins, secs] = song.duration.split(':').map(Number)
      return sum + mins + (secs / 60)
    }, 0)
    return Math.round(totalMinutes)
  }, [selectedSongs])

  // Handle play track
  const handlePlayTrack = (item: MusicItem) => {
    router.push({
      pathname: ERouteTable.PLAY_MUSIC,
      params: {
        localTrackId: item.id.toString(),
        libraryType: 'old-music',
      }
    })
  }

  // Play first song or all playlist
  const handlePlayAll = () => {
    if (selectedSongs.length > 0) {
      handlePlayTrack(selectedSongs[0])
    }
  }

  return (
    <ImageBackground source={images.bgLibrary} className="flex-1">
      <StatusBar translucent backgroundColor={'transparent'} barStyle="light-content" />
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="px-4 mt-16">
          <HeaderBackComponent />
          <View className="mt-4">
            <View className="items-center">
              <View className="bg-white w-52 h-52 items-center justify-center rounded-2xl">
                <IconEmoji />
              </View>
            </View>
            <View className="mt-10 flex-row justify-between items-center">
              <Text className="text-primary text-2xl font-bold">Nhạc hay mỗi ngày</Text>
              <TouchableOpacity 
                onPress={handlePlayAll}
                className="h-14 w-14 rounded-full bg-primary-main items-center justify-center"
              >
                <Play size="24" color="#FFFFFF" variant="Bold"/>
              </TouchableOpacity>
            </View>
            <Text className="text-secondary text-sm mt-2">Nhiều ca sĩ</Text>
            <View className="flex-row gap-4 mt-2">
              <View className="flex-row gap-1 items-center">
                <IconSong />
                <Text className="text-[#919EAB] text-sm">
                  {selectedSongs.length} bài hát
                </Text>
              </View>
              <View className="flex-row items-center gap-2">
                <AntDesign name="hearto" size={14} color="#919EAB" />
                <Text className="text-[#919EAB]">89.2K</Text>
              </View>
              <View className="flex-row items-center gap-2">
                <AntDesign name="clockcircleo" size={14} color="#919EAB" />
                <Text className="text-[#919EAB]">
                  {totalDuration} phút
                </Text>
              </View>
            </View>

            {/* Song List */}
            <View className="mt-8 mb-24">
              {selectedSongs.map((song, index) => (
                <TouchableOpacity
                  key={song.id}
                  onPress={() => handlePlayTrack(song)}
                  className="flex-row items-center mb-4"
                  activeOpacity={0.7}
                >
                  <Image
                    source={{ uri: song.image }}
                    className="w-14 h-14 rounded-xl"
                    resizeMode="cover"
                  />
                  <View className="flex-1 ml-3">
                    <Text className="text-primary text-base font-medium" numberOfLines={1}>
                      {song.title}
                    </Text>
                    <Text className="text-secondary text-sm mt-1" numberOfLines={1}>
                      {song.artist}
                    </Text>
                  </View>
                  <Text className="text-secondary text-sm mr-2">{song.duration}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>
      </ScrollView>
    </ImageBackground>
  )
}
