import images from '@/constants/images'
import { ImageBackground, StatusBar, View, Text, ScrollView, FlatList, TouchableOpacity, Image } from 'react-native'
import HeaderBackComponent from '@/components/HeaderBackComponent'
import React, { useMemo } from 'react'
import { useLocalSearchParams, useRouter } from 'expo-router'
import ItemLarge from '@/components/home/ItemLarge'
import ItemMini from '@/components/home/ItemMini'
import DataOldMusic from '@/data/DataOldMusic'
import DataNaturalMusic from '@/data/DataNaturalMusic'
import DataThienMusic from '@/data/DataThienMusic'
import DataPodcat from '@/data/DataPodcat'
import { Play } from 'iconsax-react-native'
import { ERouteTable } from '@/constants/route-table'

interface MusicItem {
  id: number
  title: string
  artist?: string
  host?: string
  duration: string
  image: string
  audio: string
  description: string
}

export default function LibraryDetail() {
  const { title } = useLocalSearchParams<{ title: string }>()
  const router = useRouter()

  // Get data based on title
  const musicData = useMemo((): MusicItem[] => {
    switch (title) {
      case 'Nhạc xưa':
        return DataOldMusic
      case 'Âm thanh thiên nhiên':
        return DataNaturalMusic
      case 'Hướng dẫn thiền':
        return DataThienMusic
      case 'Podcast':
        return DataPodcat
      default:
        return []
    }
  }, [title])

  // Shuffle array for different sections
  const shuffleArray = (array: MusicItem[]) => {
    const shuffled = [...array]
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
    }
    return shuffled
  }

  const popularSongs = useMemo(() => shuffleArray(musicData).slice(0, 4), [musicData])
  const recentSongs = useMemo(() => shuffleArray(musicData).slice(0, 5), [musicData])
  const recommendedSongs = useMemo(() => shuffleArray(musicData).slice(0, 4), [musicData])

  // Get library type for navigation
  const libraryType = useMemo(() => {
    switch (title) {
      case 'Nhạc xưa':
        return 'old-music'
      case 'Âm thanh thiên nhiên':
        return 'natural-music'
      case 'Hướng dẫn thiền':
        return 'thien-music'
      case 'Podcast':
        return 'podcast'
      default:
        return 'old-music'
    }
  }, [title])

  const handlePlayTrack = (item: MusicItem) => {
    router.push({
      pathname: ERouteTable.PLAY_MUSIC,
      params: {
        localTrackId: item.id.toString(),
        libraryType: libraryType,
      }
    })
  }

  const renderSectionTitle = (text: string) => (
    <Text className="text-xl font-bold text-gray-800 mb-4">
      {text}
    </Text>
  )

  const renderAllMusicItem = (item: MusicItem) => (
    <TouchableOpacity
      key={item.id}
      className="flex-row items-center mb-4"
      onPress={() => handlePlayTrack(item)}
    >
      <Image
        source={{ uri: item.image }}
        className="w-14 h-14 rounded-2xl"
        resizeMode="cover"
      />
      <View className="flex-1 ml-4">
        <Text className="text-gray-800 text-base font-medium" numberOfLines={1}>
          {item.title}
        </Text>
        <Text className="text-gray-500 text-sm" numberOfLines={1}>
          {item.artist || item.host || 'Unknown'}
        </Text>
      </View>
      <TouchableOpacity className="w-10 h-10 bg-primary-main rounded-full items-center justify-center" onPress={() => handlePlayTrack(item)}>
        <Play size="18" color="#FFFFFF" variant="Bold" />
      </TouchableOpacity>
    </TouchableOpacity>
  )

  return(
    <View className="flex-1 bg-secondary-lighter">
      <StatusBar translucent backgroundColor={'transparent'} barStyle="light-content" />
      <View className="px-4 mt-16">
        <HeaderBackComponent />
      </View>

      <ScrollView 
        className="flex-1 px-4"
        showsVerticalScrollIndicator={false}
      >
        {/* Title */}
        <View className="mt-6 mb-6">
          <Text className="text-4xl font-bold text-gray-800">{title}</Text>
        </View>

        {/* Bài hát phổ biến */}
        {popularSongs.length > 0 && (
          <View className="mb-8">
            {renderSectionTitle('Bài hát phổ biến')}
            <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              data={popularSongs}
              contentContainerStyle={{ gap: 20 }}
              keyExtractor={(item) => `popular-${item.id}`}
              renderItem={({ item }) => (
                <TouchableOpacity onPress={() => handlePlayTrack(item)}>
                  <ItemLarge 
                    data={{
                      id: item.id,
                      title: item.title,
                      coverUrl: item.image,
                      artist: { name: item.artist || item.host || '' }
                    }} 
                  />
                </TouchableOpacity>
              )}
            />
          </View>
        )}

        {/* Gần đây */}
        {recentSongs.length > 0 && (
          <View className="mb-8">
            {renderSectionTitle('Gần đây')}
            <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              data={recentSongs}
              contentContainerStyle={{ gap: 20 }}
              keyExtractor={(item) => `recent-${item.id}`}
              renderItem={({ item }) => (
                <TouchableOpacity onPress={() => handlePlayTrack(item)}>
                  <ItemMini 
                    data={{
                      id: item.id,
                      title: item.title,
                      coverUrl: item.image,
                      artist: { name: item.artist || item.host || '' }
                    }} 
                  />
                </TouchableOpacity>
              )}
            />
          </View>
        )}

        {/* Dựa trên nhạc nghe gần đây */}
        {recommendedSongs.length > 0 && (
          <View className="mb-8">
            {renderSectionTitle('Dựa trên nhạc nghe gần đây')}
            <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              data={recommendedSongs}
              contentContainerStyle={{ gap: 20 }}
              keyExtractor={(item) => `recommended-${item.id}`}
              renderItem={({ item }) => (
                <TouchableOpacity onPress={() => handlePlayTrack(item)}>
                  <ItemLarge 
                    data={{
                      id: item.id,
                      title: item.title,
                      coverUrl: item.image,
                      artist: { name: item.artist || item.host || '' }
                    }} 
                  />
                </TouchableOpacity>
              )}
            />
          </View>
        )}

        {/* Tất cả nhạc */}
        {musicData.length > 0 && (
          <View className="mb-8">
            {renderSectionTitle('Tất cả nhạc')}
            <View>
              {musicData.map(renderAllMusicItem)}
            </View>
          </View>
        )}
      </ScrollView>
    </View>
  )
}