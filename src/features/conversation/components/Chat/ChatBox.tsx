import { View } from "react-native";
import { Chat } from "../../types/chat";
import BotChatBox from "./BotChatBox";
import MyChatBox from "./MyChatBox";

const ChatBox = ({ text, isUser }: Chat) => {
  return isUser ? (
    <View className="self-end">
      <MyChatBox text={text} />
    </View>
  ) : (
    <View className="self-start">
      <BotChatBox text={text} />
    </View>
  );
};

export default ChatBox;
