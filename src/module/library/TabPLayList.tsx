import { Image, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { ERouteTable } from '@/constants/route-table'
import { images } from '@/constants'
import ItemLibrary from '@/components/ItemLibrary'
import { Add } from 'iconsax-react-native'
import CustomBottomSheet from '@/components/BottomSheetDemo'
import IconAddToPlayList from '~/assets/icon-svg/song/IconAddToPlayList'
import React, { useState } from 'react'
import { useRouter } from 'expo-router'
import { useLibrary } from '@/hooks/useLibrary'

export default function TabPLayList() {
  const router = useRouter()
  const [isVisible, setIsVisible] = useState(false)
  const [playlistTitle, setPlaylistTitle] = useState('')
  const { getUserPlaylists, createPlaylistMutation } = useLibrary()
  const userPlaylistsQuery = getUserPlaylists()

  if (userPlaylistsQuery.isLoading) {
    return <Text>Đang tải...</Text>
  }

  if (userPlaylistsQuery.isError) {
    return <Text>Lỗi: {userPlaylistsQuery.error.message}</Text>
  }

  const handleCreatePlayList = () => {
    if (!playlistTitle.trim()) {
      return
    }

    createPlaylistMutation.mutate(
      { title: playlistTitle.trim() },
      {
        onSuccess: () => {
          setPlaylistTitle('')
          setIsVisible(false)
          userPlaylistsQuery.refetch()
        },
      },
    )
  }

  return (
    <View className="bg-[#161c24]">
      <ScrollView>
        <View className="gap-3 mt-3 mb-8">
          {userPlaylistsQuery?.data?.data?.map((item: any) => (
            <View key={item.id}>
              {item.title === 'Bài hát yêu thích' ? (
                <TouchableOpacity
                  onPress={() =>
                    router.push({
                      pathname: ERouteTable.FAVORITE_DETAIL,
                      params: { playlistId: item.id },
                    })
                  }
                >
                  <View className="flex-row gap-2">
                    <Image
                      source={images.favoriteAlbum}
                      className="w-14 h-14 rounded-2xl border border-[#FFFFFF29]"
                      resizeMode="cover"
                    />
                    <View>
                      <Text className="mt-2 text-white" numberOfLines={1}>
                        Bài hát yêu thích
                      </Text>
                      <Text className="text-[#919EAB] text-xs" numberOfLines={1}>
                        {item?.trackCount} bài hát
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  onPress={() =>
                    router.push({
                      pathname: ERouteTable.LIBRARY_DETAIL,
                      params: { playlistId: item.id },
                    })
                  }
                >
                  <ItemLibrary
                    title={item.title}
                    artist={`${item?.trackCount} bài hát`}
                    imageUrl={item?.coverUrl}
                  />
                </TouchableOpacity>
              )}
            </View>
          ))}
        </View>
      </ScrollView>

      <TouchableOpacity
        className="border border-dashed border-[#919EAB52] items-center py-3 rounded-xl"
        onPress={() => {
          setIsVisible(true)
        }}
      >
        <Add size="24" color="#FFF" />
      </TouchableOpacity>
      <CustomBottomSheet isVisible={isVisible} onClose={() => setIsVisible(false)} maxHeight="50%">
        <View className="items-center mt-10 mb-10 px-8">
          <View className="h-12 w-12 bg-[#A766FF] items-center justify-center rounded-full">
            <IconAddToPlayList />
          </View>
          <Text className="text-white text-2xl font-semibold mt-8">Đặt tên danh sách phát</Text>
          <Text className="text-[#919EAB] mt-2 text-sm">
            Tạo danh sách sách phát theo sở thích của bạn
          </Text>
          <TextInput
            placeholderTextColor="#637381"
            placeholder="Danh sách phát của tôi"
            autoCapitalize="none"
            className="border border-[#919EAB52] mt-10 text-[#637381] rounded-2xl w-full px-4 py-3 mb-2 text-base"
            value={playlistTitle}
            onChangeText={setPlaylistTitle}
          />
          <TouchableOpacity
            onPress={handleCreatePlayList}
            disabled={createPlaylistMutation.isPending || !playlistTitle.trim()}
            className={`w-full justify-center items-center h-12 rounded-xl mt-4 bg-[#A766FF]`}
          >
            <Text className="text-white font-semibold text-lg">
              {createPlaylistMutation.isPending ? 'Đang tạo...' : 'Tạo'}
            </Text>
          </TouchableOpacity>
        </View>
      </CustomBottomSheet>
    </View>
  )
}
