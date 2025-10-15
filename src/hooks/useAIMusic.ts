import { useMutation } from '@tanstack/react-query'
import API_CLIENT from '@/libs/api/client'
import { Routes } from '@/libs/api/routes/routes'
import { useToast } from '@/components/ToastNotify/ToastContext'
import { MUSIC_GENERATION_TIMEOUT } from '@/libs/env'

interface SunoDataItem {
  id: string
  audioUrl: string
  sourceAudioUrl: string
  streamAudioUrl: string
  sourceStreamAudioUrl: string
  imageUrl: string
  sourceImageUrl: string
  prompt: string
  modelName: string
  title: string
  tags: string
  createTime: number
  duration: number
}

interface ApiResponseData {
  taskId: string
  parentMusicId: string
  param: string
  response?: {
    taskId: string
    sunoData: SunoDataItem[]
  }
  status: 'SUCCESS' | 'RUNNING' | 'FAILED'
  type: string
  operationType: string
  errorCode?: string | null
  errorMessage?: string | null
  createTime: number
}

interface ApiResponse {
  success: boolean
  errorCode: string
  message: string
  data: ApiResponseData | null
  meta: Record<string, unknown>
}

type GenerateMusicInput = {
  prompt: string
  instrumental?: boolean
}

export function useAIMusic() {
  const { showToast } = useToast()

  const generateMusicMutation = useMutation({
    mutationFn: async (input: GenerateMusicInput): Promise<any> => {
      const { prompt, instrumental } = input
      const response = await API_CLIENT.post(
        Routes.musicGeneration.generate,
        { prompt, instrumental: instrumental ?? true },
        { timeout: MUSIC_GENERATION_TIMEOUT },
      )

      const result: ApiResponse = response.data

      if (
        result.success &&
        result.data &&
        result.data.response &&
        result.data.response.sunoData &&
        result.data.response.sunoData.length > 0
      ) {
        const first = result.data.response.sunoData[0]
        const mapped: any = {
          clip_id: first.id,
          title: first.title,
          tags: first.tags,
          lyrics: first.prompt,
          image_url: first.imageUrl,
          audio_url: first.audioUrl,
          duration: first.duration.toString(),
          modelName: first.modelName,
          createTime: first.createTime,
        }
        return mapped
      }

      throw new Error(result.message || 'Không thể tạo nhạc')
    },
    onError: (error: any) => {
      const message =
        error?.response?.data?.message || error?.message || 'Có lỗi xảy ra khi tạo nhạc'
      showToast(message, 'error')
    },
  })

  const generateMusic = (prompt: string, instrumental: boolean = true) =>
    generateMusicMutation.mutateAsync({ prompt, instrumental })

  return {
    generateMusic,
    isGenerating: generateMusicMutation.isPending,
  }
}
