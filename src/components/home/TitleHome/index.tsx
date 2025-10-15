import { Text, View } from 'react-native'

interface ITitleHomeProps {
  color?: string
  text?: string
  leftActive?: any
}

export default function TitleHome({
  color = '#A766FF',
  text = 'Hay nghe gần đây',
  leftActive,
}: ITitleHomeProps) {
  return (
    <View className="flex-row justify-between items-center">
      <View style={{ borderLeftColor: color }} className={`border-l-2 w-max pl-4`}>
        <Text className="text-primary text-2xl">{text}</Text>
      </View>
      {leftActive && leftActive}
    </View>
  )
}
