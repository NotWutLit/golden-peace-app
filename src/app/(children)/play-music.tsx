import { images } from '@/constants'
import HeaderBackComponent from '@/components/HeaderBackComponent'
import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react'
import {
  FlatList,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
  AppState,
  Animated,
  ImageBackground,
} from 'react-native'
import IconThreePoint from '~/assets/icon-svg/home/IconThreePoint'
import { AntDesign, Foundation, Ionicons } from '@expo/vector-icons'
import IconAddToPlayList from '~/assets/icon-svg/song/IconAddToPlayList'
import IconShare from '~/assets/icon-svg/IconShare'
import MusicProgressBar from '@/components/MusicPlayer/MusicProgressBar'
import IconRepeat from '~/assets/icon-svg/song/IconRepeat'
import IconStepBack from '~/assets/icon-svg/song/IconStepBack'
import IconStepNext from '~/assets/icon-svg/song/IconStepNext'
import IconDisturbance from '~/assets/icon-svg/song/IconDisturbance'
import IconPause from '~/assets/icon-svg/song/IconPause'
import IconPlayMusic2 from '~/assets/icon-svg/song/IconPlayMusic2'
import TitleHome from '@/components/home/TitleHome'
import ItemLarge from '@/components/home/ItemLarge'
import { Audio } from 'expo-av'
import { Song } from '@/data/DataMusic'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { useToast } from '@/components/ToastNotify/ToastContext'
import {
  findLocalTrack,
  convertLocalToSong,
  getNextLocalTrack,
  getPreviousLocalTrack,
  getRelatedLocalTracks,
  LibraryType,
} from '@/utils/localMusicHelper'
import { ERouteTable } from '@/constants/route-table'
import { Pause, Play } from 'iconsax-react-native'

// Format numbers for display (e.g., 1234 -> 1.2K)
const formatCount = (count: number): string => {
  if (count >= 1000000) {
    return `${(count / 1000000).toFixed(1)}M`
  } else if (count >= 1000) {
    return `${(count / 1000).toFixed(1)}K`
  }
  return count.toString()
}

// Enhanced global audio state for cross-screen playback
declare global {
  var globalSound: Audio.Sound | null
  var globalCurrentSongId: string | null
  var globalCurrentSong: Song | null
  var globalIsPlaying: boolean
  var globalPlayMode: 'normal' | 'repeat' | 'shuffle'
  var globalLocalTrackId: string | null
  var globalLibraryType: string | null
}

// Initialize enhanced global state
if (typeof global !== 'undefined') {
  global.globalSound = global.globalSound || null
  global.globalCurrentSongId = global.globalCurrentSongId || null
  global.globalCurrentSong = global.globalCurrentSong || null
  global.globalIsPlaying = global.globalIsPlaying || false
  global.globalPlayMode = global.globalPlayMode || 'normal'
  global.globalLocalTrackId = global.globalLocalTrackId || null
  global.globalLibraryType = global.globalLibraryType || null
}

