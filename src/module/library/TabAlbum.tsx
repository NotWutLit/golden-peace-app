import { ScrollView, TouchableOpacity, View } from 'react-native'
import { ERouteTable } from '@/constants/route-table'
import ItemLibrary from '@/components/ItemLibrary'
import React from 'react'
import { useLibrary } from '@/hooks/useLibrary'
import { useRouter } from 'expo-router'

export default function TabAlbum() {
  const router = useRouter()

  const { getUserAlbums } = useLibrary()
  const userPlaylistsQuery = getUserAlbums()

  return (
    <View className="bg-[#161c24]">
      <ScrollView>
        <View className="gap-3 mt-3 mb-8">
          {userPlaylistsQuery?.data?.data?.map((item: any) => (
            <TouchableOpacity
              key={item.id}
              onPress={() =>
                router.push({
                  pathname: ERouteTable.ALBUM_DETAIL,
                  params: { albumId: item.id },
                })
              }
            >
              <ItemLibrary
                title={item.title}
                imageUrl={item?.coverUrl}
                artist={item?.artist?.name || 'Nghệ sĩ ẩn danh'}
              />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  )
}
