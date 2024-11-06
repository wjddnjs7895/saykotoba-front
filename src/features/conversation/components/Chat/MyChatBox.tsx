import { Text, View } from "react-native";
import { ChatBoxProps } from "../../types/chat";

const MyChatBox = ({ text }: ChatBoxProps) => {
  return (
    <View className="bg-gray-200 rounded-lg self-start flex-row p-3 min-w-20 max-w-60">
      <Text>{text}</Text>
    </View>
  );
};

export default MyChatBox;