const PlayMusic = React.memo(() => {
  const [isPlaying, setIsPlaying] = useState(false)
  const [activeRepeat, setActiveRepeat] = useState(global.globalPlayMode === 'repeat')
  const [activeDisturbance, setActiveDisturbance] = useState(global.globalPlayMode === 'shuffle')

  const { localTrackId, libraryType } = useLocalSearchParams<{
    localTrackId: string
    libraryType: LibraryType
  }>()

  const { showToast } = useToast()
  const router = useRouter()

  // Audio states
  const [sound, setSound] = useState<Audio.Sound | null>(global.globalSound)
  const [currentSong, setCurrentSong] = useState<Song | null>(global.globalCurrentSong)
  const [isLoading, setIsLoading] = useState(false)
  const [playbackStatus, setPlaybackStatus] = useState<any>(null)

  // Stable refs to prevent dependency changes
  const currentSongRef = useRef<Song | null>(currentSong)
  const isLoadingRef = useRef(isLoading)
  const activeRepeatRef = useRef(activeRepeat)
  const soundRef = useRef<Audio.Sound | null>(sound)
  const isPlayingRef = useRef(isPlaying)

  // Animation refs for smooth transitions
  const fadeAnim = useRef(new Animated.Value(1)).current
  const scaleAnim = useRef(new Animated.Value(1)).current
  const imageOpacityAnim = useRef(new Animated.Value(1)).current

  // Memoized image sources
  const backgroundImageSource = useMemo(() => {
    if (currentSong?.artwork) {
      return { uri: currentSong.artwork }
    }
    return images.artist
  }, [currentSong?.artwork])

  const coverImageSource = useMemo(() => {
    if (currentSong?.artwork) {
      return { uri: currentSong.artwork }
    }
    return images.artist
  }, [currentSong?.artwork])

  // Update refs when state changes
  currentSongRef.current = currentSong
  isLoadingRef.current = isLoading
  activeRepeatRef.current = activeRepeat
  soundRef.current = sound
  isPlayingRef.current = isPlaying

  // Animation functions
  const animateTrackChange = useCallback(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 0.5,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 0.98,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(imageOpacityAnim, {
        toValue: 0.3,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start()
  }, [fadeAnim, scaleAnim, imageOpacityAnim])

  const animateTrackLoaded = useCallback(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 250,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 120,
        friction: 10,
        useNativeDriver: true,
      }),
      Animated.timing(imageOpacityAnim, {
        toValue: 1,
        duration: 250,
        useNativeDriver: true,
      }),
    ]).start()
  }, [fadeAnim, scaleAnim, imageOpacityAnim])

  const animateImageChange = useCallback(() => {
    Animated.sequence([
      Animated.timing(imageOpacityAnim, {
        toValue: 0,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(imageOpacityAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start()
  }, [imageOpacityAnim])

  // Load local track data
  useEffect(() => {
    if (!localTrackId || !libraryType) return

    console.log('🎵 Loading local track:', { localTrackId, libraryType })

    const localTrack = findLocalTrack(libraryType, localTrackId)
    if (!localTrack) {
      console.error('🎵 Local track not found:', localTrackId)
      showToast('Không tìm thấy bài hát', 'error')
      return
    }

    console.log('🎵 Found local track:', localTrack.title)

    const convertedSong = convertLocalToSong(localTrack)
    console.log('🎵 Converted song:', { id: convertedSong.id, uri: convertedSong.uri })

    // Check if this is a different track
    const isDifferentTrack = currentSong?.id !== convertedSong.id

    if (isDifferentTrack) {
      console.log(
        '🎵 Different track detected, switching from:',
        currentSong?.title,
        'to:',
        convertedSong.title,
      )

      // Start animation
      animateTrackChange()

      // Stop and cleanup current sound
      const cleanupSound = async () => {
        if (sound) {
          try {
            await sound.stopAsync()
            await sound.unloadAsync()
          } catch (error) {
            console.log('Error cleaning up sound:', error)
          }
          setSound(null)
        }

        // Also cleanup global sound if it's different
        if (global.globalSound && global.globalCurrentSongId !== convertedSong.id) {
          try {
            await global.globalSound.stopAsync()
            await global.globalSound.unloadAsync()
          } catch (error) {
            console.log('Error cleaning up global sound:', error)
          }
          global.globalSound = null
          global.globalCurrentSongId = null
          global.globalIsPlaying = false
        }

        // Reset playback state
        setIsPlaying(false)
        setPlaybackStatus(null)
        setIsLoading(false)

        // Update current song
        setCurrentSong(convertedSong)

        // Update global state
        global.globalCurrentSong = convertedSong
        global.globalCurrentSongId = convertedSong.id
        global.globalLocalTrackId = localTrackId
        global.globalLibraryType = libraryType

        // Trigger loaded animation
        animateTrackLoaded()
      }

      cleanupSound()
    }
  }, [localTrackId, libraryType, showToast])

  // Load sound for current song
  const loadSound = useCallback(
    async (retryCount = 0) => {
      if (isLoadingRef.current) {
        return
      }

      try {
        setIsLoading(true)

        // Check if globalSound is already playing the same song
        if (global.globalSound && global.globalCurrentSongId === currentSongRef.current?.id) {
          setSound(global.globalSound)

          // Get current status and sync state
          const status = await global.globalSound.getStatusAsync()
          if (status.isLoaded) {
            setPlaybackStatus(status)
            setIsPlaying(status.isPlaying || false)
          }

          // Set up listener for existing sound
          global.globalSound!.setOnPlaybackStatusUpdate((status) => {
            if (status.isLoaded) {
              setPlaybackStatus(status)
              setIsPlaying(status.isPlaying || false)
              global.globalIsPlaying = status.isPlaying || false

              if (status.didJustFinish && !activeRepeatRef.current) {
                // Auto play next song
                playNextSong()
              }
            }
          })

          // Sync repeat state
          try {
            await global.globalSound!.setIsLoopingAsync(activeRepeatRef.current)
          } catch (error) {
            console.error('Error syncing repeat state:', error)
          }

          setIsLoading(false)
          return
        }

        // Different song - stop existing sound
        if (global.globalSound) {
          try {
            await global.globalSound.stopAsync()
            await global.globalSound.unloadAsync()
          } catch (error) {
            console.log('Error stopping global sound:', error)
          }
          global.globalSound = null
          global.globalCurrentSongId = null
          global.globalIsPlaying = false
        }

        // Also unload local sound reference
        if (soundRef.current && soundRef.current !== global.globalSound) {
          try {
            await soundRef.current.stopAsync()
            await soundRef.current.unloadAsync()
          } catch (error) {
            console.log('Error stopping local sound:', error)
          }
        }

        // Validate audio URL
        if (!currentSongRef.current?.uri) {
          showToast('Không có link nhạc để phát', 'error')
          throw new Error('No audio URL available')
        }

        console.log('🎵 Loading sound from URI:', currentSongRef.current.uri)

        const { sound: newSound } = await Audio.Sound.createAsync(
          { uri: currentSongRef.current.uri },
          {
            shouldPlay: true,
            isLooping: activeRepeatRef.current,
            volume: 1.0,
            rate: 1.0,
            shouldCorrectPitch: true,
            progressUpdateIntervalMillis: 1000,
          },
          null,
          false,
        )

        // Set both local and global references
        setSound(newSound)
        global.globalSound = newSound
        global.globalCurrentSongId = currentSongRef.current.id
        global.globalCurrentSong = currentSongRef.current

        // Set up playback status update
        newSound.setOnPlaybackStatusUpdate((status) => {
          if (status.isLoaded) {
            setPlaybackStatus(status)
            setIsPlaying(status.isPlaying || false)
            global.globalIsPlaying = status.isPlaying || false

            if (status.didJustFinish && !activeRepeatRef.current) {
              playNextSong()
            }
          } else if (status.error) {
            console.error('Playback error:', status.error)
          }
        })

        setIsLoading(false)
        console.log('🎵 Sound loaded successfully')
      } catch (error) {
        console.error('Error loading sound:', error)
        setIsLoading(false)

        // Retry logic
        const errorMessage = error instanceof Error ? error.message : String(error)
        if (errorMessage && errorMessage.includes('wrong thread') && retryCount < 3) {
          setTimeout(
            () => {
              loadSound(retryCount + 1)
            },
            500 * (retryCount + 1),
          )
          return
        }

        showToast('Lỗi khi tải nhạc', 'error')
      }
    },
    [showToast],
  )

  // Initialize audio mode
  useEffect(() => {
    const initAudio = async () => {
      try {
        await Audio.setAudioModeAsync({
          allowsRecordingIOS: false,
          staysActiveInBackground: true,
          playsInSilentModeIOS: true,
          shouldDuckAndroid: false,
          playThroughEarpieceAndroid: false,
        })
      } catch (error) {
        console.error('Error initializing audio mode:', error)
      }
    }

    initAudio()
  }, [])

  // Load sound when current song changes
  useEffect(() => {
    if (!currentSong?.uri) {
      console.log('🎵 No URI available for current song')
      return
    }

    if (isLoading) {
      console.log('🎵 Already loading, skip')
      return
    }

    console.log('🎵 Scheduling sound load for:', currentSong.title, 'URI:', currentSong.uri)

    const timeoutId = setTimeout(() => {
      console.log('🎵 Starting sound load...')
      loadSound()
    }, 100) // Quick load for smooth transition

    return () => {
      console.log('🎵 Clearing sound load timeout')
      clearTimeout(timeoutId)
    }
  }, [currentSong?.id, currentSong?.uri])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (sound && sound !== global.globalSound) {
        sound.unloadAsync()
      }
      setPlaybackStatus(null)
    }
  }, [])

  // Handle app state changes
  useEffect(() => {
    const handleAppStateChange = (nextAppState: string) => {
      if (nextAppState === 'active' && sound) {
        sound.getStatusAsync().then((status) => {
          if (status.isLoaded) {
            setIsPlaying(status.isPlaying || false)
            global.globalIsPlaying = status.isPlaying || false
          }
        })
      }
    }

    const subscription = AppState.addEventListener('change', handleAppStateChange)
    return () => {
      subscription?.remove()
    }
  }, [])

  // Trigger image animation when sources change
  useEffect(() => {
    if (currentSong?.artwork) {
      animateImageChange()
    }
  }, [currentSong?.artwork, animateImageChange])

  // Toggle play/pause
  const togglePlayback = useCallback(async () => {
    if (!sound) return

    try {
      if (isPlaying) {
        await sound.pauseAsync()
        global.globalIsPlaying = false
      } else {
        await sound.playAsync()
        global.globalIsPlaying = true
      }
    } catch (error) {
      console.error('Error toggling playback:', error)
    }
  }, [sound, isPlaying])

  // Play next song
  const playNextSong = useCallback(async () => {
    if (isLoadingRef.current || !localTrackId || !libraryType) {
      console.log('🎵 Cannot play next:', {
        isLoading: isLoadingRef.current,
        localTrackId,
        libraryType,
      })
      return
    }

    console.log('🎵 Playing next song...')
    const nextTrack = getNextLocalTrack(libraryType, localTrackId)
    if (nextTrack) {
      console.log('🎵 Next track:', nextTrack.title)

      // Update params without navigation (smooth content change)
      router.setParams({
        localTrackId: nextTrack.id.toString(),
        libraryType: libraryType,
      })
    }
  }, [localTrackId, libraryType, router])

  // Play previous song
  const playPreviousSong = useCallback(async () => {
    if (isLoadingRef.current || !localTrackId || !libraryType) {
      console.log('🎵 Cannot play previous:', {
        isLoading: isLoadingRef.current,
        localTrackId,
        libraryType,
      })
      return
    }

    console.log('🎵 Playing previous song...')
    const prevTrack = getPreviousLocalTrack(libraryType, localTrackId)
    if (prevTrack) {
      console.log('🎵 Previous track:', prevTrack.title)

      // Update params without navigation (smooth content change)
      router.setParams({
        localTrackId: prevTrack.id.toString(),
        libraryType: libraryType,
      })
    }
  }, [localTrackId, libraryType, router])

  // Handle repeat toggle
  const handleRepeatToggle = useCallback(async () => {
    const newRepeatState = !activeRepeat
    setActiveRepeat(newRepeatState)

    if (newRepeatState) {
      global.globalPlayMode = 'repeat'
    } else {
      global.globalPlayMode = 'normal'
    }

    if (soundRef.current) {
      try {
        await soundRef.current.setIsLoopingAsync(newRepeatState)
      } catch (error) {
        console.error('Error setting loop:', error)
      }
    }
  }, [activeRepeat])

  // Render related tracks section
  const renderRelatedTracksSection = useCallback(() => {
    if (!localTrackId || !libraryType) return null

    const localRelatedTracks = getRelatedLocalTracks(libraryType, localTrackId)
    const relatedTracks = localRelatedTracks.map((track) => ({
      id: track.id,
      title: track.title,
      artistName: track.artist || track.host,
      coverUrl: track.image,
      artwork: track.image,
      duration: track.duration,
      isLocal: true,
    }))

    const categoryTitle =
      libraryType === 'old-music'
        ? 'Nhạc xưa'
        : libraryType === 'natural-music'
          ? 'Âm thanh thiên nhiên'
          : libraryType === 'thien-music'
            ? 'Hướng dẫn thiền'
            : 'Podcast'
    const sectionTitle = `Thêm từ ${categoryTitle}`

    if (relatedTracks.length === 0) return null

    return (
      <View>
        <TitleHome text={sectionTitle} />
        <FlatList
          className="mt-4 mb-8"
          showsHorizontalScrollIndicator={false}
          horizontal
          contentContainerStyle={{ gap: 20, paddingHorizontal: 20 }}
          data={relatedTracks.slice(0, 10)}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => {
                // Update params without navigation (smooth content change)
                router.setParams({
                  localTrackId: item.id.toString(),
                  libraryType: libraryType,
                })
              }}
              activeOpacity={0.8}
            >
              <ItemLarge
                data={{
                  title: item.title,
                  artist: { name: item.artistName || 'Unknown Artist' },
                  coverUrl: item.coverUrl || item.artwork,
                  duration: item.duration,
                }}
              />
            </TouchableOpacity>
          )}
        />
      </View>
    )
  }, [localTrackId, libraryType, router])

  const renderLeftHeader = useCallback(() => {
    return (
      <TouchableOpacity className="bg-[#919EAB3D] rounded-full h-12 w-12 items-center justify-center">
        <IconThreePoint />
      </TouchableOpacity>
    )
  }, [])

  // Show loading if no song loaded yet
  if (!currentSong) {
    return (
      <ImageBackground source={images.bgLibrary}>
        <StatusBar translucent backgroundColor={'transparent'} barStyle="light-content" />
        <HeaderBackComponent leftChildren={renderLeftHeader()} />
        <View className="flex-1 items-center justify-center">
          <Text className="text-white text-lg">Đang tải bài hát...</Text>
        </View>
      </ImageBackground>
    )
  }

  return (
    <ImageBackground source={images.bgLibrary} className="pt-14 px-4 flex-1">
      <StatusBar translucent backgroundColor={'transparent'} barStyle="light-content" />
      <HeaderBackComponent leftChildren={renderLeftHeader()} />
      <Animated.View
        className="items-center mt-4 mb-6"
        style={{
          transform: [{ scale: scaleAnim }],
        }}
      >
        <Animated.Image
          source={coverImageSource}
          className="w-48 h-48 rounded-2xl mb-8 border border-[#FFFFFF29]"
          resizeMode="cover"
          style={{
            transform: [{ scale: scaleAnim }],
          }}
        />
        <View className="items-center">
          <Text className="text-primary text-xl">{currentSong?.title || 'Không có tiêu đề'}</Text>
          <Text className="text-xs my-2 text-secondary">
            {currentSong?.artist || 'Không rõ nghệ sĩ'}
          </Text>
          <View className="flex-row gap-4">
            <View className="flex-row items-center gap-2">
              <Ionicons name="play-outline" size={14} color="#919EAB" />
              <Text className="text-secondary">0</Text>
            </View>
            <View className="flex-row items-center gap-2">
              <AntDesign name="hearto" size={14} color="#919EAB" />
              <Text className="text-secondary">0</Text>
            </View>
          </View>
          {currentSong && (
            <MusicProgressBar
              sound={sound}
              playbackStatus={playbackStatus}
              onSeek={async (position) => {
                if (sound) {
                  try {
                    await sound.setPositionAsync(position)
                  } catch (error) {
                    console.error('Error seeking:', error)
                  }
                }
              }}
            />
          )}
          <View className="flex-row gap-8 items-center mt-6">
            <TouchableOpacity onPress={handleRepeatToggle} disabled={isLoading}>
              <IconRepeat color={activeRepeat ? '#ED882D' : '#212B36'} />
            </TouchableOpacity>
            <TouchableOpacity onPress={playPreviousSong} disabled={isLoading}>
              <IconStepBack color={isLoading ? '#919EAB' : '#212B36'} />
            </TouchableOpacity>
            <TouchableOpacity
              className="h-16 w-16 rounded-full bg-primary-main items-center justify-center"
              onPress={togglePlayback}
              disabled={isLoading}
            >
              {isPlaying ? (
                <Pause size="32" color="#FFFFFF" variant="Bold" />
              ) : (
                <Play size="32" color="#FFFFFF" variant="Bold" />
              )}
            </TouchableOpacity>
            <TouchableOpacity onPress={playNextSong} disabled={isLoading}>
              <IconStepNext color={isLoading ? '#919EAB' : '#212B36'} />
            </TouchableOpacity>
            <TouchableOpacity disabled={true}>
              <IconDisturbance color="#ED882D" />
            </TouchableOpacity>
          </View>
        </View>
      </Animated.View>
      {/* Related Tracks Section */}
      {renderRelatedTracksSection()}
    </ImageBackground>
  )
})

export default PlayMusic
