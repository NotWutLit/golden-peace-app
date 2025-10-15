import {
  View,
  Text,
  ScrollView,
  Image,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native'
import HeaderHome from 'src/components/home/HeaderHome'
import TitleHome from '@/components/home/TitleHome'
import IconThreePoint from '~/assets/icon-svg/home/IconThreePoint'
import ItemLarge from '@/components/home/ItemLarge'
import React from 'react'
import ItemMini from '@/components/home/ItemMini'
import { useRouter } from 'expo-router'
import ItemArtist from '@/components/ItemArtist'
import { ERouteTable } from '@/constants/route-table'
import { useOverView } from '@/hooks/useHome'
import { images } from '@/constants'

export default function BackupHome() {
  const router = useRouter()
  const { overviewQuery } = useOverView()

  // Loading state
  const isLoading = overviewQuery?.isLoading
  const hasError = overviewQuery?.isError

  // Loading component for sections
  const SectionLoading = () => (
    <View className="bg-[#212B36] p-4 mt-4 rounded-[32px] gap-4 mb-10">
      <View className="flex-row gap-4 items-center">
        <View className="w-14 h-14 bg-[#374151] rounded-2xl animate-pulse" />
        <View className="flex-1">
          <View className="h-4 bg-[#374151] rounded w-32 mb-2 animate-pulse" />
          <View className="h-3 bg-[#374151] rounded w-24 animate-pulse" />
        </View>
      </View>
      <View className="flex-row gap-4 items-center">
        <View className="w-14 h-14 bg-[#374151] rounded-2xl animate-pulse" />
        <View className="flex-1">
          <View className="h-4 bg-[#374151] rounded w-28 mb-2 animate-pulse" />
          <View className="h-3 bg-[#374151] rounded w-20 animate-pulse" />
        </View>
      </View>
      <View className="flex-row gap-4 items-center">
        <View className="w-14 h-14 bg-[#374151] rounded-2xl animate-pulse" />
        <View className="flex-1">
          <View className="h-4 bg-[#374151] rounded w-30 mb-2 animate-pulse" />
          <View className="h-3 bg-[#374151] rounded w-22 animate-pulse" />
        </View>
      </View>
    </View>
  )

  // Loading component for horizontal lists
  const HorizontalListLoading = () => (
    <View className="flex-row gap-5 mt-4 mb-8">
      {[1, 2, 3].map((item) => (
        <View key={item} className="w-32">
          <View className="w-32 h-32 bg-[#374151] rounded-2xl animate-pulse mb-2" />
          <View className="h-4 bg-[#374151] rounded w-24 mb-1 animate-pulse" />
          <View className="h-3 bg-[#374151] rounded w-20 animate-pulse" />
        </View>
      ))}
    </View>
  )

  // Loading component for artists
  const ArtistListLoading = () => (
    <View className="flex-row gap-5 mt-4 mb-8">
      {[1, 2, 3].map((item) => (
        <View key={item} className="items-center">
          <View className="w-20 h-20 bg-[#374151] rounded-full animate-pulse mb-2" />
          <View className="h-3 bg-[#374151] rounded w-16 animate-pulse" />
        </View>
      ))}
    </View>
  )

  // Error state
  if (hasError) {
    return (
      <View className="bg-[#161c24] flex-1">
        <HeaderHome />
        <View className="flex-1 items-center justify-center px-6">
          <Text className="text-white text-lg mb-4">Đã xảy ra lỗi</Text>
          <Text className="text-[#919EAB] text-center mb-6">Không thể tải dữ liệu từ server</Text>
          <TouchableOpacity
            className="bg-[#B1FF4D] px-6 py-3 rounded-full"
            onPress={() => overviewQuery.refetch()}
          >
            <Text className="text-black font-medium">Thử lại</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }

  return (
    <View className="bg-[#161c24] flex-1">
      <HeaderHome />
      <ScrollView className="mx-4 mt-8 flex-1" showsVerticalScrollIndicator={false}>
        {/* Recent Tracks Section */}
        {isLoading ? (
          <>
            <TitleHome text="Hay nghe gần đây" />
            <SectionLoading />
          </>
        ) : (
          overviewQuery?.data?.data?.recentTracks &&
          overviewQuery?.data?.data?.recentTracks?.length > 0 && (
            <>
              <TitleHome text="Hay nghe gần đây" />
              <View className="bg-[#212B36] p-4 mt-4 rounded-[32px] gap-4 mb-10">
                {overviewQuery?.data?.data?.recentTracks?.slice(0, 3).map((it: any) => (
                  <TouchableOpacity
                    onPress={() => {
                      router.push({
                        pathname: ERouteTable.PLAY_MUSIC,
                        params: { trackId: it.id },
                      })
                    }}
                    className="flex-row justify-between items-center pr-4"
                    key={`${it.id}-${it.title}`}
                  >
                    <View className="flex-row gap-4 items-center">
                      <Image
                        source={
                          it.coverUrl
                            ? {
                              uri: it.coverUrl,
                            }
                            : images.song
                        }
                        className="w-14 h-14 rounded-2xl border border-[#FFFFFF29]"
                        resizeMode="cover"
                      />
                      <View>
                        <Text className="text-white">{it.title}</Text>
                        <Text className="text-xs text-[#919EAB]">
                          {it?.artist?.name || 'Không xác định'}
                        </Text>
                      </View>
                    </View>
                    <IconThreePoint />
                  </TouchableOpacity>
                ))}
              </View>
            </>
          )
        )}

        {/* Trending Playlists Section */}
        {isLoading ? (
          <>
            <TitleHome text="Bài hát thịnh hành" color="#B1FF4D" />
            <HorizontalListLoading />
          </>
        ) : (
          overviewQuery?.data?.data?.trendingPlaylists &&
          overviewQuery?.data?.data?.trendingPlaylists?.length > 0 && (
            <>
              <TitleHome text="Bài hát thịnh hành" color="#B1FF4D" />
              <FlatList
                className="flex-1 gap-2 mt-4 mb-8"
                showsHorizontalScrollIndicator={false}
                horizontal
                contentContainerStyle={{ gap: 20 }}
                data={overviewQuery?.data?.data?.trendingPlaylists}
                keyExtractor={(item) => `${item?.id?.toString()}Bài hát thịnh hành`}
                renderItem={({ item, index }) => (
                  <TouchableOpacity
                    onPress={() => {
                      router.push({
                        pathname: ERouteTable.PLAY_MUSIC,
                        params: { trackId: item.id },
                      })
                    }}
                  >
                    <ItemLarge data={item} />
                  </TouchableOpacity>
                )}
              />
            </>
          )
        )}

        {/* Recent Playlists Section */}
        {isLoading ? (
          <>
            <TitleHome text="Gần đây" color="#F44336" />
            <HorizontalListLoading />
          </>
        ) : (
          overviewQuery?.data?.data?.recentPlaylists &&
          overviewQuery?.data?.data?.recentPlaylists?.length > 0 && (
            <>
              <TitleHome text="Gần đây" color="#F44336" />
              <FlatList
                className="flex-1 gap-2 mt-4 mb-8"
                showsHorizontalScrollIndicator={false}
                horizontal
                contentContainerStyle={{ gap: 20 }}
                data={overviewQuery?.data?.data?.recentPlaylists}
                keyExtractor={(item) => `${item?.id?.toString()}Gần đây`}
                renderItem={({ item, index }) => (
                  <TouchableOpacity
                    onPress={() => {
                      router.push({
                        pathname: ERouteTable.PLAY_MUSIC,
                        params: { trackId: item.id },
                      })
                    }}
                  >
                    <ItemMini data={item} />
                  </TouchableOpacity>
                )}
              />
            </>
          )
        )}

        {/* Followed Albums Section */}
        {isLoading ? (
          <>
            <TitleHome text="Album của nghệ sĩ bạn theo dõi" color="#FF9800" />
            <HorizontalListLoading />
          </>
        ) : (
          overviewQuery?.data?.data?.followedAlbums &&
          overviewQuery?.data?.data?.followedAlbums?.length > 0 && (
            <>
              <TitleHome text="Album của nghệ sĩ bạn theo dõi" color="#FF9800" />
              <FlatList
                className="flex-1 gap-2 mt-4 mb-8"
                showsHorizontalScrollIndicator={false}
                horizontal
                contentContainerStyle={{ gap: 20 }}
                data={overviewQuery?.data?.data?.followedAlbums}
                keyExtractor={(item) => `${item?.id?.toString()}nghệ sĩ`}
                renderItem={({ item, index }) => (
                  <TouchableOpacity
                    onPress={() =>
                      router.push({
                        pathname: ERouteTable.ALBUM_DETAIL,
                        params: { albumId: item.id },
                      })
                    }
                  >
                    <ItemLarge data={item} />
                  </TouchableOpacity>
                )}
              />
            </>
          )
        )}

        {/*<TitleHome text="Dựa trên nhạc nghe gần đây" color="#F44336" />*/}
        {/*<FlatList*/}
        {/*  className="flex-1 gap-2 mt-4 mb-8"*/}
        {/*  showsHorizontalScrollIndicator={false}*/}
        {/*  horizontal*/}
        {/*  contentContainerStyle={{ gap: 20 }}*/}
        {/*  data={sampleSongs}*/}
        {/*  renderItem={({ item, index }) => <ItemLarge data={item} />}*/}
        {/*/>*/}

        {/* Popular Artists Section */}
        {isLoading ? (
          <>
            <TitleHome text="Nghệ sĩ phổ biến" color="#FF9800" />
            <ArtistListLoading />
          </>
        ) : (
          overviewQuery?.data?.data?.popularArtists &&
          overviewQuery?.data?.data?.popularArtists?.length > 0 && (
            <>
              <TitleHome text="Nghệ sĩ phổ biến" color="#FF9800" />
              <FlatList
                className="flex-1 gap-2 mt-4 mb-8"
                showsHorizontalScrollIndicator={false}
                horizontal
                contentContainerStyle={{ gap: 20 }}
                data={overviewQuery?.data?.data?.popularArtists}
                keyExtractor={(item) => `${item?.id?.toString()}hổ b`}
                renderItem={({ item, index }) => <ItemArtist data={item} />}
              />
            </>
          )
        )}

        {/* New Playlists Section */}
        {isLoading ? (
          <>
            <TitleHome text="Những bản nhạc mới" color="#00BCD4" />
            <HorizontalListLoading />
          </>
        ) : (
          overviewQuery?.data?.data?.newPlaylists &&
          overviewQuery?.data?.data?.newPlaylists?.length > 0 && (
            <>
              <TitleHome text="Những bản nhạc mới" color="#00BCD4" />
              <FlatList
                className="flex-1 gap-2 mt-4 mb-8"
                showsHorizontalScrollIndicator={false}
                horizontal
                contentContainerStyle={{ gap: 20 }}
                data={overviewQuery?.data?.data?.newPlaylists}
                keyExtractor={(item) => `${item?.id?.toString()}Những bản nhạc mới`}
                renderItem={({ item, index }) => (
                  <TouchableOpacity
                    onPress={() => {
                      router.push({
                        pathname: ERouteTable.PLAY_MUSIC,
                        params: { trackId: item.id },
                      })
                    }}
                  >
                    <ItemLarge data={item} />
                  </TouchableOpacity>
                )}
              />
            </>
          )
        )}

        {/* Playlist By Genres Section */}
        {isLoading ? (
          <>
            <TitleHome text="Thể loại nhạc" color="#00BCD4" />
            <HorizontalListLoading />
          </>
        ) : (
          overviewQuery?.data?.data?.playlistByGenres &&
          overviewQuery?.data?.data?.playlistByGenres?.length > 0 &&
          overviewQuery?.data?.data?.playlistByGenres?.map(
            (genreData: any) =>
              genreData.playlists &&
              genreData.playlists.length > 0 && (
                <React.Fragment key={genreData.genreId}>
                  <TitleHome text={genreData.genre} color="#00BCD4" />
                  <FlatList
                    className="flex-1 gap-2 mt-4 mb-8"
                    showsHorizontalScrollIndicator={false}
                    horizontal
                    contentContainerStyle={{ gap: 20 }}
                    data={genreData.playlists}
                    keyExtractor={(item) => `${item?.id?.toString()}-${genreData.genre}`}
                    renderItem={({ item, index }) => (
                      <TouchableOpacity onPress={() => router.push(ERouteTable.LIBRARY_DETAIL)}>
                        <ItemLarge data={item} />
                      </TouchableOpacity>
                    )}
                  />
                </React.Fragment>
              ),
          )
        )}
      </ScrollView>
    </View>
  )
}
