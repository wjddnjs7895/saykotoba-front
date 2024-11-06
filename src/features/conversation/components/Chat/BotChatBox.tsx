import { Text, View } from "react-native";
import { ChatBoxProps } from "../../types/chat";

const BotChatBox = ({ text }: ChatBoxProps) => {
  return (
    <View className="bg-white rounded-lg self-start flex-row p-3 min-w-20 max-w-60">
      <Text>{text}</Text>
    </View>
  );
};

export default BotChatBox;
