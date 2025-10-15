import { FlatList, TouchableOpacity, View } from 'react-native'
import { ERouteTable } from '@/constants/route-table'
import ItemLibrary from '@/components/ItemLibrary'
import { Add } from 'iconsax-react-native'
import React from 'react'
import { useRouter } from 'expo-router'
import { useLibrary } from '@/hooks/useLibrary'

export default function TabArtists() {
  const router = useRouter()
  const { getUserFollowedArtists } = useLibrary()
  const userArtistsQuery = getUserFollowedArtists()

  return (
    <View className="bg-[#161c24] h-[50vh] flex-1">

      <FlatList
        className="gap-2 mt-4 mb-8 flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ gap: 20 }}
        data={userArtistsQuery?.data?.data}
        keyExtractor={(item) => `${item?.id?.toString()}người theo dõi`}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            key={item.id}
            onPress={() =>
              router.push({
                pathname: ERouteTable.ARTIST_DETAIL,
                params: { artistId: item?.id },
              })
            }
          >
            <ItemLibrary
              title={item.name}
              artist={`${item?.followersCount} người theo dõi`}
              imageUrl={item?.avatarUrl}
            />
          </TouchableOpacity>
        )}
      />

      <TouchableOpacity
        onPress={() => router.push(ERouteTable.ADD_ARTIST)}
        className="border border-dashed border-[#919EAB52] items-center py-3 mb-6 rounded-xl"
      >
        <Add size="24" color="#FFF" />
      </TouchableOpacity>
    </View>
  )
}
