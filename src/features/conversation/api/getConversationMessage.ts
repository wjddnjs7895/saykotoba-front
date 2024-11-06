import api from "@lib/api";
import { useQuery } from "@tanstack/react-query";
import Constants from "expo-constants";

export type GetConversationMessageRequest = {
  conversationId: number;
};

export type GetConversationMessageResponse = {
  id: number;
  message: string;
  isUser: boolean;
  createdAt: Date;
}[];

const getConversationMessage = (
  getConversationMessageRequest: GetConversationMessageRequest
): Promise<GetConversationMessageResponse> => {
  const { conversationId } = getConversationMessageRequest;
  console.log(Constants.expoConfig?.extra?.apiUrl);
  return api.get(`/conversation/get-conversation-message`, {
    params: { conversationId },
  });
};

export const useGetConversationMessage = (
  getConversationMessageRequest: GetConversationMessageRequest
) => {
  return useQuery({
    queryKey: [
      "getConversationMessage",
      getConversationMessageRequest.conversationId,
    ],
    queryFn: () => getConversationMessage(getConversationMessageRequest),
  });
};
