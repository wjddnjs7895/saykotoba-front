import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import RecordBar from "@features/conversation/components/Record/RecordBar";
import ChatField from "@features/conversation/components/Chat/ChatField";
import { useGetConversationMessage } from "../features/conversation/api/getConversationMessage";
import Constants from "expo-constants";

const ConversationScreen = () => {
  const getConversationMessageQuery = useGetConversationMessage({
    conversationId: 1,
  });

  if (getConversationMessageQuery.isLoading) return <Text>로딩 중...</Text>;
  if (getConversationMessageQuery.error)
    console.log(getConversationMessageQuery.error);
  if (getConversationMessageQuery.error)
    return <Text>에러가 발생했습니다</Text>;

  return (
    <SafeAreaView className="flex-1 bg-white relative" edges={["bottom"]}>
      <View className="flex-1">
        <ChatField chatList={getConversationMessageQuery.data || []} />
      </View>
      <View className="w-full">
        <RecordBar />
      </View>
    </SafeAreaView>
  );
};

export default ConversationScreen;
