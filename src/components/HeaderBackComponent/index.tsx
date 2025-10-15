import { useRouter } from 'expo-router'
import { View, Text, TouchableOpacity } from 'react-native'
import IconBack from '~/assets/icon-svg/IconBack'
import { ArrowLeft2 } from 'iconsax-react-native'

interface IHeaderBackComponentProps {
  title?: string
  leftChildren?: any
}

export default function HeaderBackComponent({ title, leftChildren }: IHeaderBackComponentProps) {
  const router = useRouter()
  return (
    <View className="flex-row gap-10 items-center">
      <TouchableOpacity className="items-center h-16 w-16 rounded-3xl justify-center bg-white" onPress={() => router.back()}>
        <ArrowLeft2 size="24" color="#212B36" variant="Outline"/>
      </TouchableOpacity>
      {title && <Text className="text-primary text-xl font-semibold">{title}</Text>}
    </View>
  )
}
