import React from "react";
import { View } from "react-native";
import ChatBox from "./ChatBox";
import { GetConversationMessageResponse } from "../../api/getConversationMessage";

const ChatField = ({
  chatList,
}: {
  chatList: GetConversationMessageResponse;
}) => {
  return (
    <View className="flex-1 px-6 py-10 overflow-x-scroll">
      {chatList.map((chat) => (
        <ChatBox key={chat.id} text={chat.message} isUser={chat.isUser} />
      ))}
    </View>
  );
};

export default ChatField;
