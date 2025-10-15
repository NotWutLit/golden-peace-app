import ModalComponent from '@/components/ModalComponent'
import { ScrollView, Text, TouchableOpacity, View, TextInput, Image, Alert, ActivityIndicator } from 'react-native'
import React, { useState, useEffect } from 'react'
import { UserRanking } from '@/hooks/useHome'
import { ArrowCircleDown2, Send2 } from 'iconsax-react-native'
import { useDownloadFile } from '@/utils/useDownloadFile'
import { useAIMusic } from '@/hooks/useAIMusic'
import { useToast } from '@/components/ToastNotify/ToastContext'
import { useRouter } from 'expo-router'
import { ERouteTable } from '@/constants/route-table'

interface IModalSelectModeProps {
  onClose: () => void
  visible: boolean
  data?: UserRanking[] // Optional data prop, can be used for future enhancements
}

interface ChatMessage {
  id: string
  text: string
  isUser: boolean
  timestamp: string
  hasAudio?: boolean
  audioTitle?: string
  musicData?: any
}


export default function ModalBotMusic({ onClose, visible, data }: IModalSelectModeProps) {
  const [inputText, setInputText] = useState('')
  const { generateMusic, isGenerating } = useAIMusic()
  const [downloadingId, setDownloadingId] = useState<string | null>(null)
  const { downloadFile, isDownloading, progress } = useDownloadFile()
  const { showToast } = useToast()
  const router = useRouter()
  const [showSuggestionModal, setShowSuggestionModal] = useState(false)
  
  // Messages array - starts empty
  const [messages, setMessages] = useState<ChatMessage[]>([])

  // generation handled by useAIMusic

  const handleSend = async () => {
    if (inputText.trim() && !isGenerating) {
      const userMessage: ChatMessage = {
        id: Date.now().toString(),
        text: inputText,
        isUser: true,
        timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
      }
      
      setMessages(prev => [...prev, userMessage])
      const prompt = inputText
      setInputText('')
      
      // Add loading message with progress indicator
      const loadingMessageId = (Date.now() + 1).toString()
      const loadingMessage: ChatMessage = {
        id: loadingMessageId,
        text: "Đang tạo nhạc cho bạn...\n⏱️ Quá trình này có thể mất tới 3 phút, vui lòng chờ!\n🔄 Đang xử lý...",
        isUser: false,
        timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
      }
      setMessages(prev => [...prev, loadingMessage])
      try {
        // Generate music
        const musicData = await generateMusic(prompt)
        
        if (musicData) {
          const musicMessage: ChatMessage = {
            id: Date.now().toString(),
            text: "",
            isUser: false,
            timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
            hasAudio: true,
            audioTitle: musicData.title,
            musicData: musicData
          }
          setMessages(prev => [...prev, musicMessage])
        } else {
          const errorMessage: ChatMessage = {
            id: Date.now().toString(),
            text: "Xin lỗi, không thể tạo nhạc lúc này. Vui lòng thử lại!",
            isUser: false,
            timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
          }
          setMessages(prev => [...prev, errorMessage])
        }
      } catch (err) {
        const errorMessage: ChatMessage = {
          id: Date.now().toString(),
          text: "Có lỗi kết nối. Vui lòng kiểm tra mạng và thử lại!",
          isUser: false,
          timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
        }
        setMessages(prev => [...prev, errorMessage])
      } finally {
        // Remove loading message always
        setMessages(prev => prev.filter(msg => msg.id !== loadingMessageId))
      }
    }
  }

  const handleDownload = async (musicData?: any) => {
    if (musicData && musicData.audio_url) {
      try {
        setDownloadingId(musicData.clip_id)
        const filename = `${musicData.title.replace(/[^a-zA-Z0-9]/g, '_')}.mp3`
        const result = await downloadFile(musicData.audio_url, filename)
        
        if (result) {
          showToast(`Đã tải xong "${musicData.title}"`, 'success')
        }
      } catch (error) {
        console.error('Download error:', error)
        showToast('Không thể tải xuống file', 'error')
      } finally {
        setDownloadingId(null)
      }
    } else {
      // Handle download for original sample audio (fallback)
      showToast('Chức năng download đang được phát triển', 'error')
    }
  }

  return (
    <ModalComponent onClose={() => {
      setMessages([])
      setInputText('')
      setDownloadingId(null)
      onClose()
    }} visible={visible} height="70%" className="w-full flex-1">
      <View className="flex-1 w-full px-4">
        {/* Header */}
        <View className="flex-row items-center justify-between mb-6 mt-2">
          <View className="flex-row items-center">
            <View>
              <Text className="text-white font-semibold text-lg">Xin chào</Text>
              <Text className="text-white font-semibold text-lg">Chris Hemsworth!</Text>
            </View>
          </View>
          <Text className="text-[#919EAB] text-sm">4:02 PM</Text>
        </View>

        {/* Chat Messages */}
        <ScrollView className="flex-1 mb-4" showsVerticalScrollIndicator={false}>
          {messages.map((message) => (
            <View key={message.id} className={`mb-4 ${message.isUser ? 'items-end' : 'items-start'}`}>
              <Text className="text-[#919EAB] text-xs mb-2">{message.timestamp}</Text>
              
              {message.text && (
                <View className={`max-w-[80%] px-4 py-3 rounded-2xl ${
                  message.isUser 
                    ? 'bg-[#A766FF]' 
                    : 'bg-[#2D3748]'
                }`}>
                  <Text className="text-white text-sm">
                    {message.text}
                  </Text>
                </View>
              )}

              {message.hasAudio && (
                <View className="px-4 py-3 rounded-2xl bg-[#919EAB1F] flex-row items-center gap-2">
                  <View className="flex-row items-center gap-2">
                    <View className="">
                      <Text className="text-white text-sm font-medium">{message.audioTitle}</Text>
                      <Text className="text-[#919EAB] text-xs">MP3</Text>
                    </View>
                    <TouchableOpacity 
                      className="bg-[#A766FF] px-3 py-1 rounded-lg" 
                      onPress={() => {
                        if (message.musicData) {
                          router.push({
                            pathname: ERouteTable.PLAY_MUSIC_AI,
                            params: {
                              musicData: JSON.stringify(message.musicData)
                            }
                          })
                          setMessages([])
                          setInputText('')
                          setDownloadingId(null)
                          onClose()
                        }
                      }}
                    >
                      <Text className="text-white text-xs font-medium">Nghe</Text>
                    </TouchableOpacity>
                  </View>
                  <TouchableOpacity 
                    onPress={() => handleDownload(message.musicData)}
                    disabled={isDownloading && downloadingId === message.musicData?.clip_id}
                    className="flex-row items-center"
                  >
                    {isDownloading && downloadingId === message.musicData?.clip_id ? (
                      <>
                        <ActivityIndicator size="small" color="#919EAB" />
                        <Text className="text-[#919EAB] text-xs ml-1">
                          {Math.round(progress * 100)}%
                        </Text>
                      </>
                    ) : (
                      <>
                        <ArrowCircleDown2 size="20" color="#919EAB" variant="Bold"/>
                      </>
                    )}
                  </TouchableOpacity>
                </View>
              )}
            </View>
          ))}
        </ScrollView>

        {/* Input Area */}
        <View className="bg-[#2D3748] rounded-2xl p-4 mb-4 border border-[#919EAB52] flex-row justify-between items-end">
          <TextInput
            className="text-white text-sm min-h-[20px] flex-1 mr-3"
            placeholder="Bạn muốn tạo nhạc..."
            placeholderTextColor="#919EAB"
            value={inputText}
            onChangeText={setInputText}
            multiline
            editable={!isGenerating}
          />
          <TouchableOpacity
            className={`px-4 py-2 rounded-xl mr-2 bg-[#919EAB14] items-center flex-row`}
            onPress={() => {
              router.push(ERouteTable.GENERATE_MUSIC_AI)
              setMessages([])
              setInputText('')
              setDownloadingId(null)
              onClose()
            }}
            disabled={isGenerating}
          >
            <Text className="text-white font-semibold">Gợi ý</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className={`px-4 py-2 rounded-xl flex-row items-center bg-white`}
            onPress={handleSend}
            disabled={isGenerating || !inputText.trim()}
          >
            {isGenerating ? (
              <>
                <ActivityIndicator size="small" color="white" />
                <Text className="font-semibold ml-2">Đang tạo...</Text>
              </>
            ) : (
              <>
                <Text className={`font-semibold mr-2 ${
                  !inputText.trim() ? 'text-[#919EAB]' : 'text-black'
                }`}>Gửi</Text>
                <Send2 size="20" color={!inputText.trim() ? '#919EAB' : '#212B36'}/>
              </>
            )}
          </TouchableOpacity>
        </View>
        {/* Old suggestion modal removed per new flow */}
      </View>
    </ModalComponent>
  )
}
