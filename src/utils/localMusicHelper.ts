import DataOldMusic from '@/data/DataOldMusic'
import DataNaturalMusic from '@/data/DataNaturalMusic'
import DataThienMusic from '@/data/DataThienMusic'
import DataPodcat from '@/data/DataPodcat'
import { Song } from '@/data/DataMusic'

export interface LocalMusicItem {
  id: number
  title: string
  artist?: string
  host?: string
  duration: string
  image: string
  audio: string
  description: string
}

export type LibraryType = 'old-music' | 'natural-music' | 'thien-music' | 'podcast'

// Convert duration string (MM:SS) to milliseconds
const parseDurationToMs = (duration: string): number => {
  const parts = duration.split(':')
  if (parts.length === 2) {
    const minutes = parseInt(parts[0], 10)
    const seconds = parseInt(parts[1], 10)
    return (minutes * 60 + seconds) * 1000
  }
  return 0
}

// Get data based on library type
export const getLocalMusicData = (libraryType: LibraryType): LocalMusicItem[] => {
  switch (libraryType) {
    case 'old-music':
      return DataOldMusic
    case 'natural-music':
      return DataNaturalMusic
    case 'thien-music':
      return DataThienMusic
    case 'podcast':
      return DataPodcat
    default:
      return DataOldMusic
  }
}

// Find track by ID in library
export const findLocalTrack = (
  libraryType: LibraryType,
  trackId: string,
): LocalMusicItem | undefined => {
  const data = getLocalMusicData(libraryType)
  return data.find((item) => item.id.toString() === trackId)
}

// Convert local music item to Song format
export const convertLocalToSong = (item: LocalMusicItem): Song => {
  return {
    id: `local-${item.id}`,
    title: item.title,
    artist: item.artist || item.host || 'Unknown Artist',
    album: 'Local Library',
    duration: parseDurationToMs(item.duration),
    uri: item.audio,
    artwork: item.image,
    isFavorite: false, // Local tracks don't have favorite status
  }
}

// Get next track in library
export const getNextLocalTrack = (
  libraryType: LibraryType,
  currentTrackId: string,
): LocalMusicItem | undefined => {
  const data = getLocalMusicData(libraryType)
  const currentIndex = data.findIndex((item) => item.id.toString() === currentTrackId)

  if (currentIndex === -1) return data[0]
  if (currentIndex === data.length - 1) return data[0] // Loop to first
  return data[currentIndex + 1]
}

// Get previous track in library
export const getPreviousLocalTrack = (
  libraryType: LibraryType,
  currentTrackId: string,
): LocalMusicItem | undefined => {
  const data = getLocalMusicData(libraryType)
  const currentIndex = data.findIndex((item) => item.id.toString() === currentTrackId)

  if (currentIndex === -1) return data[0]
  if (currentIndex === 0) return data[data.length - 1] // Loop to last
  return data[currentIndex - 1]
}

// Get random track from library (excluding current)
export const getRandomLocalTrack = (
  libraryType: LibraryType,
  currentTrackId?: string,
): LocalMusicItem | undefined => {
  const data = getLocalMusicData(libraryType)
  const availableTracks = currentTrackId
    ? data.filter((item) => item.id.toString() !== currentTrackId)
    : data

  if (availableTracks.length === 0) return data[0]

  const randomIndex = Math.floor(Math.random() * availableTracks.length)
  return availableTracks[randomIndex]
}

// Get all tracks except current (for related tracks section)
export const getRelatedLocalTracks = (
  libraryType: LibraryType,
  currentTrackId: string,
): LocalMusicItem[] => {
  const data = getLocalMusicData(libraryType)
  return data.filter((item) => item.id.toString() !== currentTrackId)
}

